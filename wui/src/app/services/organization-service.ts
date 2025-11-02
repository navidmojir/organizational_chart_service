import { Injectable } from "@angular/core";
import { BaseService } from "my-angular-commons2";

@Injectable({
  providedIn: 'root'
})
export class OrganizationService extends BaseService{
  constructor() {
    super();
    super.setResourceName('organizations');
    super.setBaseUrl('http://localhost:8081');
  }
}