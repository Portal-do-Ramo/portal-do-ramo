import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import api from '../../services/api';

import Top_Left_Side_Menu from '../../components/Top_Left_Side_Menu';
import Bottom_Right_Side_Menu from '../../components/Bottom_Right_Side_Menu';
import Header from '../../components/Home_Header';

import { Screen, Content, Title } from './styles';

export default function SendFeedback () {
  const access_token = 'Bearer'.concat(sessionStorage.getItem("access_token"));
  const hierarquia = (useSelector(state => state.data[4]));
  const [alert, setAlert] = useState('');


  function send(e){
    e.preventDefault()
    api.post(`/api/feedbacks`, {
      satisfacao: document.getElementById('satisfaction').value,
      assunto: document.getElementById('subject').value,
      mensagem: document.getElementById('message').value,
    }, { headers: { Authorization: access_token } })
    .then(() => setAlert('<div class="alert alert-success" role="alert">Obrigado! Seu feedback foi enviado com sucesso!</div>'))
    .catch(() => setAlert('<div class="alert alert-danger" role="alert"><strong>Não foi possível enviar o feedback!</strong> Se o problema persistir, contate a diretoria!</div>'))
  }


  function statusButton() {
    if (
      hierarquia === 'Presidente' ||
      hierarquia === 'Vice-Presidente'
    ) {
      return false;
    } else {
      return true;
    }
  }


  useEffect(() => {
    document.getElementById('alert').innerHTML = alert;
  })


  return(
    <Screen>
      <Top_Left_Side_Menu />
      <Bottom_Right_Side_Menu />
      <div className="area-alert" id="alert" />
      <div className="container">
        <Header />

        <Content>
          <div className="feedback-box">
            <Title>Feedback</Title>
            <div id="alert" />
            <form onSubmit={send}>
              <div className="row rating-box">
                <div className="col-md-6">
                  <h2>Como foi sua experiência</h2>
                </div>

                <div className="col-md-6">
                  <select className="form-control" id="satisfaction">
                    <option value='5'>5 - Adorei!!</option>
                    <option value='4'>4 - Gostei muito</option>
                    <option value='3'>3 - Bom</option>
                    <option value='2'>2 - Podia melhorar</option>
                    <option value='1'>1 - Ruim</option>
                  </select>
                </div>
              </div>

              <hr />

              <h2>Conte um pouco mais...</h2>
              <label htmlFor="subject">Assunto *</label>
              <input
                type="text"
                id="subject"
                name="subject"
                className="form-control"
                autoComplete="off"
                maxLength="191"
                required
              />

              <label htmlFor="subject">Seu feedback *</label>
              <textarea
                className="form-control"
                id="message"
                name="message"
                placeholder="Conte para nós onde podemos melhorar!"
                required
              />

              <button type="submit" className="btn-send">Enviar</button>
            </form>
            <button className="btn-send" onClick={() => window.location.href="/feedback/list"} disabled={statusButton()}>Ver Feedbacks</button>
          </div>
        </Content>
      </div>
    </Screen>
  )
}
