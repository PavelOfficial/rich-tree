import { EntityLabelStore } from './App/TreeEditor/mobx/EntityLabelStore';
import { DragAndDropStore } from './App/TreeEditor/mobx/DragAndDropStore';

const entityLabelStore = new EntityLabelStore();

export const stores = {
  entityLabelStore,
  dragAndDropStore: new DragAndDropStore(entityLabelStore),
};
