import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import api from '../../services/api';

import Top_Left_Side_Menu from '../../components/Top_Left_Side_Menu';
import Bottom_Right_Side_Menu from '../../components/Bottom_Right_Side_Menu';
import Header from '../../components/Home_Header';
import Title from '../../components/Title';

import { Screen, Content } from './styles';

export default function InactivityRequest() {
  document.title = 'Pedido de Inatividade';
  const username = (useSelector(state => state.data[1])).split(' ')[0];
  const access_token = 'Bearer'.concat(sessionStorage.getItem('access_token'));

  const [alert, setAlert] = useState('');

  function sendInactivity(e){
    e.preventDefault()
    const reason = document.getElementById('reason').value;

    api.post('/api/pedidos/pedido-de-inatividade', {
      justificativa: reason
    }, { headers: { Authorization: access_token } })
    .then(() => setAlert('<div class="alert alert-success" role="alert"><strong>Pedido enviado para análise!</strong> Você será informado via e-mail sobre o resultado.</div>') )
    .catch(() => setAlert('<div class="alert alert-danger" role="alert"><strong>Não foi possível enviar seu pedido.</strong> Tente novamente mais tarde ou entre em contato direto com a diretoria através do e-mail: gp.ramocefet@gmail.com</div>'))
  }

  setTimeout(() => {
    if (alert !== '') {
      setAlert('')
    }
  }, 4000);

  useEffect(() => {
    document.getElementById('alert').innerHTML = alert
  })

  return (
    <Screen>
      <Top_Left_Side_Menu />
      <Bottom_Right_Side_Menu />

      <div className="container">
        <Header />
        <Title title="Pedido de Inatividade" />

        <Content>
          <h1>Olá {username}!</h1>
          <h2>Informe-nos abaixo a justificativa da sua inatividade.</h2>
          <div id="alert" />
          <form onSubmit={sendInactivity}>
            <textarea
              className="form-control"
              id="reason"
              placeholder="Sua justificativa"
              required
            />
            <button type="submit" className="btn-send">Enviar</button>
          </form>
        </Content>
      </div>
    </Screen>
  )
}
