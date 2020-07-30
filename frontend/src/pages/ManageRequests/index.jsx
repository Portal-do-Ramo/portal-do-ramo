import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { useSelector } from 'react-redux';

import Top_Left_Side_Menu from '../../components/Top_Left_Side_Menu';
import Bottom_Right_Side_Menu from '../../components/Bottom_Right_Side_Menu';
import Header from '../../components/Home_Header';
import Title from '../../components/Title';
import Loader from '../../components/LoaderSpinner';

import { Screen, Card } from './styles';

export default function ManageRequests() {
  document.title = 'Gerenciar pedidos';
  const access_token = 'Bearer'.concat(sessionStorage.getItem("access_token"));
  const hierarquia = (useSelector(state => state.data[4]));

  const [outputProjectRequest, setOutputProjectRequest] = useState([]);
  const [inactivityRequest, setInactivityRequest] = useState([]);
  const [shutdownRequest, setShutdownRequest] = useState([]);
  const [selectedType, setSelectedType] = useState('inatividade');
  const [selectedRequest, setSelectedRequest] = useState();
  const [isLoaded, setIsLoaded] = useState(false);
  const [alert, setAlert] = useState('');

  if (
    hierarquia !== 'Diretor de Gestão de Pessoas' &&
    hierarquia !== 'Presidente' &&
    hierarquia !== 'Vice-Presidente'
  ) {
    window.location.href = '/noaccess'
  }

  useEffect(() => {
    api.get('/api/pedidos/index-pessoas', { headers: { Authorization: access_token } })
    .then(response => {
      setOutputProjectRequest(response.data.pedido_de_saida_de_projeto)
      setInactivityRequest(response.data.pedido_de_inatividade)
      setShutdownRequest(response.data.pedido_de_desligamento)
    })
    .catch(() => window.location.href = '/error')
    .finally(() => setIsLoaded(true))
  }, [])

  setTimeout(() => {
    if (alert !== '') {
      setAlert('')
    }
  }, 4000);

  function approveRequest() {
    api.put(`/api/pedidos/pedido-de-${selectedType}/aprovar/${selectedRequest.uuid}`, {}, { headers: { Authorization: access_token } })
    .then(() => {
      setAlert('<div class="alert alert-success" role="alert">Pedido aprovado com sucesso!</div>')
      window.location.href = '/managerequests'
    })
    .catch(() => setAlert('<div class="alert alert-danger" role="alert"><strong>Não foi possível aprovar o pedido.</strong> Se o problema persistir, favor contate a diretoria.</div>'))
  }


  function disapproveRequest() {
    api.delete(`/api/pedidos/pedido-de-${selectedType}/recusar/${selectedRequest.uuid}`, { headers: { Authorization: access_token } })
    .then(() => {
      setAlert('<div class="alert alert-success" role="alert">Pedido reprovado com sucesso!</div>')
      window.location.href = '/managerequests'
    })
    .catch(() => setAlert('<div class="alert alert-danger" role="alert"><strong>Não foi possível reprovar o pedido.</strong> Se o problema persistir, favor contate a diretoria.</div>'))
  }


  useEffect(() => {
    document.getElementById('alert').innerHTML = alert;
  })


  return (
    <Screen>
      <Top_Left_Side_Menu />
      <Bottom_Right_Side_Menu />

      <div className="container">
        <div className="center-alert">
          <div className="area-alert" id="alert" />
        </div>
        <Header />

        <Title title="Gerenciar pedidos" />

        {(isLoaded) ?
          <div className="row">
            <div className="col-md-6">
              <div className="left-box-gray">
                <select className="form-control" value={selectedType} onChange={e => setSelectedType(e.target.value)}>
                  <option value="inatividade">Pedidos de Inatividade</option>
                  <option value="desligamento">Pedidos de Desligamento</option>
                  <option value="saida-de-projeto">Saídas de Projetos</option>
                </select>

                <div className="view-requests">
                  {(selectedType === 'inatividade') ?
                    (inactivityRequest) ?
                      inactivityRequest.map(request => (
                        <Card key={request.uuid} onClick={() => setSelectedRequest(request)}>
                          <h1>{(request.nome_membro_solicitou.split(' ')[0]).concat(' ' + request.nome_membro_solicitou.split(' ')[1])}</h1>
                          <h2><strong>Data do pedido:</strong> {request.data_criado}</h2>
                          <h2><strong>Situação:</strong> {request.situacao}</h2>
                        </Card>
                      ))
                    : ''
                  :
                    (selectedType === 'desligamento') ?
                      (shutdownRequest) ?
                        shutdownRequest.map(request => (
                          <Card key={request.uuid} onClick={() => setSelectedRequest(request)}>
                            <h1>{(request.nome_membro_solicitou.split(' ')[0]).concat(' ' + request.nome_membro_solicitou.split(' ')[1])}</h1>
                            <h2><strong>Data do pedido:</strong> {request.data_criado}</h2>
                            <h2><strong>Situação:</strong> {request.situacao}</h2>
                          </Card>
                        ))
                      : ''
                    :
                      (outputProjectRequest) ?
                        outputProjectRequest.map(request => (
                          <Card key={request.uuid} onClick={() => setSelectedRequest(request)}>
                            <h1>{(request.nome_membro_solicitou.split(' ')[0]).concat(' ' + request.nome_membro_solicitou.split(' ')[1])}</h1>
                            <h2><strong>Data do pedido:</strong> {request.data_criado}</h2>
                            <h2><strong>Situação:</strong> {request.situacao}</h2>
                          </Card>
                        ))
                      : ''
                  }
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="right-box-blue-gradient">
                {(selectedRequest) ?
                  <div>
                    <h1>{selectedRequest.nome_tipo}</h1>
                    <h2><strong>Membro:</strong> {(selectedRequest.nome_membro_solicitou.split(' ')[0]).concat(' ' + selectedRequest.nome_membro_solicitou.split(' ')[1])}</h2>
                    <h2><strong>Data do pedido: </strong>{selectedRequest.data_criado}</h2>
                    <h2><strong>Situação: </strong>{selectedRequest.situacao}</h2>
                    <textarea value={selectedRequest.dados_pedido.justificativa} readOnly />
                    {(selectedRequest.situacao === 'Pendente') ?
                      <div className="area-buttons">
                        <button onClick={() => approveRequest()}>Aprovar</button>
                        <button onClick={() => disapproveRequest()}>Reprovar</button>
                      </div>
                    : ''}
                  </div>
                : <h1>Selecione um pedido</h1>}
              </div>
            </div>
          </div>
        :
          <div className="area-loader">
            <Loader />
          </div>
        }
      </div>
    </Screen>
  )
}
