import React, { DragEventHandler, useRef } from 'react';
import { inject } from 'mobx-react';
import { useDrop } from 'react-dnd';

import { VirtualScrollContainerStyle } from '../../../lib/VirtualScroll/types';
import { itemHeight, nodeItemType } from './Tree/definitions';
import { DragAndDropStore } from '../mobx/DragAndDropStore';

type Props = {
  style: VirtualScrollContainerStyle;
  children: React.ReactNode;
  dragAndDropStore: DragAndDropStore;
};

type DropItem = {
  id: number;
  index: number;
};

const DropContainer = inject('dragAndDropStore')(({ style, children, dragAndDropStore }: Props) => {
  useRef(null);
  const [_, drop] = useDrop(() => ({
    accept: nodeItemType,
    drop: (item: DropItem) => {
      dragAndDropStore.drop(item.index);
    },
  }));

  const handleDragOver: DragEventHandler<HTMLDivElement> = (event) => {
    if (event.currentTarget) {
      const dropAreaRect = event.currentTarget.getBoundingClientRect();
      const mouseY = event.clientY - dropAreaRect.top;
      const mouseIndex = Math.floor(mouseY / itemHeight);

      dragAndDropStore.setMouseIndex(mouseIndex);
    }
  };

  return (
    //
    <div ref={drop} onDragOver={handleDragOver} style={style}>
      {children}
    </div>
  );
});

type PropsExternal = {
  style: VirtualScrollContainerStyle;
  children: React.ReactNode;
  dragAndDropStore?: DragAndDropStore;
};

const DropContainerExternal = DropContainer as React.FC<PropsExternal>;

export { DropContainerExternal as DropContainer };
