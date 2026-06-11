export interface TaskItem {
    id?: number;
    createdAt: string;
    title: string;
    description: string;
    dueDate: string;
    isCompleted: boolean;
    isImportant: boolean;
    isEdited: boolean;
}