import React, { useEffect, useState } from 'react';
import { Provider } from 'mobx-react';

import { VirtualScrollStore } from './mobx/VirtualScrollStore';
import { VirtualScrollStoreOptions } from './mobx/types';
import { VisualScrollArea } from './VirtualScrollArea';

import { ScrollAreaContainer } from './types';

type Props = {
  children: (range: { from: number; to: number }) => React.ReactElement;
  options: VirtualScrollStoreOptions;
  Container: ScrollAreaContainer;
};

const createStores = (options) => {
  return {
    virtualScrollStore: new VirtualScrollStore(options),
  };
};

export const VirtualScroll = ({ children, options, Container }: Props) => {
  const [stores] = useState(() => createStores(options));

  useEffect(() => {
    stores.virtualScrollStore.setItemsTotal(options.itemsTotal);
  }, [options.itemsTotal]);

  return (
    <Provider {...stores}>
      <VisualScrollArea Container={Container}>{children}</VisualScrollArea>
    </Provider>
  );
};
