import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
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
  Avatar,
  Menu,
  MenuItem
} from "@material-ui/core";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import MenuIcon from "@material-ui/icons/Menu";
import { TreeView, TreeItem } from "@material-ui/lab";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { withStyles } from "@material-ui/core/styles";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import {
  CompanyModel,
  FolderModel,
  ProjectModel,
} from "../../04-projectlist/projectlist-model";
import axios from "axios";
import { useTranslation } from "react-i18next";
import "./appbar.scss";
import { fetchProjectsAPI } from "../../04-projectlist/projectlist-api";
import { getHeader } from "../apiHelper";

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
    border: "1px solid rgba(0, 0, 0, .125)",
    boxShadow: "none",
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&:before": {
      display: "none",
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    backgroundColor: "rgba(0, 0, 0, .03)",
    borderBottom: "1px solid rgba(0, 0, 0, .125)",
    marginBottom: -1,
    minHeight: 56,
    "&$expanded": {
      minHeight: 56,
    },
  },
  content: {
    "&$expanded": {
      margin: "0px",
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
  const baseURL = process.env.REACT_APP_SERVER;
  const history = useHistory();
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [companies, setCompanies] = useState<CompanyModel[]>([]);
  const [expandedAllProjectTree, setExpandedAllProjectTree] = useState<
    string[]
  >(["root"]);
  const [expandedCloseProjectTree, setExpandedCloseProjectTree] = useState<
    string[]
  >(["root"]);
  const [expandedAccordion, setExpandedAccordion] =
    useState("favoriteProjects");
  const { t } = useTranslation();
  const [projectItd, setProjectItd] = useState<string>('');
  const [menu, setMenu] = useState<null | HTMLElement>(null);
  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const { data } = await fetchProjectsAPI();
    if (data.Status?.Status === "OK") {
      setCompanies(data.Companies);
    } else if (data.Status?.Status === "AUTHENTICATE") {
      localStorage.removeItem("token");
      history.push("/login");
      window.location.reload();
    }
  };

  const renderProjectName = (projectName: string, projectId: string) => {
    return <TreeItem label={projectName} nodeId={projectId} key={projectId} onClick={() => handleProject(projectId)} />;
  };

  const renderFolder = (folder: FolderModel, prefix: string) => {
    return (
      <TreeItem
        label={folder.FolderName}
        nodeId={prefix + folder.IdFolder}
        key={prefix + folder.IdFolder}
      >
        {folder.Projects.map((project: ProjectModel) =>
          renderProjectName(project.ProjectName, prefix + project.IdProject)
        )}
        {folder.SubFolders.map((folder: FolderModel) =>
          renderFolder(folder, prefix)
        )}
      </TreeItem>
    );
  };

  const handleLogout = async () => {
    await axios.get(
      `${baseURL}/API/V2/authentication.ashx?method=logout`,
      getHeader()
    );
    localStorage.removeItem("token");
    history.push("/login");
    window.location.reload();
  };

  const handleAccordionChange =
    (panel: string) => (event: React.ChangeEvent<{}>, newExpanded: boolean) => {
      setExpandedAccordion(newExpanded ? panel : "");
    };

  const handleAllProjectsTreeChange = (
    event: React.ChangeEvent<{}>,
    nodeIds: string[]
  ) => {
    setExpandedAllProjectTree(nodeIds);
  };

  const handleClosedProjectsTreeChange = (
    event: React.ChangeEvent<{}>,
    nodeIds: string[]
  ) => {
    setExpandedCloseProjectTree(nodeIds);
  };

  const handleProject = (projectId: string) => {
    setProjectItd(projectId)
    setOpen(false)
    history.push(`/project-details/${projectId}`);
  };

  const handleProjectDetails = () => {
    history.push(`/project-details/${projectItd}`);
  };

  const handleIssues = () => {
    history.push(`/project-issues/${projectItd}`);
  };

  const handlePages = () => {
    history.push(`/project-pages/${projectItd}`);
  };

  const handleTestRuns = () => {
    history.push(`/project-testruns/${projectItd}`);
  };

  const handleTestSurvey = () => {
  };

  const handleProfileMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMenu(event.currentTarget);
  };

  const handleHeaderLogo = () => {
    history.push(`/dashboard`);
  }

  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <CssBaseline />
        <Drawer open={open} onClose={() => setOpen(false)}>
          {/* ========================================================================*/}
          <Accordion
            square
            expanded={expandedAccordion === "favoriteProjects"}
            onChange={handleAccordionChange("favoriteProjects")}
          >
            <AccordionSummary id="favoriteProjects-header">
              <Typography>{t("appBar.favoriteProjects")}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {companies && (
                <TreeView
                  className={classes.drawer}
                  defaultCollapseIcon={<ExpandMoreIcon />}
                  defaultExpandIcon={<ChevronRightIcon />}
                  defaultExpanded={["root"]}
                >
                  {companies.map((company: CompanyModel) => (
                    <span key={company.IdCompany}>
                      {company.FavoriteProjects.map((project: ProjectModel) =>
                        renderProjectName(
                          project.ProjectName,
                          project.IdProject
                        )
                      )}
                    </span>
                  ))}
                </TreeView>
              )}
            </AccordionDetails>
          </Accordion>
          {/* ========================================================================*/}
          <Accordion
            square
            expanded={expandedAccordion === "recentProjects"}
            onChange={handleAccordionChange("recentProjects")}
          >
            <AccordionSummary id="recentProjects-header">
              <Typography>{t("appBar.recentProjects")}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {companies && (
                <TreeView
                  className={classes.drawer}
                  defaultCollapseIcon={<ExpandMoreIcon />}
                  defaultExpandIcon={<ChevronRightIcon />}
                  defaultExpanded={["root"]}
                >
                  {companies.map((company: CompanyModel) => (
                    <span key={company.IdCompany}>
                      {company.RecentProjects.map((project: ProjectModel) =>
                        renderProjectName(
                          project.ProjectName,
                          project.IdProject
                        )
                      )}
                    </span>
                  ))}
                </TreeView>
              )}
            </AccordionDetails>
          </Accordion>
          {/* ========================================================================*/}
          <Accordion
            square
            expanded={expandedAccordion === "allProjects"}
            onChange={handleAccordionChange("allProjects")}
          >
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
                  expanded={expandedAllProjectTree}
                  onNodeToggle={handleAllProjectsTreeChange}
                >
                  {companies.length > 1
                    ? companies.map((company: CompanyModel) => (
                      <TreeItem
                        label={company.CompanyName}
                        nodeId={company.IdCompany}
                        key={company.IdCompany}
                      >
                        {company.AllProjects.map((allProject: FolderModel) =>
                          renderFolder(allProject, "allProjects_")
                        )}
                      </TreeItem>
                    ))
                    : companies.map((company: CompanyModel) =>
                      company.AllProjects.map((allProject: FolderModel) =>
                        renderFolder(allProject, "allProjects_")
                      )
                    )}
                </TreeView>
              )}
            </AccordionDetails>
          </Accordion>
          {/* ========================================================================*/}
          <Accordion
            square
            expanded={expandedAccordion === "closedProjects"}
            onChange={handleAccordionChange("closedProjects")}
          >
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
                  expanded={expandedCloseProjectTree}
                  onNodeToggle={handleClosedProjectsTreeChange}
                >
                  {
                    companies.length > 1 ?
                      companies.map(
                        (company: CompanyModel) =>
                          company?.ClosedProjects?.length > 0 && (
                            <TreeItem
                              label={company.CompanyName}
                              nodeId={company.IdCompany}
                              key={company.IdCompany}
                            >
                              {company.ClosedProjects.map(
                                (closedProject: FolderModel) =>
                                  renderFolder(closedProject, "closedProjects_")
                              )}
                            </TreeItem>
                          )
                      )

                      :
                      companies.map(
                        (company: CompanyModel) =>
                          company?.ClosedProjects?.length > 0 && (
                            company.ClosedProjects.map(
                              (closedProject: FolderModel) =>
                                renderFolder(closedProject, "closedProjects_")
                            )
                          )
                      )

                  }

                </TreeView>
              )}
            </AccordionDetails>
          </Accordion>
          {/* ========================================================================*/}
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

            <img className="header-logo" alt="logo" src="https://cdn.surveytester.com/Images/Logo/SurveyTester_Logo.svg?Version=5423"
              onClick={handleHeaderLogo} />

            {projectItd && (
              <div className="top-bar-menu mr-auto">
                <Typography variant="h6">
                  <Button color="inherit" onClick={handleProjectDetails}>
                    Project Details
                  </Button>
                </Typography>

                <Typography variant="h6">
                  <Button color="inherit" onClick={handleIssues}>
                    Issues(0)
                  </Button>
                </Typography>

                <Typography variant="h6">
                  <Button color="inherit" onClick={handlePages}>
                    Pages {'&'} Rotuing
                  </Button>
                </Typography>

                <Typography variant="h6" className="test-runs-btn">
                  <Button color="inherit" onClick={handleTestRuns}>
                    Test runs
                  </Button>
                </Typography>

                <Button variant="contained" color="primary" onClick={handleTestSurvey}>
                  Test Survey
                </Button>
              </div>
            )}

            <div className="right-side-menu">
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
              <Button className={classes.root} onClick={handleProfileMenu}>
                <Avatar className={classes.purple}>AD</Avatar>
              </Button>
              <Menu
                id="simple-menu"
                anchorEl={menu}
                keepMounted
                open={Boolean(menu)}
                onClose={() => setMenu(null)}
              >
                <MenuItem>
                  <div className="profile-icon">
                    <AccountBoxIcon />
                  </div>
                  <div className="username">
                    <Typography variant="h5">Survey Tester</Typography>
                    <Typography variant="h6">demo@gmail.com</Typography>
                  </div>
                </MenuItem>
                <MenuItem>My account</MenuItem>
                <MenuItem onClick={handleLogout}>
                  <ExitToAppIcon /> Sign out
                </MenuItem>
              </Menu>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    </div >
  );
}
