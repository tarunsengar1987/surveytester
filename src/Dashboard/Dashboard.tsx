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
    root:{
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
  const [state, setState] = useState<State>({
    
  })
  const [projects, setProjects] = useState<any>(null)
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  console.log(projects)
const fetchProjects = async () => {
  const {data} = await axios.get(`${process.env.REACT_APP_SERVER}/API/V2/projects.ashx?method=projectlist&token=${userData.Token}`)
  if(data){
    setProjects(data)
  }
}

useEffect(() => {
fetchProjects()
}, [])



  const handleClick  = (companyName : string) => {
    setState((prev) => {
      return {
        ...prev,
        [companyName] : !prev[companyName]
      }
    } )
    
  }


  return (
    <div>
      <CssBaseline />
      <Drawer open={open} onClose={() => setOpen(false)}>
        <TreeView
          className={classes.drawer}
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpanded={['root']}
          defaultExpandIcon={<ChevronRightIcon />}
        >
        <List className={classes.root}>
          {userData.Companies.map((item : any) => (
            <div key={item.IdCompany}>
              <ListItem
                button
                onClick={() => handleClick(item.CompanyName)}
                key={uuidv4()}
              >
                <ListItemText primary={item.CompanyName} />
                {state[item.CompanyName] ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse
                key={uuidv4()}
                component="li"
                in={state[item.CompanyName]}
                timeout="auto"
                unmountOnExit
              >
                <List disablePadding className={classes.nested}>
                  {item.Permissions.map((permission : string) => {
                    return (
                      <ListItem button key={uuidv4()}>
                        <ListItemText primary={permission} />
                      </ListItem>
                    )
                  })}
                </List>
              </Collapse>
            </div>
          ))}
        </List>
        </TreeView>
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