import axios from "axios";

const baseURL = process.env.REACT_APP_SERVER

export const fetchProjectsAPI = async () => {
    return await axios.get(`${baseURL}/API/V2/projects.ashx?method=getProjectList`, getHeader());
};

function getHeader() {
    const userData = JSON.parse(localStorage.getItem("userData") || "");
    return {
        headers: { "token": userData.Token }
    }
}