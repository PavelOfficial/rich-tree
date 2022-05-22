import React, { useCallback } from 'react';
import { inject, observer } from 'mobx-react';

import { EntityLabelStore } from '../VirtualScrollTree/Tree/mobx/EntityLabelStore';

import './index.css';
import { emptyEntityLabelNode } from '../VirtualScrollTree/Tree/mobx/EntityLabel/emptyEntityLabelNode';

type Props = {
  entityLabelStore: EntityLabelStore;
};

const Controls = inject('entityLabelStore')(
  observer((props: Props) => {
    const handleRefresh = useCallback(() => {
      props.entityLabelStore.fetch();
    }, [props.entityLabelStore]);

    const handleRemove = useCallback(() => {
      props.entityLabelStore.removeSelected();
    }, [props.entityLabelStore]);

    const handleApply = useCallback(() => {
      props.entityLabelStore.apply();
    }, [props.entityLabelStore]);

    return (
      <div className="Controls">
        <button type="button" onClick={handleApply}>
          Apply
        </button>
        <button type="button" disabled={props.entityLabelStore.pending} onClick={handleRefresh}>
          Refresh
        </button>
        <button type="button" disabled={props.entityLabelStore.selected === emptyEntityLabelNode} onClick={handleRemove}>
          Remove
        </button>
      </div>
    );
  })
);

type ExternalProps = {
  entityLabelStore?: EntityLabelStore;
};

const ControlsExternal = Controls as React.FC<ExternalProps>;

export { ControlsExternal as Controls };
