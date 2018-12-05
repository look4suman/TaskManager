import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TaskModel } from '../model/task-model';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.css']
})
export class UpdateTaskComponent implements OnInit {

  constructor(private service: TaskService, private router: Router, private route: ActivatedRoute) {
  }

  task: TaskModel;

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.service.getTaskById(params['id'])
        .subscribe(o => this.task = o);
    });
  }

}
