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
  mouseIndex: number;

  @observable
  dragging: boolean;

  @observable
  dropIntention: NodeLocation;

  constructor(entityLabelStore: EntityLabelStore) {
    this.entityLabelStore = entityLabelStore;
    this.dropIntention = emptyDropIntention;
  }

  @computed
  get dropAccessorIndex() {
    return this.dragging ? this.mouseIndex : -1;
  }

  @action
  setDropIntention(dropIntention: NodeLocation) {
    this.dropIntention = dropIntention;
  }

  @action
  setMouseIndex(index: number) {
    this.mouseIndex = index;
  }

  @action
  startDragging() {
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
}
