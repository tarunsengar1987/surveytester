export type ProjectDetailsModel = {
  IdProject: string
  ProjectName: string
  CreationDate: Date
  IsClosed: boolean
  IsFavorite: boolean
  IsWatched: boolean
  LastAccess: string
  LastUpdate: string
  PlannedFinishDate: string;
  ProjectClassificationFieldSet: ProjectClassificationFieldSetModel
  ProjectCustomerSettings: [ProjectCustomerSettingsModel]
  ProjectMainLanguage: ProjectMainLanguageModel
  ProjectManager: ProjectManagerModel
  ProjectType: ProjectTypeModel
  Status: StatusModel
  SurveyLink: string
};

export type ProjectClassificationFieldSetModel = {
  Id: string
  Name: string
}

export type ProjectCustomerSettingsModel = {
  FieldLabel: string
  FieldType: string
  FieldValue: string
  IdField: string
}

export type ProjectMainLanguageModel = {
  CategoryId: string
  CategoryLabel: string
  EnglishName: string
  IdLanguage: string
  LanguageCode: Number
  NativeName: string
  Parameter: string
}

export type ProjectManagerModel = {
  FullName: string
  IdUser: string
}

export type ProjectTypeModel = {
  Name: string
}

export type StatusModel = {
  Messages: Array<string>
  Method: string
  Status?: string
  Timestamp: Date
  Version: string
}
