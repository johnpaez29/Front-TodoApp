import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class WebApiService {

  constructor(private httpClient : HttpClient) { }

  
  private handleError(error: any){
    return throwError(() => error);
  }
  private options = {
    headers : new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    observe: 'response' as 'body'
  };
  //methods

  get(url: string): Observable<any> {
      console.log(url,this.options);
      return this.httpClient.get(
        url,
        this.options
      ).pipe(
        map((data: any) => data),
        catchError(this.handleError)
      );
  }

  post(url: string, body:any): Observable<any> {
    return this.httpClient.post(
      url,
      body,
      this.options
    ).pipe(
      map((data: any) => data),
      catchError(this.handleError)
    );
  }

  delete(url: string, body: any): Observable<any> {
    console.log(body, 'id borrar servicio');
    return this.httpClient.delete(
      `${url}?idTodoObject=${body}`,
      body
    ).pipe(
      map((data: any) => data),
      catchError(this.handleError)
    );
  }
}
