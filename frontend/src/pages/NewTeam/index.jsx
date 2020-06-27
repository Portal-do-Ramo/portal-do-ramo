import React, { useState, useEffect } from "react";
import api from "../../services/api";

import Top_Left_Side_Menu from "../../components/Top_Left_Side_Menu";
import Bottom_Right_Side_Menu from "../../components/Bottom_Right_Side_Menu";
import Header from "../../components/Home_Header";
import Title from "../../components/Title";

import { Screen, Content, BoxModalScreen, ModalScreen, Card, Alert } from "./styles";

import crown from "./images/crown.png";
import avatar from "./images/avatar.png";

export default function NewTeam() {
  document.title = "Nova equipe";
  const access_token = "Bearer".concat(sessionStorage.getItem("access_token"));

  const [members, setMembers] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [alert, setAlert] = useState('');

  const [codeTeam, setCodeTeam] = useState("");
  const [percent, setPercent] = useState(0);

  const [leader, setLeader] = useState();
  const [advisor, setAdvisor] = useState();

  const [base64, setBase64] = useState('');
  const [isEnabled, setIsEnabled] = useState(false);


  useEffect(() => {
    api.get('api/usuarios', { headers: { Authorization: access_token } })
    .then(response => setMembers((response.data.Ativo).concat(response.data.Inativo)))
    .catch(() => window.location.href = '/error')
  }, []);


  function setStateOfButton() {
    var files = document.getElementById('url-img').files;
    if (files.length > 0) {
      setIsEnabled(true)
    }
  }


  function getBase64(file) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      setBase64(reader.result);
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }


  function convertToBase64() {
    var files = document.getElementById('url-img').files;
    if (files.length > 0) {
      getBase64(files[0])
    }
  }


  function sendData() {
    let base64_logo = '';
    const team_name = document.getElementById('team-name').value;
    const team_chapter = document.getElementById('team-chapter').value;

    if (team_name === '') {
      setAlert('<div class="alert alert-danger" role="alert"><strong>O nome da equipe é obrigatório!</strong></div>')
      return
    }

    if (!leader) {
      setAlert('<div class="alert alert-danger" role="alert"><strong>Selecione o coordenador!</strong></div>')
      return
    }

    api.post('/api/equipes', {
      nome_equipe: team_name,
      porcentagem_orcamento: percent,
      capitulo: team_chapter,
      matricula_coordenador: leader.matricula,
      matricula_assessor: (advisor) ? advisor.matricula : '',
      logo_equipe: base64,
    }, { headers: { Authorization: access_token } })
    .then(() => setAlert('<div class="alert alert-success" role="alert"><strong>Equipe criada com sucesso!</strong></div>'))
    .catch(() => setAlert('<div class="alert alert-danger" role="alert"><strong>Não foi possível criar a equipe.</strong> Se o problema persistir, favor contate a diretoria.</div>'))
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
        <Title title="Nova equipe" />

        <Content>
          <h1 className="title-area">Informações Gerais</h1>
          <div className="row">
            <div className="col-md-4">
              <label htmlFor="team-name">Nome da equipe *</label>
              <input
                type="text"
                id="team-name"
                name="team-name"
                className="form-control"
                placeholder="Obrigatório"
              />
            </div>
            <div className="col-md-4">
              <label htmlFor="team-chapter">Capítulo</label>
              <input
                type="text"
                id="team-chapter"
                name="team-chapter"
                className="form-control"
              />
            </div>
            <div className="col-md-4">
              <label htmlFor="percent">
                {percent}% no Orçamento
              </label>
              <input
                type="range"
                id="percent"
                minLength={0}
                maxLength={100}
                className="form-control"
                value={percent}
                onChange={e => setPercent(e.target.value)}
              />
            </div>
          </div>

          <hr />

          <h1 className="title-area">Logo da equipe</h1>
          <div className="row">
            <div className="col-md-6">
              <label htmlFor="team-logo">Selecione a logo da equipe (Altura = Largura, sem bordas)</label>
              <input type="file" name="url-img" id="url-img" className="form-control-file" accept="image/png, image/jpeg" />
              <button className="btn-send-picture" onClick={() => {
                setStateOfButton()
                convertToBase64()
              }} disabled={isEnabled}>
                {(isEnabled) ? 'Carregado' : 'Carregar'}
              </button>
            </div>
          </div>

          <hr />

          <div className="row">
            <div className="col-md-6">
              <button className="btn-card-blue" onClick={() => document.getElementById('set-leader-area').style.display = 'block'}>
                <div>
                  <label htmlFor="leader-name">Clique para escolher</label>
                  <img src={leader ? leader.foto_url : avatar} className="leader-image" alt="avatar" />
                  <h1 className="title-name" id="leader-name">
                    {leader ? leader.nome_completo.split(' ')[0].concat(' ' + leader.nome_completo.split(' ')[1]) : 'Selecione'}
                  </h1>
                  <h1 className="hierarchy">
                    <img src={crown} className="icon" alt="icon" />
                    Coordenadoria
                  </h1>
                </div>
              </button>
            </div>
            <div className="col-md-6">
              <button className="btn-card-blue" onClick={() => document.getElementById('set-advisor-area').style.display = 'block'}>
                <div>
                  <label htmlFor="assessor-name">Clique para escolher</label>
                  <img src={advisor ? advisor.foto_url : avatar} className="leader-image" alt="avatar" />
                  <h1 className="title-name" id="leader-name">
                    {advisor ? advisor.nome_completo.split(' ')[0].concat(' ' + advisor.nome_completo.split(' ')[1]): 'Selecione'}
                  </h1>
                  <h1 className="hierarchy">
                    <img src={crown} className="icon" alt="icon" />
                    Assessoria
                  </h1>
                </div>
              </button>
            </div>
          </div>
          <div className="row center">
            <button className="btn-save" onClick={() => sendData()}>Enviar</button>
          </div>
        </Content>
      </div>


      {/* MODAL COORDENADOR */}

      <ModalScreen id="set-leader-area" className="modal">
        <BoxModalScreen className="container box-modal-screen">
          <div className="modal-content animate view">
            <div className="row">
              <h1 className="title">Selecione o coordenador (a)</h1>
            </div>
            <div className="inside-area">
              <div className="view-members">
                <ul>
                  {members
                    ? members.map((member) => (
                      <Card key={member.matricula} onClick={() => setLeader(member)}>
                        <li className="member-item">
                          <header>
                            <img src={member.foto_url} alt="avatar" />
                            <div className="user-info">
                              <strong>{member.nome_completo.split(' ')[0].concat(' ' + member.nome_completo.split(' ')[1])}</strong>
                              <br />
                              {member.hierarquia}
                            </div>
                          </header>
                        </li>
                      </Card>
                    ))
                  : ''}
                </ul>
              </div>
              <div className="row buttons-area">
                <button className="btn btn-primary" onClick={() => document.getElementById('set-leader-area').style.display = 'none'}>
                  Fechar
                </button>
              </div>
            </div>
          </div>
        </BoxModalScreen>
      </ModalScreen>


      {/* MODAL ADVISOR */}

      <ModalScreen id="set-advisor-area" className="modal">
        <BoxModalScreen className="container box-modal-screen">
          <div className="modal-content animate view">
            <div className="row">
              <h1 className="title">Selecione o assessor (a)</h1>
            </div>
            <div className="inside-area">
              <div className="view-members">
                <ul>
                  {members
                    ? members.map((member) => (
                      <Card key={member.matricula} onClick={() => setAdvisor(member)}>
                        <li className="member-item">
                          <header>
                            <img src={member.foto_url} alt="avatar" />
                            <div className="user-info">
                              <strong>{member.nome_completo.split(' ')[0].concat(' ' + member.nome_completo.split(' ')[1])}</strong>
                              <br />
                              {member.hierarquia}
                            </div>
                          </header>
                        </li>
                      </Card>
                    ))
                  : ''}
                </ul>
              </div>
              <div className="row buttons-area">
                <button className="btn btn-primary" onClick={() => document.getElementById('set-advisor-area').style.display = 'none'}>
                  Fechar
                </button>
              </div>
            </div>
          </div>
        </BoxModalScreen>
      </ModalScreen>

      <div className="container area-alert" id="alert">
        <Alert>
          <h1>{alert}</h1>
          <button className="close-alert" onClick={() => document.getElementById('alert').style.display = 'none'}>x</button>
        </Alert>
      </div>
    </Screen>
  );
}
