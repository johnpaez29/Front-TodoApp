import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebApiService } from './web-api.service';


@Injectable({
  providedIn: 'root'
})
export class HttpProviderService {

  private apiUrl : string = 'https://localhost:7125';
  private apiEndpoint  = {
    getAllToDo : `${this.apiUrl}/TodoList`,
    deleteToDoById : `${this.apiUrl}/TodoList`,
    InsertToDo : `${this.apiUrl}/TodoList`,
    getAllToDoItem : `${this.apiUrl}/TodoListItem`,
    deleteToDoItemById : `${this.apiUrl}/TodoListItem`,
    InsertToDoItemById : `${this.apiUrl}/TodoListItem`
  }; 
  constructor(private webApiService : WebApiService) { }

  public getAllToDo(user : string) : Observable<any> {
    return this.webApiService.get(`${this.apiEndpoint.getAllToDo}?userName=${user}`);
  }

  public deleteToDoById(data : number) : Observable<any> {
    return this.webApiService.delete(this.apiEndpoint.deleteToDoById, data);
  }

  public InsertToDo(data : any) : Observable<any> {
    return this.webApiService.post(this.apiEndpoint.InsertToDo, data);
  }

  public getAllToDoItem() : Observable<any> {
    return this.webApiService.get(this.apiEndpoint.getAllToDoItem);
  }

  public deleteToDoItemById(data : string) : Observable<any> {
    return this.webApiService.post(`${this.apiEndpoint.deleteToDoItemById}?id=${data}`, '');
  }

  public InsertToDoItemById(data : any) : Observable<any> {
    return this.webApiService.post(this.apiEndpoint.InsertToDoItemById, data);
  }
}
