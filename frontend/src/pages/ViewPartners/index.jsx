import React, { useState, useEffect } from 'react';
import api from '../../services/api';

import Top_Left_Side_Menu from '../../components/Top_Left_Side_Menu';
import Bottom_Right_Side_Menu from '../../components/Bottom_Right_Side_Menu';
import Header from '../../components/Home_Header';
import Title from '../../components/Title';

import { Screen, Card } from './styles';

export default function ViewPartners() {
  document.title = "Parcerias";
  const access_token = 'Bearer'.concat(sessionStorage.getItem("access_token"));

  const [partners, setPartners] = useState([]);
  const [check, setCheck] = useState(false);

  useEffect(() => {
    api.get('/api/parcerias', { headers: { Authorization: access_token} })
    .then(response => {
      console.log(response.data)
      setPartners(response.data)
    })
    .catch(error => console.log(error.response))
  }, [])

  function sendData() {
    // const name = document.getElementById('name-partner').value

    // if(name !== '') {
    //   setAlert('fsadfadsf')
    //   return
    // }

    // api.post('/api/parcerias', {
    //   nome_parceria: name,
    //   data_criado: date_formatted
    // }, { headers: { Authorization: access_token} })
    // .then(() => setAlert('sucesso'))
    // .catch(error => setAlert(`sucesso - ${error.response.data.message[0]}`))
  }

  return (
    <Screen>
      <Top_Left_Side_Menu />
      <Bottom_Right_Side_Menu />

      <div className="container">
        <Header />

        <Title title="Parcerias" />

        <div className="row">
          <div className="col-md-6">
            <div className="left-box-gray">

            </div>
          </div>
          <div className="col-md-6">
            <div className="right-box-blue-gradient">

            </div>
          </div>
        </div>
      </div>


      <button id="kelly" onClick={() => sendData()}>Enviar</button>

      {/* <input type="checkbox" defaultValue={check} onChange={() => setCheck(!check)} /> */}

      {/* {partners.map(partner => (
        <Card key={partner.nome_parceira_slug}>
          <h1>{partner.nome_parceria}</h1>
        </Card>
      ))} */}
    </Screen>
  )
}
