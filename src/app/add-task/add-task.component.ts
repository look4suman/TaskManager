import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { TaskModel } from '../model/task-model';
import { TaskService } from '../services/task.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private service: TaskService, private router: Router) {

  }

  registerForm: FormGroup;
  submitted = false;
  model: TaskModel;

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      Task: ['', Validators.required],
      Priority: 0,
      ParentTask: '',
      StartDate: ['', [Validators.required]],
      EndDate: ['', [Validators.required]]
    });
  }

  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    else {
      this.model = new TaskModel(this.registerForm.value);
      this.service.addTask(this.model).subscribe();
    }
  }

  onReset() {
    this.registerForm.reset();
  }

}
