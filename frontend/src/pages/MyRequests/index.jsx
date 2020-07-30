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
  const [isLoaded, setIsLoaded] = useState(false);
  const [requestSelected, setRequestSelected] = useState();

  useEffect(() => {
    api.get('/api/pedidos/meus-pedidos', { headers: { Authorization: access_token } })
    .then(response => setRequests(response.data))
    // .catch(() => window.location.href = '/error')
    .catch(error => console.log(error.response))
    .finally(() => setIsLoaded(true))
  }, [])

  return (
    <Screen>
      <Top_Left_Side_Menu />
      <Bottom_Right_Side_Menu />

      <div className="container">
        <Header />
        <Title title="Meus pedidos" />

        <div className="row">
          <div className="col-md-6">
            <div className="left-box-gray">
              <select className="form-control" value={type} onChange={e => setType(e.target.value)}>
                <option value="pedido_de_compra">Pedidos de Compra</option>
                <option value="pedido_de_reembolso">Pedidos de Reembolso</option>
                <option value="pedido_de_inatividade">Pedidos de Inatividade</option>
                <option value="pedido_de_desligamento">Pedidos de Desligamento</option>
                <option value="pedido_de_saida_de_projeto">Pedidos de Saída de Projeto</option>
              </select>

              <div className="view-requests">
                {(isLoaded) ?
                  (type === 'pedido_de_compra') ?
                    (requests) ?
                      (requests.pedido_de_compra) ?
                        (requests.pedido_de_compra).map(request => (
                          <Card key={request.uuid} onClick={() => setRequestSelected(request)}>
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
                                <h3><strong>Quantidade de produtos: </strong>{request.dados_pedido.pedidos.length}</h3>
                              </div>
                              <div className="col-md-6">
                                <h3><strong>Valor total: R$</strong> {request.dados_pedido.valor_total}</h3>
                              </div>
                            </div>
                          </Card>
                        ))
                      : ''
                    : ''
                  :
                    (type === 'pedido_de_reembolso') ?
                      (requests) ?
                        (requests.pedido_de_reembolso) ?
                          (requests.pedido_de_reembolso).map(request => (
                            <Card key={request.uuid} onClick={() => setRequestSelected(request)}>
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
                                  <h3><strong>Quantidade de produtos: </strong>{request.dados_pedido.pedidos.length}</h3>
                                </div>
                                <div className="col-md-6">
                                  <h3><strong>Valor total: R$</strong> {request.dados_pedido.valor_total}</h3>
                                </div>
                              </div>
                            </Card>
                          ))
                        : ''
                      : ''
                    :
                      (type === 'pedido_de_inatividade') ?
                        (requests) ?
                          (requests.pedido_de_inatividade) ?
                            (requests.pedido_de_inatividade).map(request => (
                              <Card key={request.uuid} onClick={() => setRequestSelected(request)}>
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
                                    {(request.data_aprovado) ? <h2><strong>Data aprovado: </strong>{request.data_aprovado}</h2> : ''}
                                  </div>
                                </div>
                              </Card>
                            ))
                          : ''
                        : ''
                      :
                        (type === 'pedido_de_desligamento') ?
                          (requests) ?
                            (requests.pedido_de_desligamento) ?
                              (requests.pedido_de_desligamento).map(request => (
                                <Card key={request.uuid} onClick={() => setRequestSelected(request)}>
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
                                      {(request.data_aprovado) ? <h2><strong>Data aprovado: </strong>{request.data_aprovado}</h2> : ''}
                                    </div>
                                  </div>
                                </Card>
                              ))
                            : ''
                          : ''
                        :
                          (requests) ?
                            (requests.pedido_de_saida_de_projeto) ?
                              (requests.pedido_de_saida_de_projeto).map(request => (
                                <Card key={request.uuid} onClick={() => setRequestSelected(request)}>
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
                                      {(request.data_aprovado) ? <h2><strong>Data aprovado: </strong>{request.data_aprovado}</h2> : ''}
                                    </div>
                                  </div>
                                </Card>
                              ))
                            : ''
                          : ''
                :
                  <div className="area-loader">
                    <Loader />
                  </div>
                }
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="right-box-blue-gradient">
              {(requestSelected) ?
                <div>
                  <h1 className="title-box">{requestSelected.nome_tipo}</h1>

                  <h2 className="data-box"><strong>Data de criação: </strong>{requestSelected.data_criado}</h2>
                  <h2 className="data-box"><strong>Situação: </strong>{requestSelected.situacao}</h2>
                  {(requestSelected.data_aprovado) ? <h2 className="data-box"><strong>Data de aprovação: </strong> {(requestSelected.data_aprovado) ? requestSelected.data_aprovado : ''}</h2> : ''}
                  {(requestSelected.tipo_pedido === 'pedido-de-compra') ? <h2 className="data-box"><strong>Qtd. itens: </strong> {requestSelected.dados_pedido.pedidos.length} </h2> : ''}
                  {(requestSelected.tipo_pedido === 'pedido-de-compra') ? <h2 className="data-box"><strong>Valor frete: </strong>R$ {requestSelected.dados_pedido.valor_frete} </h2> : ''}
                  {(requestSelected.tipo_pedido === 'pedido-de-compra') ? <h2 className="data-box"><strong>Valor total: </strong>R$ {requestSelected.dados_pedido.valor_total} </h2> : ''}
                  {(requestSelected.tipo_pedido === 'pedido-de-compra' || requestSelected.tipo_pedido === 'pedido-de-reembolso') ?
                    <div className="view-products">
                      {requestSelected.dados_pedido.pedidos.map(request => (
                        <Card key={(request.nome_produto).concat(request.link)}>
                          <h1 className="product-name">{request.nome_produto}</h1>
                          <h1 className="product-data"><strong>Valor unitário: </strong>R$ {request.valor_unitario}</h1>
                          <h1 className="product-data"><strong>Quantidade: </strong>{request.quantidade}</h1>
                          <h1 className="product-data"><strong>Total: </strong>R$ {(request.quantidade) * (request.valor_unitario)}</h1>
                          <a href={request.link} target="_blank">Acessar página do produto</a>
                        </Card>
                      ))}
                    </div>
                  : ''}
                  {(requestSelected.tipo_pedido === 'pedido-de-inatividade' || requestSelected.tipo_pedido === 'pedido-de-desligamento'  || requestSelected.tipo_pedido === 'pedido-de-saida-de-projeto') ?
                    <div className="view-reason">
                      <h2 className="subtitle"><strong>Justificativa</strong></h2>
                      <textarea readOnly value={requestSelected.dados_pedido.justificativa} />
                    </div>
                  : ''}
                </div>
              : ''}
            </div>
          </div>
        </div>
      </div>
    </Screen>
  )
}
