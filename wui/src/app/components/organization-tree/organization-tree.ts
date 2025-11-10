import { Component, OnInit } from '@angular/core';
import {MatTreeModule} from '@angular/material/tree';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { OrganizationService } from '../../services/organization.service';
import { DataSource } from '@angular/cdk/collections';

interface Node {
  id: number;
  name: string;
  children?: Node[];
  childrenLoaded: boolean;
}

// const EXAMPLE_DATA: Node[] = [
//   {
//     name: 'Fruit',
//     children: [{name: 'Apple'}, {name: 'Banana'}, {name: 'Fruit loops'}],
//   },
//   {
//     name: 'Vegetables',
//     children: [
//       {
//         name: 'Green',
//         children: [{name: 'Broccoli'}, {name: 'Brussels sprouts'}],
//       },
//       {
//         name: 'Orange',
//         children: [{name: 'Pumpkins'}, {name: 'Carrots'}],
//       },
//     ],
//   },
// ];

@Component({
  selector: 'app-organization-tree',
  imports: [MatTreeModule, MatIconModule, MatButtonModule],
  templateUrl: './organization-tree.html',
  styleUrl: './organization-tree.css',
})
export class OrganizationTree implements OnInit{
  dataSource = [];
  childrenAccessor = (node: Node) => node.children ?? [];
  hasChild = (_: number, node: Node) => true;

  constructor(private organizationService: OrganizationService) {}

  ngOnInit(): void {
    this.organizationService.getRoots().subscribe(
      (result: any) =>
        this.dataSource = result
    )
  }

  // loadChildren(node: Node) {
  //   if (!node.childrenLoaded) {
  //     this.organizationService.getChildren(node.id).subscribe((children: any) => {
  //       node.children = children;
  //       node.childrenLoaded = true;
  //       // this.dataSource = [...this.dataSource.data]; // trigger refresh
  //     });
  //   }
  // }


  // private async getChilds(node: Node) {
  //   return await this.organizationService.getChildren(node.id);
  // }
}
