import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import api from '../../services/api';

import Top_Left_Side_Menu from '../../components/Top_Left_Side_Menu';
import Bottom_Right_Side_Menu from '../../components/Bottom_Right_Side_Menu';
import Header from '../../components/Home_Header';
import Title from '../../components/Title';
import Loader from '../../components/LoaderSpinner';

import {Screen, Search, TitleBox, ViewResults, Card} from './styles';
import download from './images/download.png';
import search_icon from './images/search.png';

function ManageMembers(){
  document.title = 'Gerenciar membros';
  const access_token = 'Bearer'.concat(sessionStorage.getItem("access_token"));
  const hierarquia = (useSelector(state => state.data[4]));

  const [members, setMembers] = useState([]);
  const [isLoaded, setIsLoaded] = useState(true);
  const [selectedMember, setSelectedMember] = useState();

  if (
    hierarquia !== 'Diretor de Gestão de Pessoas' &&
    hierarquia !== 'Presidente' &&
    hierarquia !== 'Vice-Presidente'
  ) {
    window.location.href = '/noaccess'
  }


  useEffect(() => {
    api.get('api/usuarios', { headers: { Authorization: access_token } })
    .then(response => setMembers((response.data.Ativo).concat(response.data.Inativo)))
    .catch(() => window.location.href = '/error')
    .finally(() => setIsLoaded(false))
  }, [])


  async function getResults(e){
    e.preventDefault()
    setIsLoaded(true)
    setMembers([])
    const nameSearched = document.getElementById("user-search").value
    await api.get(`/api/usuarios/search?nome_completo=${nameSearched}`, {headers: { Authorization: access_token }})
    .then(response => {
      if(response.data.length !== 0) {
        setMembers(response.data)
        document.getElementById('searchMessage').innerHTML = ''
      } else {
        setMembers([])
        document.getElementById('searchMessage').innerHTML = 'Sem resultados'
      }
    })
    .catch(() => document.getElementById('viewAllResults').innerHTML = `<p>Não foi possível realizar a pesquisa</p>`)
    .finally(() => setIsLoaded(false))
  }


  function downloadFile(type) {
    api.get(`/api/usuarios/${type}`, { headers: { Authorization: access_token },  responseType: 'blob' })
    .then(response => {
      const downloadUrl = window.URL.createObjectURL(response.data);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.setAttribute('download', `${type}.xlsx`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    })
    .catch(error => console.log(error))
  }


  return (
    <Screen>
      <Top_Left_Side_Menu />
      <Bottom_Right_Side_Menu />

      <div className="container">
        <Header />
        <Title title="Gerenciar membros" />

        <div className="row">
          <div className="col-md-6">
            <div className="left-box-gray">
              <div className="row">
                <TitleBox>
                  Membros
                </TitleBox>
                <Link to='/registermembers' className="btn-add">
                  +
                </Link>
              </div>
              <Search className="form-inline" onSubmit={getResults}>
                <input
                  className="form-control mr-sm-2"
                  id="user-search"
                  type="search"
                  placeholder="Buscar"
                  aria-label="Pesquisar"
                />
                <button
                  className="btn btn-outline-success my-2 my-sm-0"
                  id="btn-user-search"
                  type="submit">
                  <img src={search_icon} id="img-search" alt="search" />
                </button>
              </Search>

              <ViewResults>
                { (isLoaded) ? <Loader /> : null }
                <h5 id="searchMessage" />
                <div id="alert"/>
                <ul>
                  {members.map(member => (
                    <Card key={member.matricula} onClick={() => setSelectedMember(member)}>
                      <li className="member-item">
                        <header>
                          <img src={member.foto_url} alt="avatar" />
                          <div className="user-info">
                            <strong>{((member.nome_completo).split(' ')[0]).concat(' ' + (member.nome_completo).split(' ')[1])}</strong><br />
                            {member.hierarquia}
                          </div>
                        </header>
                      </li>
                    </Card>
                  ))}
                </ul>
              </ViewResults>
            </div>
          </div>

          <div className="col-md-6">
            <div className="right-box-blue-gradient">
              <div className="viewMember">
                <div className="center">
                  {(selectedMember) ? <img src={selectedMember.foto_url} className="img-thumbnail" alt="avatar" /> : '' }
                  <h1>{(selectedMember) ? ((selectedMember.nome_completo).split(' ')[0]).concat(' ' + (selectedMember.nome_completo).split(' ')[1]) : ''}</h1>
                  <h3>{(selectedMember) ? selectedMember.hierarquia : ''}</h3>
                </div>

                {(selectedMember) ? (
                  <div className="div-ul">
                    <ul>
                      <Link to={'/profile?'.concat(selectedMember.matricula)}><li>Ver perfil público</li></Link>
                      <Link to={'/managemembers/member?'.concat(selectedMember.matricula)}><li>Dados pessoais</li></Link>
                      <Link to={'/projects/historic?'.concat(selectedMember.matricula)}><li>Projetos</li></Link>
                      <Link to={'/strike/manage/historic?'.concat(selectedMember.matricula)}><li>Strikes</li></Link>
                      <Link to={'/manageabsences/historic?'.concat(selectedMember.matricula)}><li>Faltas</li></Link>
                    </ul>
                  </div>
                ) : (
                  <div className="center-flex"><h1>Selecione um membro</h1></div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="box-download">
          <div className="row">
            <Title title="Download" />
          </div>
          <div className="row">
            <div className="col-md-3 center-download">
              <button className="btn-download" onClick={() => downloadFile('lista-presenca')}><img src={download} className="icon" title="Baixar lista de presença" alt="lista-presenca" />Lista de presença</button>
            </div>
            <div className="col-md-3 center-download">
              <button className="btn-download" onClick={() => downloadFile('lista-inativos')}><img src={download} title="Baixar lista de inativos" className="icon" alt="lista-inativos" />Membros inativos</button>
            </div>
            <div className="col-md-3 center-download">
              <button className="btn-download" onClick={() => downloadFile('lista-desligados')}><img src={download} title="Baixar lista de desligados" className="icon" alt="lista-desligados" />Membros desligados</button>
            </div>
            <div className="col-md-3 center-download">
              <button className="btn-download" onClick={() => downloadFile('lista-pagantes')}><img src={download} title="Baixar lista de pagantes" className="icon" alt="lista-pagantes" />Membros pagantes</button>
            </div>
          </div>
        </div>
      </div>
    </Screen>
  )
}

export default ManageMembers;
