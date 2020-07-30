import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Top_Left_Side_Menu from '../../components/Top_Left_Side_Menu';
import Bottom_Right_Side_Menu from '../../components/Bottom_Right_Side_Menu';
import Header from '../../components/Home_Header';
import Title from '../../components/Title';

import { Screen, Card, ViewResults} from './styles';
import bronze from './images/bronze.png';
import silver from './images/silver.png';
import gold from './images/gold.png';
import tecci from './images/tecci.png';
import yma from './images/yma.png';


export default function ViewPartners() {
  document.title = "Parcerias";
  const access_token = 'Bearer'.concat(sessionStorage.getItem("access_token"));
  const hierarquia = (useSelector(state => state.data[4]));

  const [partners, setPartners] = useState([]);
  const [selectedPartner, setSelectedPartner] = useState();

  if (
    hierarquia !== 'Presidente' &&
    hierarquia !== 'Vice-Presidente' &&
    hierarquia !== 'Diretor de Marketing'
  ) {
    window.location.href = '/noaccess'
  }

  useEffect(() => {
    api.get('/api/parcerias', { headers: { Authorization: access_token} })
    .then(response => {
      console.log(response.data)
      setPartners(response.data)
    })
    .catch(error => console.log(error.response))
  }, [])

  useEffect(() => {
    api.get('/api/equipes', { headers: { Authorization: access_token} })
    .then(response => {
      console.log(response.data)
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

  function fadeInfo(id){

    

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
              <ViewResults>
                <ul>
                    {partners.map(partner => (
                      <Card key={partner.uuid} onClick={() =>  setSelectedPartner(partner)}>
                        <li className="partner-item">
                          <header>
                            <div className="partner-info">
                              <strong>Nome da Empresa <img src={bronze} className="icon" alt="medal"/></strong><br/>
                              {partner.equipes_beneficiadas}
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
              <div className="viewPartner">
                    <div className="center container-lg">
                      {/* {(selectedPartner) ? <img src={selectedPartner.logo_parceria} className="img-thumbnail" alt="logo"/>:''} */}
                      {(selectedPartner) ? <strong>Parceria Bronze</strong>:''}
                      {(selectedPartner) ? <img src={bronze} className="medal" alt="medal"/> :''} <br/>
                      {(selectedPartner) ? <img src={yma} className="imagem-do-parceiro" alt="logo"/> :''}

                      {/* <h1> Nome do Parceiro </h1> */}
                      {/* <h3>{(selectedPartner) ? selectedPartner.nivel_parceria : ''} </h3> */}
                    </div>

                  {(selectedPartner) ? 
                    <div className="div-ul container-lg">
                    
                      <ul>
                        <span ><strong> Site</strong></span>
                        <li id="site">{selectedPartner.link_site_empresa}</li>
                        <span><strong>Telefone</strong></span>
                        <li id="telefone">{selectedPartner.telefone_empresa}</li>
                        <span><strong>E-mail</strong></span>
                        <li id="email">{selectedPartner.email_empresa}</li>
                        <span><strong>Benefícios</strong></span>
                        <li><textarea readOnly value={selectedPartner.beneficios}></textarea></li>
                      </ul>    
                    </div> : 
                      <div className="center-flex"><h1>Selecione um Parceiro</h1></div>
                    }
              </div>

            </div>
          </div>
        </div>
      </div>
    </Screen>
  )
}
