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
   * warning: it's unordered
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

  setParent(parent: EntityLabelNode) {
    this._parent = parent;
  }

  addChild(child: EntityLabelNode) {
    this._children.push(child);
  }
}
