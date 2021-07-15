import { useEffect } from "react";
import { useHistory } from "react-router-dom";

import { MDBRow, MDBCol, MDBInput } from 'mdb-react-ui-kit';

import { fetchProjectDetailsAPI } from "../project-details-api";
import "./general.scss";

export type GeneralProps = {
  projectId: string;
};

const General: React.FunctionComponent<GeneralProps> = (props) => {
  const history = useHistory();
  useEffect(() => {
    fetchProjectDetails();
  }, []);

  const fetchProjectDetails = async () => {
    const { data } = await fetchProjectDetailsAPI(props.projectId);
    if (data.Status.Status === "OK") {
    } else if (data.Status.Status === "AUTHENTICATE") {
      localStorage.removeItem("token");
      history.push("/login");
      window.location.reload();
    }
  };

  return (
    <div>
      <MDBRow className='mb-3'>
        <MDBCol lg='6'>
          <MDBInput label='Example label' type='text' />
        </MDBCol>
        <MDBCol lg='6'>
          <MDBInput label='Example label' type='text' />
        </MDBCol>
      </MDBRow>
    </div>
  )
}

export default General
