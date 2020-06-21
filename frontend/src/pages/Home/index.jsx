import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import Top_Left_Side_Menu from '../../components/Top_Left_Side_Menu';
import Bottom_Right_Side_Menu from '../../components/Bottom_Right_Side_Menu';
import Header from '../../components/Home_Header';
import InformationBox from '../../components/InformationBox';
import TeamsBox from '../../components/TeamsBox';
import ProjectsBox from '../../components/ProjectsBox';
import NotificationBox from '../../components/NotificationBox';

export const Screen = styled.div`
  background: linear-gradient(130deg, #FFF, #E5E5E5);
  padding-bottom: 50px;
  height: 100vh;
`
export default function Home() {
  document.title = 'Portal do Ramo';

  const isActive = (useSelector(state => state.data[3]));
  // if (isActive) {
  //   window.location.href="/primeirologin";
  // }

  return (
    <Screen>
      <Top_Left_Side_Menu />
      <Bottom_Right_Side_Menu />

      <div className="container">
        <Header />

        <div className="row">
          <div className="col-md-4">
            <InformationBox />
          </div>

          <div className="col-md-4">
            <TeamsBox />
            <ProjectsBox />
          </div>

          <div className="col-md-4">
            <NotificationBox />
          </div>
        </div>
      </div>
    </Screen>
  );
}
