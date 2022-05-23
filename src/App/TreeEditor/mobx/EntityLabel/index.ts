import { observable } from 'mobx';

import { EntityLabelNode } from './EntityLabelNode';
import { ROOT_ID } from '../EntityLabelStore/definitions';

export type EntryLabelOptions = {
  id: number;

  label: string;

  parent: EntityLabelNode;

  children: EntityLabelNode[];
};

export class EntityLabel implements EntityLabelNode {
  _id: number;

  _label: string;

  @observable _parent: EntityLabelNode;

  /**
   * keep actual children order
   */
  @observable _children: EntityLabelNode[];

  constructor(options: EntryLabelOptions) {
    this._id = options.id;
    this._label = options.label;
    this._parent = options.parent;
    this._children = options.children;
  }

  get id() {
    return this._id;
  }

  get label() {
    return this._label;
  }

  get parent() {
    return this._parent;
  }

  get children() {
    return this._children;
  }

  get level() {
    if (this.parent.id === ROOT_ID) {
      return 0;
    }

    return this.parent.level + 1;
  }

  get path() {
    const parentPath = this.parent.path;

    return [...parentPath, this.id];
  }

  removeChild(child: EntityLabelNode) {
    const index = this._children.indexOf(child);

    if (index !== -1) {
      this._children.splice(index, 1);
    }
  }

  getBranchMembers() {
    const allSubBranchMembers = this.children.reduce((result, child) => {
      result.push(...child.getBranchMembers());

      return result;
    }, []);

    const result = [this, ...allSubBranchMembers];

    return result;
  }

  setParent(parent: EntityLabelNode) {
    this._parent = parent;
  }

  addChild(child: EntityLabelNode) {
    this._children.push(child);
  }

  getData() {
    return {
      id: this.id,
      label: this.label,
      parentId: this.parent.id,
    };
  }

  get isLastChild() {
    const length = this.parent.children.length;
    const last = this.parent.children[length - 1];

    return last.id === this.id;
  }
}
