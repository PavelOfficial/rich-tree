import React from 'react';
import { inject, observer } from 'mobx-react';
import classnames from 'classnames';

import { EntityLabelStore } from '../../../../mobx/EntityLabelStore';
import { DragAndDropStore } from '../../../../mobx/DragAndDropStore';

import './index.css';
import { DropAcceptorSlot } from './DropAcceptorSlot';
import { ROOT_ID } from '../../../../mobx/EntityLabelStore/definitions';

type Props = {
  entityLabelStore: EntityLabelStore;
  dragAndDropStore: DragAndDropStore;
};

const renderSlots = (pathIds: number[], onDragOver: (pathId: number) => void) => {
  const childAndSiblingIds = pathIds.slice(-2);
  const nestingStartLevel = Math.max(pathIds.length - 2, 0);

  return childAndSiblingIds.map((id, index) => {
    return (
      <DropAcceptorSlot //
        key={id}
        id={id}
        base={index === 0}
        nestingLevel={nestingStartLevel + index}
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
    const { dropAccessorIndex, isAbleDrop } = dragAndDropStore;
    const handleDragOver = (pathId: number) => {
      dragAndDropStore.setDropIntention({
        parentId: pathId,
        index: dropAccessorIndex,
      });
    };

    const id = entityLabelStore._sequence[dropAccessorIndex - 1];
    const node = entityLabelStore.map.get(id) ?? entityLabelStore.map.get(ROOT_ID);

    const renderSlotsIfAble = () => {
      if (!isAbleDrop) {
        return null;
      }

      return renderSlots(node.path, handleDragOver);
    };

    return (
      <div>
        <div
          className={classnames({
            DropAcceptor: true,
            DropAcceptor_invalid: !isAbleDrop,
          })}
        />
        {renderSlotsIfAble()}
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
