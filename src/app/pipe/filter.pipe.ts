import { Pipe, PipeTransform } from '@angular/core';
import { TaskModel } from '../model/task-model';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: TaskModel[], taskSearch: string, parentTaskSearch: string, priorityFromSearch: number,
    priorityToSearch: number, startDateSearch: Date, endDateSearch: Date): TaskModel[] {

    if (!items) return [];
    if (!taskSearch && !parentTaskSearch && !priorityFromSearch && !priorityToSearch
      && !startDateSearch && !endDateSearch)
      return items;

    return items.filter(it => {
      if (taskSearch && it.Task.toLowerCase().indexOf(taskSearch.toLowerCase()) == -1)
        return false;

      if (parentTaskSearch && it.ParentTask.toLowerCase().indexOf(parentTaskSearch.toLowerCase()) == -1)
        return false;

      if (priorityFromSearch && it.Priority < priorityFromSearch)
        return false;

      if (priorityToSearch && it.Priority > priorityToSearch)
        return false;

      if (startDateSearch && new Date(it.StartDate) < new Date(startDateSearch))
        return false;

      if (endDateSearch && new Date(it.EndDate) > new Date(endDateSearch))
        return false;

      return true;
    });
  }
}
