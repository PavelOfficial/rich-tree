export type EntityLabelPage = {
  labels: string[]
  entityLongIds: number[]
  parentEntityLongIds: number[]
}

export type EntityLabelResponse = {
  entityLabelPages: [EntityLabelPage, ...EntityLabelPage[]]
}
