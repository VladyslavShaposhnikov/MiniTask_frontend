import { CommonModule } from "@angular/common";
import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ActivatedRoute, Router, RouterModule } from "@angular/router";
import { TaskItem } from "../../models/task.model";
import { TaskService } from "../../services/task.service";

@Component({
    selector: 'app-task-edit',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterModule],
    templateUrl: './task-edit.component.html',
    styleUrls: []
})
export class TaskEditComponent implements OnInit {
    task: TaskItem = {
        title: '',
        description: '',
        dueDate: new Date().toISOString().split('T')[0],
        isCompleted: false,
        isEdited: true,
        isImportant: false,
        createdAt: new Date().toISOString()
    };

    isLoading = true;
    isSaving = false;
    taskId!: number;

    constructor(
        private taskService: TaskService,
        private route: ActivatedRoute,
        private router: Router,
        private cdr: ChangeDetectorRef
    ) { }

    ngOnInit(): void {
        const idParam = this.route.snapshot.paramMap.get('id');

        if (idParam) {
            this.taskId = +idParam;
            this.fetchTaskDetails();
        } else {
            alert('Invalid id');
            this.router.navigate(['/']);
        }
    }

    fetchTaskDetails(): void {
        this.isLoading = true;

        this.taskService.getTaskById(this.taskId).subscribe({
            next: (existingTask) => {
                this.task = existingTask;
                if (this.task.dueDate) {
                    this.task.dueDate = this.task.dueDate.split('T')[0];
                }

                this.isLoading = false;
                this.cdr.detectChanges();
            },
            error: (error) => {
                console.error('Failed to grab task payload:', error);
                alert('Could not find that task record on the server.');
                this.router.navigate(['/']);
            }
        });
    }

    onSubmit(): void {
        if (!this.task.title.trim()) {
            alert('Title is required!');
            return;
        }

        this.isLoading = true;
        this.task.isEdited = true;

        this.taskService.updateTask(this.taskId, this.task).subscribe({
            next: (updatedResult) => {
                this.isSaving = false;
                console.log(`successful update: ${updatedResult}`);
                this.router.navigate(['/']);
                this.cdr.detectChanges();
            },
            error: (error) => {
                console.error('Failed to update task:', error);
                this.isSaving = false;
                alert('Something went wrong while sending updates to the backend API.');
            }
        });
    }
}