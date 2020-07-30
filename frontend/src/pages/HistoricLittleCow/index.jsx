import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import api from '../../services/api';

import Top_Left_Side_Menu from '../../components/Top_Left_Side_Menu';
import Bottom_Right_Side_Menu from '../../components/Bottom_Right_Side_Menu';
import Header from '../../components/Home_Header';
import Title from '../../components/Title';
import Loader from '../../components/LoaderSpinner';

import { Screen, Card } from './styles';

export default function HistoricProjects () {
  document.title = 'Histórico de vaquinhas';
  const access_token = 'Bearer'.concat(sessionStorage.getItem("access_token"));
  const hierarquia = (useSelector(state => state.data[4]));

  const [list, setList] = useState([]);
  const [selectedCard, setSelectedCard] = useState();

  useEffect(() => {
    api.get('/api/vaquinhas', { headers: { Authorization: access_token } })
    .then(response => setList(response.data))
    .catch(() => window.location.href = '/error')
  }, [])

  return (
    <Screen>
      <Top_Left_Side_Menu />
      <Bottom_Right_Side_Menu />

      <div className="container">
        <Header />
        <Title title="Histórico de Vaquinhas" />

        <div className="row">
          <div className="col-md-6">
            <div className="left-box-gray">
              {(list != '') ?
                <div className="view-little-cow">
                  {list.map(littlecow => (
                    <Card key={littlecow.nome_vaquinha_slug} onClick={() => setSelectedCard(littlecow)}>
                      <h1 className="littlecow-name">{littlecow.nome_vaquinha}</h1>
                      <h2 className="littlecow-info"><strong>Valor arrecadado: </strong>R$ {littlecow.valor_total}</h2>
                      <span className="littlecow-subinfo">{littlecow.data_inicio} até {littlecow.data_fim}</span>
                    </Card>
                  ))}
                </div>
              :
                <div className="area-loader">
                  <Loader />
                </div>
              }
            </div>
          </div>
          <div className="col-md-6">
            <div className="right-box-blue-gradient">
              {(selectedCard) ?
                <div>
                  <h1>{selectedCard.nome_vaquinha}</h1>
                  <h3><strong>Data de início: </strong> {selectedCard.data_inicio}</h3>
                  <h3><strong>Data de término: </strong> {selectedCard.data_fim}</h3>
                  <br />
                  <h4><strong>Status: </strong> {(selectedCard.aberto) ? 'Aberto' : 'Finalizada'}</h4>
                  <h4><strong>Valor arrecadado: </strong> R$ {selectedCard.valor_total}</h4>
                  <br />
                  <h2>Doações</h2>
                  <div className="view-donates">
                    {(selectedCard.doacoes).map(donate => (
                      <h5 key={donate.uuid}>{donate.nome_membro_doador} - R$ {donate.valor}</h5>
                    ))}
                  </div>
                </div>
              : <h1>Selecione uma vaquinha</h1>}
            </div>
          </div>
        </div>
      </div>
    </Screen>
  )
}
