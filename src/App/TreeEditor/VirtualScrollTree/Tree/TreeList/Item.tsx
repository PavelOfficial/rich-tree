import React, { useCallback, useMemo } from 'react';
import { inject, observer } from 'mobx-react';
import { useDrag } from 'react-dnd';
import classnames from 'classnames';

import { itemHeight, nestingPad, nodeItemType } from '../definitions';

import { EntityLabelStore } from '../../../mobx/EntityLabelStore';
import { EntityLabelNode } from '../../../mobx/EntityLabel/EntityLabelNode';

import './index.css';

const defaultStyle = {
  height: itemHeight,
};

type ItemProps = {
  id: number;
  node: EntityLabelNode;
  entityLabelStore: EntityLabelStore;
};

const Item = inject('entityLabelStore')(
  observer((props: ItemProps) => {
    const [{ isDragging }, drag] = useDrag<{ id: number }, { name: string }, { isDragging: boolean }>(() => ({
      type: nodeItemType,
      item: { id: props.id },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }));

    const style = useMemo(() => {
      return {
        ...defaultStyle,
        marginLeft: nestingPad * props.node.level,
      };
    }, [props.node]);

    const handleClick = useCallback(() => {
      props.entityLabelStore.setSelected(props.id);
    }, [props.id]);

    if (isDragging) {
      return <div className="DragStart" />;
    }

    return (
      <div className="NodeBox" style={style} key={props.id}>
        <button
          type="button"
          onClick={handleClick}
          ref={drag}
          className={classnames({
            Node: true,
            Node_selected: props.entityLabelStore.selected.id === props.id,
          })}
        >
          {props.node.label}
        </button>
      </div>
    );
  })
);

type ExternalItemProps = {
  id: number;
  node: EntityLabelNode;
  entityLabelStore?: EntityLabelStore;
};

const ExternalItem = Item as React.FC<ExternalItemProps>;

export { ExternalItem as Item };
