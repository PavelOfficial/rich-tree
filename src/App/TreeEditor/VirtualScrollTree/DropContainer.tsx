import React from 'react';
import { useDrop } from 'react-dnd';

import { VirtualScrollContainerStyle } from '../../../lib/VirtualScroll/types';
import { nodeItemType } from './Tree/definitions';

type Props = {
  style: VirtualScrollContainerStyle;
  children: React.ReactNode;
};

type DropItem = {
  id: number;
};

export const DropContainer = ({ style, children }: Props) => {
  const [_, drop] = useDrop(() => ({
    accept: nodeItemType,
    drop: (item: DropItem) => {
      console.log(item);
    },
  }));

  return (
    //
    <div ref={drop} style={style}>
      {children}
    </div>
  );
};
