import { EntityLabelNode } from './EntityLabelNode';

export const emptyEntityLabelNode: EntityLabelNode = {
  get id() {
    return -1;
  },
  get label() {
    return '';
  },
  get parent() {
    return emptyEntityLabelNode;
  },
  children: [],
  setParent() {},
  addChild() {},
  getBranchMembers() {
    return [];
  },
  removeChild(node: EntityLabelNode) {},
  get level() {
    return 0;
  },
  getData() {
    return {
      id: this.id,
      label: this.label,
      parentId: this.parent.id,
    };
  },
};
