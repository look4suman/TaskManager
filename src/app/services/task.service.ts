import { Injectable } from '@angular/core';
import { TaskModel } from '../model/task-model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }

  baseUrl = environment.baseUrl;

  getTasks(): Observable<TaskModel[]> {
    let url = this.baseUrl + 'getTask';
    return this.http.get<TaskModel[]>(url)
      .pipe(
        catchError(this.handleError('getTasks', []))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  private log(message: string) {
    //this.messageService.add(`HeroService: ${message}`);
  }
}
