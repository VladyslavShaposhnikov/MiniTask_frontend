import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./components/task-list/task-list.component').then(m => m.TaskListComponent),
        title: 'Mini Task Dashboard'
    },
    {
        path: 'task/new',
        loadComponent: () => import('./components/task-form/task-form.component').then(m => m.TaskFormComponent),
        title: 'Create New Task'
    },
    {
        path: 'task/edit/:id',
        loadComponent: () => import('./components/task-edit/task-edit.component').then(m => m.TaskEditComponent),
        title: 'Edit Task'
    },
    {
        path: '**',
        redirectTo: ''
    }
];
