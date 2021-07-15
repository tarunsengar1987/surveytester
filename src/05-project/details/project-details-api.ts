import axios from "axios";
import { getHeader } from "../../00-surveytester/apiHelper";
import { ProjectDetailsModel } from "./projectdetails-model";

const baseURL = process.env.REACT_APP_SERVER;

export const fetchProjectDetailsAPI = async (projectId: string) => {
  return await axios.post<ProjectDetailsModel>(
    `${baseURL}/API/V2/projects.ashx?method=getProjectDetails`, { IdProject: projectId },
    getHeader()
  );
};