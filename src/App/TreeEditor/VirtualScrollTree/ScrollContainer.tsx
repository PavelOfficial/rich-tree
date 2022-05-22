import React, { LegacyRef } from 'react';
import { VirtualScrollContainerStyle } from '../../../lib/VirtualScroll/types';

type Props = {
  children: React.ReactElement | (() => JSX.Element);
  forwardRef: LegacyRef<HTMLDivElement>;
  style: VirtualScrollContainerStyle;
};

const ScrollContainer = ({ children, forwardRef, style }: Props) => {
  return (
    <div className="VirtualScrollTree" ref={forwardRef}>
      <div style={style}>{children}</div>
    </div>
  );
};

type BoxProps = {
  children: React.ReactElement | (() => JSX.Element);
  style: VirtualScrollContainerStyle;
};

const ScrollContainerBox = React.forwardRef((props: BoxProps, ref) => {
  return <ScrollContainer {...props} forwardRef={ref as LegacyRef<HTMLDivElement>} />;
});

export { ScrollContainerBox as ScrollContainer };
