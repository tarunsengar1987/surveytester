import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { MDBRow, MDBCol, MDBInput, MDBSelect, MDBDatepicker } from 'mdb-react-ui-kit';
import { fetchProjectDetailsAPI } from "../project-details-api";
import { useTranslation } from "react-i18next";
import { ProjectDetailsModel } from "../projectdetails-model";
import "./general.scss";

export type GeneralProps = {
  projectId: string;
};

export type Options = {
  text: string
  value: string
};

const General: React.FunctionComponent<GeneralProps> = (props) => {
  const { t } = useTranslation();
  const history = useHistory();
  const [projectTypes, setProjectTypes] = useState<Options[]>([]);
  const [projectFolder, setProjectFolder] = useState<Options[]>([]);
  const [languages, setLanguages] = useState<Options[]>([]);
  const [classificationFieldSets, setClassificationFieldSets] = useState<Options[]>([]);
  const [projectManagers, setProjectManagers] = useState<Options[]>([]);
  const [projectDetails, setProjectDetails] = useState<ProjectDetailsModel>();

  useEffect(() => {
    fetchProjectDetails();
  }, []);

  const fetchProjectDetails = async () => {
    const { data } = await fetchProjectDetailsAPI(props.projectId);
    if (data.Status.Status === "OK") {
      setProjectDetails(data)
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
          <MDBInput label={t("general.projectName")} type='text' size='lg' value={projectDetails?.ProjectName} />
        </MDBCol>
        <MDBCol lg='6'>
          <MDBSelect
            label={t("general.projectType")}
            size='lg'
            data={projectTypes}
            value={projectDetails?.ProjectType.Name}
          />
        </MDBCol>
      </MDBRow>

      <MDBRow className='mb-3'>
        <MDBCol lg='6'>
          <MDBInput label={t("general.surveyLink")} textarea size='lg' value={projectDetails?.SurveyLink} />
        </MDBCol>
        <MDBCol lg='6'>
          <MDBSelect
            label={t("general.projectFolder")}
            size='lg'
            data={projectFolder}
          />
        </MDBCol>
      </MDBRow>

      <MDBRow className='mb-3'>
        <MDBCol lg='6'>
          <MDBSelect
            label={t("general.defaultLanguage")}
            size='lg'
            data={languages}
            value={projectDetails?.ProjectMainLanguage.NativeName}
          />
        </MDBCol>
        <MDBCol lg='6'>
          <MDBSelect
            label={t("general.classificationFieldSet")}
            size='lg'
            data={classificationFieldSets}
          />
        </MDBCol>
      </MDBRow>

      <MDBRow className='mb-3'>
        <MDBCol lg='6'>
          <MDBSelect
            label={t("general.projectManager")}
            size='lg'
            data={projectManagers}
            value={projectDetails?.ProjectManager.FullName}
          />
        </MDBCol>
        <MDBCol lg='6'>
          <MDBDatepicker inline labelText={t("general.finishDate")} inputStyle={{ width: '22rem' }}
            value={projectDetails?.PlannedFinishDate !== null ? projectDetails?.PlannedFinishDate : ""} />
        </MDBCol>
      </MDBRow>

      <MDBRow className='mb-3'>
        <MDBCol lg='6'>
          <MDBDatepicker inline labelText={t("general.lastChangeDate")} inputStyle={{ width: '22rem' }}
            value={projectDetails?.LastUpdate} />
        </MDBCol>
        <MDBCol lg='6'>
        </MDBCol>
      </MDBRow>
    </div>
  )
}

export default General
