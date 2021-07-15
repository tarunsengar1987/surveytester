export type CompanyModel = {
  IdCompany: string;
  CompanyName: string;
  AllProjects: [FolderModel];
  ClosedProjects: [FolderModel];
  FavoriteProjects: [ProjectModel];
  RecentProjects: [ProjectModel];
};

export type FolderModel = {
  FolderName: string;
  IdFolder: string;
  SubFolders: [FolderModel];
  Projects: [ProjectModel];
};

export type ProjectModel = {
  IdProject: string;
  IsWatched: boolean;
  LastAccess: null;
  LastUpdate: null;
  ProjectName: string;
};
