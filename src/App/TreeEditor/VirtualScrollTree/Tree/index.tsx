import React from 'react';
import { inject, observer } from 'mobx-react';

import { Range } from './types';
import { EntityLabelStore } from './mobx/EntityLabelStore';
import { TreeList } from './TreeList';

type Props = {
  entityLabelStore: EntityLabelStore;
  range: Range;
};

const Tree = inject('entityLabelStore')(
  observer(({ entityLabelStore, range }: Props) => {
    return (
      <TreeList //
        sequence={entityLabelStore._sequence}
        map={entityLabelStore._map}
        range={range}
      />
    );
  })
);

type ExternalProps = {
  entityLabelStore?: EntityLabelStore;
  range: Range;
};

const ExternalTree = Tree as React.FC<ExternalProps>;

export { ExternalTree as Tree };
