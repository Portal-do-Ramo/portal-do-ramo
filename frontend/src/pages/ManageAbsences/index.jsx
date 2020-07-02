import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import api from '../../services/api';

import Top_Left_Side_Menu from '../../components/Top_Left_Side_Menu';
import Bottom_Right_Side_Menu from '../../components/Bottom_Right_Side_Menu';
import Header from '../../components/Home_Header';
import Title from '../../components/Title';
import Loader from '../../components/LoaderSpinner';

import { Screen, RightBox, TitleBox, ViewResults, Card, ApplyAbsence } from './styles';
import download from './download.png';

export default function ManageAbsences() {
  document.title = 'Gerenciar Faltas';
  const access_token = 'Bearer'.concat(sessionStorage.getItem("access_token"));
  const hierarquia = (useSelector(state => state.data[4]));

  const [isEnabledToView, setIsEnabledToView] = useState(false);
  const [members, setMembers] = useState([]);
  const [isLoaded, setIsLoaded] = useState(true);
  const [selectedMember, setSelectedMember] = useState();
  const [type, setType] = useState([]);
  const [listProjects, setListProjects] = useState([]);
  const [listTeams, setListTeams] = useState([]);
  const [alert, setAlert] = useState('');
  const [filter, setFilter] = useState('allMembers');

  const allMembers = [{nome_equipe_slug:"allMembers", nome_equipe:"Todos"}];

  function isViewed() {
    if (
      hierarquia === 'Diretor de Gestão de Pessoas' ||
      hierarquia === 'Presidente' ||
      hierarquia === 'Vice-Presidente'
    ) {
      setIsEnabledToView(true)
      return true;
    } else {
      return false;
    }
  }

  setTimeout(() => {
    if (alert !== '') {
      setAlert('')
    }
  }, 4000);

  useEffect(() => {
    api.get('api/faltas', { headers: { Authorization: access_token } })
    .then(response => setMembers(response.data))
    .catch(() => (isEnabledToView) ? window.location.href = '/error' : '')
    .finally(() => setIsLoaded(false))
  }, [])


  useEffect(() => {
    api.get('/api/tipo-faltas', {headers: { Authorization: access_token }})
    .then(response => setType(response.data))
    .catch(() => (isEnabledToView) ? window.location.href = '/error' : '')
  }, [])


  useEffect(() => {
    api.get('/api/projetos/select-projetos', { headers: { Authorization: access_token } })
    .then(response => setListProjects(response.data))
    .catch(() => (isEnabledToView) ? window.location.href = '/error' : '')
  }, [])


  useEffect(() => {
    api.get('/api/equipes', { headers: { Authorization: access_token } })
    .then(response => setListTeams(allMembers.concat(response.data)))
    .catch(() => (isEnabledToView) ? window.location.href = '/error' : '')
  }, [])


  function sendAbsence(e) {
    e.preventDefault();
    const description = document.getElementById('absenceDescription').value;
    const type = document.getElementById('typeSelect').value;
    const project_name = document.getElementById('project_name').value;
    const date = document.getElementById('dtAbsence').value.split('-');
    const datePattern = date[2] + '/' + date[1] + '/' + date[0];

    if(!selectedMember) {
      setAlert('<div class="alert alert-danger" role="alert"><strong>Selecione o membro!</strong><br /></div>');
      return
    }

    api.post('api/faltas', {
      matricula_membro: selectedMember.matricula,
      data: datePattern,
      tipo_id: type,
      descricao: description,
      nome_projeto: (type == 1 || type == 2 || type == 4) ? null : project_name
    }, {headers: { Authorization: access_token }})
    .then(() => setAlert('<div class="alert alert-success" role="alert">Falta enviada com sucesso!</div>'))
    .catch(() => setAlert(`<div class="alert alert-danger" role="alert"><strong>Não foi possível enviar a falta!</strong> Se o problema persistir, favor comunicar a diretoria</div>`))
  }


  function downloadFile() {
    api.get(`/api/faltas/lista-faltas`, { headers: { Authorization: access_token },  responseType: 'blob' })
    .then(response => {
      const downloadUrl = window.URL.createObjectURL(response.data);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.setAttribute('download', 'lista-faltas.xlsx');
      document.body.appendChild(link);
      link.click();
      link.remove();
    })
    .catch(() => setAlert('<div class="alert alert-danger" role="alert"><strong>Não foi possível fazer o download.</strong> Se o problema persistir, favor contate a diretoria.</div>'))
  }


  useEffect(() => {
    document.getElementById('alert').innerHTML = alert;
  })


  return (
    <Screen>
        <>
          <Top_Left_Side_Menu />
          <Bottom_Right_Side_Menu />

          <div className="container">
            <div className="center-alert">
              <div className="area-alert" id="alert" />
            </div>
            <Header />
            <Title title="Gerenciar Faltas" />

            <div className="row">
              <div className="col-md-6">
                <div className="left-box-gray">
                  <div className="row">
                    <TitleBox>
                      Membros
                    </TitleBox>
                    <button className="btn-add" onClick={() => downloadFile()}>
                      <img src={download} title="Baixar lista de faltas" className="icon" />
                    </button>
                  </div>

                  <select className="form-control" name="filter" id="filter" onChange={e => setFilter(e.target.value)}>
                    {listTeams.map(team => (
                      <option key={team.nome_equipe_slug} value={team.nome_equipe_slug}>{team.nome_equipe}</option>
                    ))}
                  </select>

                  <ViewResults>
                    { (isLoaded) ? <Loader /> : null }
                    <ul>
                      {members.map(member => (
                        ((filter != 'allMembers') && (member.equipes).indexOf(filter) != -1) ?
                        <Card id={member.matricula} key={member.matricula} onClick={e => setSelectedMember(member)}>
                          <li className="member-item">
                            <header>
                              <img src={member.foto_url} alt="avatar" />
                              <div className="user-info">
                                <strong>{((member.nome_completo).split(' ')[0]).concat(' ' + (member.nome_completo).split(' ')[1])}</strong><br />
                                {member.hierarquia}
                              </div>
                            </header>
                          </li>
                        </Card>
                        : (filter === 'allMembers') ?
                          <Card id={member.matricula} key={member.matricula} onClick={e => setSelectedMember(member)}>
                            <li className="member-item">
                              <header>
                                <img src={member.foto_url} alt="avatar" />
                                <div className="user-info">
                                  <strong>{((member.nome_completo).split(' ')[0]).concat(' ' + (member.nome_completo).split(' ')[1])}</strong><br />
                                  {member.hierarquia}
                                </div>
                              </header>
                            </li>
                          </Card>
                        : ''
                      ))}
                    </ul>
                  </ViewResults>
                </div>
              </div>

              <div className="col-md-6">
                <RightBox>
                  <div className="center">
                    {(selectedMember) ? <img src={selectedMember.foto_url} className="img-thumbnail" alt="avatar" /> : '' }
                    <h1 id="noSelected">{(!selectedMember) ? 'Selecione um membro' : ''}</h1>

                    <h1>{(selectedMember) ? ((selectedMember.nome_completo).split(' ')[0]).concat(' ' + (selectedMember.nome_completo).split(' ')[1]) : ''}</h1>
                    <h3>{(selectedMember) ? selectedMember.hierarquia : ''}</h3>

                    {(selectedMember) ?
                      <div className="qty">
                        <h2>Faltas</h2>
                        <div className="circle">
                          <h1 className="qty">{selectedMember.contagem_total_faltas}</h1>
                        </div>
                      </div>
                    : ''}
                    {(selectedMember) ? <Link to={'/manageabsences/historic?'.concat(selectedMember.matricula)}>Ver histórico completo</Link> : ''}
                  </div>
                </RightBox>
              </div>
            </div>

            <ApplyAbsence className="row">
              <h1>Aplicar Falta {(selectedMember) ? ' - ' + ((selectedMember.nome_completo).split(' ')[0]).concat(' ' + (selectedMember.nome_completo).split(' ')[1]) : '- Selecione um membro'}</h1>

              <form onSubmit={sendAbsence}>
                <div id="alert" />
                <div className="row">
                  <div className="col-md-4">
                    <label htmlFor="absenceDescription">Descrição</label>
                    <input type="text" className="form-control" name="absenceDescription" id="absenceDescription" placeholder="Descrição da falta - Opcional" />
                  </div>

                  <div className="col-md-3">
                    <label htmlFor="absenceDescription">Projeto</label>
                    <select className="form-control" id="project_name">
                      {listProjects.map(project => (
                        <option key={project.nome_projeto_slug} value={project.nome_projeto_slug}>{project.nome_projeto}</option>
                      ))}
                    </select>
                  </div>

                  <div className="col-md-2">
                    <label htmlFor="typeSelect">Tipo *</label>
                    <select className="form-control" id="typeSelect">
                      {type.map(tp => (
                        <option value={tp.id} key={tp.id}>{tp.nome}</option>
                      ))}
                    </select>
                  </div>

                  <div className="col-md-3">
                    <label htmlFor="dtAbsence">Data *</label>
                    <input type="date" name="dtAbsence" id="dtAbsence" className="form-control" required />
                  </div>
                </div>

                <div className="row center">
                  <button className="btn-send" type="submit">Enviar</button>
                </div>
                <small>Em caso de faltas em RG's, Exposup ou Reuniões de Planejamento, o campo para seleção "Projeto" não será considerado. </small>
              </form>
            </ApplyAbsence>
          </div>
        </>
      {/* :
        <div id="no-access">
          <h3>Você não tem acesso a essa rota!</h3>
          <br />
          <button className="btn-send" onClick={() => window.location.href = "/home"}>Voltar</button>
        </div>
      } */}
    </Screen>
  )
}
