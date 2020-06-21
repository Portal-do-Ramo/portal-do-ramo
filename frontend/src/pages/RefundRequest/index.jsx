import React, { useState, useEffect } from 'react';
import api from '../../services/api';

import Top_Left_Side_Menu from '../../components/Top_Left_Side_Menu';
import Bottom_Right_Side_Menu from '../../components/Bottom_Right_Side_Menu';
import Header from '../../components/Home_Header';
import Title from '../../components/Title';

import { Screen, CardItem } from './styles';

export default function RefundRequest() {
  document.title = 'Pedido de Reembolso';
  const access_token = 'Bearer'.concat(sessionStorage.getItem("access_token"));

  const [myRequests, setMyRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState();
  const [alert, setAlert] = useState('');

  useEffect(() => {
    api.get('/api/pedidos/meus-pedidos', { headers: { Authorization: access_token } })
    .then(response => setMyRequests(response.data.pedido_de_compra))
    .catch(() => window.location.href="/error")
  }, [])


  function sendData() {
    let receipt = '';

    api.post(`/api/pedidos/${selectedRequest}/solicitar-reembolso`, {
      foto_comprovante: receipt
    }, { headers: { Authorization: access_token } })
    .then(() => setAlert('<div class="alert alert-success" role="alert"><strong>Pedido de reembolso enviado com sucesso!</strong></div>'))
    .catch(() => setAlert('<div class="alert alert-danger" role="alert"><strong>Não foi possível enviar a solicitação.</strong> Se o problema persistir, favor contate a diretoria.</div>'))
  }


  useEffect(() => {
    document.getElementById('alert').innerHTML = alert;
  })


  return (
    <Screen>
      <Top_Left_Side_Menu />
      <Bottom_Right_Side_Menu />
      <div className="area-alert" id="alert" />
      <div className="container">
        <Header />
        <Title title="Pedido de Reembolso" />

        <div className="row">
          <div className="col-md-6">
            <div className="left-box-blue-gradient">
              <h1 className="title-box white">Selecione o pedido</h1>
              <div className="viewRequests">
                {/* {(myRequests) ?
                  myRequests.map(request => (
                    <CardItem key={request.uuid}>
                      <h4><strong>Data de solicitação:</strong> 20/03/2020</h4>
                      <h4><strong>Quantidade de items:</strong> 8</h4>
                      <h4><strong>Projeto:</strong> Portal do Ramo</h4>
                    </CardItem>
                  ))
                : ''} */}
                <CardItem>
                  <h4><strong>Data de solicitação:</strong> 20/03/2020</h4>
                  <h4><strong>Quantidade de items:</strong> 8</h4>
                  <h4><strong>Projeto:</strong> Portal do Ramo</h4>
                </CardItem>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="right-box-gray">
              <h1 className="title-box">Anexe o comprovante</h1>
              <div className="center">
                <div className="table">
                  <label htmlFor="url-img">Comprovante da compra *</label>
                  <input type="file" name="url-img" id="url-img" className="form-control-file" accept="image/png, image/jpeg" title="Anexe o comprovante da compra"/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Screen>
  )
}
