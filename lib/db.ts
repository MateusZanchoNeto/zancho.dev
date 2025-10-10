import Dexie, { Table } from "dexie";

export interface FileRecord {
    id?: number;
    name: string;
    type: string;
    folder: string;
    data: Blob;
    createdAt: Date;
}

export class AppDatabase extends Dexie {
    files!: Table<FileRecord>;

    constructor() {
        super("zanchoOS_FileSystem");
        this.version(1).stores({
            files: "++id, name, folder",
        });
    }
}

export const db = new AppDatabase();
