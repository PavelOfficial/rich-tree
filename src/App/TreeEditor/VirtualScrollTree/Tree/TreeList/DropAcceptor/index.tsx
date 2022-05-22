import React from 'react';
import { inject, observer } from 'mobx-react';

import { EntityLabelStore } from '../../../../mobx/EntityLabelStore';
import { DragAndDropStore } from '../../../../mobx/DragAndDropStore';

import './index.css';
import { emptyEntityLabelNode } from '../../../../mobx/EntityLabel/emptyEntityLabelNode';
import { DropAcceptorSlot } from './DropAcceptorSlot';
import { ROOT_ID } from '../../../../mobx/EntityLabelStore/definitions';

type Props = {
  entityLabelStore: EntityLabelStore;
  dragAndDropStore: DragAndDropStore;
};

const renderSlots = (pathIds: number[], onDragOver: (pathId: number) => void) => {
  return pathIds.map((id, index) => {
    return (
      <DropAcceptorSlot //
        key={id}
        id={id}
        index={index}
        onDragOver={onDragOver}
      />
    );
  });
};

const DropAcceptor = inject(
  'entityLabelStore',
  'dragAndDropStore'
)(
  observer(({ entityLabelStore, dragAndDropStore }: Props) => {
    const { dropAccessorIndex, startDraggingIndex } = dragAndDropStore;
    const handleDragOver = (pathId: number) => {
      dragAndDropStore.setDropIntention({
        parentId: pathId,
        index: dropAccessorIndex,
      });
    };

    const id = entityLabelStore._sequence[dropAccessorIndex - 1];
    const node = entityLabelStore.map.get(id) ?? entityLabelStore.map.get(ROOT_ID);

    return (
      <div>
        <div className="DropAcceptor" />
        {renderSlots(node.path, handleDragOver)}
      </div>
    );
  })
);

type ExternalProps = {
  entityLabelStore?: EntityLabelStore;
  dragAndDropStore?: DragAndDropStore;
};

const DropAcceptorExternal = DropAcceptor as React.FC<ExternalProps>;

export { DropAcceptorExternal as DropAcceptor };
