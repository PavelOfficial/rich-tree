import React, { useEffect, useMemo, useRef } from 'react';
import { inject, observer } from 'mobx-react';

import { VirtualScrollStore } from './mobx/VirtualScrollStore';
import { ScrollAreaContainer } from './types';

type Props = {
  children: (range: { from: number; to: number }) => JSX.Element;
  virtualScrollStore: VirtualScrollStore;
  Container: ScrollAreaContainer;
};

const VisualScrollArea = inject('virtualScrollStore')(
  observer((props: Props) => {
    const scrollStore = props.virtualScrollStore;
    const scrollAreaRef = useRef(null);

    useEffect(() => {
      const handleScroll = (event) => {
        const scrollTop = event.target.scrollTop;

        scrollStore.setScrollPosition(scrollTop);
      };

      if (scrollAreaRef.current) {
        scrollAreaRef.current.addEventListener('scroll', handleScroll);
        scrollStore.setScrollAreaHeight(scrollAreaRef.current.offsetHeight);
      }

      return () => {
        if (scrollAreaRef.current) {
          scrollAreaRef.current.removeEventListener('scroll', handleScroll);
        }
      };
    }, []);

    const ScrollArea = props.Container;

    const pads = scrollStore.pads;
    const style = useMemo(() => {
      return pads;
    }, [pads.paddingTop, pads.paddingBottom]);

    return (
      <ScrollArea style={style} ref={scrollAreaRef}>
        {props.children({
          from: scrollStore.from,
          to: scrollStore.to,
        })}
      </ScrollArea>
    );
  })
);

type ExternalProps = {
  children: (range: { from: number; to: number }) => JSX.Element;
  virtualScrollStore?: VirtualScrollStore;
  Container: ScrollAreaContainer;
};

const VisualScrollAreaExternal = VisualScrollArea as React.FC<ExternalProps>;

export { VisualScrollAreaExternal as VisualScrollArea };
