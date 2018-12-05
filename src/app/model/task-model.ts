export class TaskModel {
    public constructor(init?: Partial<TaskModel>) {
        Object.assign(this, init);
    }

    Task: string;
    TaskId: number;
    ParentTaskId: number;
    Priority: number;
    ParentTask: string;
    StartDate: string;
    EndDate: string;
    IsEditable: boolean;
}
