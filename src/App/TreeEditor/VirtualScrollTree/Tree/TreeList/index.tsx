import React from 'react';
import { ObservableMap } from 'mobx';

import { Item } from './Item';
import { EntityLabelNode } from '../../../mobx/EntityLabel/EntityLabelNode';
import { VirtualScrollRange } from '../../../../../lib/VirtualScroll/types';
import { inject, observer } from 'mobx-react';
import { DragAndDropStore } from '../../../mobx/DragAndDropStore';
import { DropAcceptor } from './DropAcceptor';

import './index.css';
import { exhaustivenessCheck } from '../../../../../utils';

type Props = {
  sequence: number[];
  map: ObservableMap<number, EntityLabelNode>;
  range: VirtualScrollRange;
  dragAndDropStore: DragAndDropStore;
};

type DraggingOptions = {
  startDraggingIndex: number;
  dropAccessorIndex: number;
};

type DropAccessorSign = 'DROP_ACCESSOR_SIGN';
const DROP_ACCESSOR_SIGN: DropAccessorSign = 'DROP_ACCESSOR_SIGN';
type SequenceItem = DropAccessorSign | number;

const mixinDropAccessor = (sequence: number[], range: VirtualScrollRange, dropAccessorIndex: number) => {
  const outOfRange = dropAccessorIndex < range.from || dropAccessorIndex > range.to;

  if (dropAccessorIndex === -1 || outOfRange) {
    return sequence;
  }

  const index = dropAccessorIndex - range.from;
  const resultSequence: SequenceItem[] = [...sequence];
  resultSequence.splice(index, 0, DROP_ACCESSOR_SIGN);

  return resultSequence;
};

const renderList = (props: Props, dropAccessorIndex: number) => {
  const virtualSequence = props.sequence.slice(props.range.from, props.range.to);
  const sequence = mixinDropAccessor(virtualSequence, props.range, dropAccessorIndex);

  return sequence.map((id: SequenceItem, index) => {
    if (id === DROP_ACCESSOR_SIGN) {
      return <DropAcceptor />;
    }

    if (typeof id === 'number') {
      return <Item key={id} id={id} index={props.range.from + index} node={props.map.get(id) as EntityLabelNode} />;
    }

    exhaustivenessCheck(id);

    return null;
  });
};

const TreeList = inject('dragAndDropStore')(
  observer((props: Props) => {
    return <>{renderList(props, props.dragAndDropStore.dropAccessorIndex)}</>;
  })
);

type ExternalProps = {
  sequence: number[];
  map: ObservableMap<number, EntityLabelNode>;
  range: VirtualScrollRange;
  dragAndDropStore?: DragAndDropStore;
};

const TreeListExternal = TreeList as React.FC<ExternalProps>;

export { TreeListExternal as TreeList };
