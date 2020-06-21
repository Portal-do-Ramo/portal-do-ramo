import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import InputMask from 'react-input-mask';
import api from '../../services/api';

import Top_Left_Side_Menu from '../../components/Top_Left_Side_Menu';
import Bottom_Right_Side_Menu from '../../components/Bottom_Right_Side_Menu';
import Header from '../../components/Home_Header';
import Title from '../../components/Title';

import { Screen, Content } from './styles';

export default function RegisterMembers () {
  document.title = "Registrar membro";
  const access_token = 'Bearer'.concat(sessionStorage.getItem("access_token"));
  const hierarquia = (useSelector(state => state.data[4]));

  const [alert, setAlert] = useState('');
  const [courses, setCourses] = useState([]);
  const [hierarchies, setHierarchies] = useState([]);
  const [base64, setBase64] = useState('');
  const [isEnabled, setIsEnabled] = useState(false);

  const [isAssessor, setIsAssessor] = useState(false);
  const [isMarketing, setIsMarketing] = useState(false);


  useEffect(() => {
    api.get('/api/cursos', {headers: { Authorization: access_token }})
    .then(response => setCourses(response.data))
    .catch(() => window.location.href = '/error')
  }, [])


  useEffect(() => {
    api.get('/api/hierarquias', {headers: { Authorization: access_token }})
    .then(response => setHierarchies(response.data))
    .catch(() => window.location.href = '/error')
  }, [])


  function isViewed() {
    if (
      hierarquia === 'Diretor de Gestão de Pessoas' ||
      hierarquia === 'Presidente' ||
      hierarquia === 'Vice-Presidente'
    ) {
      return true;
    } else {
      return false;
    }
  }


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


  function registerMember() {
    const matricula_usuario = document.getElementById('matricula').value;
    const email_usuario = document.getElementById('email').value;
    const nome_completo = document.getElementById('nome_completo').value;
    const data_nascimento = document.getElementById('data_nascimento').value.split('-');
    const celular = document.getElementById('celular').value;
    const files = document.getElementById('url-img').files;

    if (nome_completo === '') {
      setAlert('<div class="alert alert-danger" role="alert"><strong>Nome completo inválido!</strong></div>')
      return
    }

    if (email_usuario === '') {
      setAlert('<div class="alert alert-danger" role="alert"><strong>Email inválido!</strong></div>')
      return
    }

    if (matricula_usuario === '') {
      setAlert('<div class="alert alert-danger" role="alert"><strong>Matrícula inválida!</strong></div>')
      return
    }

    if (celular === '') {
      setAlert('<div class="alert alert-danger" role="alert"><strong>Celular inválido!</strong></div>')
      return
    }

    if (data_nascimento.length === 1) {
      setAlert('<div class="alert alert-danger" role="alert"><strong>Data de nascimento inválida!</strong></div>')
      return
    }

    if (!isEnabled) {
      setAlert('<div class="alert alert-danger" role="alert"><strong>Carregue uma imagem!</strong></div>')
      return
    }

    const data_nascimento_padrao = data_nascimento[2] + '/' + data_nascimento[1] + '/' + data_nascimento[0];

    api.post(`/api/usuarios`, {
      matricula_usuario: matricula_usuario,
      hierarquia_usuario: document.getElementById('hierarchy').value,
      email_usuario: email_usuario,
      nome_completo: nome_completo,
      data_nascimento: data_nascimento_padrao,
      curso_usuario: document.getElementById('courses').value,
      telefone_principal: celular,
      foto: base64,
      assessor: isAssessor,
      marketing: isMarketing,
      numero_ieee: '',
      cadastro_robocore: ''
    }, {headers: { Authorization: access_token }})
    .then(() => setAlert('<div class="alert alert-success" role="alert">Cadastro realizado com sucesso!</div>'))
    .catch(error => {
      switch(error.response.data) {
        case 500:
          window.location.href = '/error';
          break;
        default:
          setAlert('<div class="alert alert-danger" role="alert">Não foi possível cadastrar o membro! <strong>Confira os dados digitados!</strong></div>');
          break;
      }
    })
  }


  useEffect(() => {
    document.getElementById('alert').innerHTML = alert;
  })


  return (
    <Screen>
      {(window.onloadstart = isViewed()) ?
        <>
          <Top_Left_Side_Menu/>
          <Bottom_Right_Side_Menu />
          <div className="area-alert" id="alert" />
          <div className="container">
            <Header />
            <Title title="Registrar novo membro"/>

            <Content>
              <p><strong>Campos com * são de preenchimento obrigatório.</strong></p>
                <div id="alert" />
                <div className="row">
                  <div className="col-md-4">
                    <label htmlFor="nome_completo">Nome completo *</label>
                    <input
                      className="form-control"
                      type="text"
                      name="nome_completo"
                      id="nome_completo"
                    />
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="email">E-mail *</label>
                    <input
                      className="form-control"
                      type="email"
                      name="email"
                      id="email"
                    />
                  </div>
                  <div className="col-md-2">
                    <label htmlFor="celular">Matrícula *</label>
                    <input
                      className="form-control"
                      type="text"
                      name="matricula"
                      id="matricula"
                    />
                  </div>
                  <div className="col-md-2 box-checkbox">
                    <input
                      className="form-control"
                      type="checkbox"
                      name="item"
                      id="isAssessor"
                      value={true}
                      onClick={() => setIsAssessor(!isAssessor)}
                      className="checkbox"
                    />
                    <label htmlFor="isAssessor">Assessor</label><br />
                    <input
                      className="form-control"
                      type="checkbox"
                      name="item"
                      id="isMarketing"
                      value={true}
                      className="checkbox"
                      onClick={() => setIsMarketing(!isMarketing)}
                    />
                    <label htmlFor="isMarketing">Marketing</label>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-4">
                    <label htmlFor="curso">Curso *</label>
                    <select id="courses" className="form-control">
                      {courses.map(course => (
                        <option value={course.id} key={course.id}>{course.nome}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="hierarchy">Hierarquia *</label>
                    <select id="hierarchy" className="form-control">
                      {hierarchies.map(hierarchy => (
                        <option value={hierarchy.id} key={hierarchy.id}>{hierarchy.nome}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-2">
                    <label htmlFor="celular">Celular *</label>
                    <InputMask
                      type="tel"
                      className="form-control"
                      name="celular"
                      id="celular"
                      mask="(99) 99999-9999"
                      maskChar=" "
                    />
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="data_nascimento">Data de nascimento *</label>
                    <input
                      className="form-control"
                      type="date"
                      name="data_nascimento"
                      id="data_nascimento"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <label htmlFor="url-img">Foto de perfil *</label>
                    <p>Após selecionar a foto clique em <strong>CARREGAR</strong></p>
                    <input type="file" name="url-img" id="url-img" className="form-control-file" accept="image/png, image/jpeg" title="Teste"/>
                    <button className="btn-send-picture" onClick={() => {
                      setStateOfButton()
                      convertToBase64()
                    }} disabled={isEnabled}>
                      {(isEnabled) ? 'Carregado' : 'Carregar'}
                    </button>
                  </div>
                </div>
                <div className="center">
                  <button className="btn-send" onClick={() => registerMember()}>Cadastrar</button>
                </div>
            </Content>
          </div>
        </>
      :
        <div id="no-access">
          <h3>Você não tem acesso a essa página!</h3>
          <br />
          <button className="btn-send" onClick={() => window.location.href = "/home"}>Voltar</button>
        </div>
      }
    </Screen>
  )
}
