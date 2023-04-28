import { Component,  ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { userForm } from 'src/app/Models/userName';
import { ToDoComponent } from '../to-do/to-do.component';
@Component({
  selector: 'app-init',
  templateUrl: './init.component.html',
  styleUrls: ['./init.component.css']
})
export class InitComponent {
  userInsertForm : userForm = new userForm();
  userIntoValue = '';
  destroyChild = false;

  @ViewChild("userForm")
  userForm!: NgForm;

  @ViewChild(ToDoComponent, { static: false })
  childRef!: ToDoComponent;

  isSubmit : boolean = false;

  destroy() {
    if (this.childRef)
      this.childRef.ngOnInit();
  }

  constructor(private router : Router) {}

  SetUserName(valid : boolean) {
    if (valid) {
      this.userIntoValue = this.userInsertForm.UserName;
      this.isSubmit = true;
      console.log(this.userIntoValue);
    }
    else {
      this.isSubmit = false;
    }
    if (this.childRef)
    {
      this.childRef.ngOnDestroy();
    }
  }
}
