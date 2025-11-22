import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { BaseService } from "my-angular-commons2";
import { TreeNode } from "../models/tree-node";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService{
  constructor() {
    super();
    super.setResourceName('users');
    super.setBaseUrl(environment.backendBaseUrl);
  }

  searchUsers(search: string) {
    return this.get("/users?search=" + search);
  }

  
}