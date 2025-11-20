import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { BaseService } from "my-angular-commons2";
import { TreeNode } from "../models/tree-node";

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

  getChildren(parentId: number): Observable<TreeNode[]> {
    // return this.get("/organizations/children/" + parentId);
    if(parentId == 0) {
      return of([
        {
          id: 1,
          name: "رئیس کل",
          description: "نود ریشه",
          hasChildren: true,
          children: [],
          expanded: false
        }
      ]);
    } else {
      return of([
        {
          id: 1,
          name: "رئیس مرکز حراست",
          description: "",
          hasChildren: true,
          children: [],
          expanded: false
        },
        {
          id: 2,
          name: "مدیرکل حفاظت فناوری اطلاعات",
          description: "",
          hasChildren: false,
          children: [],
          expanded: false
        }
      ]);
    }
  }

  
}