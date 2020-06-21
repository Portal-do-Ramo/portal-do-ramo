import { createStore } from 'redux';

const INITIAL_STATE = {
  data: [
    '', // Matricula 0
    '', // Nome 1
    '', // E-mail 2
    false, // Ativo 3
    '', // Hierarquia 4
    '', // Data de nascimento 5
    '', // Idade 6
    '', // Curso 7
    '', // Telefone principal 8
    false, // Pagante 9
    '', // Situação 10
    0, // Strikes 11
    0, // Faltas RG 12
    0, // Faltas Equipe 13
    0, // Faltas Exposup 14
    '', // Foto URL 15
    false, // Gerenciar membros 16
    false, // Criar membros 17
    false, // Gerenciar Strikes 18
    false, //Gerenciar Faltas 19
    false, //Assessor flag 20
    false, //Marketing flag 21
    [], // Notificacoes 22
    [], // Equipes 23
    [], // Projetos 24
  ]
};

function saveToLocalStorage(state){
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem('state', serializedState)
  } catch(e) {
    console.log(e)
  }
}

function loadFromLocalStorage() {
  try {
    const serializedState = localStorage.getItem('state')
    if(serializedState === null) { return undefined }
    return JSON.parse(serializedState)
  } catch(e) {
    console.log(e)
    return undefined
  }
}


function reducer(state = INITIAL_STATE, action){
  switch (action.type){
    case 'SET_USER':
      return {
        data: [
          action.user.matricula,
          action.user.nome,
          action.user.email,
          action.user.ativo,
          action.user.hierarquia,
          action.user.data_nascimento,
          action.user.idade,
          action.user.curso,
          action.user.telefone_principal,
          action.user.pagante,
          action.user.situacao,
          action.user.quantidade_strikes,
          action.user.quantidade_faltas_rg,
          action.user.quantidade_faltas_equipe,
          action.user.quantidade_faltas_exposup,
          action.user.foto_url,
          action.user.gerenciar_membros,
          action.user.criar_membros,
          action.user.gerenciar_strikes,
          action.user.gerenciar_faltas,
          action.user.assessor_flag,
          action.user.marketing_flag,
          action.user.notificacoes,
          action.user.equipes,
          action.user.projetos,
        ]
      };
    case 'SET_USER_DATA':
      return {
        data: [
          action.user.matricula,
          action.user.nome,
          action.user.email,
          action.user.ativo,
          action.user.hierarquia,
          action.user.data_nascimento,
          action.user.idade,
          action.user.curso,
          action.user.telefone_principal,
          action.user.pagante,
          action.user.situacao,
          action.user.quantidade_strikes,
          action.user.quantidade_faltas_rg,
          action.user.quantidade_faltas_equipe,
          action.user.quantidade_faltas_exposup,
          action.user.foto_url,
          action.user.gerenciar_membros,
          action.user.criar_membros,
          action.user.gerenciar_strikes,
          action.user.gerenciar_faltas,
          action.user.assessor_flag,
          action.user.marketing_flag,
          action.user.notificacoes,
          action.user.equipes,
          action.user.projetos
        ]
      }
    default:
      return state;
  }
}

const persistedState = loadFromLocalStorage();

const courses = createStore(reducer, persistedState);

courses.subscribe(() => saveToLocalStorage(courses.getState()));

export default courses;
