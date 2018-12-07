import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { TaskModel } from '../model/task-model';
import { TaskService } from '../services/task.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

  constructor(private service: TaskService, private router: Router) {
  }

  addTaskForm: FormGroup;
  formSubmitted = false;
  taskModel: TaskModel;
  tasks: TaskModel[];

  ngOnInit() {
    this.addTaskForm = new FormGroup({
      Task: new FormControl('', Validators.required),
      Priority: new FormControl(1, Validators.min(1)),
      ParentTask: new FormControl(''),
      StartDate: new FormControl('', Validators.required),
      EndDate: new FormControl('', Validators.required)

    });
    this.PopulateDropdown();
  }

  get f() { return this.addTaskForm.controls; }

  PopulateDropdown() {
    this.service.getTasks().subscribe(
      o => {
        this.tasks = o;
      }
    );
  }

  onSubmit() {
    this.formSubmitted = true;
    if (!this.addTaskForm.invalid) {
      this.taskModel = new TaskModel();
      this.taskModel.Task = this.addTaskForm.value.Task;
      this.taskModel.Priority = this.addTaskForm.value.Priority;
      this.taskModel.ParentTask = this.addTaskForm.value.ParentTask;
      this.taskModel.StartDate = this.addTaskForm.value.StartDate;
      this.taskModel.EndDate = this.addTaskForm.value.EndDate;
      this.service.addTask(this.taskModel).subscribe(() => { this.router.navigate(['']); });
    }
  }

  onReset() {
    this.addTaskForm.reset();
  }

}
