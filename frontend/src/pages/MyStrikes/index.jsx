import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

import Top_Left_Side_Menu from '../../components/Top_Left_Side_Menu';
import Bottom_Right_Side_Menu from '../../components/Bottom_Right_Side_Menu';
import Header from '../../components/Home_Header';
import Title from '../../components/Title';
import Loader from '../../components/LoaderSpinner';

import { Screen, Content, ViewStrikes, Card, Tag, Reason, BTNAudience, BTNTAB } from './styles';

export default function MyStrikes() {
  document.title = 'Meus Strikes';

  const access_token = 'Bearer'.concat(sessionStorage.getItem('access_token'));
  const [listReceivedStrikes, setListReceivedStrikes] = useState([]);
  const [listAppliedStrikes, setListAppliedStrikes] = useState([]);
  const [qtyDays, setQtyDays] = useState();
  const [tab, setTab] = useState('received');

  let cardBGColor;

  useEffect(() => {
    api.get('/api/strikes/meus-strikes', {headers: { Authorization: access_token }})
    .then(response => {
      setListReceivedStrikes(response.data.strikes_recebeu);
      setListAppliedStrikes(response.data.strikes_enviou);
    })
    .catch(() => window.location.href = '/error')
  }, [])

  function getSituation(situation) {
    switch(situation){
      case "Aprovado":
        cardBGColor = "#FCCCCC";
        break;
      case "Mantido":
        cardBGColor = "#FCCCCC";
        break;
      case "Em Processamento":
        cardBGColor = "#FCEBC4";
        break;
      case "Retirado":
        cardBGColor = "#C4FCCB";
        break;
      case "Solicitado":
        cardBGColor = "#C2EEFC";
        break;
    }
  }

  function setIsActive(audience, date) {
    if(audience) {
      return true;
    } else {
      return calculateDaysForAudience(date);
    }
  }

  function calculateDaysForAudience(date) {
    const approvedDateToManipulate = date.split('/');
    var dateApproved = new Date(`${approvedDateToManipulate[1]}/${approvedDateToManipulate[0]}/${approvedDateToManipulate[2]}`)

    var date = new Date();
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    var todayDate = new Date(`${month}/${day}/${year}`)

    var timeDiff = Math.abs(todayDate.getTime() - dateApproved.getTime());
    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

    if(diffDays <= 7) {
      return false
    }
    return true;
  }

  function requestAudience(uuid) {
    api.put(`/api/strikes/solicitar-audiencia/${uuid}`, {}, { headers: { Authorization: access_token } })
    .then(() => {
      document.getElementById(uuid).disabled = true;
      document.getElementById(uuid).innerHTML = "<strong>Solicitada</strong>";
    })
    .catch(() => alert('Não foi possível solicitar a audiência!'))
  }

  return (
    <Screen>
      <Top_Left_Side_Menu />
      <Bottom_Right_Side_Menu />

      <div className="container">
        <Header />

        <Content>
          <Title title={'Meus Strikes'} />

          <div className="center">
            <BTNTAB className="tab" bgColor={(tab === 'received') ? '#1D5EA8' : '#E5E5E5'} bgColorHover={(tab === 'received') ? '#1A579C' : '#E9EDF5'} color={(tab === 'received') ? '#FFF' : '#000'} onClick={e => setTab('received')}>Recebidos</BTNTAB>
            <BTNTAB className="tab" bgColor={(tab === 'sent') ? '#1D5EA8' : '#E5E5E5'} bgColorHover={(tab === 'sent') ? '#1A579C' : '#E9EDF5'} color={(tab === 'sent') ? '#FFF' : '#000'} onClick={e => setTab('sent')}>Enviados</BTNTAB>
          </div>

          <ViewStrikes>
          {(listReceivedStrikes !== '' || listAppliedStrikes !== '') ?
            (tab === 'received') ?
              <ul>
                {
                listReceivedStrikes.map(strike => (
                  <Card info={getSituation(strike.situacao)} bgColor={cardBGColor} key={strike.uuid}>
                    <li className="strike-item">
                      <header>
                        <div className="user-info">
                          <Tag><strong>{strike.data_aprovado}</strong></Tag>
                          <span className="tag-situation"><strong>{strike.situacao}</strong></span>
                          <Tag title="Membro que aplicou"><Link to={'/profile?'.concat(strike.matricula_membro_aplicou)}><strong>{(strike.nome_membro_aplicou).split(' ')[0]}</strong></Link></Tag>
                          <BTNAudience
                            id={strike.uuid}
                            bgColor={(strike.audiencia_solicitada) ? '#FFF' : '#E9EDF5'}
                            onClick={() => requestAudience(strike.uuid)}
                            disabled={setIsActive(strike.audiencia_solicitada, strike.data_aprovado)}
                          >
                            <strong>
                              {(strike.audiencia_solicitada) ? 'Solicitada' : 'Audiência'}
                            </strong>
                          </BTNAudience>
                          <div className="row">
                            <Reason readOnly value={strike.motivo}/>
                          </div>
                        </div>
                      </header>
                      <p className="audience-date-time">{(strike.data_audiencia != null) ? `Audiência marcada para o dia ${strike.data_audiencia} às ${strike.hora_audiencia}.` : ''}</p>
                    </li>
                  </Card>
                ))}
              </ul>
              :
              <ul>
                {listAppliedStrikes.map(strike => (
                  <Card id={strike.uuid} info={getSituation(strike.situacao)} bgColor={cardBGColor} key={strike.uuid}>
                    <li className="strike-item">
                      <header>
                        <div className="user-info">
                          <Tag><strong>{strike.data_criado}</strong></Tag>
                          <Tag><strong>{strike.situacao}</strong></Tag>
                          <Tag><Link to={'/profile?'.concat(strike.matricula_membro_recebeu)}><strong>{(strike.nome_membro_recebeu).split(' ')[0]}</strong></Link></Tag>
                          <div className="row">
                            <Reason readOnly defaultValue={strike.motivo}/>
                          </div>
                        </div>
                      </header>
                    </li>
                  </Card>
                ))}
              </ul>
            : <Loader />}
          </ViewStrikes>
        </Content>
      </div>
    </Screen>
  )
}
