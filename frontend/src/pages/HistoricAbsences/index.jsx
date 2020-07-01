import React, { useState, useEffect } from 'react';
import api from '../../services/api';

import Top_Left_Side_Menu from '../../components/Top_Left_Side_Menu';
import Bottom_Right_Side_Menu from '../../components/Bottom_Right_Side_Menu';
import Header from '../../components/Home_Header';
import Title from '../../components/Title';

import { Screen, ViewAbsences, Card } from './styles';

export default function HistoricAbsences() {
  document.title = 'Histórico de Faltas';
  const access_token = 'Bearer'.concat(sessionStorage.getItem('access_token'));
  const url = window.location.search.slice(1);

  const [listAbsences, setListAbsences] = useState([]);
  const [absenceData, setAbsenceData] = useState();

  let rows = [];

  function runAbsences() {
    for (var index in absenceData.faltas_projeto){
      rows.push({"project":index,"qty":absenceData.faltas_projeto[index]})
    }
  }

  if (url === '') {
    window.location.href = '/error';
  }

  useEffect(() => {
    api.get(`/api/faltas/historico-faltas/${url}`, {headers: { Authorization: access_token }})
    .then(response => {
      setListAbsences(response.data.faltas)
      setAbsenceData(response.data)
    })
    .catch(() => window.location.href = '/href')
  }, [])

  return (
    <Screen>
      <Top_Left_Side_Menu />
      <Bottom_Right_Side_Menu />

      <div className="container">
        <Header />
        <Title title={(absenceData) ? 'Histórico de Faltas de '.concat(((absenceData.nome_completo).split(' ')[0]).concat(' ' + (absenceData.nome_completo).split(' ')[1])) : 'Carregando...'} />

        <div className="row">
          <div className="col-md-6">
            <div className="left-box-blue-gradient">
              <div className="qty">
                <table>
                  <tbody>
                    <tr>
                      <td className="line-down">Reuniões Gerais</td>
                      <td className="line-down qty">{(absenceData) ? absenceData.contagem_faltas.reuniao_geral : ''}</td>
                    </tr>
                    <tr>
                      <td className="line-down">Reuniões de Planejamento</td>
                      <td className="line-down qty">{(absenceData) ? absenceData.contagem_faltas.reuniao_de_planejamento : ''}</td>
                    </tr>
                    <tr>
                      <td className="line-down">Exposup</td>
                      <td className="line-down qty">{(absenceData) ? absenceData.contagem_faltas.exposup : ''}</td>
                    </tr>
                    <tr>
                      <td>Reuniões de Projeto</td>
                      <td className="qty">{(absenceData) ? absenceData.contagem_faltas.reuniao_de_projeto : ''}</td>
                    </tr>

                    {(absenceData) ? runAbsences() : ''}

                    {(rows != '') ? rows.map(row => (
                      <tr key={(((row.project).split(' ')).join('-')).toLowerCase()}>
                        <td className="project">{row.project}</td>
                        <td className="project qty">{row.qty}</td>
                      </tr>
                    )) : ''}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="right-box-gray">
              <ViewAbsences>
                {(listAbsences.length == 0) ?
                  <div className="center"><h1>O membro não possui faltas</h1></div>
                :
                  <ul>
                    {listAbsences.map(absence => (
                      <Card id={absence.uuid} key={absence.uuid}>
                        <li className="absence-item">
                          <header>
                            <div className="user-info">
                              <strong>{absence.data} - {absence.tipo}</strong>
                              <div className="row">
                                <textarea readOnly value={(absence.descricao) ? absence.descricao : 'Sem descrição'}/>
                              </div>
                            </div>
                          </header>
                        </li>
                      </Card>
                    ))}
                  </ul>
                }
              </ViewAbsences>
            </div>
          </div>
        </div>
      </div>
    </Screen>
  )
}
