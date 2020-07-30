import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { useSelector } from 'react-redux';

import Top_Left_Side_Menu from '../../components/Top_Left_Side_Menu';
import Bottom_Right_Side_Menu from '../../components/Bottom_Right_Side_Menu';
import Header from '../../components/Home_Header';
import Title from '../../components/Title';
import Loader from '../../components/LoaderSpinner';

import { Screen, Content, ViewStrikes, Card, Tag, Reason } from './styles';

export default function HistoricStrikes() {
  document.title = 'Histórico de Strikes';
  const access_token = 'Bearer'.concat(sessionStorage.getItem('access_token'));
  const url = window.location.search.slice(1);
  const hierarquia = (useSelector(state => state.data[4]));

  const [listReceivedStrikes, setListReceivedStrikes] = useState([]);
  const [listAppliedStrikes, setListAppliedStrikes] = useState([]);
  const [username, setUsername] = useState('');

  if (
    hierarquia !== 'Diretor de Gestão de Pessoas' &&
    hierarquia !== 'Presidente' &&
    hierarquia !== 'Vice-Presidente'
  ) {
    window.location.href = '/noaccess'
  }

  if (url === '') {
    window.location.href = '/error';
  }

  let cardBGColor, tagBGColor;

  function getSituation(situation) {
    switch(situation){
      case "Aprovado":
        cardBGColor = "#FCCCCC";
        tagBGColor = "#D1A9A9";
        break;
      case "Em Processamento":
        cardBGColor = "#FCEBC4";
        tagBGColor = "#D1C3A3";
        break;
      case "Retirado":
        cardBGColor = "#C4FCCB";
        tagBGColor = "#A3D1A8";
        break;
      case "Solicitado":
        cardBGColor = "#C2EEFC";
        tagBGColor = "#ADD4E0";
        break;
      }
    }

    useEffect(() => {
      api.get(`/api/strikes/historico-strikes/${url}`, {headers: { Authorization: access_token }})
      .then(response => {
        setUsername(response.data.nome_completo)
        setListReceivedStrikes(response.data.strikes_recebeu)
        setListAppliedStrikes(response.data.strikes_enviou)
      })
      .catch(() => window.location.href = '/error')
    }, [])

  return (
    <Screen>
      <Top_Left_Side_Menu />
      <Bottom_Right_Side_Menu />

      <div className="container">
        <Header />

        {(username) ?
          <Content>
            <Title title={'Strikes de '.concat(username)} />
            <ViewStrikes>
              {(listReceivedStrikes.length == 0) ?
                <div className="center"><h1>O membro não recebeu strikes</h1></div>
              :
                <ul>
                  {listReceivedStrikes.map(strike => (
                    <Card id={strike.uuid} info={getSituation(strike.situacao)} bgColor={cardBGColor} key={strike.uuid}>
                      <li className="strike-item">
                        <header>
                          <div className="user-info">
                            <Tag bgColor={tagBGColor}><strong>{strike.data_criado}</strong></Tag>
                            <Tag bgColor={tagBGColor}><strong>{strike.situacao}</strong></Tag>
                            <Tag bgColor={tagBGColor}><strong>{(strike.nome_membro_aplicou).split(' ')[0]}</strong></Tag>
                            <div className="row">
                              <Reason borderColor={tagBGColor} readOnly value={strike.motivo}/>
                            </div>
                          </div>
                        </header>
                      </li>
                    </Card>
                  ))}
                </ul>
              }
            </ViewStrikes>
          </Content>
        :
          <div className="area-loader">
            <Loader />
          </div>
        }
      </div>
    </Screen>
  )
}
