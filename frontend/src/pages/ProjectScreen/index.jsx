import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import api from '../../services/api';

import Top_Left_Side_Menu from '../../components/Top_Left_Side_Menu';
import Bottom_Right_Side_Menu from '../../components/Bottom_Right_Side_Menu';
import Header from '../../components/Home_Header';
import Title from '../../components/Title';
import Loader from '../../components/LoaderSpinner';

import { Screen, Content, ViewEvents, CardEvent, BoxModalScreen, ModalScreen } from './styles';
import crown from './images/crown.png';
import avatar from './images/avatar.png';

export default function ProjectScreen () {
  document.title = 'Projetos';

  const hierarquia = (useSelector(state => state.data[4]));
  const teams = (useSelector(state => state.data[23]));
  const access_token = 'Bearer'.concat(sessionStorage.getItem("access_token"));
  const urlData = window.location.search.slice(1);

  if (urlData === '') {
    window.location.href = '/error';
  }

  const [project, setProject] = useState([]);
  const [leader, setLeader] = useState();
  const [advisor, setAdvisor] = useState();
  const [members, setMembers] = useState([]);
  const [events, setEvents] = useState([]);
  const [areas, setAreas] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState();
  const [isLoaded, setIsLoaded] = useState(false);


  useEffect(() => {
    api.get(`/api/projetos/projeto-membro/${urlData}`, { headers: { Authorization: access_token } })
    .then(response => {
      setProject(response.data)
      setLeader(response.data.lider)
      setAdvisor(response.data.assessor)
      setMembers(response.data.membros)
      setEvents(response.data.eventos)
      setAreas(response.data.areas)
    })
    .catch(() => window.location.href = '/error')
    .finally(() => setIsLoaded(true))
  }, [])


  function statusManageButton() {
    if (
      hierarquia === 'Presidente' ||
      hierarquia === 'Vice-Presidente' ||
      hierarquia === 'Diretor de Projetos'
    ) {
      return false;
    } else {
      for(let index in teams) {
        console.log(teams[index])
        if(teams[index].funcao === 'Coordenador') {
          return false;
        }
      }
      return true;
    }
  }


  return (
    <Screen>
      <Top_Left_Side_Menu />
      <Bottom_Right_Side_Menu />

      <div className="container">
        <Header />

        <Title title="Visualizar projeto" />

        {(isLoaded) ?
          <Content>
            <header>
              <h1>{(project) ? project.nome : ''}</h1>
              <h2>{(project) ? project.nome_equipe : ''}</h2>
              <button className="btn-manage" onClick={() => window.location.href=`/projects/manage/control?${urlData}`} disabled={ statusManageButton() }>Gerenciar</button>
            </header>

            <div className="row">
              <div className="col-md-4">
                <span><strong>Data de início: </strong>{(project.data_inicio) ? (project.data_inicio.split('-')[2]).concat('/' + project.data_inicio.split('-')[1]).concat('/' + project.data_inicio.split('-')[0]) : ''}</span><br />
              </div>
              <div className="col-md-4">
                <span><strong>Status: </strong>{(project) ? project.estagio : ''}</span><br />
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <span><strong>Data de término prevista: </strong>{(project.data_fim) ? (project.data_fim.split('-')[2]).concat('/' + project.data_fim.split('-')[1]).concat('/' + project.data_fim.split('-')[0]) : ''}</span>
              </div>
              <div className="col-md-4">
                <a href={(project) ? project.link_trello : ''} target="_blank">Acessar Trello da equipe</a>
              </div>
            </div>


            <hr />
            <div className="row">
              <div className="col-md-6">
                <div className="btn-card-blue">
                  <div>
                    <label>{(leader) ? 'Líder do projeto' : 'Não alocado'}</label>
                    <img src={(leader) ? leader.foto_url : avatar} className="leader-image" />
                    <h1 className="title-name" id="leader-name">{(leader) ? ((leader.nome_completo).split(' ')[0]).concat(' ' + (leader.nome_completo).split(' ')[1]) : 'Vazio'}</h1>
                    <h1 className="hierarchy"><img src={crown} className="icon" />Líder</h1>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="btn-card-blue">
                  <div>
                    <label>{(advisor) ? 'Assessor do projeto' : 'Não alocado'}</label>
                    <img src={(advisor) ? advisor.foto_url : avatar} className="leader-image" />
                    <h1 className="title-name" id="leader-name">{(advisor) ? ((advisor.nome_completo).split(' ')[0]).concat(' ' + (advisor.nome_completo).split(' ')[1]) : 'Vazio'}</h1>
                    <h1 className="hierarchy"><img src={crown} className="icon" />Assessor</h1>
                  </div>
                </div>
              </div>
            </div>
            <hr />

            <div className="row">
              <div className="col-md-12">
                <div className="box-members">
                  <h2>Membros</h2>
                  <hr />
                  {(project != '') ?
                    (project.membros) ?
                      (project.membros).map(member => (
                        <Link to={'/profile?'.concat(member.matricula)} key={member.matricula} >
                          <img src={member.foto_url} className='member-icon' title={member.nome_completo} alt={member.nome_completo}/>
                        </Link>
                      ))
                    : ''
                  : ''}
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-3">
                <div className="box-height-fixed">
                  <h2 className="title-box">Arquivos</h2>
                  <ViewEvents>
                    {/* {(archives) ?
                      archives.map(archive => (
                        <CardEvent key={archive}>
                          <button className="btn" onClick={() => console.log('file action')}></button>
                        </CardEvent>
                      ))
                    : ''} */}
                  </ViewEvents>
                  <hr />
                </div>
              </div>

              <div className="col-md-3">
                <div className="box-height-fixed">
                  <h2 className="title-box">Áreas</h2>
                  <ViewEvents>
                    {(areas) ?
                      areas.map(area => (
                        <div className="card" key={area}>
                          <h2 className="areas-name">{area}</h2>
                        </div>
                      ))
                    : ''}
                  </ViewEvents>
                </div>
              </div>

              <div className="col-md-6">
                <div className="box-height-fixed">
                  <h2 className="title-box">Eventos</h2>
                  <ViewEvents>
                    {(events) ?
                      events.map(event => (
                        <CardEvent key={event.uuid} onClick={() => {
                          setSelectedEvent(event)
                          document.getElementById('view-event-area').style.display='block'
                        }}>
                          <h2 className="event-name-tag">{event.nome_evento}</h2>
                          <p title={event.descricao} className="event-description-tag">{(event.descricao).substring(0, 150).concat('...')}</p>
                          <span className="event-datetime">{(event.data_evento.split('-')[2]).concat('/' + event.data_evento.split('-')[1]).concat('/' + event.data_evento.split('-')[0])} às {event.hora_evento}</span>
                        </CardEvent>
                      ))
                    : ''}
                  </ViewEvents>
                  </div>
              </div>
            </div>
          </Content>
        :
          <div className="area-loader">
            <Loader />
          </div>
        }
      </div>

      <ModalScreen id="view-event-area" className="modal" onClick={() => document.getElementById('view-event-area').style.display='none'}>
        <BoxModalScreen className="container box-modal-screen">
          <div className="modal-content animate view">
            <div className="row">
              <h1 className="title">Evento</h1>
            </div>
            <div className="row inside-area">
              {(selectedEvent) ?
                <div>
                  <h1>{selectedEvent.nome_evento}</h1><br />
                  <h2>
                    {(selectedEvent.data_evento).split('-')[2].concat('/' + (selectedEvent.data_evento).split('-')[1]) + ' '}
                    às
                    {' ' + (selectedEvent.hora_evento).split(':')[0].concat(':' + (selectedEvent.hora_evento).split(':')[1])}
                  </h2>
                  <textarea readOnly value={selectedEvent.descricao}/>
                  <div className="right">
                    <div className="row buttons-area">
                      <div>
                        <button className="btn btn-primary" onClick={() => document.getElementById('view-event-area').style.display='none'}>
                          Fechar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              : ''}
            </div>
          </div>
        </BoxModalScreen>
      </ModalScreen>
    </Screen>
  )
}
