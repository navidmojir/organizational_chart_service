import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { TreeNode } from '../../models/tree-node';

export interface NodeDialogData {
  editMode: boolean;
  node?: TreeNode;
}

@Component({
  selector: 'app-node-dialog',
  templateUrl: './node-dialog.component.html',
  styleUrls: ['./node-dialog.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class NodeDialogComponent {
  title: string = "";

  form: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<NodeDialogComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: NodeDialogData
  ) {

    let valName = data.editMode ? (data.node?.name ?? '') : '';
    let valDescription = data.editMode ? (data.node?.description ?? '') : '';
    let valId = data.editMode ? data.node?.id : 0;
    let valParentId = data.editMode ? data.node?.parentId : data.node?.id;

    this.form = this.fb.group({
      name: [valName, [Validators.required, Validators.maxLength(128)]],
      description: [valDescription, [Validators.maxLength(1024)]], 
      id: [valId],
      parentId: [valParentId]
    });
    this.title = data.editMode ? "ویرایش جایگاه": "افزودن جایگاه جدید";
  }

  save(): void {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }
}

