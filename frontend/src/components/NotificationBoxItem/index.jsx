import React, { useState } from 'react';
import api from '../../services/api';

import { Notification, BoxNotification, Screen } from './styles.js';

export default function NotificationBoxItem (props) {
  const access_token = 'Bearer'.concat(sessionStorage.getItem('access_token'));
  const [isRead, setIsRead] = useState(props.read);

  function markAsRead(id){
    api.put(`/api/usuarios/notificacoes/ler/${id}`, {}, { headers: { Authorization: access_token } })
    .then(() => (!isRead) ? setIsRead(!isRead) : '')
    .catch(error => console.log(error))
  }

  return (
    <>
      <Notification
        id={props.id}
        bgColor={(!isRead) ? '#E9EDF5' : '#E0E0E0'}
        onClick={() => {
          markAsRead(props.id)
          document.getElementById('notification-area').style.display='block'
        }}
        >
        <div className="row">
          <h1 className="notification-title">{props.title}</h1>
          <div className="w-100" />
          <p className="notification-message">{((props.message).substring(0, 95)).concat('...')}</p>
          <div className="w-100" />
          <span>{props.createdDate}</span>
        </div>
      </Notification>

      <Screen id="notification-area" className="modal" onClick={() => document.getElementById('notification-area').style.display='none'}>
    		<BoxNotification className="container box-notification">
          <div className="modal-content animate view">
            <div className='row'>
              <h1 className="title">Notificação</h1>
              <button onClick={() => document.getElementById('notification-area').style.display='none'}>Fechar</button>
            </div>
            <div className="row text-area">
              <h1>{props.title}</h1>
              <div className="message-area">
                <p>{props.message}</p>
              </div>
              <span>{props.createdDate}</span>
            </div>
          </div>
    		</BoxNotification>
			</Screen>
    </>
  )
}
