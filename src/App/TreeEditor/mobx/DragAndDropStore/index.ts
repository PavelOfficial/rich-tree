import { action, computed, observable } from 'mobx';

import { EntityLabelStore } from '../EntityLabelStore';
import { NodeLocation } from './types';

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
    this.entityLabelStore.unstash();

    if (this.dropIntention.index !== -1) {
      this.entityLabelStore.moveNode(sourceIndex, this.dropIntention);
    }

    this.dragging = false;
  }

  @computed
  get mouseIndex() {
    return this._mouseIndex;
  }
}
