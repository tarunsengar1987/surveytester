import React, { FunctionComponent } from "react";
import { useParams } from "react-router-dom";
import { RouteComponentProps } from "react-router";
import { makeStyles, Theme } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import General from './details/general/general';
import Languages from "./details/languages/languages";
import Documents from "./details/documents/documents";
import Roles from "./details/roles/roles";
import TestCases from "./details/testcases/testcases";
import TestLinks from "./details/testlinks/testlinks";
import TestrunCustomization from "./details/testruncustomization/testruncustomization";
import Users from "./details/users/users";
import ScreenShotDevices from "./details/screenshotdevices/screenshotdevices";
import LifeCycle from "./details/lifecycle/lifecycle";
import "./project-details.scss";
import { MDBRow, MDBCol } from 'mdb-react-ui-kit';

type Params = {
  projectId: string;
};

type TabPanelProps = {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `vertical-tab-${index}`
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    // display: 'flex',
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

const ProjetDetails: FunctionComponent<RouteComponentProps> = (props) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const { projectId } = useParams<Params>();

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className='mt-3 project-details'>
      <MDBRow className='mb-3'>
        <MDBCol>
          <p className="fs-3">Project details</p>
        </MDBCol>
      </MDBRow>

      <MDBRow>
        <MDBCol sm="2">
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            className={classes.tabs}
          >
            <Tab label="General" {...a11yProps(0)} />
            <Tab label="Languages" {...a11yProps(1)} />
            <Tab label="Test links" {...a11yProps(2)} />
            <Tab label="Screenshot devices" {...a11yProps(3)} />
            <Tab label="Docs & Info" {...a11yProps(4)} />
            <Tab label="Assigned users" {...a11yProps(5)} />
            <Tab label="Assigned roles" {...a11yProps(6)} />
            <Tab label="Testrun Customizations" {...a11yProps(7)} />
            <Tab label="Test Cases" {...a11yProps(8)} />
            <Tab label="Lifecycle" {...a11yProps(9)} />
          </Tabs>
        </MDBCol>
        <MDBCol sm="10">
          <TabPanel value={value} index={0}>
            <General projectId={projectId} />
          </TabPanel>

          <TabPanel value={value} index={1}>
            <Languages />
          </TabPanel>

          <TabPanel value={value} index={2}>
            <TestLinks />
          </TabPanel>

          <TabPanel value={value} index={3}>
            <ScreenShotDevices />
          </TabPanel>

          <TabPanel value={value} index={4}>
            <Documents />
          </TabPanel>

          <TabPanel value={value} index={5}>
            <Users />
          </TabPanel>

          <TabPanel value={value} index={6}>
            <Roles />
          </TabPanel>

          <TabPanel value={value} index={7}>
            <TestrunCustomization />
          </TabPanel>

          <TabPanel value={value} index={8}>
            <TestCases />
          </TabPanel>

          <TabPanel value={value} index={9}>
            <LifeCycle />
          </TabPanel>
        </MDBCol>
      </MDBRow>
    </div>
  );
}


export default ProjetDetails