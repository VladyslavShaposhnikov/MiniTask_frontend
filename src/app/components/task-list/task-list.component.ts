import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { TaskService } from "../../services/task.service";
import { TaskItem } from "../../models/task.model";

@Component({
    selector: 'app-task-list',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './task-list.component.html',
    styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
    tasks: TaskItem[] = [];
    isLoading = true;

    constructor(
        private taskService: TaskService,
        private cdr: ChangeDetectorRef
    ) { }

    ngOnInit(): void {
        this.loadAllTasks();
    }

    loadAllTasks(): void {
        this.isLoading = true;

        this.taskService.getAllTasks().subscribe({
            next: (data) => {
                this.tasks = data;
                this.isLoading = false;
                this.cdr.detectChanges();
            },
            error: (error) => {
                console.error('Failed to get tasks from API: ', error);
                this.isLoading = false;
                this.cdr.detectChanges();
            }
        });
    }

    onDeleteTask(id: number | undefined): void {
        if (id === undefined) return;

        if (confirm('Are you sure you want to delete this task?')) {
            this.taskService.deleteTask(id).subscribe({
                next: () => {
                    this.tasks = this.tasks.filter(task => task.id !== id);
                    this.cdr.detectChanges();
                },
                error: (error) => {
                    console.error('Failed to delete task: ', error);
                }
            });
        }
    }

    onCompleteUncompleteTask(id: number | undefined): void {
        if (id === undefined) return;

        this.taskService.completeUncompleteTask(id).subscribe({
            next: () => {
                this.tasks = this.tasks.map(task =>
                    task.id === id
                        ? { ...task, isCompleted: !task.isCompleted }
                        : task
                );
                this.cdr.detectChanges();
            },
            error: (error) => {
                console.error('Failed to complete/uncomplete task: ', error);
            }
        });
    }

    isTaskOverdue(dueDateString: string | undefined, isCompleted: boolean): boolean {
        if (!dueDateString || isCompleted) return false;

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const dueDate = new Date(dueDateString);
        dueDate.setHours(0, 0, 0, 0);

        return today > dueDate;
    }
}
