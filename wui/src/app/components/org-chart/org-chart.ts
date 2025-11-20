import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { OrgChartService } from '../../services/org-chart.service';
import { TreeNode } from '../../models/tree-node';






@Component({
  selector: 'app-org-chart',
  templateUrl: 'org-chart.html',
  styleUrls: ['org-chart.css'],
  imports: [CommonModule, MatButtonModule, MatIconModule],
})
export class OrgChart implements OnInit {

  dataSource: TreeNode[] = [];
  
  constructor(private orgChartService: OrgChartService) {}

  ngOnInit(): void {
    this.orgChartService.getChildren(0).subscribe((result) => this.dataSource = result);
  }

  toggleNode(node: TreeNode, event?: Event): void {
    event?.stopPropagation();
    const hasLoadedChildren = !!node.children && node.children.length > 0;
    if (node.hasChildren && !hasLoadedChildren) {
      this.orgChartService.getChildren(node.id).subscribe((result) => {
        node.children = result;
        node.expanded = true;
      });
      return;
    }
    if (node.children?.length) {
      node.expanded = !node.expanded;
    }
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
}

