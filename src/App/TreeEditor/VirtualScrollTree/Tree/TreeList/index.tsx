import React, { useMemo } from 'react'
import { ObservableMap } from 'mobx'

import { Range } from '../types'
import { EntityLabelNode } from '../mobx/EntityLabel/EntityLabelNode'
import { itemHeight, nestingPad } from '../definitions'

import './index.css'

type Props = {
  sequence: number[]
  map: ObservableMap<number, EntityLabelNode>
  range: Range
}

const defaultStyle = {
  height: itemHeight,
}

type ItemProps = {
  id: number
  node: EntityLabelNode
}

const Item = (props: ItemProps) => {
  const style = useMemo(() => {
    return {
      ...defaultStyle,
      marginLeft: nestingPad * props.node.level,
    }
  }, [props.node])

  return (
    <div className="NodeBox" style={style} key={props.id}>
      <div className="Node">{props.node.label}</div>
    </div>
  )
}

const renderList = (props: Props) => {
  return props.sequence.map((id: number) => {
    return <Item key={id} id={id} node={props.map.get(id) as EntityLabelNode} />
  })
}

export const TreeList = (props: Props) => {
  return <>{renderList(props)}</>
}
