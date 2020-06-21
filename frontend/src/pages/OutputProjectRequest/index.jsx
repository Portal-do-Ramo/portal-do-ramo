import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import api from '../../services/api';

import Top_Left_Side_Menu from '../../components/Top_Left_Side_Menu';
import Bottom_Right_Side_Menu from '../../components/Bottom_Right_Side_Menu';
import Header from '../../components/Home_Header';
import Title from '../../components/Title';

import { Screen, Content } from './styles';

export default function OutputProjectRequest() {
  const username = (useSelector(state => state.data[1])).split(' ')[0];
  const access_token = 'Bearer'.concat(sessionStorage.getItem('access_token'));

  const [listProjects, setListProjects] = useState([]);
  const [alert, setAlert] = useState('');

  function sendShutdown(e){
    e.preventDefault();
    const date = document.getElementById('output-date').value.split('-');
    const date_pattern = date[2] + '/' + date[1] + '/' + date[0];
    console.log(document.getElementById('select-project').value)
    api.post('/api/pedidos/pedido-de-saida-de-projeto', {
      nome_projeto: document.getElementById('select-project').value,
      justificativa: document.getElementById('reason').value,
      data_saida: date_pattern
    }, { headers: { Authorization: access_token } })
    .then(() => setAlert('<div class="alert alert-success" role="alert"><strong>Pedido enviado para análise!</strong> Você será informado via e-mail sobre o resultado.</div>') )
    .catch(() => setAlert('<div class="alert alert-danger" role="alert"><strong>Não foi possível enviar seu pedido.</strong> Tente novamente mais tarde ou entre em contato direto com a diretoria através do e-mail: gp.ramocefet@gmail.com</div>') )
  }

  useEffect(() => {
    api.get('/api/projetos/select-projetos', { headers: { Authorization: access_token } })
    .then(response => setListProjects(response.data))
    .catch(error => console.log(error))
  }, [])

  useEffect(() => {
    document.getElementById('alert').innerHTML = alert
  })

  return (
    <Screen>
      <Top_Left_Side_Menu />
      <Bottom_Right_Side_Menu />

      <div className="container">
        <Header />
        <Title title="Pedido de Saída de Projeto" />

        <Content>
          <h1>Olá {username}!</h1>
          <h2>Informe-nos abaixo as informações solicitadas.</h2>
          <div id="alert" />
          <form onSubmit={sendShutdown}>
            <div className="row project-date">
              <div className="col-md-6">
                <label htmlFor="select-project">Projeto</label>
                <select className="form-control" id="select-project">
                  {(listProjects) ? listProjects.map(project => (
                    <option key={project.nome_projeto_slug} value={project.nome_projeto_slug}>{project.nome_projeto}</option>
                  ))
                  :
                  ''}
                </select>
              </div>

              <div className="col-md-6">
                <label htmlFor="output-date">Data de Saída</label>
                <input
                  type="date"
                  className="form-control"
                  id="output-date"
                  required
                />
              </div>
            </div>

            <label htmlFor="reason">Justificativa</label>
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
