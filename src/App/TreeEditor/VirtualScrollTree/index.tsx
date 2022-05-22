import React, { useMemo } from 'react';
import { inject, observer } from 'mobx-react';

import { Tree } from './Tree';
import { VirtualScroll } from '../../../lib/VirtualScroll';
import { ScrollContainer } from './ScrollContainer';
import { itemHeight } from './Tree/definitions';

import './index.css';
import { EntityLabelStore } from '../mobx/EntityLabelStore';

const renderList = () => {
  return <Tree />;
};

const defaultScrollOptions = {
  itemHeight,
};

type Props = {
  entityLabelStore: EntityLabelStore;
};

const VirtualScrollTree = inject('entityLabelStore')(
  observer((props: Props) => {
    const itemsTotal = props.entityLabelStore._sequence.length;
    const scrollOptions = useMemo(() => {
      return {
        ...defaultScrollOptions,
        itemsTotal,
      };
    }, [itemsTotal]);

    return (
      <VirtualScroll Container={ScrollContainer} options={scrollOptions}>
        {renderList}
      </VirtualScroll>
    );
  })
);

type ExternalProps = {
  entityLabelStore?: EntityLabelStore;
};

const VirtualScrollTreeExternal = VirtualScrollTree as React.FC<ExternalProps>;

export { VirtualScrollTreeExternal as VirtualScrollTree };
