import { ToDoItem } from "./ToDoObjectItem";

export class ToDoObject {
    idTodoObject : number = 0;
    userName : string = "";
    name : string = "";
    items : Array<ToDoItem> = [];
}