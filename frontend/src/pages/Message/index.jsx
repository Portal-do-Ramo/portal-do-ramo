import React, { useState, useEffect } from 'react';
import api from '../../services/api';

import Top_Left_Side_Menu from '../../components/Top_Left_Side_Menu';
import Bottom_Right_Side_Menu from '../../components/Bottom_Right_Side_Menu';
import Loader from '../../components/LoaderSpinner';

import {Screen, Title, Content, BoxLeft, BoxRight, ViewMembers, ViewResults, Search, Card, ListAddressee, Addressee} from './styles';
import search_icon from './images/search.png';

export default function Message(){
  document.title = 'Mensagem';

  const access_token = 'Bearer'.concat(sessionStorage.getItem("access_token"));
  const [members, setMembers] = useState([]);
  const [listTeams, setListTeams] = useState([]);

  const [destinatarios, setDestinatarios] = useState([]);
  const [searchedMembers, setSearchedMembers] = useState([]);
  const [filter, setFilter] = useState('allMembers');
  const [isLoaded, setIsLoaded] = useState(false);
  const [alert, setAlert] = useState('');

  const allMembers = [{nome_equipe_slug:"allMembers", nome_equipe:"Todos"}];

  useEffect(() => {
    api.get('api/usuarios/index-mensagem', {headers: { Authorization: access_token }})
    .then(response => setMembers(response.data))
    .catch(() => window.location.href = '/error')
    .finally(() => setIsLoaded(true))
  }, [])

  useEffect(() => {
    api.get('/api/equipes/select-equipes', { headers: { Authorization: access_token } })
    .then(response => setListTeams(allMembers.concat(response.data)))
    .catch(() => window.location.href = '/error')
  }, [])

  async function getResults(e){
    e.preventDefault();
    const nameSearched = document.getElementById("user-search").value;

    await api.get(`/api/usuarios/search?nome_completo=${nameSearched}`, { headers: { Authorization: access_token } })
    .then(response => {
      ((response.data).length !== 0) ?
        setSearchedMembers(response.data)
        // document.getElementById('searchMessage').innerHTML = ''
      :
        setSearchedMembers([])
        document.getElementById('searchMessage').innerHTML = ''
    })

    .catch(() => document.getElementById('viewAllResults').innerHTML = `<p>Não foi possível realizar a pesquisa</p>`)
    .finally(() => setIsLoaded(true))
  }


  function removeAddressee(addressee) {
    let aux = destinatarios;
    aux.splice(destinatarios.indexOf(addressee), 1);
    setDestinatarios(aux);
  }


  function sendEmail(e){
    e.preventDefault();
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    var emails = [];

    for(var i = 0; i < destinatarios.length; i++) {
      emails[i] = destinatarios[i].email;
    }

    api.post('/api/usuarios/mensagem', {
      assunto: subject,
      mensagem: message,
      destinatarios: emails
    }, {headers: { Authorization: access_token }})
    .then(() => setAlert('<div class="alert alert-success" role="alert"><strong>E-mail enviado com sucesso!</strong></div>'))
    .catch(error => {
      switch(error.response.status) {
        case 422:
          setAlert('<div class="alert alert-danger" role="alert"><strong>Selecione pelo menos um membro!</strong> Caso o erro ainda persista, contate a diretoria.</div>');
          break;
        default:
          window.location.href="/error"
          break;
      }
    })
  }


  useEffect(() => {
    document.getElementById('alert').innerHTML = alert;
  })


  return (
    <Screen>
      <Top_Left_Side_Menu />
      <Bottom_Right_Side_Menu />

      <Content className="container">
        <Title>Mensagem</Title>
        <p>Envie com facilidade um e-mail para membros</p>{console.log(destinatarios)}

        <div id="alert" />
        <div className="row">
          <BoxLeft className="col-md-6">
            <h3>Selecione os membros abaixo</h3>
            <select className="form-control" name="filter" id="filter" onChange={e => setFilter(e.target.value)}>
              {listTeams.map(team => (
                <option key={team.nome_equipe_slug} value={team.nome_equipe_slug}>{team.nome_equipe}</option>
              ))}
            </select>

            <ViewMembers id="viewAllMembers">
              { (isLoaded) ? null : <Loader /> }
              <ul>
                {members.map(member => (
                  ((filter != 'allMembers') && (member.equipes).indexOf(filter) != -1) ?
                    <Card key={member.matricula} onClick={() => {
                      if (destinatarios.indexOf(member) === -1) {
                        console.log(member)
                        setDestinatarios(destinatarios => [...destinatarios, member])
                      } else {
                        console.log(member)
                        null
                      }
                    }}
                    >
                      <li className="member-item">
                        <header>
                          <img src={member.foto_url}/>
                          <div className="user-info">
                            <strong>{((member.nome_completo).split(' ')[0]).concat(' ' + (member.nome_completo).split(' ')[1])}</strong><br />
                            <span>{member.hierarquia}</span>
                          </div>
                        </header>
                      </li>
                    </Card>
                  : (filter === 'allMembers') ?
                      <Card key={member.matricula} onClick={
                        () => (destinatarios.indexOf(member) == -1) ?
                        setDestinatarios(destinatarios => [...destinatarios, member]) :
                        null}
                      >
                        <li className="member-item">
                          <header>
                            <img src={member.foto_url}/>
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
            <h3>Ou pesquise pelo nome do membro</h3>
            <Search className="form-inline" onSubmit={getResults}>
              <input className="form-control mr-sm-2" id="user-search" type="search" placeholder="Buscar" aria-label="Pesquisar" />
              <button className="btn btn-outline-success my-2 my-sm-0" id="btn-user-search" type="submit">
                <img src={search_icon} id="img-search"/>
              </button>
            </Search>

            <ViewResults>
              { (isLoaded) ? null : <Loader /> }
              <h5 id='searchMessage' />
              <ul>
                {searchedMembers.map(member => (
                  <Card key={member.matricula} onClick={
                    () => (destinatarios.indexOf(member) == -1) ?
                    setDestinatarios(destinatarios => [...destinatarios, member])
                    : null}
                  >
                    <li className="member-item">
                      <header>
                        <img src={member.foto_url}/>
                        <div className="user-info">
                          <strong>{member.nome_completo}</strong><br />
                          <span>{member.hierarquia}</span>
                        </div>
                      </header>
                    </li>
                  </Card>
                ))}
              </ul>
            </ViewResults>
          </BoxRight>
        </div>

        <h4>Membros selecionados</h4>
        <div className="row">
          <ul id="view">
            <ListAddressee>
              {destinatarios.map(addressee => (
                <Addressee
                  key={addressee.matricula}
                  id={addressee.matricula}
                  onClick={e => {
                    removeAddressee(addressee)
                    document.getElementById(e.target.id).hidden = true
                  }}
                  title={addressee.nome_completo}>
                  {addressee.nome_completo.split(' ')[0]}
                </Addressee>
              ))}
            </ListAddressee>
          </ul>
        </div>

        <form onSubmit={sendEmail}>
          <div className="row">
            <input
              type="textarea"
              className="form-control"
              id="subject"
              name="subject"
              placeholder="Assunto"
              autoComplete="off"
              required
            />
          </div>

          <div className="row">
            <textarea
              className="form-control"
              id="message"
              name="message"
              placeholder="Mensagem"
              required
            />
          </div>

          <div className="center">
            <button className="btn-send" type="submit">Enviar</button>
          </div>
        </form>
      </Content>
    </Screen>
  )
}
