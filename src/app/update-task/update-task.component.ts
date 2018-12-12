import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { TaskService } from '../services/task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskModel } from '../model/task-model';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.css']
})
export class UpdateTaskComponent implements OnInit {

  constructor(private service: TaskService, private route: ActivatedRoute, private router: Router) {
  }

  updateTaskForm: FormGroup;
  formSubmitted = false;
  taskModel: TaskModel;
  tasks: TaskModel[];
  isDataLoaded = false;

  ngOnInit() {
    this.PopulateDropdown();

    const taskid: number = this.route.snapshot.params.id;
    this.service.getTaskById(taskid).subscribe(
      o => {
        this.taskModel = o;
        if (this.taskModel) {
          this.updateTaskForm = new FormGroup({
            Task: new FormControl(this.taskModel.Task, Validators.required),
            Priority: new FormControl(this.taskModel.Priority, Validators.min(1)),
            ParentTask: new FormControl(this.taskModel.ParentTask),
            StartDate: new FormControl(new Date(this.taskModel.StartDate).toISOString().substring(0, 10), Validators.required),
            EndDate: new FormControl(new Date(this.taskModel.EndDate).toISOString().substring(0, 10), Validators.required)
          });
          this.isDataLoaded = true;
        }
      }
    );
  }

  private PopulateDropdown() {
    this.service.getTasks().subscribe(
      o => {
        this.tasks = o;
      }
    );
  }

  get f() { return this.updateTaskForm.controls; }

  onSubmit() {
    this.formSubmitted = true;

    if (!this.updateTaskForm.invalid) {
      this.taskModel.Task = this.updateTaskForm.value.Task;
      this.taskModel.Priority = this.updateTaskForm.value.Priority;
      this.taskModel.ParentTask = this.updateTaskForm.value.ParentTask;
      this.taskModel.StartDate = this.updateTaskForm.value.StartDate;
      this.taskModel.EndDate = this.updateTaskForm.value.EndDate;
      this.service.updateTask(this.taskModel).subscribe(() => {
        this.router.navigate(['']);
      });
    }
  }

  onCancel(){
    this.router.navigate(['']);
  }
}
