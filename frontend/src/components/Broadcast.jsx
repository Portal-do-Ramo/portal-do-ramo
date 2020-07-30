import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import api from '../../services/api';
import echo from '../../services/echo';

function setNot(user) {
  return { type: 'SET_NOTIFICATIONS', user }
}

export default function BroadCast () {
  const access_token = 'Bearer'.concat(sessionStorage.getItem('access_token'));
  echo.connector.options.auth.headers['Authorization'] = access_token;

  const dispatch = useDispatch();

  const matricula = useSelector(state => state.data[0]);
  const nome = useSelector(state => state.data[1]);
  const email = useSelector(state => state.data[2])
  const ativo = useSelector(state => state.data[3]);
  const hierarquia = useSelector(state => state.data[4]);
  const data_nascimento = useSelector(state => state.data[5]);
  const idade = useSelector(state => state.data[6]);
  const curso = useSelector(state => state.data[7]);
  const celular = useSelector(state => state.data[8]);
  const pagante = useSelector(state => state.data[9]);
  const situacao = useSelector(state => state.data[10]);
  const quantidade_strikes = useSelector(state => state.data[11]);
  const quantidade_faltas_rg = useSelector(state => state.data[12]);
  const quantidade_faltas_equipe = useSelector(state => state.data[13]);
  const quantidade_faltas_exposup = useSelector(state => state.data[14]);
  const foto_url = useSelector(state => state.data[15]);
  const gerenciar_membros = useSelector(state => state.data[16]);
  const criar_membros = useSelector(state => state.data[17]);
  const gerenciar_strikes = useSelector(state => state.data[18]);
  const gerenciar_faltas = useSelector(state => state.data[19]);
  const assessor_flag = useSelector(state => state.data[20]);
  const marketing_flag = useSelector(state => state.data[21]);
  const [notifications, setNotifications] = useState(useSelector(state => state.data[22]));
  const equipes = useSelector(state => state.data[23]);
  const projetos = useSelector(state => state.data[24]);

  echo.private(`usuario.${matricula}`)
  .listen('.nova.notificacao', (e) => {
    let aux = notifications;
    aux.push(e)

    const user = {
      matricula: matricula,
      nome: nome,
      email: email,
      ativo: ativo,
      hierarquia: hierarquia,
      data_nascimento: data_nascimento,
      idade: idade,
      curso: curso,
      telefone_principal: celular,
      pagante: pagante,
      situacao: situacao,
      quantidade_strikes: quantidade_strikes,
      quantidade_faltas_rg: quantidade_faltas_rg,
      quantidade_faltas_equipe: quantidade_faltas_equipe,
      quantidade_faltas_exposup: quantidade_faltas_exposup,
      foto_url: foto_url,
      gerenciar_membros: gerenciar_membros,
      criar_membros: criar_membros,
      gerenciar_strikes: gerenciar_strikes,
      gerenciar_faltas: gerenciar_faltas,
      assessor_flag: assessor_flag,
      marketing_flag: marketing_flag,
      notificacoes: aux,
      equipes: equipes,
      projetos: projetos,
    }

    dispatch(setNot(user))
    setNotifications(notifications => [...notifications, e]);
  })

  return (
    <h1>Broadcast ON</h1>
  )
}
