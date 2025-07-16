export interface ListItem {
    id: number;
    content: string;
    completed: boolean;
    list_id: string;
    created_by: number;
    created_at: Date;
}