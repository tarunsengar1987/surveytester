
import { useState, useEffect } from "react";
import axios from "axios";
import { NotificationsNone, Language, Settings } from "@material-ui/icons";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { deepOrange, deepPurple } from "@material-ui/core/colors";
import { Button, AppBar, Toolbar, Typography, IconButton, Drawer, CssBaseline, Avatar } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { TreeView, TreeItem } from "@material-ui/lab";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { CompanyModel } from "../../model/company.model";
import { FolderModel } from "../../model/folder.model";
import { ProjectModel } from "../../model/project.model";
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
  const [companies, setCompanies] = useState<CompanyModel[]>([]);
  const userData = JSON.parse(localStorage.getItem("userData") || "");
  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    let config = {
      headers: {
        "token": userData.Token,
      }
    }
    const { data } = await axios.get(
      `${process.env.REACT_APP_SERVER}/API/V2/projects.ashx?method=getProjectList`, config
    );
    if (data.Status.Status === 'OK') {
      setCompanies(data.Companies);
    }
  };

  const renderProjectName = (projectName: string, projectId: string) => {
    return <TreeItem label={projectName} nodeId={projectId} key={projectId} />
  }

  const renderFolder = (folder: FolderModel) => {
    return (
      <TreeItem label={folder.FolderName} nodeId={folder.IdFolder} key={folder.IdFolder}>
        {
          folder.Projects.map((project: ProjectModel) =>
            renderProjectName(project.ProjectName, project.IdProject))
        }
        {
          folder.SubFolders.map((folder: FolderModel) => renderFolder(folder))
        }
      </TreeItem>
    );
  };

  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <CssBaseline />
        <Drawer open={open} onClose={() => setOpen(false)}>
          {companies && (
            <TreeView
              className={classes.drawer}
              defaultCollapseIcon={<ExpandMoreIcon />}
              defaultExpanded={["root"]}
              defaultExpandIcon={<ChevronRightIcon />}
            >
              {companies.map((company: CompanyModel) => (
                <TreeItem
                  label={company.CompanyName}
                  nodeId={company.IdCompany}
                  key={company.IdCompany}
                >
                  <TreeItem nodeId="all projects" label="All Projects">
                    {company.AllProjects.map((allProject: FolderModel) =>
                      renderFolder(allProject)
                    )}
                  </TreeItem>
                  <TreeItem nodeId="recent" label="Recent Projects">
                    {company.RecentProjects.map((project: ProjectModel) =>
                      renderProjectName(project.ProjectName, project.IdProject)
                    )}
                  </TreeItem>
                  <TreeItem nodeId="favorite" label="Favorite Projects">
                    {company.FavoriteProjects.map((project: ProjectModel) =>
                      renderProjectName(project.ProjectName, project.IdProject)
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

