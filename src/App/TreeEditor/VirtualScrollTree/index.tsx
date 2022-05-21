import React from 'react';

import './index.css';

import { Tree } from './Tree';

export const VirtualScrollTree = () => {
  const range = { from: 0, to: Infinity };

  return (
    <div className="VirtualScrollTree">
      <Tree range={range} />
    </div>
  );
};
