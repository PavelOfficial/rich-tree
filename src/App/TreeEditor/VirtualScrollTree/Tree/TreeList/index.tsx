import React from 'react';
import { ObservableMap } from 'mobx';

import { Item } from './Item';
import { EntityLabelNode } from '../../../mobx/EntityLabel/EntityLabelNode';

import './index.css';
import { VirtualScrollRange } from '../../../../../lib/VirtualScroll/types';

type Props = {
  sequence: number[];
  map: ObservableMap<number, EntityLabelNode>;
  range: VirtualScrollRange;
};

const renderList = (props: Props) => {
  const virtualSequence = props.sequence.slice(props.range.from, props.range.to);

  return virtualSequence.map((id: number, index) => {
    return <Item key={id} id={id} index={props.range.from + index} node={props.map.get(id) as EntityLabelNode} />;
  });
};

export const TreeList = (props: Props) => {
  return <>{renderList(props)}</>;
};
