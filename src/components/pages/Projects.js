import { useState, useEffect } from "react";
import Container from "../layout/Container.js";
import styles from "./Projects.module.css";
import Message from "../layout/Message.js";
import LinkButton from "../layout/LinkButton.js";
import ProjectCard from "../project/ProjectCard.js";
import Loading from "../layout/Loading.js";

function Projects() {
  const [removeLoading, setRemoveLoading] = useState(false);
  const [projects, setProjects] = useState([]);
  const [projectMessage, setProjectMessage] = useState('')

  // let message = "projeto criado com sucesso!";

  useEffect(() => {
    fetch("http://localhost:5000/projects", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setProjects(data);
        setRemoveLoading(true);
      })
      .catch((err) => console.log(err));
  }, []);

  function removeProject(id){
    fetch(`http://localhost:5000/projects/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
    }).then(resp => resp.json)
    .then(() => {
      setProjects(projects.filter((project) => project.id !== id))
      setProjectMessage('Projeto removido com sucesso!')
    })
    .catch(err => console.log(err))
  }

  return (
    <div className={styles.project_container}>
      <div className={styles.title_container}>
        <h1>Meus Projetos</h1>
        <LinkButton to="/newproject" text="Criar Projeto" />
      </div>
      {/* {message && <Message type="sucess" msg={message} />} */}
      {projectMessage && <Message type="sucess" msg={projectMessage} />}
      <Container customClass="start">
        {projects.length > 0 &&
          projects.map((project) => (
            <ProjectCard
              name={project.name}
              id={project.id}
              budget={project.budget}
              category={project.category.name}
              key={project.id}
              handleRemove={removeProject}
            />
          ))}
        {!removeLoading && <Loading />}
        {removeLoading && projects.length === 0 && (
          <p>Não há projetos cadastrados</p>
        )}
      </Container>
    </div>
  );
}

export default Projects;
