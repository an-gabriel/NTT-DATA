export interface CropGetAll {
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date | null;
    active: boolean;
}
