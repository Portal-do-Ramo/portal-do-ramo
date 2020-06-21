import React from 'react'
import { useSelector } from 'react-redux'

import { Box } from './styles'

export default function InformationBoxPersonal(){
  const nome = useSelector(state => state.data[1])
  const matricula = useSelector(state => state.data[0])
  const curso = useSelector(state => state.data[7])
  const data_nascimento = useSelector(state => state.data[5])
  const idade = useSelector(state => state.data[6])
  const celular = useSelector(state => state.data[8])
  const email = useSelector(state => state.data[2])

  return (
    <Box>
      <div className="row">
        <ul>
          <li><strong>Nome:</strong> {nome}</li>
          <li><strong>Matrícula:</strong> {matricula}</li>
          <li><strong>Curso:</strong> {curso}</li>
          <li><strong>Data de Nascimento:</strong> {data_nascimento}</li>
          <li><strong>Idade:</strong> {idade} anos</li>
          <li><strong>Celular:</strong> {celular}</li>
          <li><strong>E-mail:</strong> {email}</li>
        </ul>
      </div>
    </Box>
  );
}
