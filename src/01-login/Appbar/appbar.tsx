import React, { useState } from "react";
import "./appbar.css";
import { NotificationsNone, Language, Settings } from "@material-ui/icons";
import {
  Button,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  CssBaseline,
} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import MenuIcon from "@material-ui/icons/Menu";
import TreeItem from "@material-ui/lab/TreeItem";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { deepOrange } from "@material-ui/core/colors";
import { deepPurple } from "@material-ui/core/colors";
import TreeView from "@material-ui/lab/TreeView";
//import { v4 as uuidv4 } from "uuid";
import { useEffect } from "react";
import axios from "axios";//Axios has the ability to intercept HTTP requests. Fetch, by default, doesn't provide a way to intercept requests. Axios has built-in support for download progress. Fetch does not support upload progress

const useStyles = makeStyles((theme) =>
  createStyles({
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      marginRight: "auto",
    },
    drawer: {
      width: 300,
    },
    content: {
      padding: theme.spacing(3),
    },
    orange: {
      color: theme.palette.getContrastText(deepOrange[500]),
      backgroundColor: deepOrange[500],
    },
    purple: {
      color: theme.palette.getContrastText(deepPurple[500]),
      backgroundColor: deepPurple[500],
    },
    root: {
      display: "flex",
      "& > *": {
        margin: theme.spacing(0),
      },
    },
    nested: {
      paddingLeft: "0.50rem",
    },
  })
);

export default function Topbar() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [projects, setProjects] = useState<any>([]);
  const userData = JSON.parse(localStorage.getItem("userData") || "");
  const fetchProjects = async () => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_SERVER}/API/V2/projects.ashx?method=projectlist&token=${userData.Token}`
    );
    if (data) {
      setProjects(data.Companies);
    }
  };

  useEffect(() => {
    fetchProjects();
  });

  type ProjectType =
    {
      IdProject: string,
      ProjectName: string,
      IsWatched: boolean,
      LastUpdate: null,
      LastAccess: null
    }

  type FolderType = {
    IdFolder: string,
    FolderName: string,
    SubFolders: [FolderType],
    Projects: [ProjectType]
  }


  const renderProjectName = (projectName: string, projectId: string) => {
    return <TreeItem label={projectName} nodeId={projectId} />
  }


  const renderFolder = (folder: FolderType) => {
    return (
      <TreeItem label={folder.FolderName} nodeId={folder.IdFolder}>
        {
          folder.Projects.map((pr: ProjectType) =>
            renderProjectName(pr.ProjectName, pr.IdProject))

        }
        {
          folder.SubFolders.map((sf: FolderType) => renderFolder(sf))
        }
      </TreeItem>
    );
  };
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <CssBaseline />
        <Drawer open={open} onClose={() => setOpen(false)}>
          {projects && (
            <TreeView
              className={classes.drawer}
              defaultCollapseIcon={<ExpandMoreIcon />}
              defaultExpanded={["root"]}
              defaultExpandIcon={<ChevronRightIcon />}
            >
              {projects.map((company: any) => (
                <TreeItem
                  label={company.CompanyName}
                  nodeId={company.IdCompany}
                >
                  <TreeItem nodeId="all projects" label="All Projects">
                    {company.AllProjects.map((allProject: FolderType) =>
                      renderFolder(allProject)
                    )}
                  </TreeItem>
                  <TreeItem nodeId="recent" label="Recent Projects">
                    {company.RecentProjects.map((rp: ProjectType) =>
                      renderProjectName(rp.ProjectName, rp.IdProject)
                    )}
                  </TreeItem>
                  <TreeItem nodeId="favorite" label="Favorite Projects">
                    {company.FavoriteProjects.map((fp: ProjectType) =>
                      renderProjectName(fp.ProjectName, fp.IdProject)
                    )}
                  </TreeItem>
                  <TreeItem nodeId="closed" label="Closed Projects" />
                </TreeItem>
              ))}
            </TreeView>
          )}
        </Drawer>
        <AppBar position="static" color="primary">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              onClick={() => setOpen(true)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Survey Tester
            </Typography>
            <Button color="inherit">
              {" "}
              <NotificationsNone />
            </Button>
            <Button color="inherit">
              <Language />
            </Button>
            <Button color="inherit">
              <Settings />
            </Button>
            <Button className={classes.root}>
              {/* <Avatar>H</Avatar>
            <Avatar className={classes.orange}>N</Avatar> */}
              <Avatar className={classes.purple}>ST</Avatar>
            </Button>
          </Toolbar>
        </AppBar>
      </div>

    </div>
  );
}
