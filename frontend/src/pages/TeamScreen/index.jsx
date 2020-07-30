import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import api from '../../services/api';

import Top_Left_Side_Menu from '../../components/Top_Left_Side_Menu';
import Bottom_Right_Side_Menu from '../../components/Bottom_Right_Side_Menu';
import Header from '../../components/Home_Header';
import Title from '../../components/Title';
import Loader from '../../components/LoaderSpinner';

import { Screen, CardEvent, CardArchive, BoxModalScreen, ModalScreen } from './styles';
import download from './images/download.png';

export default function TeamScreen() {
  document.title = 'Ver equipe';
  const access_token = 'Bearer'.concat(sessionStorage.getItem('access_token'));
  const urlData = window.location.search.slice(1);
  const hierarquia = (useSelector(state => state.data[4]));
  const teams = (useSelector(state => state.data[23]));

  const [teamData, setTeamData] = useState();
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState();
  const [archives, setArchives] = useState([]);

  if (urlData === '') {
    window.location.href = '/error';
  }

  useEffect(() => {
    api.get(`/api/equipes/equipe-membro/${urlData}`, { headers: { Authorization: access_token } })
    .then(response => {
      setEvents(response.data.eventos)
      setTeamData(response.data)
    })
    .catch(() => window.location.href = '/error')
  }, [])


  function downloadFile(archive) {
    api.get(`/api/arquivos/download/${archive.uuid}`, { headers: { Authorization: access_token },  responseType: 'blob' })
    .then(response => {
      const downloadUrl = window.URL.createObjectURL(response.data);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.setAttribute('download', `${archive.nome}.${archive.extensao_arquivo}`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    })
    .catch(error => console.log(error))
  }


  function statusManageButton() {
    if (
      hierarquia === 'Presidente' ||
      hierarquia === 'Vice-Presidente' ||
      hierarquia === 'Diretor de Projetos'
    ) {
      return false;
    } else {
      for(let index in teams) {
        if(teams[index].nome_equipe_slug === urlData) {
          if(teams[index].funcao === 'Coordenador') {
            return false;
          }
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
        <Title title="Ver equipe" />

        <div className="row">
          <div className="col-md-6">
            <div className="left-box-gray">
              {(teamData) ?
                <div>
                  <div className="center">
                    <img src={teamData.foto_url} alt="logo-team" />
                  </div>
                  <h1>{teamData.nome_equipe}</h1>
                  <h3><strong>Capítulo:</strong> {teamData.capitulo}</h3>
                  <hr />
                  <h2>Membros</h2>
                  <div className="view-members">
                    {(teamData.membros) ?
                      (teamData.membros).map(member => (
                        <Link to={'/profile?' + member.matricula}><img key={member.matricula} src={member.foto_url} className='member-icon' title={member.nome_completo + ' - ' + member.funcao} alt={member.nome_completo}/></Link>
                      ))
                    : 'Não possui membros...'}
                  </div>
                </div>
              :
                <div className="area-loader">
                  <Loader />
                </div>
              }
            </div>
          </div>
          <div className="col-md-6">
            <div className="right-box-blue-gradient">
              <div className="events-area">
                <h1 className="title-area">Eventos</h1>
                <div className="view-events">
                  {(events) ?
                    events.map(event => (
                      <CardEvent key={event.uuid} onClick={() => {
                        setSelectedEvent(event)
                        document.getElementById('view-event-area').style.display='block'
                      }}>
                        <h2 className="event-name-tag">{event.nome_evento}</h2>
                        <p title={event.descricao} className="event-description-tag">{(event.descricao).substring(0, 150).concat('...')}</p>
                        <span className="event-datetime">
                          {(event.data_evento).split('-')[2].concat('/' + (event.data_evento).split('-')[1]) + ' '}
                          às
                          {' ' + (event.hora_evento).split(':')[0].concat(':' + (event.hora_evento).split(':')[1])}
                        </span>
                      </CardEvent>
                    ))
                  : ''}
                </div>
              </div>
              <div className="archives-area">
                <h1 className="title-area">Arquivos</h1>
                <div className="view-archives">
                  {(archives) ?
                    archives.map(archive => (
                      <CardArchive key={archive.uuid} className="archive-card" onClick={() => downloadFile(archive)} title="Download">
                        <h1>{archive.nome}</h1>
                        <h2><img src={download} alt="download" title="Download" /></h2>
                      </CardArchive>
                    ))
                  : ''}
                </div>
              </div>
            </div>
          </div>
        </div>
        <br />
        <button className="btn-send" onClick={() => window.location.href=`/team/manageteams/manage?${urlData}`} disabled={ statusManageButton() }>Gerenciar</button>
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
