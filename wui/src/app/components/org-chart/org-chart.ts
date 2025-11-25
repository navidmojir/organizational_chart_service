import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { OrgChartService } from '../../services/org-chart.service';
import { TreeNode } from '../../models/tree-node';
import { NodeDialogComponent } from '../node-dialog/node-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'my-angular-commons2';
import { AssignUserDialog } from '../assign-user-dialog/assign-user-dialog';






@Component({
  selector: 'app-org-chart',
  templateUrl: 'org-chart.html',
  styleUrls: ['org-chart.css'],
  imports: [CommonModule, MatButtonModule, MatIconModule],
})
export class OrgChart implements OnInit {

  dataSource: TreeNode[] = [];
  
  constructor(private orgChartService: OrgChartService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.orgChartService.getChildren(0).subscribe((result: any) => this.dataSource = result);
  }

  toggleNode(node: TreeNode, event?: Event): void {
    event?.stopPropagation();
    if (!this.childrenLoaded(node)) {
      this.orgChartService.getChildren(node.id).subscribe((result: any) => {
        node.children = result;
        node.expanded = true;
      });
      return;
    }
    if (node.children?.length) {
      node.expanded = !node.expanded;
    }
  }

  private childrenLoaded(node: TreeNode) : boolean {
    return node.hasChildren && (!!node.children && node.children.length > 0);
  }

  selectNode(node: TreeNode, event?: Event): void {
    event?.stopPropagation();
    this.deactivateNodes(this.dataSource);
    node.active = true;
    console.log(node);
  }

  deactivateNodes(nodes: TreeNode[]): void {
    nodes.forEach(node => {
      node.active = false;
      if (node.children) {
        this.deactivateNodes(node.children);
      }
    });
  }

  openNodeDialog(node: TreeNode | null, editMode: boolean): void {
  
    console.log(node);
    const dialogRef = this.dialog.open(NodeDialogComponent, {data: {editMode: editMode, node: node}});
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) { 
        if(result.id && result.id > 0) {
          console.log("updating node", result);
          this.orgChartService.update(result.id, result).subscribe(()=> {if(node) Object.assign(node, result);});
        } else if(result.parentId && result.parentId > 0){
          console.log("adding node under parent", result.parentId, result);
          this.orgChartService.create(result).subscribe((createResp: any)=>{
            if(!node) {
              console.error("error : arent node was null");
              return;
            } else {
              result.id = createResp.id;
              if(!node.hasChildren)
                node.hasChildren = true;
              if(this.childrenLoaded(node)) {
                node.children?.push(result);
              }
            } 
        });
        } else {
          console.log("adding root node", result);
          this.orgChartService.create(result).subscribe((createResp: any)=> {
            result.id = createResp.id;
            this.dataSource.push(result);
          });
        }
       }
    });

  }


  deleteNode(node: TreeNode) {
    let dialogRef = this.dialog.open(ConfirmationDialogComponent);
    if(node.hasChildren)
      dialogRef.componentInstance.confirmMessage = "آیا از حذف جایگاه و تمامی جایگاه های زیرمجموعه اطمینان دارید؟";
    else
      dialogRef.componentInstance.confirmMessage = "آیا از حذف جایگاه اطمینان دارید؟";

    dialogRef.afterClosed().subscribe((result) => {
      if(result) 
        this.orgChartService.remove(node.id.toString()).subscribe(() => {
          this.removeNode(this.dataSource, node.id);
        });
    })
  }

  assignUser(node: TreeNode) {

    this.orgChartService.getAssignedUser(node.id).subscribe(
      result => {
        let dialogRef = this.dialog.open(AssignUserDialog, {data: {currentAssignedUser: result}});

        dialogRef.afterClosed().subscribe((result) => {
          if(result) 
            this.orgChartService.setAssignedUser(node.id, result.id).subscribe();
        })
      }
    )

    
  }

  // Find and remove the node from the dataSource tree
  private removeNode(nodes: TreeNode[], id: number): boolean {
    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i].id === id) {
        nodes.splice(i, 1);
        return true;
      }
      let children = nodes[i].children;
      if (children && children.length > 0) {
        if (this.removeNode(children, id)) {
          // If after removal children is empty, update hasChildren
          if (children.length === 0) {
            nodes[i].hasChildren = false;
          }
          return true;
        }
      }
    }
    return false;
  };
}

