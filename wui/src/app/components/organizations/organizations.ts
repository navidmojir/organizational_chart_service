import { Dialog } from '@angular/cdk/dialog';
import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { MyGridComponent, CrudParams, FieldConfig, CustomAction, ConfirmationDialogComponent, FilterConfig, AuthService} from 'my-angular-commons2';


@Component({
  selector: 'app-organizations',
  imports: [MyGridComponent, MatFormFieldModule, MatInputModule, ReactiveFormsModule,
    MatButtonModule
  ],
  templateUrl: './organizations.html',
  styleUrl: './organizations.css'
})
export class Organizations {
  gridParams: CrudParams = new CrudParams();

  @ViewChild(MyGridComponent) grid!: MyGridComponent;

  constructor(private router: Router,
     private authService: AuthService
  ) {
  }

  filters = new UntypedFormGroup({
    text: new UntypedFormControl()
  });

  ngOnInit() {
    this.gridParams.baseUrl = "http://localhost:8081";
    this.gridParams.resourceName = "organizations";
    
    
    let idCol = new FieldConfig();
    idCol.name = 'id';
    idCol.displayText = 'شناسه';
    this.gridParams.fieldConfigs.push(idCol);

    let textCol = new FieldConfig();
    textCol.name = 'name';
    textCol.displayText = 'نام';
    this.gridParams.fieldConfigs.push(textCol);

    if(this.authService.hasPermission("/organizations", "POST")) {
      let createAction = new CustomAction();
      createAction.title = "ایجاد سازمان جدید";
      createAction.onClick = () => this.router.navigate(["organization-details"]);
      this.gridParams.customGeneralActions.push(createAction);
    }

    if(this.authService.hasPermission("/organizations/{id}", "GET")) {
      let showDetailsAction = new CustomAction();
      showDetailsAction.title = 'جزئیات';
      showDetailsAction.onClick = (organization: any) => this.router.navigate(['organization-details', organization.id]);
      this.gridParams.customRecordActions.push(showDetailsAction);
    }
    
    this.makeFilterConfig();
  }

  private makeFilterConfig() {
    let textFilter: FilterConfig = new FilterConfig();
    textFilter.name = "name";
    textFilter.label = "نام";
    this.gridParams.filterConfigs.push(textFilter);

  }

}
