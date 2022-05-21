import React from 'react'

import './index.css'

import { VirtualScrollTree } from './VirtualScrollTree'

export const TreeEditor = () => {
  return (
    <div className="TreeEditor">
      <div className="TreeEditor__viewport">
        <VirtualScrollTree />
        <div />
      </div>
      <div className="TreeEditor__controls">
        <button type="button">Refresh</button>
        <button type="button">Rempove</button>
      </div>
    </div>
  )
}
