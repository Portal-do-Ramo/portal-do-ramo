import React, { useState, useEffect } from "react";
import api from "../../services/api";

import Top_Left_Side_Menu from "../../components/Top_Left_Side_Menu";
import Bottom_Right_Side_Menu from "../../components/Bottom_Right_Side_Menu";
import Header from "../../components/Home_Header";
import Title from "../../components/Title";
import Loader from "../../components/LoaderSpinner";

import { Screen, Content, ArchivesArea, EventsArea, BoxModalScreen, ConfirmBoxModalScreen, ModalScreen, Card } from "./styles";
import avatar from './images/avatar.png';

import crown from "./images/crown.png";

export default function ControlTeam() {
  document.title = "Gerenciar equipe";
  const access_token = "Bearer".concat(sessionStorage.getItem("access_token"));
  const urlData = window.location.search.slice(1);

  const [members, setMembers] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [alert, setAlert] = useState('');

  const [teamData, setTeamData] = useState();
  const [codeTeam, setCodeTeam] = useState('');
  const [base64, setBase64] = useState('');
  const [isEnabled, setIsEnabled] = useState(false);
  const [isEnabled2, setIsEnabled2] = useState(false);

  const [leader, setLeader] = useState();
  const [initialLeader, setInitialLeader] = useState();
  const [advisor, setAdvisor] = useState();
  const [initialAdvisor, setInitialAdvisor] = useState();

  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState();

  const [archives, setArchives] = useState([]);
  const [selectedArchive, setSelectedArchive] = useState();


  useEffect(() => {
    api.get(`/api/equipes/equipe-completa/${urlData}`, { headers: { Authorization: access_token } })
    .then(response => {
      setTeamData(response.data)
      setCodeTeam(response.data.nome_equipe)
      setEvents(response.data.eventos)
      setArchives(response.data.arquivos)

      for(let i = 0; i < response.data.membros.length; i++) {
        if(response.data.membros[i].funcao === 'Coordenador') {
          setLeader(response.data.membros[i])
        }

        if(response.data.membros[i].funcao === 'Assessor') {
          setAdvisor(response.data.membros[i])
        }
      }
    })
    .catch(() => window.location.href = '/error')
    .finally(() => setIsLoaded(true));
  }, []);


  useEffect(() => {
    api.get('api/usuarios', { headers: { Authorization: access_token } })
    .then(response => setMembers((response.data.Ativo).concat(response.data.Inativo)))
    .catch(() => window.location.href = '/error')
  }, []);


  function sendGeneralInfo() {
    api.put(`/api/equipes/${urlData}`, {
      nome_equipe: document.getElementById('team-name').value,
      capitulo: document.getElementById('team-chapter').value
    }, { headers: { Authorization : access_token } })
    .then(() => setAlert('<div class="alert alert-success" role="alert"><strong>Dados enviados com sucesso!</strong></div>'))
    .catch(() => setAlert('<div class="alert alert-danger" role="alert"><strong>Não foi possível enviar os dados.</strong> Se o problema persistir, favor contate a diretoria.</div>'))
  }


  function setStateOfButton() {
    var files = document.getElementById('url-img').files;
    if (files.length > 0) {
      setIsEnabled(true)
    }
  }


  function setStateOfButtonPDF() {
    var files = document.getElementById('input-file').files;
    if (files.length > 0) {
      setIsEnabled2(true)
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
    console.log(files[0])
    if (files.length > 0) {
      getBase64(files[0])
    }
  }


  function convertToBase64() {
    var files = document.getElementById('url-img').files;
    if (files.length > 0) {
      getBase64(files[0])
    }
  }


  function sendNewPicture() {
    if (base64 === '') {
      setAlert('<div class="alert alert-danger" role="alert"><strong>Carregue uma imagem!</strong></div>')
      return
    }

    api.put(`/api/equipes/alterar-logo/${urlData}`, {
      logo_equipe: base64
    }, { headers: { Authorization : access_token } })
    .then(() => setAlert('<div class="alert alert-success" role="alert"><strong>Imagem alterada com sucesso!</strong></div>'))
    .catch(() => setAlert('<div class="alert alert-danger" role="alert"><strong>Não foi possível enviar a imagem.</strong> Se o problema persistir, favor contate a diretoria.</div>'))
  }


  function newLeader() {
    api.put(`/api/equipes/alterar-coordenador/${urlData}`, {
      matricula_coordenador: leader.matricula
    }, { headers: { Authorization : access_token } })
    .then(() => setAlert('<div class="alert alert-success" role="alert"><strong>Nova coordenadoria alterada com sucesso!</strong></div>'))
    .catch(() => setAlert('<div class="alert alert-danger" role="alert"><strong>Não foi possível alterar a coordenadoria.</strong> Se o problema persistir, favor contate a diretoria.</div>'))
  }


  function newAdvisor() {
    api.put(`/api/equipes/alterar-assessor/${urlData}`, {
      matricula_assessor: advisor.matricula
    }, { headers: { Authorization : access_token } })
    .then(() => setAlert('<div class="alert alert-success" role="alert"><strong>Nova assessoria alterada com sucesso!</strong></div>'))
    .catch(() => setAlert('<div class="alert alert-danger" role="alert"><strong>Não foi possível alterar a assessoria.</strong> Se o problema persistir, favor contate a diretoria.</div>'))
  }


  function addEvent() {
    const event_date = document.getElementById('event-date').value.split('-');
    const event_date_formated = event_date[2] + '/' + event_date[1] + '/' + event_date[0];

    api.post(`/api/eventos/criar-evento-equipe/${urlData}`, {
      nome_evento: document.getElementById('event-name').value,
      data_evento: event_date_formated,
      hora_evento: document.getElementById('event-time').value,
      descricao: document.getElementById('event-description').value
    }, { headers: { Authorization: access_token } })
    .then(() => setAlert('<div class="alert alert-success" role="alert"><strong>Evento adicionado com sucesso!</strong></div>'))
    .catch(() => setAlert('<div class="alert alert-danger" role="alert"><strong>Não foi possível salvar o evento.</strong> Se o problema persistir, favor contate a diretoria.</div>'))
  }


  function editEvent() {
    const event_date = document.getElementById('edit-event-date').value.split('-');
    const event_date_formated = event_date[2] + '/' + event_date[1] + '/' + event_date[0];
    const time = (document.getElementById('edit-event-time').value).split(':')
    const time_formated = time[0].concat(':' + time[1])

    api.put(`/api/eventos/${urlData}/atualizar-evento-equipe/${selectedEvent.uuid}`, {
      nome_evento: document.getElementById('edit-event-name').value,
      data_evento: event_date_formated,
      hora_evento: time_formated,
      descricao: document.getElementById('edit-event-description').value
    }, { headers: { Authorization: access_token } })
    .then(() => setAlert('<div class="alert alert-success" role="alert"><strong>Evento editado com sucesso!</strong></div>'))
    .catch(() => setAlert('<div class="alert alert-danger" role="alert"><strong>Não foi possível editar o evento.</strong> Se o problema persistir, favor contate a diretoria.</div>'))
  }


  function deleteEvent() {
    let aux = events;
    aux.splice(events.indexOf(selectedEvent), 1);
    api.delete(`/api/eventos/${urlData}/deletar-evento-equipe/${selectedEvent.uuid}`, { headers: { Authorization: access_token } } )
    .then(() => {
      setEvents(aux)
      setAlert('<div class="alert alert-success" role="alert"><strong>Evento excluido com sucesso!</strong></div>')
    })
    .catch(() => setAlert('<div class="alert alert-danger" role="alert"><strong>Não foi possível excluir o evento.</strong> Se o problema persistir, favor contate a diretoria.</div>'))
  }


  function addArchive() {
    if (base64 === '') {
      setAlert('<div class="alert alert-danger" role="alert">Carregue um arquivo!</div>')
      return
    }

    const archive_name = document.getElementById('archive_name').value;

    if (archive_name === '') {
      setAlert('<div class="alert alert-danger" role="alert">Nome do arquivo obrigatório!</div>')
      return
    }

    api.post(`/api/arquivos/upload-arquivo-equipe/${urlData}`, {
      nome_arquivo: archive_name,
      arquivo: base64
    }, { headers: { Authorization: access_token } })
    .then(() => setAlert('<div class="alert alert-success" role="alert"><strong>Arquivo enviado com sucesso!</strong></div>'))
    .catch(() => setAlert('<div class="alert alert-danger" role="alert"><strong>Não foi possível enviar o arquivo.</strong> Se o problema persistir, favor contate a diretoria.</div>'))
  }


  function deleteArchive() {
    let aux = archives;
    aux.splice(archives.indexOf(selectedArchive), 1);
    setArchives(aux);
    api.delete(`/${urlData}/remover-arquivo-equipe/${selectedArchive.uuid}`, { headers: { Authorization: access_token } })
    .then(() => setAlert('<div class="alert alert-success" role="alert"><strong>Arquivo deletado com sucesso!</strong></div>'))
    .catch(() => setAlert('<div class="alert alert-danger" role="alert"><strong>Não foi possível excluir o arquivo.</strong> Se o problema persistir, favor contate a diretoria.</div>'))
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
        <Title title="Gerenciar Equipes" />

        {(isLoaded) ?
          <div>
            <Content>
              <h1 className="title-area">Informações Gerais</h1>
              <div className="row">
                <div className="col-md-4">
                  <label htmlFor="team-name">Nome da equipe *</label>
                  <input
                    type="text"
                    id="team-name"
                    name="team-name"
                    className="form-control"
                    defaultValue={(teamData) ? teamData.nome_equipe : ''}
                    onChange={(e) => setCodeTeam(e.target.value)}
                    required
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="team-chapter">Capítulo</label>
                  <input
                    type="text"
                    id="team-chapter"
                    name="team-chapter"
                    className="form-control"
                    defaultValue={(teamData) ? teamData.capitulo : ''}
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="code-team">Código</label>
                  <input
                    type="text"
                    id="code-team"
                    name="code-team"
                    className="form-control"
                    value={codeTeam.split(" ").join("-").toLowerCase()}
                    readOnly
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-4 down">
                  <label htmlFor="money">Caixa da Equipe</label>
                  <input
                    type="text"
                    className="form-control"
                    id="money"
                    defaultValue={(teamData) ? 'R$ ' + teamData.valor_caixa : ''}
                    readOnly
                  />
                </div>
                <div className="col-md-6" />
                <div className="col-md-2 down">
                  <label> </label>
                  <br />
                  <button className="btn-save" onClick={() => sendGeneralInfo()}>
                    Salvar
                  </button>
                </div>
              </div>

              <hr />

              <h1 className="title-area">Altere a logo da equipe</h1>
              <div className="row">
                <div className="col-md-6">
                  <label htmlFor="team-logo">Selecione a logo da equipe</label>
                  <input type="file" name="url-img" id="url-img" className="form-control-file" accept="image/png, image/jpeg" />
                  <button className="btn-send-picture" onClick={() => {
                    setStateOfButton()
                    convertToBase64()
                  }} disabled={isEnabled}>
                    {(isEnabled) ? 'Carregado' : 'Carregar'}
                  </button>
                </div>
                <div className="col-md-4" />
                <div className="col-md-2">
                  <button className="btn-save" onClick={() => sendNewPicture()}>
                    Salvar
                  </button>
                </div>
              </div>

              <hr />

              <div className="row">
                <div className="col-md-6">
                  <button className="btn-card-blue" onClick={() => document.getElementById('set-leader-area').style.display = 'block'}>
                    <div>
                      <label htmlFor="leader-name">Clique para alterar</label>
                      <img src={leader ? leader.foto_url : avatar} className="leader-image" alt="avatar" />
                      <h1 className="title-name" id="leader-name">
                        {leader ? leader.nome_completo.split(' ')[0].concat(' ' + leader.nome_completo.split(' ')[1]) : ''}
                      </h1>
                      <h1 className="hierarchy">
                        <img src={crown} className="icon" alt="icon" />
                        Coordenadoria
                      </h1>
                    </div>
                  </button>
                </div>
                <div className="col-md-6">
                  <button className="btn-card-blue" onClick={() => document.getElementById('set-advisor-area').style.display = 'block'}>
                    <div>
                      <label htmlFor="assessor-name">Clique para alterar</label>
                      <img src={advisor ? advisor.foto_url : avatar} className="leader-image" alt="avatar" />
                      <h1 className="title-name" id="leader-name">
                        {advisor ? advisor.nome_completo.split(' ')[0].concat(' ' + advisor.nome_completo.split(' ')[1]): 'Selecione'}
                      </h1>
                      <h1 className="hierarchy">
                        <img src={crown} className="icon" alt="icon" />
                        Assessoria
                      </h1>
                    </div>
                  </button>
                </div>
              </div>
            </Content>

            <div className="row">
              <div className="col-md-6">
                <EventsArea>
                  <h1 className="title-area"><button className="btn-circle" onClick={() => document.getElementById('add-events-area').style.display = 'block'}>+</button>Eventos</h1>
                  <div className="view-events">
                    {(events) ?
                      events.map(event => (
                        <button key={event.uuid} className="event-card" onClick={() => {
                          setSelectedEvent(event)
                          document.getElementById('edit-events-area').style.display = 'block'
                        }}>
                          <h1>{event.nome_evento}</h1>
                          <span>{event.data_evento} às {event.hora_evento}</span>
                        </button>
                      ))
                    : ''}
                  </div>
                </EventsArea>
              </div>

              <div className="col-md-6">
                <ArchivesArea>
                  <h1 className="title-area"><button className="btn-circle" onClick={() => document.getElementById('add-archives-area').style.display = 'block'}>+</button>Arquivos</h1>
                  <div className="view-archives">
                    {(archives) ?
                      archives.map(archive => (
                        <button className="archive-card" onClick={() => document.getElementById('confirm-delete-archive-area').style.display = 'block'}>
                          <h1>Lançamento Portal do Ramo</h1>
                          <h2>x</h2>
                        </button>
                      ))
                    : ''}
                  </div>
                </ArchivesArea>
              </div>
            </div>
          </div>
        :
          <div className="area-loader">
            <Loader />
          </div>
        }
      </div>


      {/* MODAL COORDENADOR */}

      <ModalScreen id="set-leader-area" className="modal">
        <BoxModalScreen className="container box-modal-screen">
          <div className="modal-content animate view">
            <div className="row">
              <h1 className="title">Selecione o coordenador (a)</h1>
            </div>
            <div className="inside-area">
              <div className="view-members">
                <ul>
                  {members
                    ? members.map((member) => (
                      <Card key={member.matricula} onClick={() => setLeader(member)}>
                        <li className="member-item">
                          <header>
                            <img src={member.foto_url} alt="avatar" />
                            <div className="user-info">
                              <strong>{member.nome_completo.split(' ')[0].concat(' ' + member.nome_completo.split(' ')[1])}</strong>
                              <br />
                              {member.hierarquia}
                            </div>
                          </header>
                        </li>
                      </Card>
                    ))
                  : ''}
                </ul>
              </div>
              <div className="row buttons-area">
                <button className="btn btn-primary" onClick={() => {
                  setLeader(initialLeader);
                  document.getElementById('set-leader-area').style.display = 'none';
                }}>
                  Cancelar
                </button>

                <button className="btn btn-primary" onClick={() => {
                  document.getElementById('set-leader-area').style.display = 'none';
                  document.getElementById('confirm-set-leader-area').style.display = 'block';
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
            <div className="row">
              <h1 className="title">Confirmação</h1>
            </div>
            <div className="row text-area">
              Tem certeza que deseja alterar a coordenaria da equipe?
            </div>
            <div className="row buttons-area">
              <div>
                <button className="btn btn-primary" onClick={() => {
                  setLeader(initialLeader);
                  document.getElementById('confirm-set-leader-area').style.display = 'none';
                }}>
                  Cancelar
                </button>

                <button className="btn btn-primary" onClick={() => {
                  newLeader();
                  document.getElementById('confirm-set-leader-area').style.display = 'none';
                  }}>
                  Salvar
                </button>
              </div>
            </div>
          </div>
        </ConfirmBoxModalScreen>
      </ModalScreen>


      {/* MODAL ADVISOR */}

      <ModalScreen id="set-advisor-area" className="modal">
        <BoxModalScreen className="container box-modal-screen">
          <div className="modal-content animate view">
            <div className="row">
              <h1 className="title">Selecione o assessor (a)</h1>
            </div>
            <div className="inside-area">
              <div className="view-members">
                <ul>
                  {members
                    ? members.map((member) => (
                      <Card key={member.matricula} onClick={() => setAdvisor(member)}>
                        <li className="member-item">
                          <header>
                            <img src={member.foto_url} alt="avatar" />
                            <div className="user-info">
                              <strong>{member.nome_completo.split(' ')[0].concat(' ' + member.nome_completo.split(' ')[1])}</strong>
                              <br />
                              {member.hierarquia}
                            </div>
                          </header>
                        </li>
                      </Card>
                    ))
                  : ''}
                </ul>
              </div>
              <div className="row buttons-area">
                <button className="btn btn-primary" onClick={() => {
                  setAdvisor(initialAdvisor);
                  document.getElementById('set-advisor-area').style.display = 'none';
                }}>
                  Cancelar
                </button>

                <button className="btn btn-primary" onClick={() => {
                  document.getElementById('set-advisor-area').style.display = 'none';
                  document.getElementById('confirm-set-advisor-area').style.display = 'block';
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
            <div className="row">
              <h1 className="title">Confirmação</h1>
            </div>
            <div className="row text-area">
              Tem certeza que deseja alterar a assessoria da equipe?
            </div>
            <div className="row buttons-area">
              <div>
                <button className="btn btn-primary" onClick={() => {
                  setAdvisor(initialAdvisor);
                  document.getElementById('confirm-set-advisor-area').style.display = 'none';
                }}>
                  Cancelar
                </button>

                <button className="btn btn-primary" onClick={() => {
                  newAdvisor();
                  document.getElementById('confirm-set-advisor-area').style.display = 'none';
                  }}>
                  Salvar
                </button>
              </div>
            </div>
          </div>
        </ConfirmBoxModalScreen>
      </ModalScreen>


      {/* MODAL EVENTS */}

      <ModalScreen id="add-events-area" className="modal">
        <BoxModalScreen className="container box-modal-screen">
          <div className="modal-content animate view">
            <div className='row'>
              <h1 className="title">Novo evento</h1>
            </div>
            <div className="row inside-area">
              <div className="row input-area">
                <div className="col-md-6">
                  <label htmlFor="event-name">Nome do evento *</label>
                  <input type="text" className="form-control" id="event-name" name="event-name" placeholder="Nome" maxLength="190" required />
                </div>
                <div className="col-md-6">
                  <label htmlFor="event-description">Descrição do evento *</label>
                  <input type="text" className="form-control" id="event-description" name="event-description" placeholder="Descrição" required />
                </div>
              </div>
              <div className="row input-area">
                <div className="col-md-6">
                  <label htmlFor="event-date">Data do evento *</label>
                  <input type="date" className="form-control" id="event-date" name="event-date" required />
                </div>
                <div className="col-md-6">
                  <label htmlFor="event-time">Hora do evento *</label>
                  <input type="time" className="form-control" id="event-time" name="event-time" required />
                </div>
              </div>

              <div className="right">
                <div className="row buttons-area">
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
                    <button className="btn btn-primary" onClick={() => addEvent()}>Salvar</button>
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
            <div className="row">
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
                <div className="row buttons-area">
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


      {/* MODAL ARCHIVES */}

      <ModalScreen id="add-archives-area" className="modal">
        <ConfirmBoxModalScreen className="container box-modal-screen">
          <div className="modal-content animate view">
            <div className='row'>
              <h1 className="title">Adicionar arquivo</h1>
            </div>
            <div className="inside-area">
              <input type="text" className="form-control archive-input" id="archive_name" name="archive_name" placeholder="Nome do arquivo *" required /><br />
              <input type="file" className="form-control-file" id="input-file" name="input-file" required />
              <div className="row">
                <button className="btn-send-picture" onClick={() => {
                  setStateOfButtonPDF()
                  convertToBase64PDF()
                }} disabled={isEnabled2}>
                  {(isEnabled2) ? 'Carregado' : 'Carregar'}
                </button>
              </div>
              <div className="row buttons-area">
                <div>
                  <button className="btn btn-primary" onClick={() => document.getElementById('add-archives-area').style.display='none' }>
                    Cancelar
                  </button>
                  <button className="btn btn-primary" onClick={() => addArchive()}>Adicionar</button>
                </div>
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
                <button className="btn btn-primary" onClick={() => deleteArchive(selectedArchive)}>
                  Salvar
                </button>
              </div>
            </div>
          </div>
        </ConfirmBoxModalScreen>
      </ModalScreen>
    </Screen>
  );
}
