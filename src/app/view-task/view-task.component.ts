import { Component, OnInit } from '@angular/core';
import { TaskModel } from '../model/task-model';
import { TaskService } from '../services/task.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']
})
export class ViewTaskComponent implements OnInit {

  constructor(private service: TaskService, private router: Router) {
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

  redirect(taskId: number): void {
    this.router.navigate(['./update/' + taskId]);
  }

  endTask(task: TaskModel): void {
    this.service.endTask(task.TaskId).subscribe(
      x => task.IsEditable = false
    );
  }

}
