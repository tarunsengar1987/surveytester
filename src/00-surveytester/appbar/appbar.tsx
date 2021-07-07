
import { useState, useEffect } from "react";
import axios from "axios";
//Axios has the ability to intercept HTTP requests. Fetch, by default, doesn't provide a way to intercept requests. Axios has built-in support for download progress. Fetch does not support upload progress

import { NotificationsNone, Language, Settings } from "@material-ui/icons";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { deepOrange, deepPurple } from "@material-ui/core/colors";
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
import TreeView from "@material-ui/lab/TreeView";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import TreeItem from "@material-ui/lab/TreeItem";
import "./appbar.scss";

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
  const classes = useStyles()
  const [open, setOpen] = useState(false);
  const [projects, setProjects] = useState<any>([]);
  const userData = JSON.parse(localStorage.getItem("userData") || "");
  useEffect(() => {
    fetchProjects();
    // eslint-disable-next-line
  }, []);

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

  const fetchProjects = async () => {
    let config = {
      headers: {
        "token": userData.Token,
      }
    }
    const { data } = await axios.get(
      `${process.env.REACT_APP_SERVER}/API/V2/projects.ashx?method=getProjectList`, config
    );
    if (data) {
      setProjects(data.Companies);
    }
  };

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
              <Avatar className={classes.purple}>AD</Avatar>
            </Button>
          </Toolbar>
        </AppBar>
      </div>
    </div>
  );
}

