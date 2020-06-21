import React, { useState, useEffect } from 'react';
import api from '../../services/api';

import Top_Left_Side_Menu from '../../components/Top_Left_Side_Menu';
import Bottom_Right_Side_Menu from '../../components/Bottom_Right_Side_Menu';
import Header from '../../components/Home_Header';
import Title from '../../components/Title';
import Loader from '../../components/LoaderSpinner';

import { Screen, BoxLeft, BoxRight, ViewMembers, Card } from './styles';
import avatar from './images/avatar.png';

export default function ApplyStrike (){
  document.title = 'Aplicar Strike';
  const access_token = 'Bearer'.concat(sessionStorage.getItem('access_token'));

  const [members, setMembers] = useState([]);
  const [listTeams, setListTeams] = useState([]);

  const [selectedMember, setSelectedMember] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [filter, setFilter] = useState('allMembers');
  const [alert, setAlert] = useState('');

  const allMembers = [{nome_equipe_slug:"allMembers", nome_equipe:"Todos"}];

  useEffect(() => {
    api.get('api/usuarios/index-mensagem', { headers: { Authorization: access_token } })
    .then(response => setMembers(response.data))
    .catch(() => window.location.href="/error")
    .finally(() => setIsLoaded(true))
  }, [])

  useEffect(() => {
    api.get('/api/equipes/select-equipes', { headers: { Authorization: access_token } })
    .then(response => setListTeams(allMembers.concat(response.data)))
    .catch(() => window.location.href="/error")
  }, [])

  useEffect(() => {
    document.getElementById('alert').innerHTML = alert;
  })

  function sendStrike(e){
    e.preventDefault()
    const reason = document.getElementById("reason").value
    api.post('/api/strikes', {
      motivo: reason,
      membro_recebeu: selectedMember.matricula
    }, {headers: { Authorization: access_token }})
    .then(() => {
      setAlert('<div class="alert alert-success" role="alert">Strike enviado à diretoria para aprovação.</div>')
    })
    .catch(error => {
      switch(error.response.status){
        case 500:
          window.location.href = '/error'
          break;
        case 422:
          setAlert('<div class="alert alert-warning" role="alert"><strong>Selecione um membro!</strong></div>')
          break;
        default:
          setAlert('<div class="alert alert-danger" role="alert"><strong>Não foi possível enviar o strike.</strong> Tente novamente mais tarde!</div>')
          break;
      }
    })
  }

  return (
    <Screen>
      <Top_Left_Side_Menu />
      <Bottom_Right_Side_Menu />

      <div className="container">
        <Header />
        <Title title="Aplicar strike" />

        <div className="row">
          <BoxLeft className="col-md-6">
            <h2>Selecione o membro abaixo</h2>
            <select className="form-control" name="filter" id="filter" onChange={e => setFilter(e.target.value)}>
              {listTeams.map(team => (
                <option key={team.nome_equipe_slug} value={team.nome_equipe_slug}>{team.nome_equipe}</option>
              ))}
            </select>

            <ViewMembers id="viewAllMembers">
              <ul>
                { (isLoaded) ? null : <Loader /> }
                {members.map(member => (
                  ((filter != 'allMembers') && (member.equipes).indexOf(filter) != -1) ?
                    <Card key={member.matricula} className="card" id={member.matricula} onClick={() => setSelectedMember(member)}>
                      <li className="member-item">
                        <header>
                          <img src={member.foto_url} alt="avatar" />
                          <div className="user-info">
                            <strong>{((member.nome_completo).split(' ')[0]).concat(' ' + (member.nome_completo).split(' ')[1])}</strong><br />
                            <span>{member.hierarquia}</span>
                          </div>
                        </header>
                      </li>
                    </Card>
                  : (filter === 'allMembers') ?
                      <Card key={member.matricula} className="card" id={member.matricula} onClick={() => setSelectedMember(member)}>
                        <li className="member-item">
                          <header>
                            <img src={member.foto_url} alt="avatar" />
                            <div className="user-info">
                              <strong>{((member.nome_completo).split(' ')[0]).concat(' ' + (member.nome_completo).split(' ')[1])}</strong><br />
                              <span>{member.hierarquia}</span>
                            </div>
                          </header>
                        </li>
                      </Card>
                  : ''
                ))}
              </ul>
            </ViewMembers>
          </BoxLeft>

          <BoxRight className="col-md-6">
            <div className="btn-card-blue">
              <div>
                <label>Membro selecionado</label>
                <img src={(selectedMember) ? selectedMember.foto_url : avatar} className="leader-image" alt="avatar" />
                <h1 className="title-name">{(selectedMember) ? ((selectedMember.nome_completo).split(' ')[0]).concat(' ' + (selectedMember.nome_completo).split(' ')[1]) : 'Selecione'}</h1>
                <h1 className="hierarchy">{(selectedMember) ? selectedMember.hierarquia : ''}</h1>
              </div>
            </div>
            <h2>Motivo</h2>
            <div id="alert" />
            <form onSubmit={sendStrike}>
              <textarea
                className="form-control"
                id="reason"
                name="reason"
                placeholder="Escreva de forma clara os motivos que levaram a aplicação desse strike."
                required
              />
              <p>O strike será enviado ao membro selecionado após validação da diretoria. Você será notificado ao longo do processo.</p>
              <button type="submit" className="btn-send">Enviar</button>
            </form>
          </BoxRight>
        </div>
      </div>
    </Screen>
  )
}
