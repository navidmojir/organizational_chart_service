export interface OrganizationDto {
id: number;
name: string;
parentId?: number | null;
}


export interface TreeNode {
id: number;
name: string;
children?: TreeNode[];
}