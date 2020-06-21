import React, { useState, useEffect } from 'react';
import api from '../../services/api';

import { Screen } from './styles';
import Logo_Ramo from './Logo_Ramo_Branco.png';
import Icon_Instagram from './Icon_Instagram.png';
import Icon_Linkedin from './Icon_Linkedin.png';

export default function RecoverPassword () {
  const [alert, setAlert] = useState('')

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
      <div className="recover-area">
        <header>
          <img src={Logo_Ramo} className="img-fluid" alt="logo-ramo" />
        </header>

        <div id="alert" />
        <section>
          <form onSubmit={sendEmail}>
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
            <button type="submit">Enviar</button>
          </form>
        </section>
      </div>

      <footer>
        <div className="container">
          <div className="row justify-content-center">
            <ul className="nav">
              <li><a href="https://instagram.com/ramocefet" target="_blank"><img src={Icon_Instagram}/></a></li>
              <li><a href="https://www.linkedin.com/company/ramocefet/" target="_blank"><img src={Icon_Linkedin}/></a></li>
            </ul>
          <div className="w-100" />
            <span>Portal do Ramo - 2020<br/>
                  Todos os direitos reservados</span>
          </div>
        </div>
      </footer>
    </Screen>
  )
}
