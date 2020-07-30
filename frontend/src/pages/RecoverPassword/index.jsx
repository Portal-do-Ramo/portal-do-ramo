import React, { useState, useEffect } from 'react';
import api from '../../services/api';

import { Screen } from './styles';
import Logo from './images/logo.png';

export default function RecoverPassword () {
  const [alert, setAlert] = useState('');

  function sendEmail(e){
    e.preventDefault();

    api.post('/api/auth/recuperar-senha', { email: document.getElementById("user-email").value })
    .then(() => setAlert('<div class="alert alert-success" role="alert">E-mail enviado com sucesso!</div>'))
    .catch(error => {
      switch(error.response.status){
        case 500:
          window.location.href = '/error'
          break;
        default:
          setAlert('<div class="alert alert-warning" role="alert"><strong>ERROR!</strong> Não foi possível enviar o email! <br /> Confira se o e-mail digitado está correto. Caso o problema persista, entre em contato com nosso suporte pelo e-mail <strong>gp.ramocefet@gmail.com</strong></div>');
          document.getElementById('user-email').focus();
          break;
      }
    })
  }

  useEffect(() => {
    document.getElementById('alert').innerHTML = alert;
  })

  return (
    <Screen>
      <section>
        <form onSubmit={sendEmail}>
          <div id="alert" />
          <img src={Logo} className="img-fluid" alt="logo-portal-do-ramo" />
          <h3>Enviaremos um e-mail onde você poderá alterar sua senha!</h3>
          <div className="form-group">
            <input className="form-control"
              name="user-email"
              id="user-email"
              type="email"
              placeholder="E-mail"
              required
            />
          </div>
          <div className="center">
            <button type="submit">Entrar</button>
          </div>
        </form>
      </section>
    </Screen>
  )
}
