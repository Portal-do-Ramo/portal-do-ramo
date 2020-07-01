import React, { useState, useEffect } from 'react';
import api from '../../services/api';

import { Screen } from './styles';
import Logo_Ramo from './Logo_Ramo_Branco.png';

export default function NewPassword () {
  const [alert, setAlert] = useState('');
  const url = window.location.search.slice(1);

  if (url === '') {
    window.location.href = '/error';
  }

  function setPassword (e) {
    e.preventDefault();
    const senha = document.getElementById("user-password").value;
    const senha_confirmada = document.getElementById("confirm-user-password").value;
    const data = url.split("&");
    const token = data[0].substr(6);
    const email = data[1].substr(6);

    if(senha != senha_confirmada) {
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
      <div className="center-area">
        <header>
          <img src={Logo_Ramo} className="img-fluid"/>
        </header>

        <form onSubmit={setPassword}>
          <div className="container">
            <h2>Nova senha</h2>
            <p>Guarde sua nova senha pois ela será utilizada na próxima vez que for acessar ao portal.</p>
            <div id="alert" />
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <input
                    className="form-control"
                    name="user-password"
                    id="user-password"
                    type="password"
                    placeholder="Nova senha"
                    required
                  />
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-group">
                  <input
                    className="form-control"
                    name="confirm-user-password"
                    id="confirm-user-password"
                    type="password"
                    placeholder="Confirme a nova senha"
                    required
                  />
                </div>
              </div>

              <div className="center">
                <button type="submit">Salvar</button>
              </div>
            </div>
          </div>
        </form>
      </div>

      <footer>
        <div className="container">
          <span>Portal do Ramo - 2020<br/>
                Todos os direitos reservados
          </span>
        </div>
      </footer>
    </Screen>
  )
}
