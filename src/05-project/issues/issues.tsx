import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import "./issues.scss";

const ProjectIssues = () => {
  return (
    <Container maxWidth="xl" className="project-details">
      <Typography variant="h4">
        Project Issues
      </Typography>
      <div>
        Welcome to Project Issues
      </div>
    </Container>
  );
};

export default ProjectIssues;
