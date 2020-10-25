import { Route } from '@angular/compiler/src/core';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
@Component({
  selector: 'app-popupcreate',
  templateUrl: './popupcreate.component.html',
  styleUrls: ['./popupcreate.component.scss']
})
export class PopupcreateComponent implements OnInit {
  form: FormGroup;
  // description: string;
  dataarray = [];
  user: any = {};
  name: any;
  role: any;
  // description: any;
  constructor(private fb: FormBuilder, private router: Router, private dialog: MatDialog, private dialogRef: MatDialogRef<PopupcreateComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
    // this.description = data.description;

  }

  ngOnInit() {
    this.form = this.fb.group({
      // name: [name ,[]],
      // role: ['', Validators.required]
      username: [''],
      role: ['']

    });
  }
  save() {
    this.dialogRef.close(this.form.value);
  }
  close() {
    this.dialogRef.close();
  }
  onSubmit() {
    // console.log(this.form.value);
    // this.user = Object.assign(this.user, this.form.value);
    // this.addUser(this.user);
    // this.dialog.closeAll();
    this.dialogRef.close(this.form.value);

  }
  // addUser(user) {
  //   let users = [];
  //   if (localStorage.getItem('Users')) {
  //     users = JSON.parse(localStorage.getItem('Users'));
  //     users = [user, ...users];
  //   } else {
  //     users = [user];
  //   }
  //   localStorage.setItem('Users', JSON.stringify(users));


  // }
}
