import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { TaskItem } from "../models/task.model";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class TaskService {
    private apiUrl = 'http://localhost:5108/api/task';

    constructor(private http: HttpClient) { }

    getAllTasks(): Observable<TaskItem[]> {
        return this.http.get<TaskItem[]>(this.apiUrl);
    }

    createTask(task: TaskItem): Observable<TaskItem> {
        return this.http.post<TaskItem>(this.apiUrl, task);
    }

    deleteTask(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }

    getTaskById(id: number): Observable<TaskItem> {
        return this.http.get<TaskItem>(`${this.apiUrl}/${id}`);
    }

    updateTask(id: number, task: TaskItem): Observable<TaskItem> {
        return this.http.put<TaskItem>(`${this.apiUrl}/${id}`, task);
    }

    completeUncompleteTask(id: number): Observable<void> {
        return this.http.patch<void>(`${this.apiUrl}/${id}`, null);
    }
}