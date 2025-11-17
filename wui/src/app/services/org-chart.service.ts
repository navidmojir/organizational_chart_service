import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { TreeNode } from "../components/org-chart/org-chart";
import { BaseService } from "my-angular-commons2";

@Injectable({
  providedIn: 'root'
})
export class OrgChartService extends BaseService{
  constructor() {
    super();
    super.setResourceName('organizations');
    super.setBaseUrl('http://localhost:8081');
  }

//   getRoots() {
//     // return this.get("/organizations/roots");
//     return of([{name: "root1", expandable: true}, {name: "root2", expandable: false}]);
//   }

  getChildren(parentId: number) {
    return this.get("/organizations/children/" + parentId);
    // return of([{name: "sub2", expandable: false}]);
  }

  
}