export interface TreeNode {
  id: number;  
  name: string;
  description?: string;
  hasChildren: boolean;
  children: TreeNode[];
}