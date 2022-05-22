import React, { ForwardRefExoticComponent, Ref, RefAttributes } from 'react';

export type VirtualScrollContainerStyle = {
  paddingTop: number;
  paddingBottom: number;
};

type ContainerProps = {
  children: React.ReactElement | (() => JSX.Element);
  ref: Ref<unknown>;
  style: VirtualScrollContainerStyle;
};

export type ScrollAreaContainer = ForwardRefExoticComponent<ContainerProps & RefAttributes<unknown>>;

export type VirtualScrollRange = {
  from: number;
  to: number;
};
