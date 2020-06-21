import React, { useState, useEffect } from 'react';
import api from '../../services/api';

import Top_Left_Side_Menu from '../../components/Top_Left_Side_Menu';
import Bottom_Right_Side_Menu from '../../components/Bottom_Right_Side_Menu';
import Header from '../../components/Home_Header';
import Title from '../../components/Title';
import Loader from '../../components/LoaderSpinner';
import NotificationBox_Item from '../../components/NotificationBoxItem';

import { Screen, View, ViewNotifications } from './styles';

export default function Search () {
  const access_token = 'Bearer'.concat(sessionStorage.getItem('access_token'));
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    api.get('/api/usuarios/minhas-notificacoes', {headers: { Authorization: access_token }})
    .then(response => setNotifications(response.data))
    .catch(() => window.location.href="/error")
  }, [])

  return (
    <Screen>
      <Top_Left_Side_Menu />
      <Bottom_Right_Side_Menu />

      <div className="container">
        <Header />
        {(notifications != '') ?
          <View>
            <Title title='Suas notificações' />
            <ViewNotifications>
              <ul id="view">
                {notifications.map(not => (
                  <NotificationBox_Item
                    title={not.titulo}
                    message={not.mensagem}
                    createdDate={not.data_criada}
                    read={not.lida}
                    link={not.link}
                    id={not.id}
                    key={not.id} />
                )).reverse()}
              </ul>
            </ViewNotifications>
          </View>
        :
          <div className="center">
            <Loader />
          </div>
        }
      </div>
    </Screen>
  )
}
