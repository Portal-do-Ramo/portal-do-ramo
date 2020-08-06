import React, { useState, useEffect } from "react";
import api from "../../services/api";
import { useSelector } from 'react-redux';

import Top_Left_Side_Menu from "../../components/Top_Left_Side_Menu";
import Bottom_Right_Side_Menu from "../../components/Bottom_Right_Side_Menu";
import Header from "../../components/Home_Header";
import Title from "../../components/Title";
import Loader from "../../components/LoaderSpinner";

import { Screen, Content, Card, CardEvent, BTNCircle } from "./styles";


export default function ControlPartner() {
  document.title = "Gerenciar parceria";
  const access_token = "Bearer".concat(sessionStorage.getItem("access_token"));
  const urlData = window.location.search.slice(1);
  const hierarquia = (useSelector(state => state.data[4]));
  const partner = (useSelector(state => state.data[23]));

  const [isLoaded, setIsLoaded] = useState(false);
  const [alert, setAlert] = useState('');

  const [partnerData, setPartnerData] = useState();
  const [codePartner, setCodePartner] = useState('');
  const [base64, setBase64] = useState('');
  const [isEnabled, setIsEnabled] = useState(false);
  const [isEnabled2, setIsEnabled2] = useState(false);
/* 
  if (urlData === '') {
    window.location.href = '/error';
  } */

  if (
    hierarquia !== 'Presidente' &&
    hierarquia !== 'Vice-Presidente' &&
    hierarquia !== 'Diretor de Gestão de Pessoas' &&
    hierarquia !== 'Assessor de Coordenador'
  ) {
    window.location.href = '/noaccess'
  }



  useEffect(() => {
   /*  api.get(`/api/equipes/equipe-completa/${urlData}`, { headers: { Authorization: access_token } })
    .then(response => {
      setTeamData(response.data)
      setCodeTeam(response.data.nome_equipe)
      setEvents(response.data.eventos)
      setArchives(response.data.arquivos)

      for(let i = 0; i < response.data.membros.length; i++) {
        if(response.data.membros[i].funcao === 'Coordenador') {
          setLeader(response.data.membros[i])
        }

        if(response.data.membros[i].funcao === 'Assessor') {
          setAdvisor(response.data.membros[i])
        }
      }
    })
    .catch(() => window.location.href = '/error')
    .finally(() => setIsLoaded(true)); */
  }, []);


  useEffect(() => {
    /* api.get('api/usuarios', { headers: { Authorization: access_token } })
    .then(response => setMembers((response.data.Ativo).concat(response.data.Inativo)))
    .catch(() => window.location.href = '/error') */
  }, []);


  setTimeout(() => {
    if (alert !== '') {
      setAlert('')
    }
  }, 4000);


  function sendGeneralInfo() {
   /*  api.put(`/api/equipes/${urlData}`, {
      nome_equipe: document.getElementById('team-name').value,
      capitulo: document.getElementById('team-chapter').value
    }, { headers: { Authorization : access_token } })
    .then(() => setAlert('<div class="alert alert-success" role="alert"><strong>Dados enviados com sucesso!</strong></div>'))
    .catch(() => setAlert('<div class="alert alert-danger" role="alert"><strong>Não foi possível enviar os dados.</strong> Se o problema persistir, favor contate a diretoria.</div>')) */
  }


  function setStateOfButton() {
    var files = document.getElementById('url-img').files;
    if (files.length > 0) {
      setIsEnabled(true)
    }
  }


  function setStateOfButtonPDF() {
    var files = document.getElementById('input-file').files;
    if (files.length > 0) {
      setIsEnabled2(true)
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


  function convertToBase64PDF() {
    var files = document.getElementById('input-file').files;

    if (files.length > 0) {
      getBase64(files[0])
    }
  }


  function convertToBase64() {
    var files = document.getElementById('url-img').files;
    if (files.length > 0) {
      getBase64(files[0])
    }
  }


  /* function sendNewPicture() {
    if (base64 === '') {
      setAlert('<div class="alert alert-danger" role="alert"><strong>Carregue uma imagem!</strong></div>')
      return
    }

    api.put(`/api/parceria/alterar-logo/${urlData}`, {
      logo_parceria: base64
    }, { headers: { Authorization : access_token } })
    .then(() => setAlert('<div class="alert alert-success" role="alert"><strong>Imagem alterada com sucesso!</strong></div>'))
    .catch(() => setAlert('<div class="alert alert-danger" role="alert"><strong>Não foi possível enviar a imagem.</strong> Se o problema persistir, favor contate a diretoria.</div>'))
  } */


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
        <Title title="Gerenciar Parcerias" />

        {(isLoaded) ?
          <div>
            <Content>
              <h1 className="title-area">Informações Gerais</h1>
              <div className="row">
                <div className="col-md-4">
                  <label htmlFor="partner-name">Nome do parceiro *</label>
                  <input
                    type="text"
                    id="partner-name"
                    name="partner-name"
                    className="form-control"
                    defaultValue={(partnerData) ? partnerData.nome_parceria : ''}
                    onChange={(e) => setCodePartner(e.target.value)}
                    required
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="partner-telephone">Telefone</label>
                  <input
                    type="tel"
                    id="partner-telephone"
                    name="partner-telephone"
                    className="form-control"
                    pattern="([0-9]{2})-[0-9]{9}"
                    defaultValue={(partnerData) ? partnerData.telefone_parceria : ''}
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="code-partner">Código</label>
                  <input
                    type="text"
                    id="code-partner"
                    name="code-partner"
                    className="form-control"
                    value={codePartner.split(" ").join("-").toLowerCase()}
                    readOnly
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-4">
                <label htmlFor="partner-email">Email</label>
                  <input
                    type="email"
                    id="partner-email"
                    name="partner-email"
                    className="form-control"
                    defaultValue={(partnerData) ? partnerData.email_parceria : ''}
                  />
                </div>
                <div className="col-md-4">
                <label htmlFor="partner-site">Site</label>
                  <input
                    type="url"
                    id="partner-site"
                    name="partner-site"
                    className="form-control"
                    defaultValue={(partnerData) ? partnerData.site_parceria : ''}
                  />
                </div>
                <div className="col-md-4">
                <label htmlFor="partner-benefits">Benefícios</label>
                  <textarea
                    type="text"
                    id="partner-benefits"
                    name="partner-benefits"
                    className="partner-benefits"
                    defaultValue={(partnerData) ? partnerData.beneficios_parceria : ''}
                  ></textarea>
                </div>
                <div className="row">
                  <div className="col-md-4">
                  <label htmlFor="partner-duration">Duração da Parceria</label>
                    <input
                      type="number"
                      id="partner-duration"
                      name="partner-duration"
                      className="partner-duration"
                      defaultValue={(partnerData) ? partnerData.duracao_parceria : ''}
                    />
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="partner-level">Nivel da Parceria *</label>
                      <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="partner-level" id="gold"/>
                        <label className="form-check-label" htmlFor="gold">Ouro</label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="partner-level" id="silver"/>
                        <label className="form-check-label" htmlFor="silver">Prata</label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="partner-level" id="bronze"/>
                        <label className="form-check-label" htmlFor="bronze">Bronze</label>
                      </div>

                    </div>

                  <div className="col-md-4 right" />
                  <div className="col-md-2 down">
                    <label> </label>
                    <br />
                    <button className="btn-save" onClick={() => sendGeneralInfo()}>
                      Salvar
                    </button>
                  </div>
                  </div>
                </div>

              <hr />

              <h1 className="title-area">Altere a logo do parceiro!</h1>
              <div className="row">
                <div className="col-md-6">
                  <label htmlFor="partner-logo">Selecione a logo do parceiro</label>
                  <input type="file" name="url-img" id="url-img" className="form-control-file" accept="image/png, image/jpeg" />
                  <button className="btn-send-picture" onClick={() => {
                    setStateOfButton()
                    convertToBase64()
                  }} disabled={isEnabled}>
                    {(isEnabled) ? 'Carregado' : 'Carregar'}
                  </button>
                </div>
                <div className="col-md-4" />
                <div className="col-md-2">
                  <button className="btn-save" /* onClick={() => sendNewPicture()} */>
                    Salvar
                  </button>
                </div>
              </div>
            </Content>

          </div>
        :
          <div className="area-loader">
            <Loader />
          </div>
        }
      </div>

    </Screen>
  );
}
