import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NodeDialogComponent, NodeDialogData } from '../node-dialog/node-dialog.component';
import { UserService } from '../../services/user.service';
import { MatIconModule } from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import { ConfirmationDialogComponent } from 'my-angular-commons2';
import { OrgChartService } from '../../services/org-chart.service';

export interface AssignUserDialogData {
  currentAssignedUser? :any;
  selectedOrganization? : any;
}

@Component({
  selector: 'app-assign-user-dialog',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatTooltipModule
  ],
  templateUrl: './assign-user-dialog.html',
  styleUrl: './assign-user-dialog.css',
})
export class AssignUserDialog {

  searchResult: any[] = [];

  selectedUser: any;

  form: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<NodeDialogComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: AssignUserDialogData,
    private userService: UserService,
    private dialog: MatDialog,
    private orgChartService: OrgChartService
  ) {
    this.form = this.fb.group({
      username: []
    });
  }

  save(): void {
    if (this.form.valid) {
      this.dialogRef.close(this.selectedUser);
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }

  search() {
    if (!this.form.value.username || this.form.value.username.length < 1) {
      this.searchResult = [];
      return;
    }
    this.userService.searchUsers(this.form.value.username).subscribe(
      (result: any) => this.searchResult = result
    )
  }

  unassignUser() {
    let dialogRef = this.dialog.open(ConfirmationDialogComponent);
    dialogRef.componentInstance.confirmMessage = "آیا از حذف انتصاب کاربر اطمینان دارید؟";
    dialogRef.afterClosed().subscribe(result => {
      if(result)
        this.orgChartService.unassignOrganizationAssignedUser(this.data.selectedOrganization.id, this.data.currentAssignedUser.id)
        .subscribe(() => this.data.currentAssignedUser = null)
    }
    )
  }
}
