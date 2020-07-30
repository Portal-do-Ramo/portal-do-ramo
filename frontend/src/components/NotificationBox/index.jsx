import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import api from '../../services/api';
import echo from '../../services/echo';

import { Box, Title, Notifications, BoxNotification, Notification,  Screen } from './styles';

export default function NotificationBox () {
  const matricula = useSelector(state => state.data[0]);
  const [notifications, setNotifications] = useState(useSelector(state => state.data[22]));
  const [selectedNotification, setSelectedNotification] = useState();

  const access_token = 'Bearer'.concat(sessionStorage.getItem('access_token'));
  echo.connector.options.auth.headers['Authorization'] = access_token;

  echo.private(`usuario.${matricula}`)
  .listen('.nova.notificacao', (e) => {
    setNotifications(notifications => [...notifications, e]);
  })


  function markAsRead(id){
    api.put(`/api/usuarios/notificacoes/ler/${id}`, {}, { headers: { Authorization: access_token } })
    .then(() => document.getElementById(id).style.backgroundColor = '#E0E0E0')
    .catch(error => console.log(error))
  }


  return (
    <React.Fragment>
      <Box>
        <div className="row">
          <Title>
            Notificações
          </Title>
        </div>
        <Notifications>
          {(notifications) ? notifications.map(not => (
            <Notification
              id={not.id}
              key={not.id}
              onClick={() => {
                markAsRead(not.id)
                setSelectedNotification(not)
                document.getElementById('notification-area').style.display='block'
              }}
            >
              <div className="row">
                <h1 className="notification-title">{not.titulo}</h1>
                <div className="w-100" />
                <p className="notification-message">{((not.mensagem).substring(0, 95)).concat('...')}</p>
                <div className="w-100" />
                <span>{not.data_criada}</span>
              </div>
            </Notification>
          )).reverse() : ''}
        </Notifications>
        <small><Link to="/notifications">Ver todas</Link></small>
      </Box>

      <Screen id="notification-area" className="modal" onClick={() => document.getElementById('notification-area').style.display='none'}>
    		<BoxNotification className="container box-notification">
          <div className="modal-content animate view">
            <div className='row'>
              <h1 className="title">Notificação</h1>
              <button onClick={() => document.getElementById('notification-area').style.display='none'}>Fechar</button>
            </div>
            <div className="row text-area">
              <h1>{(selectedNotification) ? selectedNotification.titulo : ''}</h1>
              <div className="message-area">
                <p>{(selectedNotification) ? selectedNotification.mensagem : ''}</p>
              </div>
              <span>{(selectedNotification) ? selectedNotification.data_criada : ''}</span>
            </div>
          </div>
    		</BoxNotification>
			</Screen>
    </React.Fragment>
  )
}
