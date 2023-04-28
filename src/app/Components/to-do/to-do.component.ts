import { Component, Input, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { HttpProviderService } from 'src/app/Service/http-provider.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToDoObject } from 'src/app/Models/ToDoObject';
import { NgForm } from '@angular/forms';
import { ToDoObjectForm } from 'src/app/Models/ToDoObjectForm';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.css']
})
export class ToDoComponent implements OnInit {

  @Input() userInto : string = '';
  @Input() destroyChild : boolean = false;

  items : any = [];
  closeResult: string = '';
  itemsForm : ToDoObjectForm = new ToDoObjectForm();
  isEdit : boolean = false;

  @ViewChild("ToDoObject")
  ToDoObjectForm!: NgForm;

  constructor (
      private httpProvider : HttpProviderService,
      private toastr : ToastrService,
      private router : Router,
      private modalService: NgbModal,
      private spinner : NgxSpinnerService
    ) {}
 
  ngOnDestroy() : void {
    this.items = [];
    this.getInitialValues();
  }

  getInitialValues() : void {
    this.spinner.show();
    this.httpProvider.getAllToDo(this.userInto).subscribe({
      next : (response) => {

        if (response != null && response.body != null ) {
          const result = response.body.data;
          this.items = result;
        }
        this.spinner.hide();
      },
        error : (error) => {
          this.toastr.error(error.message);
          setTimeout(() => {
            console.log(error.message);
            this.router.navigate(['Init']);
          }, 1000);
        this.spinner.hide();
        }
      });
  }
  
  ngOnInit(): void {
    this.getInitialValues();
  }

  open(content : any, id : any) {
    this.getDataForm(id);
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      let data : ToDoObject = this.mapToDataObject();
      this.httpProvider.InsertToDo(data).subscribe({
        next : (response) => {
          console.log(response);
          console.log('validarItems',this.items);
          if (response != null && response.body != null && response.status == 200) {
            if (this.isEdit) {
              this.items = this.items.filter((item: { idTodoObject: number; })  => item.idTodoObject != data.idTodoObject);
              this.items.push(data);
            }
            else {
              this.getInitialValues();
            }
          }},
          error : (error) => {
            this.toastr.error(error.message);
            setTimeout(() => {
              console.log(error.message);
              this.router.navigate(['Init']);
            }, 1000);
          }
        })
      this.closeResult = `Closed with: ${result}`;

    }, (reason) => {

      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;

    });

  }

  openModalDelete(content : any, id : any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.delete(id);
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;

    });
  }
  private getDataForm(id: number) {
    if (id !== 0) {
      this.isEdit = true;
      var todoObject : ToDoObject = this.items.find((element: { idTodoObject: number; })  => element.idTodoObject == id);
      console.log(todoObject);
      this.itemsForm = this.mapItems(todoObject);
    } else {
      this.isEdit = false;
    }
  }
  
  private getDismissReason(reason: any): string {

    if (reason === ModalDismissReasons.ESC) {

      return 'by pressing ESC';

    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {

      return 'by clicking on a backdrop';

    } else {

      return  `with: ${reason}`;

    }
  }

  delete ( id : any) {
    console.log('id borrar', id);
    this.httpProvider.deleteToDoById(id).subscribe({
      next : (response) => {
        console.log(response);
        console.log('validarItemsDelete',this.items);
        if (response.status == 200) {
            this.items = this.items.filter((item: { idTodoObject: number; })  => item.idTodoObject != id);
        }},
        error : (error) => {
          this.toastr.error(error.message);
          setTimeout(() => {
            console.log(error.message);
            this.router.navigate(['Init']);
          }, 1000);
        }
      })
  }

  mapItems(todoObject: ToDoObject): ToDoObjectForm {
    return {
      IdTodoObject : todoObject.idTodoObject,
      NameObject : todoObject.name,
      NameItem1 : todoObject.items[0] == null ? '' : todoObject.items[0].name,
      CheckItem1 : todoObject.items[0] == null ? false : todoObject.items[0].isCheck,
      NameItem2 : todoObject.items[1] == null ? '' : todoObject.items[1].name,
      CheckItem2 : todoObject.items[1] == null ? false : todoObject.items[1].isCheck,
      NameItem3 : todoObject.items[2] == null ? '' : todoObject.items[2].name,
      CheckItem3 : todoObject.items[2] == null ? false : todoObject.items[2].isCheck,
      NameItem4 : todoObject.items[3] == null ? '' : todoObject.items[3].name,
      CheckItem4 : todoObject.items[3] == null ? false : todoObject.items[3].isCheck,
      NameItem5 : todoObject.items[4] == null ? '' : todoObject.items[4].name,
      CheckItem5 : todoObject.items[4] == null ? false : todoObject.items[4].isCheck
    };
  }

  mapToDataObject(): ToDoObject {
    return {
      userName : this.userInto,
      name : this.itemsForm.NameObject,
      idTodoObject : this.itemsForm.IdTodoObject,
      items : [
        {
          idTodoItem : 0,
          name : this.itemsForm.NameItem1,
          isCheck : this.itemsForm.CheckItem1
        },
        {
          idTodoItem : 0,
          name : this.itemsForm.NameItem2,
          isCheck : this.itemsForm.CheckItem2
        },
        {
          idTodoItem : 0,
          name : this.itemsForm.NameItem3,
          isCheck : this.itemsForm.CheckItem3
        },
        {
          idTodoItem : 0,
          name : this.itemsForm.NameItem4,
          isCheck : this.itemsForm.CheckItem4
        },
        {
          idTodoItem : 0,
          name : this.itemsForm.NameItem5,
          isCheck : this.itemsForm.CheckItem4
        }
      ]
    };
  }
}
