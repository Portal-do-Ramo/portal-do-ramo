import React from 'react';
import { useSelector } from 'react-redux';

import CardTeam from '../TeamBox_CardTeam.jsx';
import { Box, Titulo } from './styles';

export default function TeamsBox() {
  const teams = useSelector(state => state.data[23]);

  return (
    <section>
      <Box>
        <div className="row">
          <Titulo>
            Suas Equipes
          </Titulo>
        </div>

        {(teams) ?
          teams.map(team => (
            <CardTeam name={team.nome_equipe} img={team.foto_url} chapter={team.capitulo} url={team.nome_equipe_slug} yourFunction={team.funcao} key={team.nome_equipe_slug}/>
          ))
        : ''}
      </Box>
    </section>
  )
}

