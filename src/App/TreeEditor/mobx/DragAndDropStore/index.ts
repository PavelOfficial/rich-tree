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
    const draggingItemId = this.entityLabelStore.sequenceStash[this.dropAccessorIndex] ?? ROOT_ID;
    const upperItemId = this.entityLabelStore.sequenceStash[this.dropAccessorIndex - 1] ?? ROOT_ID;
    const upperItem = this.entityLabelStore.map.get(upperItemId);
    const draggingItem = this.entityLabelStore.map.get(draggingItemId);
    const onlyOneDraggingChild = draggingItem.parent.id === upperItem.id && upperItem.children.length === 1;

    return !!upperItem.children.length && !onlyOneDraggingChild;
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
  get availableDropRange(): [number, number] {
    if (this.onlyChildDropAllowed) {
      return [-1, Infinity];
    }

    if (this.isItLastAgeOfSelfBranch) {
      const startId = this.entityLabelStore.sequenceStash[this._startDraggingIndex];
      const startItem = this.entityLabelStore.map.get(startId);
      // startItem.level;

      return [startItem.level, startItem.level + 1];
    }

    return [this.dropIndexByUpperItemLastChild, Infinity];
  }

  @computed
  get isItEndPathHasStart() {
    const startId = this.entityLabelStore.sequenceStash[this._startDraggingIndex];
    const endId = this.entityLabelStore._sequence[this.dropAccessorIndex - 1] ?? ROOT_ID;
    const endItem = this.entityLabelStore.map.get(endId);
    const endItemParents = new Set(endItem.path);
    const endPathHasStart = endItemParents.has(startId);

    return endPathHasStart;
  }

  @computed
  get isItLastAgeOfSelfBranch() {
    const startId = this.entityLabelStore.sequenceStash[this._startDraggingIndex];
    const endId = this.entityLabelStore._sequence[this.dropAccessorIndex - 1] ?? ROOT_ID;
    const endItem = this.entityLabelStore.map.get(endId);
    const path = endItem.path;
    const indexOfStart = path.indexOf(startId);
    const branchPath = path.slice(indexOfStart + 1);
    const isEveryLastChild = branchPath.every((itemId) => {
      return this.entityLabelStore.map.get(itemId).isLastChild;
    });

    return isEveryLastChild && !endItem.children.length;
  }

  @computed
  get isAbleDrop() {
    if (this.dropAccessorIndex !== -1 && this._startDraggingIndex !== -1) {
      if (this.isItEndPathHasStart) {
        return this.isItLastAgeOfSelfBranch;
      }

      return true;
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
  drop(id: number) {
    const sourceIndex = this.entityLabelStore.sequenceStash.indexOf(id);
    const isAbleDrop = this.isAbleDrop; // strictly before unstash and dragging cancel

    this.dragging = false;
    this.entityLabelStore.unstash();

    if (this.dropIntention.index !== -1 && isAbleDrop && sourceIndex !== -1) {
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
