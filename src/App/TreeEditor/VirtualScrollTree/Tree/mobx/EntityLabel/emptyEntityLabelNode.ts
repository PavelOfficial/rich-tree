import { EntityLabelNode } from './EntityLabelNode'

export const emptyEntityLabelNode: EntityLabelNode = {
  get id() {
    return -1
  },
  get label() {
    return ''
  },
  get parent() {
    return emptyEntityLabelNode
  },
  children: [],
  setParent() {},
  addChild() {},
  get level() {
    return 0
  },
}
