import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import api from '../../services/api';

import Top_Left_Side_Menu from '../../components/Top_Left_Side_Menu';
import Bottom_Right_Side_Menu from '../../components/Bottom_Right_Side_Menu';
import Header from '../../components/Home_Header';
import Title from '../../components/Title';

import { Screen, Content, ViewEvents, CardEvent } from './styles';
import crown from './images/crown.png';

export default function ProjectScreen () {
  document.title = 'Projetos';

  const userLogged = useSelector(state => state.data[0]);
  const access_token = 'Bearer'.concat(sessionStorage.getItem("access_token"));
  const urlData = window.location.search.slice(1);

  const [project, setProject] = useState([]);
  const [leader, setLeader] = useState();
  const [advisor, setAdvisor] = useState();
  const [members, setMembers] = useState([]);
  const [events, setEvents] = useState([]);
  const [areas, setAreas] = useState([]);

  useEffect(() => {
    api.get(`/api/projetos/${urlData}`, { headers: { Authorization: access_token } })
    .then(response => {
      setProject(response.data)
      setLeader(response.data.lider)
      setAdvisor(response.data.assessor)
      setMembers(response.data.membros)
      setEvents(response.data.eventos)
      setAreas(response.data.areas)
      console.log(response.data)
    })
    .catch(error => console.log(error.response))
  }, [])

  function setBtnActive() {
    if(leader != '') {
      // if(userLogged == leader.matricula) {
      //   console.log('oeee')
      // }
      // console.log('oeeee2')
      console.log('Olá' + leader)
    }
  }

  return (
    <Screen>
      <Top_Left_Side_Menu />
      <Bottom_Right_Side_Menu />

      <div className="container">
        <Header />

        <Title title="Projeto" />

        <Content>
          <div>
            <h1 className="title-project">{(project) ? project.nome : ''}</h1>
            <h4 className="title-project">{(project) ? project.nome_equipe : ''}</h4>
            <button className="btn-manage">Gerenciar</button>
          </div>

          <div className="row">
            <div className="col-md-4">
              <span><strong>Data de início: </strong>{(project) ? project.data_inicio : ''}</span><br />
            </div>
            <div className="col-md-4">
              <span><strong>Status: </strong>{(project) ? project.estagio : ''}</span><br />
            </div>
            <div className="col-md-4">

            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <span><strong>Data de término prevista: </strong>{(project) ? project.data_fim : ''}</span>
            </div>
            <div className="col-md-4">
              <a href={(project) ? project.link_trello : ''} target="_blank">Acessar Trello da equipe</a>
            </div>
            <div className="col-md-4">

            </div>
          </div>


          <hr />
          <div className="row">
            <div className="col-md-6">
              <button className="btn-card-blue" onClick={() => window.location.href = '/profile?'.concat(leader.matricula)}>
                <div>
                  <img src={(leader) ? leader.foto_url : ''} className="leader-image" />
                  <h1 className="title-name" id="leader-name">{(leader) ? ((leader.nome_completo).split(' ')[0]).concat(' ' + (leader.nome_completo).split(' ')[1]) : ''}</h1>
                  <h1 className="hierarchy"><img src={crown} className="icon" />Líder</h1>
                </div>
              </button>
            </div>
            <div className="col-md-6">
              <button className="btn-card-blue" onClick={() => window.location.href = '/profile?'.concat(advisor.matricula)}>
                <div>
                  <img src={(advisor) ? advisor.foto_url : ''} className="leader-image" />
                  <h1 className="title-name" id="leader-name">{(advisor) ? ((advisor.nome_completo).split(' ')[0]).concat(' ' + (advisor.nome_completo).split(' ')[1]) : ''}</h1>
                  <h1 className="hierarchy"><img src={crown} className="icon" />Assessor</h1>
                </div>
              </button>
            </div>
          </div>
          <hr />

          <div className="row">
            <div className="col-md-12">
              <div className="box-members">
                <h2>Membros</h2>
                <hr />
                {(project != '') ?
                  (project.membros).map(member => (
                    <Link to={'/profile?'.concat(member.matricula)} key={member.matricula} >
                      <img src={member.foto_url} className='member-icon' title={member.nome_completo} alt={member.nome_completo}/>
                    </Link>
                  ))
                : ''}
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-3">
              <div className="box-height-fixed">
                <h2>Arquivos</h2>
                <hr />
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
                <h2>Áreas</h2>
                <hr />
                <ViewEvents>
                  {(areas) ?
                    areas.map(area => (
                      <CardEvent key={area}>
                        <h2 className="areas-name">{area}</h2>
                      </CardEvent>
                    ))
                  : ''}
                </ViewEvents>
              </div>
            </div>

            <div className="col-md-6">
              <div className="box-height-fixed">
                <h2>Eventos</h2>
                <hr />
                <ViewEvents>
                  {(events) ?
                    events.map(event => (
                      <CardEvent key={event.uuid} onClick={() => console.log('Action ver todo o evento modal') }>
                        <h2 className="event-name-tag">{event.nome_evento}</h2>
                        <p title={event.descricao} className="event-description-tag">{(event.descricao).substring(0, 150).concat('...')}</p>
                        <span className="event-datetime">{event.data_evento} às {event.hora_evento}</span>
                      </CardEvent>
                    ))
                  : ''}
                </ViewEvents>
                </div>
            </div>
          </div>
        </Content>
      </div>
    </Screen>
  )
}
