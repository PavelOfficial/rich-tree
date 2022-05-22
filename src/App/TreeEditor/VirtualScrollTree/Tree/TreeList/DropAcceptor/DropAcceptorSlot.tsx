import React, { DragEventHandler, useMemo, useRef, useState } from 'react';
import classnames from 'classnames';

import { nestingPad } from '../../definitions';

type Props = {
  id: number;
  index: number;
  onDragOver: (pathId: number) => void;
};

export const DropAcceptorSlot = ({ index, onDragOver, id }: Props) => {
  const [active, setActive] = useState(false);
  const ref = useRef(null);
  const style = useMemo(() => {
    return {
      marginLeft: index * nestingPad,
    };
  }, [index]);

  const handleDragOver: DragEventHandler<HTMLDivElement> = (event) => {
    onDragOver(id);

    if (event.target === ref.current) {
      setActive(true);
    }
  };

  const handleDragLeave: DragEventHandler<HTMLDivElement> = (event) => {
    if (event.target === ref.current) {
      setActive(false);
    }
  };

  return (
    //
    <div
      ref={ref}
      style={style}
      className={classnames({
        DropAcceptor__slot: true,
        DropAcceptor__slot_active: active,
      })}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    />
  );
};
