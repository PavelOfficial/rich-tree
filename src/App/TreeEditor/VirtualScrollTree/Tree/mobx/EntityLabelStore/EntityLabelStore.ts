import { observable, action } from 'mobx';
import { ObservableMap } from 'mobx/dist/internal';
import invariant from 'invariant';

import { EntityLabelNode } from '../EntityLabel/EntityLabelNode';
import type { EntityLabelPage, EntityLabelResponse } from './types';
import { emptyEntityLabelNode } from '../EntityLabel/emptyEntityLabelNode';
import { EntityLabel } from '../EntityLabel';

const RESOURCE =
  'https://gist.githubusercontent.com/avydashenko/e1702c1ef26cddd006da989aa47d4f62/raw/067f7b75946baf7faf5b8afcd04c66ecf0b47486/view.json';

export class EntityLabelStore {
  @observable sequence: number[];

  map: ObservableMap<number, EntityLabelNode>;

  constructor() {
    this.sequence = [];
    this.map = observable.map<number, EntityLabelNode>();
  }

  initMap(entityLabelPage: EntityLabelPage) {
    this.map = observable.map<number, EntityLabelNode>();

    entityLabelPage.entityLongIds.forEach((id: number, index: number) => {
      const label = entityLabelPage.labels[index];

      const entryLabel = new EntityLabel({
        id,
        label,
        parent: emptyEntityLabelNode,
        children: [],
      });

      this.map.set(id, entryLabel);
    }, {} as { [key: number]: EntityLabelNode });

    entityLabelPage.entityLongIds.forEach((id: number, index: number) => {
      const parentId = entityLabelPage.parentEntityLongIds[index];
      const parent = this.map.get(parentId) as EntityLabelNode;
      const child = this.map.get(id) as EntityLabelNode;

      child.setParent(parent);
      parent.addChild(child);
    });
  }

  @action('load entity labels')
  setData(entityLabelPage: EntityLabelPage) {
    this.sequence = entityLabelPage.entityLongIds;
    this.initMap(entityLabelPage);
  }

  async load() {
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
}
