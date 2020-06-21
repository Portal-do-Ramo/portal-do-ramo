import React, { useState, useEffect } from 'react';
import api from '../../services/api';

import Top_Left_Side_Menu from '../../components/Top_Left_Side_Menu';
import Bottom_Right_Side_Menu from '../../components/Bottom_Right_Side_Menu';
import Header from '../../components/Home_Header';
import Title from '../../components/Title';
import Loader from '../../components/LoaderSpinner';

import { Screen, ViewAbsences, Card } from './styles';

export default function MyAbsences() {
  document.title = 'Minhas Faltas';

  const access_token = 'Bearer'.concat(sessionStorage.getItem('access_token'));
  const [listAbsences, setListAbsences] = useState([]);
  const [type, setType] = useState([]);
  const [typeSelected, setTypeSelected] = useState('Exposup');

  let rows = [];

  useEffect(() => {
    api.get('/api/faltas/minhas-faltas', {headers: { Authorization: access_token }})
    .then(response => setListAbsences(response.data))
    .catch(() => window.location.href = "/error")
  }, [])

  useEffect(() => {
    api.get('/api/tipo-faltas', {headers: { Authorization: access_token }})
    .then(response => setType(response.data))
    .catch(() => window.location.href = '/error')
  }, [])


  function runAbsences() {
    for (var property in listAbsences.faltas_projeto){
      rows.push({"project":property,"qty":listAbsences.faltas_projeto[property]})
    }
  }

  return (
    <Screen>
      <Top_Left_Side_Menu />
      <Bottom_Right_Side_Menu />

      <div className="container">
        <Header />
        <Title title="Minhas Faltas" />
        <div className="row">
          <div className="col-md-6">
            <div className="left-box-blue-gradient">
              <div className="qty">
                <table>
                  <tbody>
                    <tr>
                      <td className="line-down">Reuniões Gerais</td>
                      <td className="line-down qty">{(listAbsences != '') ? listAbsences.contagem_faltas.reuniao_geral : ''}</td>
                    </tr>
                    <tr>
                      <td className="line-down">Reuniões de Planejamento</td>
                      <td className="line-down qty">{(listAbsences != '') ? listAbsences.contagem_faltas.reuniao_de_planejamento : ''}</td>
                    </tr>
                    <tr>
                      <td className="line-down">Exposup</td>
                      <td className="line-down qty">{(listAbsences != '') ? listAbsences.contagem_faltas.exposup : ''}</td>
                    </tr>
                    <tr>
                      <td>Reuniões de Projeto</td>
                      <td className="qty">{(listAbsences != '') ? listAbsences.contagem_faltas.reuniao_de_projeto : ''}</td>
                    </tr>

                    {runAbsences()}

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
              <select className="form-control" id="typeSelect" onChange={e => setTypeSelected(e.target.value)}>
                {type.map(tp => (
                  <option value={tp.nome} key={tp.id}>{tp.nome}</option>
                ))}
              </select>

              <ViewAbsences>
                {(listAbsences != '') ?
                  <ul>
                    {(listAbsences != '') ? (listAbsences.faltas).map(absence => (
                      ((absence.tipo).indexOf(typeSelected) != -1) ?
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
                      : ''
                    )) : <h5>Sem faltas</h5>}
                  </ul>
                : <Loader />}
              </ViewAbsences>
            </div>
          </div>
        </div>
      </div>
    </Screen>
  )
}
