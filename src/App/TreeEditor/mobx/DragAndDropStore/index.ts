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
  startDraggingIndex: number;

  constructor(entityLabelStore: EntityLabelStore) {
    this.entityLabelStore = entityLabelStore;
    this.dropIntention = emptyDropIntention;
    this.startDraggingIndex = -1;
  }

  @computed
  get dropAccessorIndex() {
    return this.dragging ? this._mouseIndex + this.afterStartIndexBoost : -1;
  }

  @computed
  get afterStartIndexBoost() {
    return this._mouseIndex > this.startDraggingIndex ? 1 : 0;
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
    this.startDraggingIndex = index;
    this.dragging = true;
  }

  @action
  endDragging() {
    this.dragging = false;
  }

  @action
  drop(sourceIndex: number) {
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
