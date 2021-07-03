import React, { useState } from "react";
import {
  Button,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  CssBaseline,
  Collapse,
} from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { v4 as uuidv4 } from 'uuid';
import MenuIcon from "@material-ui/icons/Menu";
import { NotificationsNone, Language, Settings } from "@material-ui/icons";
import Avatar from "@material-ui/core/Avatar";
import { deepOrange, deepPurple } from "@material-ui/core/colors";
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import { useEffect } from "react";
import axios from "axios";
import { render } from "node-sass";
// interface RenderTree {
//   IdCompany: string;
//   CompanyName: string;
//   Permissions?: RenderTree[];
// }
// interface RenderTrees {
//   IdCompany: string;
//   CompanyName: string;
//     children?: RenderTrees[];
//   }
// interface Header {

//   name: string;
//   headname: string;

// }
// const data: RenderTree = {
//   id: 'root',
//   name: 'All Recent Projects',
//   children: [
//     {
//       id: '1',
//       name: 'Current',
//     },
//     {
//       id: '3',
//       name: 'Project One',
//       Permissions?: [
//         {
//           id: '4',
//           name: 'Proj Folder',
//         },
//       ],
//     },
//   ],
// };
// const datas: RenderTrees = {
//     id: 'root',
//     name: 'All Projects',
//     children: [
//       {
//         id: '1',
//         name: 'Defaults',
//       },
//       {
//         id: '3',
//         name: 'Museums of New York',
//         children: [
//           {
//             id: '4',
//             name: 'Empty Folder',
//           },
//         ],
//       },
//     ],
//   };
// const header: Header = {
//   name: 'This is Dashboard of Survey',
//   headname: 'Survey Tester',
// };
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
    // root: {
    //   display: "flex",
    //   "& > *": {
    //     margin: theme.spacing(1),
    //   },

    // },
    orange: {
      color: theme.palette.getContrastText(deepOrange[500]),
      backgroundColor: deepOrange[500],
    },
    purple: {
      color: theme.palette.getContrastText(deepPurple[500]),
      backgroundColor: deepPurple[500],
    },
    root: {
      width: "100%",
      maxWidth: 360,
      background: theme.palette.background.paper,
    },
    nested: {
      paddingLeft: "0.50rem",
    },
  })
);

type State = {
  [key: string]: boolean
}


const Dashboard = () => {
  const userData = JSON.parse(localStorage.getItem("userData") || "")
  const [projects, setProjects] = useState<any>([])
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const fetchProjects = async () => {
    const { data } = await axios.get(`${process.env.REACT_APP_SERVER}/API/V2/projects.ashx?method=projectlist&token=${userData.Token}`)
    if (data) {
      setProjects(data.Companies)
    }
  }

  useEffect(() => {
    fetchProjects()
  }, [])

  const renderProjectName = (projectName: string, projectId: string) => {
    return <TreeItem label={projectName} nodeId={projectId} />
  }

  const renderFolder = (folder: any) => {
    return (
      <TreeItem label={folder.FolderName} nodeId={folder.IdFolder}>
        {
          folder.Projects.map((pr: any) => renderProjectName(pr.ProjectName, pr.IdProject))
        }
        {
          folder.SubFolders.map((sf: any) => renderFolder(sf))
        }
      </TreeItem>
    )
  }

  return (
    <div>
      <CssBaseline />
      <Drawer open={open} onClose={() => setOpen(false)}>
        {
          projects && (
            <TreeView
              className={classes.drawer}
              defaultCollapseIcon={<ExpandMoreIcon />}
              defaultExpanded={['root']}
              defaultExpandIcon={<ChevronRightIcon />}
            >
              {
                projects.map((company: any) => (
                  <TreeItem label={company.CompanyName} nodeId={company.IdCompany}>


                    <TreeItem nodeId={uuidv4()} label="All Projects" >
                      {
                        company.AllProjects.map((allProject: any) => (

                          renderFolder(allProject)

                        ))
                      }
                    </TreeItem>
                    <TreeItem nodeId={uuidv4()} label="Recent Projects">
                      {
                        company.RecentProjects.map((rp: any) => renderProjectName(rp.ProjectName, rp.IdProject))
                      }
                    </TreeItem>
                    <TreeItem nodeId={uuidv4()} label="Favorite Projects" >
                      {
                        company.FavoriteProjects.map((fp: any) => renderProjectName(fp.ProjectName, fp.IdProject))
                      }
                    </TreeItem>
                    <TreeItem nodeId={uuidv4()} label="Closed Projects" />
                  </TreeItem>
                ))

              }
            </TreeView>
          )
        }
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
          <Typography variant="h5" className={classes.title}>
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
          <div className={classes.root}>
            {/* <Avatar>H</Avatar>
            <Avatar className={classes.orange}>N</Avatar> */}

            <Avatar className="header_side">ST</Avatar>
          </div>
        </Toolbar>
      </AppBar>
      <main className={classes.content}>
        <Typography variant="h4">This is Dashboard</Typography>
      </main>
    </div>
  );
};
export default Dashboard;