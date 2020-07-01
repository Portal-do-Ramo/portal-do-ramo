import React, { useState, useEffect } from 'react';
import api from '../../services/api';

import Top_Left_Side_Menu from '../../components/Top_Left_Side_Menu';
import Bottom_Right_Side_Menu from '../../components/Bottom_Right_Side_Menu';
import Header from '../../components/Home_Header';
import Title from '../../components/Title';
import Loader from '../../components/LoaderSpinner';

import { Screen, Card, ModalScreen, BoxModalScreen, Register } from './styles';

export default function ViewFinances () {
  document.title = 'Financeiro';
  const access_token = 'Bearer'.concat(sessionStorage.getItem('access_token'));

  const [data, setData] = useState();
  const [caixa, setCaixa] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    api.get('/api/caixas', { headers: { Authorization: access_token } })
    .then(response => setData(response.data))
    .catch(() => window.location.href = '/error')
    .finally(() => setIsLoaded(true))
  }, [])

  return (
    <Screen>
      <Top_Left_Side_Menu />
      <Bottom_Right_Side_Menu />

      <div className="container">
        <Header />

        <Title title="Financeiro" />

        {(isLoaded) ?
          <div className="row">
            {(data) ?
              data.map(cash => (
                <div className="col-md-4" key={cash.nome_caixa}>
                  <Card>
                    <h1 className="title">{cash.nome_caixa}</h1>
                    <h2 className="value"><strong>Caixa:</strong> R$ {cash.orcamento_atual}</h2>
                    <h2 className="value"><strong>% no caixa:</strong> {cash.porcentagem_orcamento}%</h2>
                    <div className="center">
                      <button className="btn-extract" onClick={() => {
                        setCaixa(cash.registros_de_caixa)
                        document.getElementById('extract').style.display='block'}
                      }>Ver extrato</button>
                    </div>
                  </Card>
                </div>
              ))
            : ''}
          </div>
        :
          <div className="area-loader">
            <Loader />
          </div>
        }

        <ModalScreen id="extract" className="modal">
          <BoxModalScreen className="container box-modal-screen">
            <div className="modal-content animate view">
              <div className="row">
                <h1 className="title">Extrato</h1>
              </div>
              <div className="inside-area">
                <div className="view-registers">
                  {(caixa) ?
                    caixa.map(register => (
                      <div className="register-box">
                        <Register color={(register.valor < 0) ? '#FF0000' : '#222'}><strong>{register.data}</strong> {'-->'} R$ {register.valor}</Register>
                      </div>
                    )).reverse()
                  : ''}
                </div>
                <div className="row buttons-area">
                  <button className="btn btn-primary" onClick={() => document.getElementById('extract').style.display='none' }>
                    Fechar
                  </button>
                </div>
              </div>
            </div>
          </BoxModalScreen>
        </ModalScreen>
      </div>
    </Screen>
  )
}
