import React from 'react';
import { useSelector } from 'react-redux';

import { Box } from './styles';

export default function InformationBoxAbsences() {
  const qtd_faltas_rg = useSelector(state => state.data[12])
  const qtd_faltas_equipes = useSelector(state => state.data[13])
  const qtd_faltas_exposup = useSelector(state => state.data[14])
  const qtd_faltas_planejamento= useSelector(state => state.data[14])

  return (
    <React.Fragment>
      <Box>
        Faltas em Reuniões Gerais
        <h3>{qtd_faltas_rg}</h3>
      </Box>
      <Box>
        Faltas em Exposup
        <h3>{qtd_faltas_exposup}</h3>
      </Box>
      <Box>
        Faltas em Reuniões de Projetos
        <h3>{qtd_faltas_equipes}</h3>
      </Box>
      <Box>
        Faltas em Reuniões de Planejamento
        <h3>{qtd_faltas_planejamento}</h3>
      </Box>
    </React.Fragment>
  );
}
