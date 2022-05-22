import React from 'react';
import { inject, observer } from 'mobx-react';

import './index.css';
import { EntityLabelStore } from '../VirtualScrollTree/Tree/mobx/EntityLabelStore';
import { emptyEntityLabelNode } from '../VirtualScrollTree/Tree/mobx/EntityLabel/emptyEntityLabelNode';

type Props = {
  entityLabelStore: EntityLabelStore;
};

const SelectedInfo = inject('entityLabelStore')(
  observer(({ entityLabelStore }: Props) => {
    const { selected } = entityLabelStore;

    if (selected === emptyEntityLabelNode) {
      return null;
    }

    return (
      <>
        <div>id: {selected.id}</div>
        <div>label: {selected.label}</div>
        <div>parentId: {selected.parent.id}</div>
      </>
    );
  })
);

type ExternalProps = {
  entityLabelStore?: EntityLabelStore;
};

const ExternalSelectedInfo = SelectedInfo as React.FC<ExternalProps>;

export { ExternalSelectedInfo as SelectedInfo };
