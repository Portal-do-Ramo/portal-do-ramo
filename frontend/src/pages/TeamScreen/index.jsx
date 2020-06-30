import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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

  const [teamData, setTeamData] = useState();
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState();
  const [archives, setArchives] = useState([]);

  useEffect(() => {
    api.get(`/api/equipes/${urlData}`, { headers: { Authorization: access_token } })
    .then(response => {
      setEvents(response.data.eventos)
      setTeamData(response.data)
    })
    .catch(() => window.location.href = '/error')
  }, [])


  function downloadArchive(archive) {
    api.get(`/api/equipes/${archive.nome}`, { headers: { Authorization: access_token },  responseType: 'blob' })
    .then(response => {
      const downloadUrl = window.URL.createObjectURL(response.data);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.setAttribute('download', `${response.headers['content-disposition'].substr(21)}`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    })
    .catch(error => console.log(error))
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
                  {(teamData.membros) ?
                    (teamData.membros).map(member => (
                      <Link to={'/profile?' + member.matricula}><img key={member.matricula} src={member.foto_url} className='member-icon' title={member.nome_completo + ' - ' + member.funcao} alt={member.nome_completo}/></Link>
                    ))
                  : 'Não possui membros...'}
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
                      <CardArchive key={archive.nome} className="archive-card" onClick={() => downloadArchive(archive)} title="Download">
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