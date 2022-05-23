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
import { StartDrag } from './DragStart';

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
type StartDraggingSign = 'START_DRAGGING_SIGN';
const DROP_ACCESSOR_SIGN: DropAccessorSign = 'DROP_ACCESSOR_SIGN';
const START_DRAGGING_SIGN: StartDraggingSign = 'START_DRAGGING_SIGN';
type SequenceItem = DropAccessorSign | StartDraggingSign | number;

const mixinItemToSequence = (sequence: SequenceItem[], index: number, item: SequenceItem) => {
  if (index === -1) {
    return sequence;
  }

  const resultSequence: SequenceItem[] = [...sequence];
  resultSequence.splice(index, 0, item);

  return resultSequence;
};

const getInsertionIndex = (index: number, range: VirtualScrollRange) => {
  const outOfRange = index < range.from || index > range.to;

  if (index === -1 || outOfRange) {
    return -1;
  }

  return index - range.from;
};

const mixinSpecialItems = (sequence: number[], range: VirtualScrollRange, { dropAccessorIndex, startDraggingIndex }: DraggingOptions) => {
  const dropAccessorInsertionIndex = getInsertionIndex(dropAccessorIndex, range);
  const startDraggingInsertionIndex = getInsertionIndex(startDraggingIndex, range);

  let newSequence: SequenceItem[] = sequence;

  newSequence = mixinItemToSequence(newSequence, dropAccessorInsertionIndex, DROP_ACCESSOR_SIGN);
  newSequence = mixinItemToSequence(newSequence, startDraggingInsertionIndex, START_DRAGGING_SIGN);

  return newSequence;
};

const renderList = (props: Props, options: DraggingOptions) => {
  const virtualSequence = props.sequence.slice(props.range.from, props.range.to);
  const sequence = mixinSpecialItems(virtualSequence, props.range, options);

  return sequence.map((id: SequenceItem, index) => {
    if (id === DROP_ACCESSOR_SIGN) {
      return <DropAcceptor key={DROP_ACCESSOR_SIGN} />;
    }

    if (id === START_DRAGGING_SIGN) {
      return <StartDrag key={START_DRAGGING_SIGN} />;
    }

    if (typeof id === 'number') {
      return <Item key={id} id={id} index={props.range.from + index} />;
    }

    exhaustivenessCheck(id);

    return null;
  });
};

const TreeList = inject('dragAndDropStore')(
  observer((props: Props) => {
    const options: DraggingOptions = {
      startDraggingIndex: props.dragAndDropStore.startDraggingIndex,
      dropAccessorIndex: props.dragAndDropStore.dropAccessorIndex,
    };

    return <>{renderList(props, options)}</>;
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
