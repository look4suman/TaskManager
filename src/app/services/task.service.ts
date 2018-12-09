import { Injectable } from '@angular/core';
import { TaskModel } from '../model/task-model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }

  baseUrl = environment.baseUrl;

  getTasks(): Observable<TaskModel[]> {
    let url = this.baseUrl + 'getTask';
    return this.http.get<TaskModel[]>(url);
  }

  getTaskById(Id: number): Observable<TaskModel> {
    let url = this.baseUrl + 'Task/' + Id;
    return this.http.get<TaskModel>(url);
  }

  addTask(model: TaskModel): Observable<object> {
    let url = this.baseUrl + 'AddTask';
    return this.http.post(url, model);
  }

  updateTask(model: TaskModel): Observable<object> {
    let url = this.baseUrl + 'UpdateTask';
    return this.http.post(url, model);
  }

  endTask(Id: number): Observable<object> {
    let url = this.baseUrl + 'EndTask/' + Id;
    return this.http.delete(url);
  }
}
