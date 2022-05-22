import React, { useCallback } from 'react';
import { inject, observer } from 'mobx-react';

import { EntityLabelStore } from '../mobx/EntityLabelStore';
import { ROOT_ID } from '../mobx/EntityLabelStore/definitions';

import './index.css';

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
        <button className="Controls__button" type="button" onClick={handleApply}>
          Apply
        </button>
        <button className="Controls__button" type="button" disabled={props.entityLabelStore.pending} onClick={handleRefresh}>
          Refresh
        </button>
        <button className="Controls__button" type="button" disabled={props.entityLabelStore.selected.id === ROOT_ID} onClick={handleRemove}>
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
