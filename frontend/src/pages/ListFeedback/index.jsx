import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

import Top_Left_Side_Menu from '../../components/Top_Left_Side_Menu';
import Bottom_Right_Side_Menu from '../../components/Bottom_Right_Side_Menu';
import Header from '../../components/Home_Header';
import Title from '../../components/Title';

import { Screen, Content, ViewFeedbacks, Card } from './styles';

export default function HistoricAbsences() {
  document.title = 'Feedbacks';
  const access_token = 'Bearer'.concat(sessionStorage.getItem('access_token'));

  const [listFeedbacks, setListFeedbacks] = useState([])

  useEffect(() => {
    api.get(`/api/feedbacks`, {headers: { Authorization: access_token }})
    .then(response => setListFeedbacks(response.data))
    // .catch(() => window.location.href = '/error')
    .catch(error => console.log(error.response))
  }, [])

  return (
    <Screen>
      <Top_Left_Side_Menu />
      <Bottom_Right_Side_Menu />

      <div className="container">
        <Header />

        <Content>
          <Title title='Feedbacks recebidos' />

          <ViewFeedbacks>
            {(listFeedbacks.length == 0) ?
              <div className="center"><h1>Não possuem feedbacks</h1></div>
            :
              <ul>
                {listFeedbacks.map(feedback => (
                  <Card id={ feedback.uuid } key={ feedback.uuid }>
                    <li>
                      <header>
                        <div>
                          <strong>
                            {feedback.data_criado} -
                            <Link to={'/profile?'.concat(feedback.matricula_membro_enviou)}>
                              {' ' + feedback.nome_membro_enviou }
                            </Link>
                          </strong>

                          <h5 className="card-item-title">Satisfação - { feedback.satisfacao }</h5>
                          <hr />
                          <h5 className="card-item-title">Assunto</h5>
                          <textarea className="card-subject-textarea" value={ feedback.assunto } readOnly />

                          <h5 className="card-item-title">Mensagem</h5>
                          <textarea className="card-message-textarea" value={ feedback.mensagem } readOnly/>
                        </div>
                      </header>
                    </li>
                  </Card>
                )).reverse()}
              </ul>
            }
          </ViewFeedbacks>
        </Content>
      </div>
    </Screen>
  )
}
