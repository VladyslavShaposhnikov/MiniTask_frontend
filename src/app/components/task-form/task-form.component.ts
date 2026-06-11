import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Router, RouterModule } from "@angular/router";
import { TaskService } from "../../services/task.service";
import { TaskItem } from "../../models/task.model";

@Component({
    selector: 'app-task-form',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterModule],
    templateUrl: './task-form.component.html',
    styleUrls: []
})
export class TaskFormComponent {
    task: TaskItem = {
        title: '',
        description: '',
        dueDate: new Date().toISOString().split('T')[0],
        isCompleted: false,
        isEdited: false,
        isImportant: false,
        createdAt: new Date().toISOString()
    };

    isSaving = false;

    constructor(
        private taskService: TaskService,
        private router: Router
    ) { }

    onSubmit(): void {
        if (!this.task.title.trim()) {
            alert('Title is required!');
            return;
        }

        this.isSaving = true;

        this.taskService.createTask(this.task).subscribe({
            next: (savedTask) => {
                this.isSaving = false;
                console.log('Task saved successfully to .NET inmemory list:', savedTask);
                this.router.navigate(['/']);
            },
            error: (error) => {
                console.error('Failed to save task:', error);
                this.isSaving = false;
                alert('Something went wrong while talking to the backend API.');
            }
        });
    };
}