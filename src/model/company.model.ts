import { FolderModel } from "./folder.model";
import { ProjectModel } from "./project.model";

export interface CompanyModel {
    IdCompany: string
    CompanyName: string
    AllProjects: [FolderModel]
    ClosedProjects: [FolderModel]
    FavoriteProjects: [ProjectModel]
    RecentProjects: [ProjectModel]
}