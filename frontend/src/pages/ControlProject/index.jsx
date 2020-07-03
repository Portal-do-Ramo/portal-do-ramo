import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import api from '../../services/api';

import Top_Left_Side_Menu from '../../components/Top_Left_Side_Menu';
import Bottom_Right_Side_Menu from '../../components/Bottom_Right_Side_Menu';
import Header from '../../components/Home_Header';
import Title from '../../components/Title';
import Loader from '../../components/LoaderSpinner';

import { Screen, Content, ViewEvents, CardEvent, ModalScreen, BoxModalScreen, ConfirmBoxModalScreen, Card, BTNCircle } from './styles';
import crown from './images/crown.png';
import avatar from './images/avatar.png';

export default function ControlProject () {
  document.title = 'Gerenciar projeto';
  const access_token = 'Bearer'.concat(sessionStorage.getItem("access_token"));
  const urlData = window.location.search.slice(1);
  const hierarquia = (useSelector(state => state.data[4]));

  const [members, setMembers] = useState([]);
  const [allMembers, setAllMembers] = useState([]);
  const [projectData, setProjectData] = useState();

  const [status, setStatus] = useState('');
  const [membersOfProject, setMembersOfProject] = useState([])
  const [leader, setLeader] = useState();
  const [initialLeader, setInitialLeader] = useState();
  const [advisor, setAdvisor] = useState();
  const [initialAdvisor, setInitialAdvisor] = useState();
  const [addMemberSelected, setAddMemberSelected] = useState();
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState();
  const [areas, setAreas] = useState();
  const [selectedMember, setSelectedMember] = useState();
  const [archives, setArchives] = useState([]);
  const [selectedArchive, setSelectedArchive] = useState();
  const [areaToRemove, setAreaToRemove] = useState('');
  const [loaded, setLoaded] = useState(false);
  const [percent, setPercent] = useState(0);
  const [alert, setAlert] = useState('');
  const [isEnabled, setIsEnabled] = useState(false);
  const [base64, setBase64] = useState('');

  if (urlData === '') {
    window.location.href = '/error';
  }

  useEffect(() => {
    api.get( `/api/projetos/projeto-completo/${urlData}`, { headers: { Authorization: access_token } })
    .then(response => {
      setStatus(response.data.estagio)
      setProjectData(response.data)
      setLeader(response.data.lider)
      setInitialLeader(response.data.lider)
      setAdvisor(response.data.assessor)
      setInitialAdvisor(response.data.assessor)
      setMembers(response.data.membros)
      setEvents(response.data.eventos)
      setAreas(response.data.areas)
      setPercent(response.data.porcentagem_orcamento)
      setArchives(response.data.arquivos)
      setMembersOfProject(response.data.membros)
    })
    // .catch(() => window.location.href = '/error')
    .finally(() => setLoaded(true))
  }, [])


  useEffect(() => {
    api.get('api/usuarios', { headers: { Authorization: access_token } })
    .then(response => setAllMembers((response.data.Ativo).concat(response.data.Inativo)))
    // .catch(() => window.location.href = '/error')
  }, [])


  setTimeout(() => {
    if (alert !== '') {
      setAlert('')
    }
  }, 4000);


  function setStateOfButtonPDF() {
    var files = document.getElementById('input-file').files;
    if (files.length > 0) {
      setIsEnabled(true)
    }
  }


  function getBase64(file) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      setBase64(reader.result);
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }


  function convertToBase64PDF() {
    var files = document.getElementById('input-file').files;

    if (files.length > 0) {
      getBase64(files[0])
    }
  }


  function sendData() {
    const initial_date = document.getElementById('initial_date').value.split('-');
    const initial_date_formated = initial_date[2] + '/' + initial_date[1] + '/' + initial_date[0];

    const final_date = document.getElementById('final_date').value.split('-');
    const final_date_formated = final_date[2] + '/' + final_date[1] + '/' + final_date[0];

    api.put(`/api/projetos/${urlData}`, {
      nome_projeto: document.getElementById('project_name').value,
      data_inicio: initial_date_formated,
      data_fim: final_date_formated,
      areas: areas,
      estagio: status,
      link_trello: document.getElementById('project_trello').value
    }, { headers: { Authorization: access_token } })
    .then(() => setAlert('<div class="alert alert-success" role="alert"><strong>Dados atualizados com sucesso!</strong></div>'))
    .catch(() => setAlert('<div class="alert alert-danger" role="alert"><strong>Não foi possível atualizar os dados.</strong> Se o problema persistir, favor contate a diretoria.</div>'))
  }


  function concluirProjeto() {
    api.delete(`/api/projetos/${urlData}`, { headers: { Authorization: access_token } })
    .then(() => window.location.href = '/projects/manage')
    .catch(() => setAlert('<div class="alert alert-danger" role="alert"><strong>Não foi possível finalizar o projeto.</strong> Se o problema persistir, favor contate a diretoria.</div>'))
  }


  function newLeader() {
    api.put(`/api/projetos/${urlData}/atualizar-membro/${leader.uuid_inscricao}`, { funcao: "Líder", area: "" }, { headers: { Authorization: access_token } })
    .then(() => setAlert('<div class="alert alert-success" role="alert"><strong>Líder alterado com sucesso!</strong></div>'))
    .catch(() => setAlert('<div class="alert alert-danger" role="alert"><strong>Não foi possível alterar o líder.</strong> Se o problema persistir, favor contate a diretoria.</div>'))
  }


  function newAdvisor() {
    api.post(`/api/projetos/${urlData}/adicionar-assessor`, { matricula_assessor: advisor.matricula }, { headers: { Authorization: access_token } })
    .then(() => {
      document.getElementById('confirm-set-advisor-area').style.display='none'
      setAlert('<div class="alert alert-success" role="alert"><strong>Assessoria alterada com sucesso!</strong></div>')
    })
    .catch(() => setAlert('<div class="alert alert-danger" role="alert"><strong>Não foi possível alterar a assessoria.</strong> Se o problema persistir, favor contate a diretoria.</div>'))
  }


  function removeAdvisor(matricula) {
    api.post(`/api/projetos/${urlData}/adicionar-assessor`, { matricula_assessor: matricula }, { headers: { Authorization: access_token } })
    .then(() => {
      setAdvisor('')
      setInitialAdvisor('')
      setAlert('<div class="alert alert-success" role="alert"><strong>Assessoria removida com sucesso!</strong></div>')
    })
    .catch(() => setAlert('<div class="alert alert-danger" role="alert"><strong>Não foi possível alterar a assessoria.</strong> Se o problema persistir, favor contate a diretoria.</div>'))
  }


  function addNewMember() {
    api.post(`/api/projetos/${urlData}/adicionar-membro`, {
      matricula_membro: addMemberSelected.matricula,
      area: document.getElementById('area-new-member').value,
      funcao: "Membro"
    },{ headers: { Authorization: access_token } })
    .then(() => {
      setMembersOfProject(membersOfProject => [...membersOfProject, addMemberSelected])
      document.getElementById('add-members-part2-area').style.display='none'
      setAlert('<div class="alert alert-success" role="alert"><strong>Membro adicionado com sucesso!</strong></div>')
    })
    .catch(() => setAlert('<div class="alert alert-danger" role="alert"><strong>Não foi possível adicionar o membro.</strong> Se o problema persistir, favor contate a diretoria.</div>'))
  }


  function removeMember() {
    let aux = members;
    aux.splice(members.indexOf(selectedMember), 1);

    api.delete(`/api/projetos/${urlData}/remover-membro/${selectedMember.uuid_inscricao}`, { headers: { Authorization: access_token } })
    .then(() => {
      setMembers(aux)
      document.getElementById('confirm-remove-member-area').style.display='none'
      setAlert('<div class="alert alert-success" role="alert"><strong>Membro removido com sucesso!</strong></div>')
    })
    .catch(() => setAlert('<div class="alert alert-danger" role="alert"><strong>Não foi possível remover o membro.</strong> Se o problema persistir, favor contate a diretoria.</div>'))
  }


  function setFunctionOfMember() {
    api.put(`/api/projetos/${urlData}/atualizar-membro/${selectedMember.uuid_inscricao}`, {
      funcao: selectedMember.funcao,
      area: document.getElementById('new-area-member').value
    }, { headers: { Authorization: access_token } })
    .then(() => {
      setAlert('<div class="alert alert-success" role="alert"><strong>Área alterada com sucesso!</strong></div>')
      window.location.href = `/projects/manage/control?${urlData}`
    })
    .catch(() => setAlert('<div class="alert alert-danger" role="alert"><strong>Não foi possível alterar a área.</strong> Se o problema persistir, favor contate a diretoria.</div>'))
  }


  function addArchives() {
    if (base64 === '') {
      setAlert('<div class="alert alert-danger" role="alert">Carregue um arquivo!</div>')
      return
    }

    const archive_name = document.getElementById('archive_name').value;

    if (archive_name === '') {
      setAlert('<div class="alert alert-danger" role="alert">Nome do arquivo obrigatório!</div>')
      return
    }

    api.post(`/api/arquivos/upload-arquivo-projeto/${urlData}`, {
      nome_arquivo: archive_name,
      arquivo: base64
    }, { headers: { Authorization: access_token } })
    .then(() => {
      setAlert('<div class="alert alert-success" role="alert"><strong>Arquivo enviado para upload com sucesso!</strong></div>')
      window.location.href = `/projects/manage/control?${urlData}`
    })
    .catch(() => setAlert('<div class="alert alert-danger" role="alert"><strong>Não foi possível enviar o arquivo.</strong> Se o problema persistir, favor contate a diretoria.</div>'))
  }


  function removeArchive() {
    api.delete(`/api/arquivos/${urlData}/remover-arquivo-projeto/${selectedArchive.uuid}`, { headers: { Authorization: access_token } })
    .then(() => window.location.href = `/projects/manage/control?${urlData}`)
    .catch(() => setAlert('<div class="alert alert-danger" role="alert"><strong>Não foi possível excluir o arquivo.</strong> Se o problema persistir, favor contate a diretoria.</div>'))
  }


  function addEvent() {
    const event_date = document.getElementById('event-date').value.split('-');
    const event_date_formated = event_date[2] + '/' + event_date[1] + '/' + event_date[0];

    let newEvent = {};

    api.post(`/api/eventos/criar-evento-projeto/${urlData}`, {
      nome_evento: document.getElementById('event-name').value,
      data_evento: event_date_formated,
      hora_evento: document.getElementById('event-time').value,
      descricao: document.getElementById('event-description').value
    }, { headers: { Authorization: access_token } })
    .then(() => {
      newEvent = {nome_evento: document.getElementById('event-name').value, data_evento: document.getElementById('event-date').value, hora_evento: document.getElementById('event-time').value, descricao: document.getElementById('event-description').value}
      setEvents(events => [...events, newEvent])
      document.getElementById('add-events-area').style.display='none'
      setAlert('<div class="alert alert-success" role="alert"><strong>Evento criado com sucesso!</strong></div>')
    })
    .catch(() => setAlert('<div class="alert alert-danger" role="alert"><strong>Não foi possível criar o evento.</strong> Se o problema persistir, favor contate a diretoria.</div>'))
  }


  function editEvent() {
    const event_date = document.getElementById('edit-event-date').value.split('-');
    const event_date_formated = event_date[2] + '/' + event_date[1] + '/' + event_date[0];
    const time = (document.getElementById('edit-event-time').value).split(':')
    const time_formated = time[0].concat(':' + time[1])

    api.put(`/api/eventos/${urlData}/atualizar-evento-projeto/${selectedEvent.uuid}`, {
      nome_evento: document.getElementById('edit-event-name').value,
      data_evento: event_date_formated,
      hora_evento: time_formated,
      descricao: document.getElementById('edit-event-description').value
    }, { headers: { Authorization: access_token } })
    .then(() => {
      setAlert('<div class="alert alert-success" role="alert"><strong>Evento editado com sucesso!</strong></div>')
      window.location.href = `/projects/manage/control?${urlData}`
    })
    .catch(() => setAlert('<div class="alert alert-danger" role="alert"><strong>Não foi possível editar o evento.</strong> Se o problema persistir, favor contate a diretoria.</div>'))
  }


  function deleteEvent() {
    let aux = events;
    aux.splice(events.indexOf(selectedEvent), 1);

    api.delete(`/api/eventos/${urlData}/deletar-evento-projeto/${selectedEvent.uuid}`, { headers: { Authorization: access_token } })
    .then(() => {
      setEvents(aux);
      document.getElementById('edit-events-area').style.display='none'
      setAlert('<div class="alert alert-success" role="alert"><strong>Evento removido com sucesso!</strong></div>')
    })
    .catch(() => setAlert('<div class="alert alert-danger" role="alert"><strong>Não foi possível excluir o evento.</strong> Se o problema persistir, favor contate a diretoria.</div>'))
  }


  function addArea() {
    const newArea = document.getElementById('area-name').value;
    let aux = areas;
    aux.push(newArea);
    setAreas(aux);
    api.patch(`/api/projetos/atualizar-areas/${urlData}`, {
      areas: areas,
    }, { headers: { Authorization: access_token } })
    .then(() => {
      document.getElementById('add-areas-area').style.display='none'
      setAlert('<div class="alert alert-success" role="alert"><strong>Área adicionada com sucesso!</strong></div>')
    })
    .catch(() => setAlert('<div class="alert alert-danger" role="alert"><strong>Não foi possível adicionar a área.</strong> Se o problema persistir, favor contate a diretoria.</div>'))
  }


  function removeArea() {
    let aux = areas;
    aux.splice(areas.indexOf(areaToRemove), 1);

    api.patch(`/api/projetos/atualizar-areas/${urlData}`, {
      areas: aux,
    }, { headers: { Authorization: access_token } })
    .then(() => {
      window.location.href = `/projects/manage/control?${urlData}`
      setAlert('<div class="alert alert-success" role="alert"><strong>Área removida com sucesso!</strong></div>')
    })
    .catch(() => setAlert('<div class="alert alert-danger" role="alert"><strong>Não foi possível excluir a área.</strong> Se o problema persistir, favor contate a diretoria.</div>'))
  }

  //Função não usada
  function editArea(area) {
    let aux = areas;
    aux.splice(areas.indexOf(area), 1);

    api.patch(`/api/projetos/area/${urlData}`, {
      areas: area,
    }, { headers: { Authorization: access_token } })
    .then(() => {
      setAreas(aux);
      setAlert('<div class="alert alert-success" role="alert"><strong>Área alterada com sucesso!</strong></div>')
    })
    .catch(() => setAlert('<div class="alert alert-danger" role="alert"><strong>Não foi possível alterar a área.</strong> Se o problema persistir, favor contate a diretoria.</div>'))
  }


  useEffect(() => {
    document.getElementById('alert').innerHTML = alert;
  })


  return (
    <Screen>
      <Top_Left_Side_Menu />
      <Bottom_Right_Side_Menu />
      <div className="container">
        <div className="center-alert">
          <div className="area-alert" id="alert" />
        </div>
        <Header />

        <Title title="Gerenciar projeto" />

        {(loaded) ?
          <Content>
            <div className="row">
              <div className="col-md-6">
                <label htmlFor="project_name">Nome do projeto *</label>
                <input type="text" className="form-control" id="project_name" defaultValue={(projectData) ? projectData.nome : ''} required />
              </div>
              <div className="col-md-3">
                <label htmlFor="initial_date">Data de início *</label>
                <input type="date" id="initial_date" className="form-control" defaultValue={(projectData) ? projectData.data_inicio : ''} required />
              </div>
              <div className="col-md-3">
                <label htmlFor="final_date">Data de término *</label>
                <input type="date" id="final_date" className="form-control" defaultValue={(projectData) ? projectData.data_fim : ''} required/>
              </div>
            </div>

            <div className="row">
              <div className="col-md-4 down">
                <label htmlFor="status-project">Andamento *</label>
                <select className="form-control" id="status-project" value={status} onChange={e => setStatus(e.target.value)}>
                  <option value="Fase de pesquisa">Fase de pesquisa</option>
                  <option value="Apresentação">Apresentação</option>
                  <option value="Fase de execução">Fase de execução</option>
                  <option value="Fase de conclusão">Fase de conclusão</option>
                  <option value="Fase de checagem">Fase de checagem</option>
                  <option value="Concluído">Concluído</option>
                </select>
              </div>
              <div className="col-md-3 down">
                <label htmlFor="project_team">Equipe *</label>
                <input type="text" className="form-control" id="project_team" readOnly defaultValue={(projectData) ? projectData.nome_equipe : ''} />
              </div>
              <div className="col-md-5 down">
                <label htmlFor="project_trello">Trello *</label>
                <input type="text" className="form-control" id="project_trello" placeholder="Link do Trello" defaultValue={(projectData) ? projectData.link_trello : ''} />
              </div>
            </div>

            <div className="row">
              <div className="col-md-4 down">
                <label htmlFor="money">Caixa do projeto</label>
                <input type="text" className="form-control" id="money" defaultValue={(projectData) ? 'R$ ' + projectData.valor_caixa : ''} readOnly />
              </div>
              <div className="col-md-3 down" />
              <div className="col-md-3 down">
                <label htmlFor="money"> </label>
                <button className="btn-save" onClick={() => concluirProjeto()}>Finalizar projeto</button>
              </div>
              <div className="col-md-2 down">
                <label> </label>
                <button className="btn-save" onClick={() => sendData()}>Salvar</button>
              </div>
            </div>

            <hr />
            <div className="row">
              <div className="col-md-6">
                <button className="btn-card-blue" onClick={() => document.getElementById('set-leader-area').style.display='block'}>
                  <div>
                    <label htmlFor="leader-name">Clique para alterar</label>
                    <img src={(leader) ? leader.foto_url : avatar} className="leader-image" alt="avatar" />
                    <h1 className="title-name" id="leader-name">{(leader) ? ((leader.nome_completo).split(' ')[0]).concat(' ' + (leader.nome_completo).split(' ')[1]) : 'Selecione'}</h1>
                    <h1 className="hierarchy"><img src={crown} className="icon" alt="icon" />Líder</h1>
                  </div>
                </button>
              </div>
              <div className="col-md-6">
                <button className="btn-card-blue" onClick={() => document.getElementById('set-advisor-area').style.display='block'}>
                  <div>
                    <label htmlFor="assessor-name">Clique para alterar</label>
                    <img src={(advisor) ? advisor.foto_url : avatar} className="leader-image" alt="avatar" />
                    <h1 className="title-name" id="leader-name">{(advisor) ? ((advisor.nome_completo).split(' ')[0]).concat(' ' + (advisor.nome_completo).split(' ')[1]) : 'Selecione'}</h1>
                    <h1 className="hierarchy"><img src={crown} className="icon" alt="icon" />Assessor</h1>
                  </div>
                </button>
              </div>
            </div>
            <div className="row">
              <div className="col-md-8" />
              <div className="col-md-4">
                <button className="btn-remove-advisor" onClick={() => removeAdvisor("")} disabled={(!advisor) ? true : false}>Remover assessor</button>
              </div>
            </div>

            <hr />

            <ModalScreen id="set-leader-area" className="modal">
              <BoxModalScreen className="container box-modal-screen">
                <div className="modal-content animate view">
                  <div className='row'>
                    <h1 className="title">Selecione o líder</h1>
                  </div>
                  <div className="inside-area">
                    <div className="view-members">
                      <ul>
                        {(members) ? members.map(member => (
                          <Card key={member.matricula} onClick={() => setLeader(member)}>
                            <li className="member-item">
                              <header>
                                <img src={member.foto_url} alt="avatar" />
                                <div className="user-info">
                                  <strong>{((member.nome_completo).split(' ')[0]).concat(' ' + (member.nome_completo).split(' ')[1])}</strong><br />
                                  {member.area}
                                </div>
                              </header>
                            </li>
                          </Card>
                        )) : ''}
                      </ul>
                    </div>
                    <div className="row buttons-area">
                      <button className="btn btn-primary" onClick={() => {
                        setLeader(initialLeader)
                        document.getElementById('set-leader-area').style.display='none'
                      }}>
                        Cancelar
                      </button>

                      <button className="btn btn-primary" onClick={() => {
                        document.getElementById('set-leader-area').style.display='none'
                        document.getElementById('confirm-set-leader-area').style.display='block'
                      }}>
                        Salvar
                      </button>
                    </div>
                  </div>
                </div>
              </BoxModalScreen>
            </ModalScreen>

            <ModalScreen id="confirm-set-leader-area" className="modal">
              <ConfirmBoxModalScreen className="container box-modal-screen">
                <div className="modal-content animate view">
                  <div className='row'>
                    <h1 className="title">Confirmação</h1>
                  </div>
                  <div className="row text-area">
                    Tem certeza que deseja alterar a liderança do projeto {(projectData) ? projectData.nome : ''}?
                  </div>
                  <div className="row buttons-area">
                    <div>
                      <button className="btn btn-primary" onClick={() => {
                        setLeader(initialLeader)
                        document.getElementById('confirm-set-leader-area').style.display='none'
                      }}>
                        Cancelar
                      </button>

                      <button className="btn btn-primary" onClick={() => {
                        newLeader()
                        document.getElementById('confirm-set-leader-area').style.display='none'
                      }}>
                        Salvar
                      </button>
                    </div>
                  </div>
                </div>
              </ConfirmBoxModalScreen>
            </ModalScreen>

            <ModalScreen id="set-advisor-area" className="modal">
              <BoxModalScreen className="container box-modal-screen">
                <div className="modal-content animate view">
                  <div className='row'>
                    <h1 className="title">Selecione o assessor</h1>
                  </div>
                  <div className="inside-area">
                    <div className="view-members">
                      <ul>
                        {(allMembers) ? allMembers.map(member => (
                          <Card key={member.matricula} onClick={() => setAdvisor(member)}>
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
                        )) : ''}
                      </ul>
                    </div>
                    <div className="row buttons-area">
                      <button className="btn btn-primary" onClick={() => {
                        setAdvisor(initialAdvisor)
                        document.getElementById('set-advisor-area').style.display='none'
                      }}>
                        Cancelar
                      </button>

                      <button className="btn btn-primary" onClick={() => {
                        document.getElementById('set-advisor-area').style.display='none'
                        document.getElementById('confirm-set-advisor-area').style.display='block'
                      }}>
                        Salvar
                      </button>
                    </div>
                  </div>
                </div>
              </BoxModalScreen>
            </ModalScreen>

            <ModalScreen id="confirm-set-advisor-area" className="modal">
              <ConfirmBoxModalScreen className="container box-modal-screen">
                <div className="modal-content animate view">
                  <div className='row'>
                    <h1 className="title">Confirmação</h1>
                  </div>
                  <div className="row text-area">
                    Tem certeza que deseja alterar a assessoria do projeto {(projectData) ? projectData.nome : ''}?
                  </div>
                  <div className="row buttons-area">
                    <div>
                      <button className="btn btn-primary" onClick={() => {
                        setAdvisor(initialAdvisor)
                        document.getElementById('confirm-set-advisor-area').style.display='none'
                      }}>
                        Cancelar
                      </button>

                      <button className="btn btn-primary" onClick={() => newAdvisor()}>
                        Salvar
                      </button>
                    </div>
                  </div>
                </div>
              </ConfirmBoxModalScreen>
            </ModalScreen>

            <div className="row">
              <div className="col-md-6">
                <div className="box-height-fixed">
                  <h2><button className="btn-circle" onClick={() => document.getElementById('add-members-area').style.display='block'}>+</button>Membros</h2>
                  <hr />
                  <ViewEvents>
                    {(membersOfProject) ?
                      (membersOfProject).map(member => (
                        <button key={member.matricula} className="btn-member" onClick={() => {
                          setSelectedMember(member)
                          document.getElementById('control-member-area').style.display='block'
                        }}>
                          <img src={member.foto_url} className='member-icon' title={member.nome_completo + ' - ' + ((member.area) ? member.area : 'Não definido')} alt={member.nome_completo}/>
                        </button>
                      ))
                    : ''}
                  </ViewEvents>
                </div>
              </div>

              <div className="col-md-6">
                <div className="box-height-fixed">
                  <h2><button className="btn-circle" onClick={() => document.getElementById('add-archives-area').style.display='block'}>+</button>Arquivos</h2>
                  <hr />
                  <ViewEvents>
                    {(archives) ? archives.map(archive => (
                      <CardEvent key={archive.uuid}>
                        <h2 className="event-name-tag">{archive.nome.substring(0, 25)}</h2>
                        <BTNCircle color="#AF0000" hoverColor="#FF0000" onClick={() => {
                          setSelectedArchive(archive)
                          document.getElementById('confirm-delete-archive-area').style.display = 'block'
                        }}>x</BTNCircle>
                      </CardEvent>
                    )) : ''}
                  </ViewEvents>
                </div>
              </div>
            </div>

            <ModalScreen id="control-member-area" className="modal">
              <BoxModalScreen className="container box-modal-screen">
                <div className="modal-content animate view">
                  <div className='row'>
                    <h1 className="title">Gerenciar membro</h1>
                  </div>
                  <div className="inside-area">
                    <div className="card-selected-member">
                      <header>
                        <img src={(selectedMember) ? selectedMember.foto_url : ''} alt="avatar" />
                        <div className="user-info">
                          <h1><strong>{(selectedMember) ? ((selectedMember.nome_completo).split(' ')[0]).concat(' ' + (selectedMember.nome_completo).split(' ')[1]) : ''}</strong></h1>
                          <h2>{(selectedMember) ? selectedMember.area : ''}</h2>
                        </div>
                      </header>
                    </div>

                    <label htmlFor="new-area-member" className="label-member-area">Alterar área do membro</label>
                    <div className="row">
                      <div className="col-md-6">
                        {(selectedMember) ?
                          <select id="new-area-member" className="form-control mbottom">
                            {(areas) ? areas.map(area => (
                              <option value={area} key={area}>{area}</option>
                            )) : ''}
                          </select>
                        : ''}
                      </div>
                      <div className="col-md-6" />
                    </div>

                    <div className="row">
                      <button className="btn-delete space-left" onClick={() => {
                        document.getElementById('control-member-area').style.display='none'
                        document.getElementById('confirm-remove-member-area').style.display='block'
                      }}>Remover membro</button>
                    </div>

                    <div className="row buttons-area">
                      <div>
                        <button className="btn btn-primary" onClick={() => document.getElementById('control-member-area').style.display='none'}>
                          Cancelar
                        </button>
                        <button className="btn btn-primary" onClick={() => setFunctionOfMember()}>Salvar</button>
                      </div>
                    </div>
                  </div>
                </div>
              </BoxModalScreen>
            </ModalScreen>

            <ModalScreen id="add-members-area" className="modal">
              <BoxModalScreen className="container box-modal-screen">
                <div className="modal-content animate view">
                  <div className='row'>
                    <h1 className="title">Membros</h1>
                  </div>
                  <div className="inside-area">
                    <div className="view-members">
                      <ul>
                        {(allMembers) ? allMembers.map(member => (
                          <Card key={member.matricula} onClick={() => setAddMemberSelected(member)}>
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
                        )) : ''}
                      </ul>
                    </div>
                    <div className="row buttons-area">
                      <div>
                        <button className="btn btn-primary" onClick={() => {
                          setAddMemberSelected('')
                          document.getElementById('add-members-area').style.display='none'
                        }}>
                          Cancelar
                        </button>
                        <button className="btn btn-primary" onClick={() => {
                          document.getElementById('add-members-area').style.display='none'
                          document.getElementById('add-members-part2-area').style.display='block'
                        }}>Avançar</button>
                      </div>
                    </div>
                  </div>
                </div>
              </BoxModalScreen>
            </ModalScreen>

            <ModalScreen id="add-members-part2-area" className="modal">
              <BoxModalScreen className="container box-modal-screen">
                <div className="modal-content animate view">
                  <div className='row'>
                    <h1 className="title">Membros</h1>
                  </div>
                  <div className="inside-area">
                    <h1 className="tutor">Membro selecionado</h1>
                    <div className="card-selected-member">
                      <header>
                        <img src={(addMemberSelected) ? addMemberSelected.foto_url : ''} alt="avatar" />
                        <div className="user-info">
                          <strong>{(addMemberSelected) ? ((addMemberSelected.nome_completo).split(' ')[0]).concat(' ' + (addMemberSelected.nome_completo).split(' ')[1]) : ''}</strong><br />
                        </div>
                      </header>
                    </div>

                    <h1 className="tutor">Selecione a área</h1>
                    <select id="area-new-member" className="form-control mbottom">
                      {(areas) ? areas.map(area => (
                        <option value={area} key={area}>{area}</option>
                      )) : ''}
                    </select>

                    <div className="row buttons-area">
                      <div>
                        <button className="btn btn-primary" onClick={() => {
                          setAddMemberSelected('')
                          document.getElementById('add-members-part2-area').style.display='none'
                        }}>
                          Cancelar
                        </button>
                        <button className="btn btn-primary" onClick={() => addNewMember()}>Adicionar</button>
                      </div>
                    </div>
                  </div>
                </div>
              </BoxModalScreen>
            </ModalScreen>

            <ModalScreen id="confirm-remove-member-area" className="modal">
              <ConfirmBoxModalScreen className="container box-modal-screen">
                <div className="modal-content animate view">
                  <div className='row'>
                    <h1 className="title">Confirmação</h1>
                  </div>
                  <div className="row text-area">
                    Tem certeza que deseja remover o membro {(selectedMember) ? selectedMember.nome_completo : ''} do projeto?
                  </div>
                  <div className="row buttons-area">
                    <div>
                      <button className="btn btn-primary" onClick={() => document.getElementById('confirm-remove-member-area').style.display='none'}>
                        Cancelar
                      </button>

                      <button className="btn btn-primary" onClick={() => removeMember()}>
                        Remover
                      </button>
                    </div>
                  </div>
                </div>
              </ConfirmBoxModalScreen>
            </ModalScreen>

            <ModalScreen id="add-archives-area" className="modal">
              <ConfirmBoxModalScreen className="container box-modal-screen">
                <div className="modal-content animate view">
                  <div className='row'>
                    <h1 className="title">Arquivos</h1>
                  </div>
                  <div className="inside-area">
                    <input type="text" className="form-control archive-input" id="archive_name" name="archive_name" placeholder="Nome do arquivo *" required /><br />
                    <input type="file" className="form-control-file" id="input-file" name="input-file" required />
                    <div className="row center">
                      <button className="btn-send-picture" onClick={() => {
                        setStateOfButtonPDF()
                        convertToBase64PDF()
                      }} disabled={isEnabled}>
                        {(isEnabled) ? 'Carregado' : 'Carregar'}
                      </button>
                      <button className="btn-send-picture" onClick={() => document.getElementById('add-archives-area').style.display='none' }>
                          Cancelar
                      </button>
                      <button className="btn-send-picture" onClick={() => addArchives()}>Adicionar</button>
                    </div>
                  </div>
                </div>
              </ConfirmBoxModalScreen>
            </ModalScreen>

            <ModalScreen id="confirm-delete-archive-area" className="modal">
              <ConfirmBoxModalScreen className="container box-modal-screen">
                <div className="modal-content animate view">
                  <div className="row">
                    <h1 className="title">Confirmação</h1>
                  </div>
                  <div className="row text-area">
                    Tem certeza que deseja remover esse arquivo?
                  </div>
                  <div className="row buttons-area">
                    <div>
                      <button className="btn btn-primary" onClick={() => document.getElementById('confirm-delete-archive-area').style.display = 'none'}>
                        Cancelar
                      </button>
                      <button className="btn btn-primary" onClick={() => removeArchive()}>
                        Salvar
                      </button>
                    </div>
                  </div>
                </div>
              </ConfirmBoxModalScreen>
            </ModalScreen>

            <div className="row">
              <div className="col-md-6">
                <div className="box-height-fixed">
                  <h2><button className="btn-circle btn-circle-margin" onClick={() => document.getElementById('add-events-area').style.display='block'}>+</button>Eventos</h2>
                  <hr />
                  <ViewEvents>
                    {(events) ?
                      events.map(event => (
                        <CardEvent key={event.uuid} onClick={() => {
                          setSelectedEvent(event)
                          document.getElementById('edit-events-area').style.display='block'
                        }}>
                          <h2 className="event-name-tag">{event.nome_evento}</h2>
                          <p title={event.descricao} className="event-description-tag">{(event.descricao).substring(0, 150).concat('...')}</p>
                          <span className="event-datetime">{event.data_evento} às {event.hora_evento}</span>
                        </CardEvent>
                      ))
                    : ''}
                  </ViewEvents>
                </div>
              </div>
              <div className="col-md-6">
                <div className="box-height-fixed">
                  <h2><button className="btn-circle btn-circle-margin" onClick={() => document.getElementById('add-areas-area').style.display='block'}>+</button>Áreas</h2>
                  <hr />
                  <ViewEvents>
                    {(areas) ?
                      areas.map(area => (
                        <CardEvent key={area}>
                          <h2 className="event-name-tag">{area}</h2>
                          <BTNCircle color="#AF0000" hoverColor="#FF0000" onClick={() => {
                            setAreaToRemove(area)
                            document.getElementById('confirm-remove-area').style.display='block'
                          }}>x</BTNCircle>
                        </CardEvent>
                      ))
                    : ''}
                  </ViewEvents>
                </div>
              </div>
            </div>

            <ModalScreen id="add-events-area" className="modal">
              <BoxModalScreen className="container box-modal-screen">
                <div className="modal-content animate view">
                  <div className='row'>
                    <h1 className="title">Novo evento</h1>
                  </div>
                  <div className="row inside-area">
                    <div className="row input-area">
                      <div className="col-md-6 up-margin">
                        <label htmlFor="event-name">Nome do evento *</label>
                        <input type="text" className="form-control" id="event-name" name="event-name" placeholder="Nome" maxLength="190" required />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="event-description">Descrição do evento *</label>
                        <input type="text" className="form-control" id="event-description" name="event-description" placeholder="Descrição" required />
                      </div>
                    </div>
                    <div className="row input-area">
                      <div className="col-md-6 up-margin">
                        <label htmlFor="event-date">Data do evento *</label>
                        <input type="date" className="form-control" id="event-date" name="event-date" required />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="event-time">Hora do evento *</label>
                        <input type="time" className="form-control" id="event-time" name="event-time" required />
                      </div>
                    </div>

                    <div className="right">
                      <div className="row buttons-area event-buttons">
                        <div>
                          <button className="btn btn-primary" onClick={() => {
                            document.getElementById('add-events-area').style.display='none'
                            document.getElementById('event-name').value = ""
                            document.getElementById('event-description').value = ""
                            document.getElementById('event-date').value = ""
                            document.getElementById('event-time').value = ""
                          }}>
                            Cancelar
                          </button>
                          <button className="btn btn-primary" onClick={() => addEvent()}>Adicionar</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </BoxModalScreen>
            </ModalScreen>

            <ModalScreen id="edit-events-area" className="modal">
              <BoxModalScreen className="container box-modal-screen">
                <div className="modal-content animate view">
                  <div className='row'>
                    <h1 className="title">Editar evento</h1>
                  </div>
                  <div className="row inside-area">
                    <div className="row input-area">
                      <div className="col-md-6">
                        <label htmlFor="event-name">Nome do evento *</label>
                        <input type="text" className="form-control" id="edit-event-name" name="event-name" placeholder="Nome" maxLength="190" defaultValue={(selectedEvent) ? selectedEvent.nome_evento : ''} required />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="event-description">Descrição do evento *</label>
                        <input type="text" className="form-control" id="edit-event-description" name="event-description" placeholder="Descrição" defaultValue={(selectedEvent) ? selectedEvent.descricao : ''} required />
                      </div>
                    </div>
                    <div className="row input-area">
                      <div className="col-md-6">
                        <label htmlFor="event-date">Data do evento *</label>
                        <input type="date" className="form-control" id="edit-event-date" name="event-date" defaultValue={(selectedEvent) ? selectedEvent.data_evento : ''} required />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="event-time">Hora do evento *</label>
                        <input type="time" className="form-control" id="edit-event-time" name="event-time" defaultValue={(selectedEvent) ? selectedEvent.hora_evento : ''} required />
                      </div>
                    </div>
                    <div className="row input-area">
                      <div className="col-md-6">
                        <label htmlFor="event-date"> </label>
                        <button className="btn-delete" onClick={() => deleteEvent()}>Apagar evento</button>
                      </div>
                    </div>

                    <div className="right">
                      <div className="row buttons-area to-up">
                        <div>
                          <button className="btn btn-primary" onClick={() => document.getElementById('edit-events-area').style.display='none'}>
                            Cancelar
                          </button>
                          <button className="btn btn-primary" onClick={() => editEvent()}>Salvar</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </BoxModalScreen>
            </ModalScreen>

            <ModalScreen id="add-areas-area" className="modal">
              <ConfirmBoxModalScreen className="container box-modal-screen">
                <div className="modal-content animate view">
                  <div className='row'>
                    <h1 className="title">Áreas</h1>
                  </div>
                  <div className="row inside-area">
                    <input type="text" className="form-control" id="area-name" name="area-name" placeholder="Nome da área" maxLength="190" required />
                    <div className="right">
                      <div className="row buttons-area">
                        <div>
                          <button className="btn btn-primary" onClick={() => document.getElementById('add-areas-area').style.display='none'}>
                            Cancelar
                          </button>
                          <button className="btn btn-primary" onClick={() => addArea()}>Salvar</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </ConfirmBoxModalScreen>
            </ModalScreen>

            <ModalScreen id="confirm-remove-area" className="modal">
              <ConfirmBoxModalScreen className="container box-modal-screen">
                <div className="modal-content animate view">
                  <div className='row'>
                    <h1 className="title">Confirmação</h1>
                  </div>
                  <div className="row text-area">
                    Tem certeza que deseja remover a área de {(areaToRemove) ? areaToRemove : ''} do projeto?
                  </div>
                  <div className="row buttons-area">
                    <div>
                      <button className="btn btn-primary" onClick={() => document.getElementById('confirm-remove-area').style.display='none'}>
                        Cancelar
                      </button>

                      <button className="btn btn-primary" onClick={() => {
                        removeArea()
                        document.getElementById('confirm-remove-area').style.display='none'
                      }}>
                        Remover
                      </button>
                    </div>
                  </div>
                </div>
              </ConfirmBoxModalScreen>
            </ModalScreen>
          </Content>
        :
          <div className="loader-area">
            <Loader />
          </div>
        }
      </div>
    </Screen>
  )
}
