import { Component, OnInit } from '@angular/core';
import { TaskModel } from '../model/task-model';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']
})
export class ViewTaskComponent implements OnInit {

  constructor(private service: TaskService) {
  }

  taskSearch: string;
  parentTaskSearch: string;
  priorityFromSearch: number;
  priorityToSearch: number;
  startDateSearch: Date;
  endDateSearch: Date;

  tasks: TaskModel[];

  ngOnInit() {
    this.getTasks();
  }

  getTasks(): void {
    this.service.getTasks()
      .subscribe(o => this.tasks = o);
  }

}
