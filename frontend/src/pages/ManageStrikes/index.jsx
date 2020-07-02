import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

import Top_Left_Side_Menu from '../../components/Top_Left_Side_Menu';
import Bottom_Right_Side_Menu from '../../components/Bottom_Right_Side_Menu';
import Header from '../../components/Home_Header';
import Title from '../../components/Title';
import Loader from '../../components/LoaderSpinner';

import download from './images/download.png';

import { Screen, HeaderBox, LeftBox, RightBox, TitleBox, ViewResults, CardButton, DefaultCard, AudienceCard, Tag, Reason, Strike, BTNTAB, Fullscreen, FullscreenStrike, FullscreenAudience } from './styles';

export default function ManageStrikes() {
  document.title = 'Gerenciar Strikes';
  const access_token = 'Bearer'.concat(sessionStorage.getItem("access_token"));

  const [members, setMembers] = useState([]);
  const [isLoaded, setIsLoaded] = useState(true);
  const [selectedMember, setSelectedMember] = useState();
  const [solicitedStrikes, setSolicitedStrikes] = useState([]);
  const [solicitedAudiences, setSolicitedAudiences] = useState([]);
  const [tab, setTab] = useState('new');
  const [filter, setFilter] = useState('allMembers');
  const [listTeams, setListTeams] = useState([]);
  const [fullScreenData, setFullScreenData] = useState();
  const [manageAudiences, setManageAudiences] = useState([]);
  const [audienceForManage, setAudienceForManage] = useState();
  const [alert, setAlert] = useState('');

  const allMembers = [{nome_equipe_slug:"allMembers", nome_equipe:"Todos"}];

  setTimeout(() => {
    if (alert !== '') {
      setAlert('')
    }
  }, 4000);

  useEffect(() => {
    api.get('api/strikes', { headers: { Authorization: access_token } })
    .then(response => setMembers(response.data))
    .catch(() => window.location.href = '/error')
    .finally(() => setIsLoaded(false))
  }, [])


  useEffect(() => {
    api.get('/api/strikes/strikes-solicitados', { headers: { Authorization: access_token } })
    .then(response => setSolicitedStrikes(response.data))
    .catch(() => window.location.href = '/error')
  }, [])


  useEffect(() => {
    api.get('/api/strikes/strikes-audiencia-solicitada', { headers: { Authorization: access_token } })
    .then(response => {
      setSolicitedAudiences(response.data.audiencia_solicitada)
      setManageAudiences(response.data.audiencia_marcada)
    })
    .catch(() => window.location.href = '/error')
  }, [])


  useEffect(() => {
    api.get('/api/equipes', { headers: { Authorization: access_token } })
    .then(response => setListTeams(allMembers.concat(response.data)))
    .catch(() => window.location.href = '/error')
  }, [])


  function newSituationOfStrike(uuid, situation) {
    if(situation === 'approved') {
      api.put(`/api/strikes/aprovar/${uuid}`, {}, {headers: {Authorization: access_token}})
      .then(() => {
        document.getElementById(uuid).animate([{ transform: 'translateX(0px)' },{ transform: 'translateX(-500px)' }], { duration: 500, iterations: Infinity })
        setTimeout(() => document.getElementById(uuid).hidden = true, 500);
      })
      .catch(() => window.location.href = '/error')
    } else {
      api.delete(`/api/strikes/${uuid}`, {headers: { Authorization: access_token }})
      .then(() => {
        document.getElementById(uuid).animate([{ transform: 'translateX(0px)' },{ transform: 'translateX(-500px)' }], { duration: 500, iterations: Infinity })
        setTimeout(() => document.getElementById(uuid).hidden = true, 500);
      })
      .catch(() => setAlert('<div class="alert alert-danger" role="alert"><strong>Não foi possível reprovar o strike.</strong> Se o problema persistir, favor contate a diretoria.</div>'))
    }
  }


  function newSituationOfAudience(uuid) {
    const audienceTime = document.getElementById('audienceTime'.concat(uuid)).value;
    var date = document.getElementById('audienceDate'.concat(uuid)).value;

    date = date.split('-')
    const audienceDate = `${date[2]}/${date[1]}/${date[0]}`

    api.put(`/api/strikes/marcar-audiencia/${uuid}`, {
      data_audiencia: audienceDate,
      hora_audiencia: audienceTime
    }, {headers: { Authorization: access_token }})
    .then(() => {
      document.getElementById(uuid).animate([{ transform: 'translateX(0px)' },{ transform: 'translateX(-500px)' }], { duration: 500, iterations: Infinity })
      setTimeout(() => document.getElementById(uuid).hidden = true, 500);
    })
    .catch(() => setAlert('<div class="alert alert-danger" role="alert"><strong>Não foi possível marcar a audiência.</strong> Se o problema persistir, favor contate a diretoria.</div>'))
  }


  function editAudience(e, uuid) {
    e.preventDefault();
    const audienceTime = document.getElementById('newAudienceTime'.concat(uuid)).value;
    var date = document.getElementById('newAudienceDate'.concat(uuid)).value;

    date = date.split('-');
    const audienceDate = `${date[2]}/${date[1]}/${date[0]}`;

    api.put(`/api/strikes/remarcar-audiencia/${uuid}`, {
      data_audiencia: audienceDate,
      hora_audiencia: audienceTime
    }, {headers: { Authorization: access_token }})
    .then(() => setAlert('<div class="alert alert-success" role="alert"><strong>Audiência remarcada com sucesso!</strong></div>'))
    .catch(() => setAlert('<div class="alert alert-danger" role="alert"><strong>Não foi possível remarcar a audiência.</strong> Se o problema persistir, favor contate a diretoria.</div>'))
  }


  function keepStrikeAudience(uuid) {
    api.put(`/api/strikes/manter/${uuid}`, {}, { headers: { Authorization: access_token } })
    .then(() => {
      setAlert('<div class="alert alert-success" role="alert"><strong>Strike mantido com sucesso!</strong></div>')
      document.getElementById(uuid).animate([{ transform: 'translateX(0px)' },{ transform: 'translateX(-500px)' }], { duration: 500, iterations: Infinity })
      setTimeout(() => document.getElementById(uuid).hidden = true, 500);
    })
    .catch(() => setAlert('<div class="alert alert-danger" role="alert"><strong>Não foi possível manter o strike.</strong> Se o problema persistir, favor contate a diretoria.</div>'))
  }


  function removeStrikeAudience(uuid) {
    api.delete(`/api/strikes/${uuid}`, { headers: { Authorization: access_token } })
    .then(() => {
      setAlert('<div class="alert alert-success" role="alert"><strong>Strike retirado com sucesso!</strong></div>')
      document.getElementById(uuid).animate([{ transform: 'translateX(0px)' },{ transform: 'translateX(-500px)' }], { duration: 500, iterations: Infinity })
      setTimeout(() => document.getElementById(uuid).hidden = true, 500);
    })
    .catch(() => setAlert('<div class="alert alert-danger" role="alert"><strong>Não foi possível retirar o strike.</strong> Se o problema persistir, favor contate a diretoria.</div>'))
  }


  function downloadFile() {
    api.get(`/api/strikes/lista-strikes-aprovados`, { headers: { Authorization: access_token },  responseType: 'blob' })
    .then(response => {
      const downloadUrl = window.URL.createObjectURL(response.data);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.setAttribute('download', 'lista-strikes-aprovados.xlsx');
      document.body.appendChild(link);
      link.click();
      link.remove();
    })
    .catch(() => setAlert('<div class="alert alert-danger" role="alert"><strong>Não foi possível fazer o download.</strong> Se o problema persistir, favor contate a diretoria.</div>'))
  }


  function convertDate(date) {
    const aux = date.split('/')
    return `${aux[2]}-${aux[1]}-${aux[0]}`
  }


  useEffect(() => {
    document.getElementById('alert').innerHTML = alert;
  })


  return (
    <Screen>
      <Top_Left_Side_Menu />
      <Bottom_Right_Side_Menu />

      <div className="container">
      <div className="center-alert">
        <div className="area-alert" id="alert" />
      </div>
      <Header />
      <Title title="Gerenciar Strikes" />

      <div className="row">
        <div className="col-md-6">
          <HeaderBox>
            <div className="row">
              <TitleBox>
                Novos Strikes
              </TitleBox>
            </div>

            <section className="left">
              <ul>
                {(solicitedStrikes != '') ? solicitedStrikes.map(strike => (
                  <DefaultCard key={strike.uuid} id={strike.uuid}>
                    <li>
                      <header>
                        <div className="user-info">
                          <Tag bgColor='#CECECE'>{strike.data_criado}</Tag>
                          <Tag bgColor='#'><Link to={'/profile?'.concat(strike.matricula_membro_recebeu)}>{(strike.nome_membro_recebeu).split(' ')[0]}</Link></Tag>
                          <Tag bgColor='#CECECE'><Link to={'/profile?'.concat(strike.matricula_membro_aplicou)}>{(strike.nome_membro_aplicou).split(' ')[0]}</Link></Tag>
                        </div>
                      </header>
                      <div className="row">
                        <Reason readOnly defaultValue={strike.motivo}/>
                      </div>
                      <button onClick={() => newSituationOfStrike(strike.uuid, 'approved')}>Aprovar</button>
                      <button onClick={() => newSituationOfStrike(strike.uuid, 'disapproved')}>Reprovar</button>
                    </li>
                  </DefaultCard>
                )).reverse() : <h5>Não há novos strikes...</h5>}
              </ul>
            </section>
          </HeaderBox>
        </div>

        <div className="col-md-6">
          <HeaderBox>
            <div className="row">
              <TitleBox>
                Audiências
              </TitleBox>
            </div>

            <div className="row">
              <div className="center">
                <BTNTAB className="tab" bgColor={(tab === 'new') ? '#1D5EA8' : '#e5e5e5'} bgColorHover={(tab === 'new') ? '#1A579C' : '#E9EDF5'} color={(tab === 'new') ? '#FFF' : '#000'} onClick={() => setTab('new')}>Novas</BTNTAB>
                <BTNTAB className="tab" bgColor={(tab === 'manage') ? '#1D5EA8' : '#e5e5e5'} bgColorHover={(tab === 'manage') ? '#1A579C' : '#E9EDF5'} color={(tab === 'manage') ? '#FFF' : '#000'} onClick={() => setTab('manage')}>Gerenciar</BTNTAB>
              </div>
            </div>

            <section className="right">
              {(tab === 'new') ?
                <ul>
                  {(solicitedAudiences != '') ? solicitedAudiences.map(audience => (
                    <DefaultCard key={audience.uuid} id={audience.uuid}>
                      <li>
                        <header>
                          <div className="user-info row">
                            <Tag>{audience.data_aprovado}</Tag>
                            <Tag title="Membro que solicitou">
                              <Link to={'/profile?'.concat(audience.matricula_membro_aplicou)}>
                                {(audience.nome_membro_aplicou).split(' ')[0]}
                              </Link>
                            </Tag>
                            <Tag title="Membro que recebeu">
                              <Link to={'/profile?'.concat(audience.matricula_membro_recebeu)}>
                                {(audience.nome_membro_recebeu).split(' ')[0]}
                              </Link>
                            </Tag>
                          </div>
                        </header>
                        <div className="datetime row">
                          <div className="col-md-7">
                            <input type="date" id={'audienceDate'.concat(audience.uuid)} className="form-control" required />
                          </div>
                          <div className="col-md-5">
                            <input type="time" id={'audienceTime'.concat(audience.uuid)} className="form-control" required />
                          </div>
                        </div>
                        <button onClick={() => {
                          setFullScreenData(audience)
                          document.getElementById('strike-fullscreen').style.display='block'
                        }}>Ver strike</button>
                        <button onClick={() => newSituationOfAudience(audience.uuid)}>Marcar</button>
                      </li>
                    </DefaultCard>
                  )) : 'Não há novas solicitações de audiência.'}
                </ul>
              :
                <ul>
                  {(manageAudiences != '') ? manageAudiences.map(audience => (
                    <AudienceCard key={audience.uuid} id={audience.uuid}>
                      <li>
                        <header>
                          <div className="row">
                            <div className="col-md-12">
                              <strong>Aplicou: </strong><Link to={'/profile?'.concat(audience.matricula_membro_aplicou)}>{' ' + ((audience.nome_membro_aplicou).split(' ')[0]).concat(' ' + (audience.nome_membro_aplicou).split(' ')[1])}</Link>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-12">
                              <strong>Recebeu: </strong><Link to={'/profile?'.concat(audience.matricula_membro_recebeu)}>{' ' + ((audience.nome_membro_recebeu).split(' ')[0]).concat(' ' + (audience.nome_membro_recebeu).split(' ')[1])}</Link>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-6">
                              <strong>Data: </strong>{audience.data_audiencia}
                            </div>
                            <div className="col-md-6">
                              <strong>Hora: </strong>{audience.hora_audiencia}
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-12">
                              <strong>Solicitação da audiência: </strong>{audience.data_audiencia_solicitada}
                            </div>
                          </div>
                        </header>
                        <div className="center">
                          <button onClick={() => {
                            setFullScreenData(audience)
                            document.getElementById('strike-fullscreen').style.display='block'
                          }}>
                            Ver strike
                          </button>
                          <button onClick={() => {
                            setAudienceForManage(audience)
                            document.getElementById('audience-fullscreen').style.display='block'
                          }}>
                            Gerenciar
                          </button>
                        </div>
                      </li>
                    </AudienceCard>
                  )) : 'Não há audiências para gerenciamento.'}
                </ul>
              }

              <Fullscreen id="strike-fullscreen" className="modal" onClick={() => document.getElementById('strike-fullscreen').style.display='none'}>
                <FullscreenStrike className="container box-notification">
                  <div className="modal-content animate view">
                    <div className='row'>
                      <h1 className="title">Strike</h1>
                      <button className="btn-close" onClick={() => document.getElementById('strike-fullscreen').style.display='none'}>Fechar</button>
                    </div>
                    <div className="inside-area">
                      <div className="row">
                        <h1><strong>Solicitou:</strong> {(fullScreenData) ? (fullScreenData.nome_membro_aplicou.split(' ')[0]).concat(' ' + fullScreenData.nome_membro_aplicou.split(' ')[1]) : ''}</h1>
                      </div>
                      <div className="row">
                        <h1><strong>Recebeu:</strong> {(fullScreenData) ? (fullScreenData.nome_membro_recebeu.split(' ')[0]).concat(' ' + fullScreenData.nome_membro_recebeu.split(' ')[1]) : ''}</h1>
                      </div>
                      <div className="row">
                        <textarea readOnly value={(fullScreenData) ? fullScreenData.motivo : ''}/>
                      </div>
                      <div className="row">
                        <h2><strong>Data aprovado:</strong> {(fullScreenData) ? fullScreenData.data_aprovado : ''}</h2>
                      </div>
                    </div>
                  </div>
                </FullscreenStrike>
              </Fullscreen>

              <Fullscreen id="audience-fullscreen" className="modal" onClick={() => document.getElementById('strike-fullscreen').style.display='none'}>
                <FullscreenAudience className="container box-notification">
                  <div className="modal-content animate view">
                    <div className='row'>
                      <h1 className="title">Audiência</h1>
                      <button className="btn-close" onClick={() => document.getElementById('audience-fullscreen').style.display='none'}>Fechar</button>
                    </div>
                    <div className="inside-area">
                      <div className="row">
                        <h1><strong>Solicitou:</strong> {(audienceForManage) ? (audienceForManage.nome_membro_aplicou.split(' ')[0]).concat(' ' + audienceForManage.nome_membro_aplicou.split(' ')[1]) : ''}</h1>
                      </div>
                      <div className="row">
                        <h1><strong>Recebeu:</strong> {(audienceForManage) ? (audienceForManage.nome_membro_aplicou.split(' ')[0]).concat(' ' + audienceForManage.nome_membro_aplicou.split(' ')[1]) : ''}</h1>-
                      </div>
                      <div className="row">
                        <h2><strong>Data de solicitação:</strong> {(audienceForManage) ? audienceForManage.data_audiencia_solicitada : ''}</h2>
                      </div>
                      <form onSubmit={e => editAudience(e, audienceForManage.uuid)}>
                        <div className="row">
                          <div className="col-md-6">
                            <div className="padding-inside">
                              <input type="date" className="form-control" id={'newAudienceDate'.concat((audienceForManage) ? audienceForManage.uuid : '')} name="newAudienceDate" defaultValue={(audienceForManage) ? convertDate(audienceForManage.data_audiencia) : ''} required />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="padding-inside">
                              <input type="time" className="form-control" id={'newAudienceTime'.concat((audienceForManage) ? audienceForManage.uuid : '')} name="newAudienceTime" defaultValue={(audienceForManage) ? audienceForManage.hora_audiencia : ''} required />
                            </div>
                          </div>
                        </div>
                        <div className="row save-area">
                          <button type="submit" className="btn-send">Salvar alteração</button>
                        </div>
                      </form>

                      <div className="buttons-area">
                        <button onClick={() => keepStrikeAudience(audienceForManage.uuid)}>Manter</button>
                        <button onClick={() => removeStrikeAudience(audienceForManage.uuid)}>Retirar</button>
                      </div>
                    </div>
                  </div>
                </FullscreenAudience>
              </Fullscreen>
            </section>
          </HeaderBox>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <LeftBox>
            <div className="row">
              <TitleBox>
                Membros
              </TitleBox>
              <button className="btn-add" onClick={() => downloadFile()}>
                <img src={download} title="Baixar lista de strikes" className="icon"/>
              </button>
            </div>

            <select className="form-control" name="filter" id="filter" onChange={e => setFilter(e.target.value)}>
              {listTeams.map(team => (
                <option key={team.nome_equipe_slug} value={team.nome_equipe_slug}>{team.nome_equipe}</option>
              ))}
            </select>

            <ViewResults>
              { (isLoaded) ? <Loader /> : null }
              <h5 id='searchMessage' />
              <div id='alert'/>
              <ul>
                {members.map(member => (
                  ((filter != 'allMembers') && (member.equipes).indexOf(filter) != -1) ?
                    <CardButton id={member.matricula} key={member.matricula} onClick={() => setSelectedMember(member)}>
                      <li className="member-item">
                        <header>
                          <img src={member.foto_url}/>
                          <div className="user-info">
                            <strong>{((member.nome_completo).split(' ')[0]).concat(' ' + (member.nome_completo).split(' ')[1])}</strong><br />
                            {member.hierarquia}
                          </div>
                        </header>
                      </li>
                    </CardButton>
                  : (filter === 'allMembers') ?
                    <CardButton id={member.matricula} key={member.matricula} onClick={() => setSelectedMember(member)}>
                      <li className="member-item">
                        <header>
                          <img src={member.foto_url}/>
                          <div className="user-info">
                            <strong>{((member.nome_completo).split(' ')[0]).concat(' ' + (member.nome_completo).split(' ')[1])}</strong><br />
                            {member.hierarquia}
                          </div>
                        </header>
                      </li>
                    </CardButton>
                  : ''
                ))}
              </ul>
            </ViewResults>
          </LeftBox>
        </div>

        <div className="col-md-6">
          <RightBox>
            <div className="center">
              {(selectedMember) ? <img src={selectedMember.foto_url} className="img-thumbnail"/> : '' }
                <h1 id="noSelected">{(!selectedMember) ? 'Selecione um membro' : ''}</h1>

                <h1>{(selectedMember) ? selectedMember.nome_completo : ''}</h1>
                <h3>{(selectedMember) ? selectedMember.hierarquia : ''}</h3>

                {(selectedMember) ?
                  <div className="qty">
                    <h2>Strikes</h2>
                    <span>{selectedMember.contagem_strikes}</span>
                  </div>
                : ''}

                <div className="showStrikes">
                  {(selectedMember) ? (
                    <ul>
                      {(selectedMember.strikes_recebeu_aprovados).map(strike => (
                        <li key={strike.uuid}>
                          <Strike id={strike.uuid}>
                            {strike.data_criado + ' - ' + ((strike.motivo).substring(0, 30)).concat('...')}
                          </Strike>
                        </li>
                      ))}
                    </ul>
                  ) : ('')}
                </div>
                {(selectedMember) ? <Link to={'/strike/manage/historic?'.concat(selectedMember.matricula)}>Ver histórico completo</Link> : ''}
              </div>
            </RightBox>
          </div>
        </div>
      </div>
    </Screen>
  )
}
