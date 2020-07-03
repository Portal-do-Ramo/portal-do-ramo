import React from 'react';
import Routes from './routes';
import { useDispatch } from 'react-redux';
import echo from './services/echo';

function setNotifications(not) {
  return { type: 'SET_NOTIFICATIONS', not }
}

export default function App() {
  const matricula = sessionStorage.getItem('mt');
  const access_token = 'Bearer'.concat(sessionStorage.getItem('access_token'));
  echo.connector.options.auth.headers['Authorization'] = access_token;
  const dispatch = useDispatch();

  echo.private(`usuario.${matricula}`)
  .listen('.nova.notificacao', (e) => {
    const user = { notificacoes: e }
    dispatch(setNotifications(user))
  })

  return (
    <Routes />
  );
}
