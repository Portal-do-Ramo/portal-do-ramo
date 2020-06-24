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
  const [isEnabled, setIsEnabled] = useState(false);
  const [alert, setAlert] = useState('');
  const [base64, setBase64] = useState('');
  const [lastCard, setLastCard] = useState('');

  useEffect(() => {
    api.get('/api/pedidos/meus-pedidos', { headers: { Authorization: access_token } })
    .then(response => setMyRequests(response.data.pedido_de_compra))
    .catch(() => window.location.href="/error")
  }, [])


  function sendData() {
    if (!selectedRequest) {
      setAlert('<div class="alert alert-danger" role="alert"><strong>Selecione um pedido!</strong></div>')
      return
    }

    if (!isEnabled) {
      setAlert('<div class="alert alert-danger" role="alert"><strong>Carregue uma imagem!</strong></div>')
      return
    }

    api.post(`/api/pedidos/${selectedRequest}/solicitar-reembolso`, {
      foto_comprovante: base64
    }, { headers: { Authorization: access_token } })
    .then(() => setAlert('<div class="alert alert-success" role="alert"><strong>Pedido de reembolso enviado com sucesso!</strong></div>'))
    .catch(() => setAlert('<div class="alert alert-danger" role="alert"><strong>Não foi possível enviar a solicitação.</strong> Se o problema persistir, favor contate a diretoria.</div>'))
  }


  function setStateOfButton() {
    var files = document.getElementById('url-img').files;
    if (files.length > 0) {
      setIsEnabled(true)
    }
  }


  function getBase64(file) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      setBase64(reader.result);
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }


  function convertToBase64() {
    var files = document.getElementById('url-img').files;
    if (files.length > 0) {
      getBase64(files[0])
    }
  }


  function setBGColorOfCards(uuid) {
    if(!lastCard) {
      setLastCard(uuid)
      document.getElementById(uuid).style.backgroundColor = '#2B8DFC';
      document.getElementById(uuid).style.color = '#FFF';
    } else {
      document.getElementById(lastCard).style.backgroundColor = '#E5E5E5';
      document.getElementById(lastCard).style.color = '#000';
      document.getElementById(uuid).style.backgroundColor = '#2B8DFC';
      document.getElementById(uuid).style.color = '#FFF';
      setLastCard(uuid)
    }
    return
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
              <h1 className="title-box white">Selecione o pedido *</h1>
              <div className="viewRequests">
                {(myRequests) ?
                  myRequests.map(request => (
                    <CardItem key={request.uuid} id={request.uuid} onClick={() => {
                      setBGColorOfCards(request.uuid)
                      setSelectedRequest(request.uuid)
                    }}>
                      <h4><strong>Data de solicitação:</strong> {request.data_criado}</h4>
                      <h4><strong>Quantidade de items:</strong> {request.dados_pedido.pedidos.length}</h4>
                      <h4><strong>Projeto:</strong> {request.nome_projeto_solicitado}</h4>
                    </CardItem>
                  ))
                : ''}
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="right-box-gray">
              <h1 className="title-box">Anexe o comprovante *</h1>
              <div className="center">
                <div className="table">
                  <label htmlFor="url-img">Comprovante da compra</label>
                  <input type="file" name="url-img" id="url-img" className="form-control-file" accept="image/png, image/jpeg" title="Anexe o comprovante da compra"/>
                  <button className="btn-send-picture" onClick={() => {
                    setStateOfButton()
                    convertToBase64()
                  }} disabled={isEnabled}>
                    {(isEnabled) ? 'Carregado' : 'Carregar'}
                  </button>
                </div>
              </div>
              <div className="row center-button">
                <button className="btn-send" onClick={() => sendData()}>Enviar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Screen>
  )
}
