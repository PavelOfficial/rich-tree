import React from 'react';
import { inject, observer } from 'mobx-react';

import { EntityLabelStore } from '../../mobx/EntityLabelStore';

import { TreeList } from './TreeList';
import { VirtualScrollStore } from '../../../../lib/VirtualScroll/mobx/VirtualScrollStore';

type Props = {
  entityLabelStore: EntityLabelStore;
  virtualScrollStore: VirtualScrollStore;
};

const Tree = inject(
  'entityLabelStore',
  'virtualScrollStore'
)(
  observer(({ entityLabelStore, virtualScrollStore }: Props) => {
    return (
      <TreeList //
        sequence={entityLabelStore._sequence}
        map={entityLabelStore._map}
        range={virtualScrollStore.range}
      />
    );
  })
);

type ExternalProps = {
  entityLabelStore?: EntityLabelStore;
  virtualScrollStore?: VirtualScrollStore;
};

const ExternalTree = Tree as React.FC<ExternalProps>;

export { ExternalTree as Tree };
