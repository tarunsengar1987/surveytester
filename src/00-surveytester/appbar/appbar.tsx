
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
import { withStyles } from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import { CompanyModel, FolderModel, ProjectModel } from "../../04-projectlist/projectlist-model";
import { useTranslation } from "react-i18next";
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

const Accordion = withStyles({
  root: {
    border: '1px solid rgba(0, 0, 0, .125)',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    }
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    backgroundColor: 'rgba(0, 0, 0, .03)',
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    '&$expanded': {
      margin: '0px',
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiAccordionDetails);

export default function Topbar() {
  const classes = useStyles()
  const [open, setOpen] = useState(false);
  const [companies, setCompanies] = useState<CompanyModel[]>([]);
  const userData = JSON.parse(localStorage.getItem("userData") || "");
  const { t } = useTranslation();

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

  const [expanded, setExpanded] = useState('favoriteProjects');

  const handleChange = (panel: string) => (event: React.ChangeEvent<{}>, newExpanded: boolean) => {
    setExpanded(newExpanded ? panel : '');
  };

  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <CssBaseline />
        <Drawer open={open} onClose={() => setOpen(false)}>
          <Accordion square expanded={expanded === 'favoriteProjects'} onChange={handleChange('favoriteProjects')}>
            <AccordionSummary id="favoriteProjects-header">
              <Typography>{t("appBar.favoriteProjects")}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {companies && (
                <div>
                  {companies.map((company: CompanyModel) => (
                    <span key={company.IdCompany}>
                      {company.FavoriteProjects.map((project: ProjectModel) =>
                        renderProjectName(project.ProjectName, project.IdProject)
                      )}
                    </span>
                  ))}
                </div>
              )}
            </AccordionDetails>
          </Accordion>
          <Accordion square expanded={expanded === 'recentProjects'} onChange={handleChange('recentProjects')}>
            <AccordionSummary id="recentProjects-header">
              <Typography>{t("appBar.recentProjects")}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {companies && (
                <div>
                  {companies.map((company: CompanyModel) => (
                    <span key={company.IdCompany}>
                      {company.RecentProjects.map((project: ProjectModel) =>
                        renderProjectName(project.ProjectName, project.IdProject)
                      )}
                    </span>
                  ))}
                </div>
              )}
            </AccordionDetails>
          </Accordion>
          <Accordion square expanded={expanded === 'allProjects'} onChange={handleChange('allProjects')}>
            <AccordionSummary id="allProjects-header">
              <Typography>{t("appBar.allProjects")}</Typography>
            </AccordionSummary>
            <AccordionDetails>
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
                      {company.AllProjects.map((allProject: FolderModel) =>
                        renderFolder(allProject)
                      )}
                    </TreeItem>
                  ))}
                </TreeView>
              )}
            </AccordionDetails>
          </Accordion>
          <Accordion square expanded={expanded === 'closedProjects'} onChange={handleChange('closedProjects')}>
            <AccordionSummary id="closedProjects-header">
              <Typography>{t("appBar.closedProjects")}</Typography>
            </AccordionSummary>
            <AccordionDetails>
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
                      {company.ClosedProjects.map((allProject: FolderModel) =>
                        renderFolder(allProject)
                      )}
                    </TreeItem>
                  ))}
                </TreeView>
              )}
            </AccordionDetails>
          </Accordion>
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
              {t("surveyTester")}
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

