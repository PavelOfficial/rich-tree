import React from 'react';
import { inject, observer } from 'mobx-react';

import './index.css';
import { EntityLabelStore } from '../VirtualScrollTree/Tree/mobx/EntityLabelStore';
import { emptyEntityLabelNode } from '../VirtualScrollTree/Tree/mobx/EntityLabel/emptyEntityLabelNode';
import { ROOT_ID } from '../VirtualScrollTree/Tree/mobx/EntityLabelStore/definitions';

type Props = {
  entityLabelStore: EntityLabelStore;
};

const SelectedInfo = inject('entityLabelStore')(
  observer(({ entityLabelStore }: Props) => {
    const { selected } = entityLabelStore;

    if (selected.id === ROOT_ID) {
      return null;
    }

    return (
      <>
        <div>
          <strong>id:</strong> {selected.id}
        </div>
        <div>
          <strong>label:</strong> {selected.label}
        </div>
        <div>
          <strong>parentId:</strong> {selected.parent.id}
        </div>
      </>
    );
  })
);

type ExternalProps = {
  entityLabelStore?: EntityLabelStore;
};

const ExternalSelectedInfo = SelectedInfo as React.FC<ExternalProps>;

export { ExternalSelectedInfo as SelectedInfo };
