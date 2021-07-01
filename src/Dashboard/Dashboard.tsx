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
} from "@material-ui/core";
import { makeStyles, createStyles} from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import { NotificationsNone, Language, Settings } from "@material-ui/icons";
import Avatar from "@material-ui/core/Avatar";
import { deepOrange, deepPurple } from "@material-ui/core/colors";
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
interface RenderTree {
  id: string;
  name: string;
  children?: RenderTree[];
}
interface RenderTrees {
    id: string;
    name: string;
    children?: RenderTrees[];
  }
const data: RenderTree = {
  id: 'root',
  name: 'All Recent Projects',
  children: [
    {
      id: '1',
      name: 'Current',
    },
    {
      id: '3',
      name: 'Project One',
      children: [
        {
          id: '4',
          name: 'Proj Folder',
        },
      ],
    },
  ],
};
const datas: RenderTrees = {
    id: 'root',
    name: 'All Projects',
    children: [
      {
        id: '1',
        name: 'Defaults',
      },
      {
        id: '3',
        name: 'Museums of New York',
        children: [
          {
            id: '4',
            name: 'Empty Folder',
          },
        ],
      },
    ],
  };
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
    root: {
      display: "flex",
      "& > *": {
        margin: theme.spacing(1),
      },
    },
    orange: {
      color: theme.palette.getContrastText(deepOrange[500]),
      backgroundColor: deepOrange[500],
    },
    purple: {
      color: theme.palette.getContrastText(deepPurple[500]),
      backgroundColor: deepPurple[500],
    },
  })
);
const Dashboard = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const renderTree = (nodes: RenderTree) => (
    <TreeItem key={nodes.id} nodeId={nodes.id} label={nodes.name}>
      {Array.isArray(nodes.children) ? nodes.children.map((node) => renderTree(node)) : null}
    </TreeItem>
  );
  const renderTrees = (nodes: RenderTrees) => (
    <TreeItem key={nodes.id} nodeId={nodes.id} label={nodes.name}>
      {Array.isArray(nodes.children) ? nodes.children.map((node) => renderTree(node)) : null}
    </TreeItem>
  );
  
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
        
      {renderTree(data)}
      {renderTrees(datas)}
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
            <Avatar className={classes.purple}>ST</Avatar>
          </div>
        </Toolbar>
      </AppBar>
      <main className={classes.content}>
        <Typography variant="h2">Home Component</Typography>
      </main>
    </div>
  );
};
export default Dashboard;