import axios from "axios";

const baseURL = process.env.REACT_APP_SERVER
const userData = JSON.parse(localStorage.getItem("userData") || "");
const config = {
    headers: { "token": userData.Token }
}

export const fetchProjectsAPI = async () => {
    return await axios.get(`${baseURL}/API/V2/projects.ashx?method=getProjectList`, config);
};