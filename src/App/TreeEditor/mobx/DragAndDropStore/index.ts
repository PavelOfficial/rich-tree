import { action, computed, observable } from 'mobx';

import { EntityLabelStore } from '../EntityLabelStore';
import { NodeLocation } from './types';
import { ROOT_ID } from '../EntityLabelStore/definitions';
import { emptyEntityLabelNode } from '../EntityLabel/emptyEntityLabelNode';

const emptyDropIntention: NodeLocation = {
  index: -1,
  parentId: -1,
};

const DEFAULT_AVAILABLE_DROP_INDEX = -2;

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
  get onlyChildDropAllowed() {
    const upperItemId = this.entityLabelStore._sequence[this.dropAccessorIndex - 1] ?? ROOT_ID;
    const upperItem = this.entityLabelStore.map.get(upperItemId);

    return !!upperItem.children.length;
  }

  @computed
  get dropIndexByUpperItemLastChild() {
    const upperItemId = this.entityLabelStore._sequence[this.dropAccessorIndex - 1] ?? ROOT_ID;

    if (upperItemId === ROOT_ID) {
      return -1;
    }

    const currentId = this.entityLabelStore.sequenceStash[this.dropAccessorIndex] ?? ROOT_ID;
    const currentItem = this.entityLabelStore.map.get(currentId) ?? emptyEntityLabelNode;

    const upperItem = this.entityLabelStore.map.get(upperItemId) ?? emptyEntityLabelNode;
    const path = upperItem.path.reverse();
    let result = DEFAULT_AVAILABLE_DROP_INDEX;

    for (let i = 0; i < path.length; i++) {
      const item = this.entityLabelStore.map.get(path[i]);
      const isLastItemCurrent = i === 0 && currentItem.isLastChild && item.parent.id === currentItem.parent.id;

      if (item.isLastChild || isLastItemCurrent) {
        result = result - 1;
      } else {
        break;
      }
    }

    return result;
  }

  @computed
  get availableDropItemIndex() {
    if (this.onlyChildDropAllowed) {
      return -1;
    }

    return this.dropIndexByUpperItemLastChild;
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
    const isAbleDrop = this.isAbleDrop; // strictly before unstash and dragging cancel

    this.dragging = false;
    this.entityLabelStore.unstash();

    if (this.dropIntention.index !== -1 && isAbleDrop) {
      const targetPosition = {
        //
        parentId: this.dropIntention.parentId,
        index: this.dropIntention.index,
      };

      if (sourceIndex < targetPosition.index) {
        const sourceItemNotDisplayedCorrection = 1;
        targetPosition.index = targetPosition.index + sourceItemNotDisplayedCorrection;
      }

      this.entityLabelStore.moveNode(sourceIndex, targetPosition);
    }
  }

  @computed
  get mouseIndex() {
    return this._mouseIndex;
  }
}
