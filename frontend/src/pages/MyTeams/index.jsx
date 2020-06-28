import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Top_Left_Side_Menu from '../../components/Top_Left_Side_Menu';
import Bottom_Right_Side_Menu from '../../components/Bottom_Right_Side_Menu';
import Header from '../../components/Home_Header';

import Title from '../../components/Title';

import { Screen, Card } from './styles';

export default function MyTeams() {
  document.title = "Minhas Equipes";
  const teams = useSelector(state => state.data[23]);

  return (
    <Screen>
      <Top_Left_Side_Menu />
      <Bottom_Right_Side_Menu />
      <div className="container">
        <Header />
        <Title title="Minhas equipes" />

        <div className="row">
          {(teams) ? teams.map(team => (
            <div className="col-md-4">
              <Link to={`/team/selected?${team.nome_equipe_slug}`}>
                <Card key={team.nome_equipe_slug}>
                  <div className="logo-area">
                    <img src={team.foto_url} alt="team_image"/>
                  </div>
                  <h1 className="team-name">{team.nome_equipe}</h1>
                  <div className="area-info">
                        <h2 className="team-info"><strong>Função:</strong> {team.funcao}</h2>
                        <h2 className="team-info"><strong>Capítulo:</strong> {team.capitulo}</h2>
                      </div>
                </Card>
              </Link>

            </div>
          )) : <h2 className="alert">Não está alocado em nenhuma equipe.</h2>}
        </div>
      </div>
    </Screen>
  )
}
