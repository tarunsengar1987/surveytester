import { ProjectModel } from "./project.model";

export interface FolderModel {
    FolderName: string
    IdFolder: string
    SubFolders: [FolderModel]
    Projects: [ProjectModel]
}