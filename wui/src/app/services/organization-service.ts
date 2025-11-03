import { Injectable } from "@angular/core";
import { BaseService } from "my-angular-commons2";
import { of } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class OrganizationService extends BaseService{
  constructor() {
    super();
    super.setResourceName('organizations');
    super.setBaseUrl('http://localhost:8081');
  }

  getRoots() {
    // return this.get("/organizations/roots");
    return of([{"id":1,"name":"Head Office"},{"id":2,"name":"Branch A"}]);
  }

  getChildren(nodeId: number) {
    return of([{"id":10,"name":"IT Department"},{"id":11,"name":"HR Department"}]);
  }
}