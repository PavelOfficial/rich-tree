export type EntityLabelData = {
  id: number;
  label: string;
  parentId: number;
};

export interface EntityLabelNode {
  get id(): number;
  get parent(): EntityLabelNode;
  get label(): string;
  get children(): EntityLabelNode[];
  setParent(parent: EntityLabelNode): void;
  addChild(child: EntityLabelNode, index?: number): void;
  get level(): number;
  getBranchMembers(): EntityLabelNode[];
  removeChild(node: EntityLabelNode): void;
  getData(): EntityLabelData;
  get path(): number[];
  get isLastChild(): boolean;
}
