import {Component, OnInit} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { OrgChartService } from '../../services/org-chart.service';
import { TreeNode } from '../../models/tree-node';






@Component({
  selector: 'app-org-chart',
  templateUrl: 'org-chart.html',
  styleUrls: ['org-chart.css'],
  imports: [MatButtonModule, MatIconModule],
})
export class OrgChart implements OnInit {

  dataSource: TreeNode[] = [];
  
  constructor(private orgChartService: OrgChartService) {}

  ngOnInit(): void {
    this.orgChartService.getChildren(0).subscribe((result) => this.dataSource = result);
  }
}

