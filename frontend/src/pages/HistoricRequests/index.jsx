import React, { useState, useEffect } from 'react';
import api from '../../services/api';

import Top_Left_Side_Menu from '../../components/Top_Left_Side_Menu';
import Bottom_Right_Side_Menu from '../../components/Bottom_Right_Side_Menu';
import Header from '../../components/Home_Header';
import Title from '../../components/Title';
import Loader from '../../components/LoaderSpinner';

import { Screen, BoxModalScreen, ModalScreen } from './styles';

export default function HistoricRequests () {
  document.title = "Histórico de Pedidos";
  const access_token = 'Bearer'.concat(sessionStorage.getItem("access_token"));

  const [purchaseOrders, setPurchaseOrders] = useState([]);
  const [purchaseOrderSelected, setPurchaseOrderSelected] = useState();
  const [refundRequests, setRefundRequests] = useState([]);
  const [refundRequestSelected, setRefundRequestSelected] = useState();
  const [loaded, setLoaded] = useState(false);
  const [tab, setTab] = useState('compra');

  useEffect(() => {
    api.get('/api/pedidos/index-financeiro', { headers: { Authorization: access_token } })
    .then(response => {
      setPurchaseOrders(response.data.pedido_de_compra)
      setRefundRequests(response.data.pedido_de_reembolso)
    })
    .catch(() => window.location.href = '/error')
    .finally(() => setLoaded(true))
  }, [])

  return (
    <Screen>
      <Top_Left_Side_Menu />
      <Bottom_Right_Side_Menu />

      <div className="container">
        <Header />
        <Title title="Histórico de Pedidos" />

        <div className="row">
          <div className="col-md-6">
            <div className="left-box-gray">
              <div className="area-tabs">
                <button onClick={() => setTab('compra')}>Compra</button>
                <button onClick={() => setTab('reembolso')}>Reembolso</button>
              </div>
              <div className="view-request">
                {(loaded) ?
                  (tab === 'compra') ?
                    purchaseOrders.map(order => (
                      <div key={order.uuid} className="card-request click" id={order.uuid} onClick={() => setPurchaseOrderSelected(order)}>
                        <h1><strong>Solicitante:</strong> {((order.nome_membro_solicitou).split(' ')[0]).concat(' ' + (order.nome_membro_solicitou).split(' ')[1])}</h1>
                        <div className="row">
                          <div className="col-md-6">
                            <h2><strong>Projeto:</strong> {order.nome_projeto_solicitado}</h2>
                          </div>
                          <div className="col-md-3">
                            <h2><strong>Frete: R$</strong> {order.dados_pedido.valor_frete}</h2>
                          </div>
                          <div className="col-md-3">
                            <h2><strong>Total: R$</strong> {order.dados_pedido.valor_total}</h2>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-4 down">
                            <h2><strong>Data de solicitação:</strong> {order.data_criado}</h2>
                          </div>
                          <div className="col-md-4 down">
                            <h2><strong>Qtd. produtos:</strong> {(order.dados_pedido.pedidos).length}</h2>
                          </div>
                          <div className="col-md-4 down">
                            <h2><strong>Situação:</strong> {order.situacao}</h2>
                          </div>
                        </div>
                      </div>
                    ))
                  :
                    refundRequests.map(request => (
                      <div key={request.uuid} className="card-request click" id={request.uuid} onClick={() => setRefundRequestSelected(request)}>
                        <h1><strong>Solicitante:</strong> {((request.nome_membro_solicitou).split(' ')[0]).concat(' ' + (request.nome_membro_solicitou).split(' ')[1])}</h1>
                        <div className="row">
                          <div className="col-md-6">
                            <h2><strong>Projeto:</strong> {request.nome_projeto_solicitado}</h2>
                          </div>
                          <div className="col-md-6">
                            <h2><strong>Total: R$</strong> {request.dados_pedido.valor_total}</h2>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-12">
                            <h2><strong>Data de solicitação:</strong> {request.data_criado}</h2>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-12">
                            <h2><a href={request.dados_pedido.foto_comprovante} target="_blank">Ver comprovante</a></h2>
                          </div>
                        </div>
                      </div>
                    ))
                : <Loader />}
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="right-box-blue-gradient">
              {(tab == 'compra') ?
                (purchaseOrderSelected) ?
                  <div>
                    <div className="purchaseOrderData">
                      <h1><strong>Solicitante:</strong> {((purchaseOrderSelected.nome_membro_solicitou).split(' ')[0]).concat(' ' + (purchaseOrderSelected.nome_membro_solicitou).split(' ')[1])}</h1>
                      <div className="row">
                        <div className="col-md-12">
                          <h2><strong>Projeto:</strong> {purchaseOrderSelected.nome_projeto_solicitado}</h2>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <h2><strong>Frete: R$</strong> {purchaseOrderSelected.dados_pedido.valor_frete}</h2>
                        </div>
                        <div className="col-md-6">
                          <h2><strong>Total: R$</strong> {purchaseOrderSelected.dados_pedido.valor_total}</h2>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-8 down">
                          <h2><strong>Data de solicitação:</strong> {purchaseOrderSelected.data_criado}</h2>
                        </div>
                        <div className="col-md-4 down">
                          <h2><strong>Qtd. produtos:</strong> {(purchaseOrderSelected.dados_pedido.pedidos).length}</h2>
                        </div>
                      </div>
                      <h1 className="title">Produtos</h1>
                    </div>
                    <div className="view-products">
                      <div className="request-list">
                        {(purchaseOrderSelected.dados_pedido.pedidos) ?
                          (purchaseOrderSelected.dados_pedido.pedidos).map(product => (
                            <div key={(product.nome_produto).concat(product.link)} className="card-request">
                              <div className="row">
                                <div className="col-md-12">
                                  <h2><strong>Produto:</strong> {product.nome_produto}</h2>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-md-4">
                                  <h2><strong>Quantidade: </strong> {product.quantidade}</h2>
                                </div>
                                <div className="col-md-4">
                                  <h2><strong>Valor unitário: R$</strong> {product.valor_unitario}</h2>
                                </div>
                                <div className="col-md-4">
                                  <h2><strong>Loja: </strong> {product.nome_loja}</h2>
                                </div>
                              </div>
                              <div className="row">
                                <a href={product.link} target="_blank"><h2>Acessar página do produto</h2></a>
                              </div>
                            </div>
                          ))
                        : ''}
                      </div>
                    </div>
                  </div>
                : ''
              :
                (refundRequestSelected) ?
                  <div>
                    <div className="purchaseOrderData">
                      <h1><strong>Solicitante:</strong> {((refundRequestSelected.nome_membro_solicitou).split(' ')[0]).concat(' ' + (refundRequestSelected.nome_membro_solicitou).split(' ')[1])}</h1>
                      <div className="row">
                        <div className="col-md-12">
                          <h2><strong>Projeto:</strong> {refundRequestSelected.nome_projeto_solicitado}</h2>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <h2><strong>Frete: R$</strong> {refundRequestSelected.dados_pedido.valor_frete}</h2>
                        </div>
                        <div className="col-md-6">
                          <h2><strong>Total: R$</strong> {refundRequestSelected.dados_pedido.valor_total}</h2>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-8 down">
                          <h2><strong>Data de solicitação:</strong> {refundRequestSelected.data_criado}</h2>
                        </div>
                        <div className="col-md-4 down">
                          <h2><strong>Qtd. produtos:</strong> {(refundRequestSelected.dados_pedido.pedidos).length}</h2>
                        </div>
                      </div>
                      <h1 className="title">Produtos</h1>
                    </div>
                    <div className="request-list">
                      {(refundRequestSelected.dados_pedido.pedidos).map(product => (
                        <div key={(product.nome_produto).concat(product.link)} className="card-request">
                          <div className="row">
                            <div className="col-md-12">
                              <h2><strong>Produto:</strong> {product.nome_produto}</h2>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-4">
                              <h2><strong>Quantidade: </strong> {product.quantidade}</h2>
                            </div>
                            <div className="col-md-4">
                              <h2><strong>Valor unitário: R$</strong> {product.valor_unitario}</h2>
                            </div>
                            <div className="col-md-4">
                              <h2><strong>Loja: </strong> {product.nome_loja}</h2>
                            </div>
                          </div>
                          <div className="row">
                            <a href={product.link} target="_blank"><h2>Acessar página do produto</h2></a>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                : ''
              }
            </div>
          </div>
        </div>
      </div>
    </Screen>
  )
}
