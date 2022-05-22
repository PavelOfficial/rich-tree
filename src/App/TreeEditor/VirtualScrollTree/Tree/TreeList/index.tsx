import React from 'react';
import { ObservableMap } from 'mobx';

import { Range } from '../types';
import { EntityLabelNode } from '../mobx/EntityLabel/EntityLabelNode';

import './index.css';
import { Item } from './Item';

type Props = {
  sequence: number[];
  map: ObservableMap<number, EntityLabelNode>;
  range: Range;
};

const renderList = (props: Props) => {
  return props.sequence.map((id: number) => {
    return <Item key={id} id={id} node={props.map.get(id) as EntityLabelNode} />;
  });
};

export const TreeList = (props: Props) => {
  return <>{renderList(props)}</>;
};
