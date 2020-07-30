import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import api from '../../services/api';
import { LoginScreen } from "./styles";

import LogoRamo from './images/logo.png';
import Icon_Instagram from './images/Icon_Instagram.png';
import Icon_Linkedin from './images/Icon_Linkedin.png';
import Icon_Facebook from './images/Icon_Facebook.png';

function setUserLogged(user) {
  return { type: 'SET_USER', user }
}

var jwtDecode = require('jwt-decode');

export default function LoginForm () {
  const access_token = sessionStorage.getItem("access_token");
  if (access_token != null) {
    window.location.href="/home";
  }

  const [alert, setAlert] = useState('');
  const dispatch = useDispatch()  ;

  function Login(e) {
    e.preventDefault();

    api.post(`/api/auth/login`, {
      matricula_usuario: document.getElementById('user-matricula').value,
      senha_usuario: document.getElementById('user-password').value
    })
    .then(response => {
      const access_token = response.data.token_de_acesso;
      var decoded = jwtDecode(access_token);
      sessionStorage.setItem("access_token", access_token);
      sessionStorage.setItem("mt", response.data.user.matricula);

      const user = {
        matricula: response.data.user.matricula,
        nome: response.data.user.nome_completo,
        email: response.data.user.email,
        ativo: decoded.ativo,
        hierarquia: response.data.user.hierarquia,
        data_nascimento: response.data.user.data_nascimento,
        idade: response.data.user.idade,
        curso: response.data.user.curso,
        telefone_principal: response.data.user.celular,
        pagante: response.data.user.pagante,
        situacao: response.data.user.situacao,
        quantidade_strikes: response.data.user.quantidade_strikes,
        quantidade_faltas_rg: response.data.user.quantidade_faltas_rg,
        quantidade_faltas_equipe: response.data.user.quantidade_faltas_equipe,
        quantidade_faltas_exposup: response.data.user.quantidade_faltas_exposup,
        foto_url: response.data.user.foto_url,
        gerenciar_membros: decoded.gerenciar_membros,
        criar_membros: decoded.criar_membros,
        gerenciar_strikes: decoded.gerenciar_strikes,
        gerenciar_faltas: decoded.gerenciar_faltas,
        assessor_flag: response.data.user.assessor_flag,
        marketing_flag: response.data.user.marketing_flag,
        notificacoes: response.data.user.notificacoes,
        equipes: response.data.user.equipes,
        projetos: response.data.user.projetos
      }

      dispatch(setUserLogged(user))

      if(decoded.ativo) {
        window.location.href = '/home';
      } else {
        window.location.href = '/primeirologin';
      }
    })
    .catch(error => {
      switch(error.response.status) {
        case 422:
          setAlert('<div class="alert alert-danger" role="alert">Dados informados inválidos!</div>');
          document.getElementById('user-matricula').focus();
          break;
        default:
          window.location.href = '/error';
          break;
      }
    })
  }

  useEffect(() => {
    document.getElementById('alert').innerHTML = alert;
  })

  return (
    <LoginScreen>
      <div className="login-area">
        <form onSubmit={Login}>
          <img src={LogoRamo} className="img-fluid" alt="logo-ramo"/>
          <div id="alert" />
          <div className="form-group">
            <input className="form-control"
              name="user-matricula"
              id="user-matricula"
              type="text"
              placeholder="Matrícula"
              autoComplete="off"
              required
            />
          </div>

          <div className="form-group">
            <input
              className="form-control"
              name="user-password"
              id="user-password"
              type="password"
              placeholder="Senha"
              required
            />
            <small><Link to="/recover-password">Esqueci minha senha</Link></small>
          </div>

          <div className="center">
            <button type="submit">Entrar</button>
          </div>
        </form>

        <div className="icons-area">
          <div className="row justify-content-center">
            <ul className="nav">
              <li><a href="https://instagram.com/ramocefet" target="_blank"><img src={Icon_Instagram} alt="instagram" /></a></li>
              <li><a href="https://www.linkedin.com/company/ramocefet/" target="_blank"><img src={Icon_Linkedin} alt="linkedin" /></a></li>
              <li><a href="https://www.facebook.com/ramocefet/" target="_blank"><img src={Icon_Facebook} alt="facebook" /></a></li>
            </ul>
          </div>
        </div>
      </div>

      <footer>
        <span>Portal do Ramo - 2020<br/>
          Todos os direitos reservados
        </span>
      </footer>
    </LoginScreen>
  );
}



