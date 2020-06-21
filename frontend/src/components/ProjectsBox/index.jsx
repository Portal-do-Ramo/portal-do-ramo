import React from 'react';
import { useSelector } from 'react-redux';

import { Box, Titulo } from './styles';
import CardTeam from '../ProjectBox_CardProject.jsx';

export default function ProjectsBox () {
  const projects = useSelector(state => state.data[24]);

  return (
    <section>
      <Box>
        <div className="row">
          <Titulo>
            Seus Projetos
          </Titulo>
        </div>

        {(projects) ?
          projects.map(project => (
            <CardTeam
              project={project.nome_projeto}
              team={project.nome_equipe}
              slug={project.nome_projeto_slug}
              img={project.foto_url}
              key={project.nome_projeto_slug}
            />
          ))
        : ''}
      </Box>
    </section>
  )
}
