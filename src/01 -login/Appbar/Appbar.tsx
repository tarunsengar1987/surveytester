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
import { v4 as uuidv4 } from "uuid";
import { useEffect } from "react";
import axios from "axios";

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
  }, []);

  const renderProjectName = (projectName: string, projectId: string) => {
    return <TreeItem label={projectName} nodeId={projectId} />;
  };

  const renderFolder = (folder: any) => {
    return (
      <TreeItem label={folder.FolderName} nodeId={folder.IdFolder}>
        {folder.Projects.map((pr: any) =>
          renderProjectName(pr.ProjectName, pr.IdProject)
        )}
        {folder.SubFolders.map((sf: any) => renderFolder(sf))}
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
                  <TreeItem nodeId={uuidv4()} label="All Projects">
                    {company.AllProjects.map((allProject: any) =>
                      renderFolder(allProject)
                    )}
                  </TreeItem>
                  <TreeItem nodeId={uuidv4()} label="Recent Projects">
                    {company.RecentProjects.map((rp: any) =>
                      renderProjectName(rp.ProjectName, rp.IdProject)
                    )}
                  </TreeItem>
                  <TreeItem nodeId={uuidv4()} label="Favorite Projects">
                    {company.FavoriteProjects.map((fp: any) =>
                      renderProjectName(fp.ProjectName, fp.IdProject)
                    )}
                  </TreeItem>
                  <TreeItem nodeId={uuidv4()} label="Closed Projects" />
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
              <Avatar className={classes.purple}>RV</Avatar>
            </Button>
          </Toolbar>
        </AppBar>
      </div>
    </div>
  );
}
