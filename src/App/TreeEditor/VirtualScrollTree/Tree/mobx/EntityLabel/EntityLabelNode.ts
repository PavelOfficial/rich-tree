export interface EntityLabelNode {
  get id(): number;
  get parent(): EntityLabelNode;
  get label(): string;
  get children(): EntityLabelNode[];
  setParent(parent: EntityLabelNode): void;
  addChild(child: EntityLabelNode): void;
}
