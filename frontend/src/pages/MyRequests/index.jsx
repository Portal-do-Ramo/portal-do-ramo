import React, { useState, useEffect } from 'react';
import api from '../../services/api';

import Top_Left_Side_Menu from '../../components/Top_Left_Side_Menu';
import Bottom_Right_Side_Menu from '../../components/Bottom_Right_Side_Menu';
import Header from '../../components/Home_Header';
import Title from '../../components/Title';
import Loader from '../../components/LoaderSpinner';

import { Screen, Card } from './styles';

export default function MyRequests() {
  document.title = 'Meus pedidos';
  const access_token = 'Bearer'.concat(sessionStorage.getItem("access_token"));

  const [requests, setRequests] = useState([]);
  const [type, setType] = useState('pedido_de_compra');

  useEffect(() => {
    api.get('/api/pedidos/meus-pedidos', { headers: { Authorization: access_token } })
    .then(response => setRequests(response.data))
    .catch(error => console.log(error.response))
  }, [])

  return (
    <Screen>
      <Top_Left_Side_Menu />{console.log(requests)}
      <Bottom_Right_Side_Menu />

      <div className="container">
        <Header />
        <Title title="Meus pedidos" />

        <div className="row">
          <div className="col-md-6">
            <div className="left-box-gray">
              <select className="form-control" value={type} onChange={e => setType(e.target.value)}>
                <option value="pedido_de_compra">Pedidos de compra</option>
                <option value="pedido_de_reembolso">Pedidos de Reembolso</option>
                <option value="pedido_de_inatividade">Pedidos de Inatividade</option>
                <option value="pedido_de_desligamento">Pedidos de Desligamento</option>
                <option value="pedido_de_saida_de_projeto">Pedidos de Saída de Projeto</option>
              </select>

              <div className="view-requests">
                {(type === 'pedido-de-compra') ?
                  (requests) ?
                    (requests.pedido_de_compra) ?
                      (requests.pedido_de_compra).map(request => (
                        <Card key={request.uuid}>
                          <h1><strong>Projeto: </strong>{request.nome_projeto_solicitado}</h1>
                          <div className="row">
                            <div className="col-md-6">
                              <h2><strong>Data_criado: </strong>{request.data_criado}</h2>
                            </div>
                            <div className="col-md-6">
                              <h2><strong>Situação: </strong>{request.situacao}</h2>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-6">
                              <h3><strong>Quantidade de produtos: </strong>{request.dados_pedidos.pedidos.length}</h3>
                            </div>
                            <div className="col-md-6">
                              <h3><strong>Valor total: R$</strong> {request.dados_pedidos.valor_total}</h3>
                            </div>
                          </div>
                        </Card>
                      ))
                    : ''
                  : ''
                : ''}
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="right-box-blue-gradient">

            </div>
          </div>
        </div>
      </div>
    </Screen>
  )
}
