import { observable, action, ObservableMap, computed } from 'mobx';
import invariant from 'invariant';

import { EntityLabelNode } from '../EntityLabel/EntityLabelNode';
import { emptyEntityLabelNode } from '../EntityLabel/emptyEntityLabelNode';
import { EntityLabel } from '../EntityLabel';

import type { EntityLabelPage, EntityLabelResponse } from './types';
import { ROOT_ID } from './definitions';

const RESOURCE = 'https://gist.githubusercontent.com/avydashenko/e1702c1ef26cddd006da989aa47d4f62/raw/067f7b75946baf7faf5b8afcd04c66ecf0b47486/view.json';

const myDecorator = (...args: any) => {
  console.log(args);
};

export class EntityLabelStore {
  @observable
  _selected: EntityLabelNode;

  @observable
  _sequence: number[];

  @observable
  _map: ObservableMap<number, EntityLabelNode>;

  _rootNode: EntityLabelNode;

  constructor() {
    this._sequence = [];
    this._rootNode = new EntityLabel({
      id: ROOT_ID,
      label: '',
      parent: emptyEntityLabelNode,
      children: [],
    });
    this._map = this.createMap();
    this._selected = emptyEntityLabelNode;

    this.fetch();
  }

  createMap() {
    const map = new Map([[this._rootNode.id, this._rootNode]]);

    return observable.map<number, EntityLabelNode>(map);
  }

  @myDecorator
  initMap(entityLabelPage: EntityLabelPage) {
    this._map = this.createMap();
    this._selected = emptyEntityLabelNode;

    entityLabelPage.entityLongIds.forEach((id: number, index: number) => {
      const label = entityLabelPage.labels[index];

      const entryLabel = new EntityLabel({
        id,
        label,
        parent: emptyEntityLabelNode,
        children: [],
      });

      this._map.set(id, entryLabel);
    }, {} as { [key: number]: EntityLabelNode });

    entityLabelPage.entityLongIds.forEach((id: number, index: number) => {
      const parentId = entityLabelPage.parentEntityLongIds[index];
      const parent = this._map.get(parentId) as EntityLabelNode;
      const child = this._map.get(id) as EntityLabelNode;

      child.setParent(parent);
      parent.addChild(child);
    });
  }

  @action('set data')
  setData(entityLabelPage: EntityLabelPage) {
    this._sequence = entityLabelPage.entityLongIds;
    this.initMap(entityLabelPage);
  }

  @action('load entity labels')
  async fetch() {
    try {
      const response = await fetch(RESOURCE, { method: 'GET' });

      invariant(response.ok, 'EntityLabel http request failed');

      const data = await (response.json() as Promise<EntityLabelResponse>);

      // Trust server to return us valid data.
      this.setData(data.entityLabelPages[0]);
    } catch (error) {
      console.log(error);
    }
  }

  @action
  setSelected(id: number) {
    const selected = this._map.get(id);

    this._selected = selected;
  }

  @computed
  get sequence() {
    return this._sequence;
  }

  @computed
  get map() {
    return this._map;
  }

  @computed
  get selected() {
    return this._selected;
  }
}
