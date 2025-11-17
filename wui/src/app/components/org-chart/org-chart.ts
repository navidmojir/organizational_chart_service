import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {MatTreeModule} from '@angular/material/tree';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { OrgChartService } from '../../services/org-chart.service';


export interface TreeNode {
  id: string;  
  name: string;
  description?: string;
  hasChildren: boolean;      
}



@Component({
  selector: 'app-org-chart',
  templateUrl: 'org-chart.html',
  imports: [MatTreeModule, MatButtonModule, MatIconModule],
})
export class OrgChart {

  

}

