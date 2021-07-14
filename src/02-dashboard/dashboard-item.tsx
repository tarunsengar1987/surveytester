import React from 'react'
import "./dashboard.scss";


export type DashboardItemProps = {
    idProject: string; // project id
    projectName: string;
  };
  
  export const DashboardItem: React.FunctionComponent<DashboardItemProps> = (
    props
  ) => {

  return (
    <div>
        
      {props.projectName}
    </div>
  )
}


