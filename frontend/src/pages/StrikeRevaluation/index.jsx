import React, { useState, useEffect } from 'react';
import api from '../../services/api';

import Top_Left_Side_Menu from "../../components/Top_Left_Side_Menu";
import Bottom_Right_Side_Menu from "../../components/Bottom_Right_Side_Menu";
import Header from "../../components/Home_Header";
import Title from "../../components/Title";
import Loader from "../../components/LoaderSpinner";

import { Screen, Card } from './styles';

export default function StrikeRevaluation () {
  document.title = 'Reavaliação de strikes'
  const access_token = "Bearer".concat(sessionStorage.getItem("access_token"));

  const [strikes, setStrikes] = useState([]);
  const [selectedStrike, setSelectedStrike] = useState();
  const [alert, setAlert] = useState(false);

  useEffect(() => {
    api.get('/api/strikes/strikes-a-serem-reavaliados', { headers: { Authorization: access_token } })
    .then(response => setStrikes(response.data))
    .catch(error => console.log(error.response))
  }, [])


  setTimeout(() => {
    if (alert !== '') {
      setAlert('')
    }
  }, 4000);

  useEffect(() => {
    document.getElementById('alert').innerHTML = alert
  })

  function novaSituacaoStrike(situacao) {
    const date = document.getElementById('data-reavaliacao').value.split('-');
    const date_formatted = date[2] + '/' + date[1] + '/' + date[0];

    api.post(`/api/strikes/criar-reavaliacao/${selectedStrike.uuid}`, {
      constatacao: situacao,
      data: date_formatted,
      votos_manter: document.getElementById('votos-favor').value,
      votos_retirar: document.getElementById('votos-contra').value
    }, { headers: { Authorization: access_token } })
    .then(() => {
      setAlert('<div class="alert alert-success" role="alert"><strong>Strike reavaliado com sucesso!</strong></div>')
      window.location.href = '/strike/manage/reavaliacao'
    })
    .catch(() => setAlert('<div class="alert alert-danger" role="alert"><strong>Não foi possível reavaliar o strike.</strong> Se o problema persistir, favor contate a diretoria.</div>'))
  }


  return (
    <Screen>
      <Top_Left_Side_Menu />
      <Bottom_Right_Side_Menu />

      <div className="container">
        <div className="center-alert">
          <div className="area-alert" id="alert" />
        </div>
        <Header />
        <Title title="Reavaliação de Strikes" />

        <div className="row">
          <div className="col-md-6">
            <div className="left-box-gray">
              <div className="view-strikes">
                {(strikes) ?
                  strikes.map(strike => (
                    <Card key={strike.uuid} onClick={() => setSelectedStrike(strike)}>
                      <h3><strong>Aplicou:</strong> {strike.nome_membro_aplicou}</h3>
                      <h3><strong>Recebeu:</strong> {strike.nome_membro_recebeu}</h3>
                      <h3><strong>Data de aprovação:</strong> {strike.data_aprovado}</h3>
                      <h3><strong>Última reavaliação:</strong> {strike.data_ultima_reavaliacao}</h3>
                      <textarea value={strike.motivo} readOnly />
                    </Card>
                  ))
                : ''}
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="right-box-blue-gradient">
              {(selectedStrike) ?
                <div>
                  <h3><strong>Aplicou:</strong> {selectedStrike.nome_membro_aplicou}</h3>
                  <h3><strong>Recebeu:</strong> {selectedStrike.nome_membro_recebeu}</h3>
                  <h3><strong>Data de aprovação:</strong> {selectedStrike.data_aprovado}</h3>
                  <h3><strong>Última reavaliação:</strong> {selectedStrike.data_ultima_reavaliacao}</h3>

                  <div className="row">
                    <div className="col-md-6">
                      <label htmlFor="data-reavaliacao">Data da reavaliação *</label>
                      <input type="date" id="data-reavaliacao" name="data-reavaliacao" className="form-control" />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label htmlFor="votos-favor">Votos p/ manter *</label>
                      <input type="text" id="votos-favor" name="votos-favor" className="form-control"></input>
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="votos-contra">Votos p/ retirar *</label>
                      <input type="text" id="votos-contra" name="votos-contra" className="form-control"></input>
                    </div>
                  </div>
                  <div className="buttons-area">
                    <button onClick={() => novaSituacaoStrike('Manter')}>
                      Manter
                    </button>
                    <button onClick={() => novaSituacaoStrike('Retirar')}>
                      Retirar
                    </button>
                  </div>
                </div>
              : ''}
            </div>
          </div>
        </div>
      </div>
    </Screen>
  )
}
