import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import echo from '../../services/echo';

import NotificationBoxItem from '../NotificationBoxItem';
import { Box, Title, Notifications } from './styles';

export default function NotificationBox (props) {
  const [notifications, setNotifications] = useState(useSelector(state => state.data[22]));
  const matricula = useSelector(state => state.data[0]);

  const access_token = 'Bearer'.concat(sessionStorage.getItem('access_token'));
  echo.connector.options.auth.headers['Authorization'] = access_token;

  echo.private(`usuario.${matricula}`)
  .listen('.nova.notificacao', (e) => {
    setNotifications(notifications => [...notifications, e]);
  })

  return (
    <section>
      <Box>
        <div className="row">
          <Title>
            Notificações
          </Title>
        </div>
        <Notifications>
          {(notifications) ? notifications.map(not => (
            <NotificationBoxItem
              title={not.titulo}
              message={not.mensagem}
              createdDate={not.data_criada}
              read={not.lida}
              link={not.link}
              id={not.id}
              key={not.id}/>
          )).reverse() : ''}
        </Notifications>
        <small><Link to="/notifications">Ver todas</Link></small>
      </Box>
    </section>
  )
}
