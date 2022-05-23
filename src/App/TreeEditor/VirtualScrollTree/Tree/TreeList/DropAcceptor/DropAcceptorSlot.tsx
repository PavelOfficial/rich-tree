import React, { DragEventHandler, useMemo, useRef, useState } from 'react';
import classnames from 'classnames';

import { nestingPad } from '../../definitions';

type Props = {
  id: number;
  nestingLevel: number;
  base: boolean;
  onDragOver: (pathId: number) => void;
};

export const DropAcceptorSlot = ({ nestingLevel, onDragOver, id, base }: Props) => {
  const [active, setActive] = useState(false);
  const ref = useRef(null);
  const style = useMemo(() => {
    return {
      marginLeft: nestingLevel * nestingPad,
    };
  }, [nestingLevel]);

  const handleDragOver: DragEventHandler<HTMLDivElement> = () => {
    onDragOver(id);
    setActive(true);
  };

  const handleDragLeave: DragEventHandler<HTMLDivElement> = () => {
    setActive(false);
  };

  const renderContent = () => {
    return (
      //
      <div
        ref={!base ? ref : undefined}
        style={style}
        className={classnames({
          DropAcceptor__slot: true,
          DropAcceptor__slot_active: active,
        })}
        onDragOver={!base ? handleDragOver : undefined}
        onDragLeave={!base ? handleDragLeave : undefined}
      />
    );
  };

  if (base) {
    return (
      <div ref={ref} onDragOver={handleDragOver} onDragLeave={handleDragLeave}>
        {renderContent()}
      </div>
    );
  }

  return renderContent();
};
