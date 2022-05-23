import { action, computed, observable } from 'mobx';

import { EntityLabelStore } from '../EntityLabelStore';
import { NodeLocation } from './types';
import { ROOT_ID } from '../EntityLabelStore/definitions';

const emptyDropIntention: NodeLocation = {
  index: -1,
  parentId: -1,
};

export class DragAndDropStore {
  @observable
  entityLabelStore: EntityLabelStore;

  @observable
  _mouseIndex: number;

  @observable
  dragging: boolean;

  @observable
  dropIntention: NodeLocation;

  @observable
  _startDraggingIndex: number;

  constructor(entityLabelStore: EntityLabelStore) {
    this.entityLabelStore = entityLabelStore;
    this.dropIntention = emptyDropIntention;
    this._startDraggingIndex = -1;
  }

  @computed
  get dropAccessorIndex() {
    return this.dragging ? this._mouseIndex : -1;
  }

  @computed
  get startDraggingIndex() {
    return this.dragging ? this._startDraggingIndex : -1;
  }

  @computed
  get isAbleDrop() {
    if (this.dropAccessorIndex !== -1 && this._startDraggingIndex !== -1) {
      const startId = this.entityLabelStore.sequenceStash[this._startDraggingIndex];
      const endId = this.entityLabelStore._sequence[this.dropAccessorIndex - 1] ?? ROOT_ID;
      const endItem = this.entityLabelStore.map.get(endId);
      const endItemParents = new Set(endItem.path);

      return !endItemParents.has(startId);
    }

    return false;
  }

  @action
  setDropIntention(dropIntention: NodeLocation) {
    this.dropIntention = dropIntention;
  }

  @action
  setMouseIndex(index: number) {
    this._mouseIndex = index;
  }

  @action
  startDragging(index: number) {
    this._startDraggingIndex = index;
    this.entityLabelStore.removeSequenceItemAndStash(index);

    this.dragging = true;
  }

  @action
  endDragging() {
    if (this.dragging) {
      this.entityLabelStore.unstash();
      this.dragging = false;
    }
  }

  @action
  drop(sourceIndex: number) {
    this.dragging = false;

    if (this.dropIntention.index !== -1 && this.isAbleDrop) {
      console.log('succeed !!!');

      this.entityLabelStore.moveNode(sourceIndex, this.dropIntention);
    } else {
      console.log('failed !!!');
    }

    this.entityLabelStore.unstash();
  }

  @computed
  get mouseIndex() {
    return this._mouseIndex;
  }
}
