import React, { useState, useEffect } from 'react';
import api from '../../services/api';

import { Screen } from './styles';
import Logo from './images/logo.png';

export default function NewPassword () {
  const [alert, setAlert] = useState('');
  const url = window.location.search.slice(1);

  setTimeout(() => {
    if (alert !== '') {
      setAlert('')
    }
  }, 4000);

  const [password, setPassword] = useState('');
  let passwordPoints = 0;

  if (url === '') {
    window.location.href = '/error';
  }

  function verificaForcaDaSenha() {
    const caracteresEspeciais = "!£$%^&*_@#~?";

    if (/[0-9]/.test(password)) {
      passwordPoints += 20;
    }

    if (/[A-Z]/.test(password)) {
      passwordPoints += 20;
    }

    if (/[a-z]/.test(password)) {
      passwordPoints += 20;
    }

    for (let i=0; i < password.length; i++) {
      if (caracteresEspeciais.indexOf(password.charAt(i)) > -1) {
        passwordPoints += 20;
      }
    }

    if (password.length > 7) {
      passwordPoints += 20;
    }

    if (password.length <= 1) {
      document.getElementById('password-force').innerHTML = '';
    } else {
      if (passwordPoints >= 100 ) {
        document.getElementById('password-force').innerHTML = 'Senha forte';
        document.getElementById('password-force').style.color = '#018F30';
      } else {
        if (passwordPoints < 100 && passwordPoints >= 60) {
          document.getElementById('password-force').innerHTML = 'Senha média';
          document.getElementById('password-force').style.color = '#B38902';
        } else {
          document.getElementById('password-force').innerHTML = 'Senha fraca';
          document.getElementById('password-force').style.color = '#721c24';
        }
      }
    }
 }

  function sendNewPassword (e) {
    e.preventDefault();
    const senha = document.getElementById("user-password").value;
    const senha_confirmada = document.getElementById("confirm-user-password").value;
    const data = url.split("&");
    const token = data[0].substr(6);
    const email = data[1].substr(6);

    if(senha !== senha_confirmada) {
      setAlert('<div class="alert alert-danger" role="alert">Senha informadas inválidas!</div>');
      document.getElementById("user-password").focus();
    } else {
      api.post(`/api/auth/alterar-senha`, {
        token: token,
        email: email,
        senha: senha,
      })
      .then(() => setAlert('<div class="alert alert-success" role="alert">Senha alterada com sucesso!</div>'))
      .catch(() => setAlert('<div class="alert alert-danger" role="alert">Não foi possível alterar a senha. Tente novamente mais tarde.</div>'))
    }
  }

  useEffect(() => {
    document.getElementById('alert').innerHTML = alert;
  })

  return (
    <Screen>
      <section>
        <form onSubmit={sendNewPassword}>
          <img src={Logo} className="img-fluid" alt="logo" />
          <h2>Redefinição de senha</h2>
          <div id="alert" />
          <span id="password-force" />
          <input
            className="form-control"
            name="user-password"
            id="user-password"
            type="password"
            placeholder="Nova senha"
            title="Utilize letras maiúsculas e minúsculas, números e caracteres especiais para uma senha forte."
            value={password}
            onChange={e => {
              verificaForcaDaSenha()
              setPassword(e.target.value)
            }}
            required
          />

          <input
            className="form-control"
            name="confirm-user-password"
            id="confirm-user-password"
            type="password"
            placeholder="Confirme a nova senha"
            required
          />

          <div className="center">
            <button type="submit">Salvar</button>
          </div>
        </form>
      </section>
    </Screen>
  )
}
