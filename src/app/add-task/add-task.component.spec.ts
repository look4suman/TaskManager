import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTaskComponent } from './add-task.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('AddTaskComponent', () => {
  let component: AddTaskComponent;
  let fixture: ComponentFixture<AddTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientModule, RouterModule, RouterTestingModule],
      declarations: [AddTaskComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', () => {
    expect(component.addTaskForm.valid).toBeFalsy();
  });

  it('task field validity', () => {
    const task = component.addTaskForm.controls['Task'];
    expect(task.valid).toBeFalsy();
  });

  it('priority field validity', () => {
    const task = component.addTaskForm.controls['Priority'];
    expect(task.valid).toBeTruthy();
  });

  it('startdate field validity', () => {
    const task = component.addTaskForm.controls['StartDate'];
    expect(task.valid).toBeFalsy();
  });
  it('EndDate field validity', () => {
    const task = component.addTaskForm.controls['EndDate'];
    expect(task.valid).toBeFalsy();
  });

  it('form valid when not empty', () => {

    component.addTaskForm.controls['Task'].setValue('test');
    component.addTaskForm.controls['Priority'].setValue(1);
    component.addTaskForm.controls['StartDate'].setValue('7/1/2018');
    component.addTaskForm.controls['EndDate'].setValue('7/7/2018');
    expect(component.addTaskForm.valid).toBeTruthy();
  });

  it('form should be submitted', () => {

    component.onSubmit();
    expect(component.formSubmitted).toBeTruthy();
  });

});
