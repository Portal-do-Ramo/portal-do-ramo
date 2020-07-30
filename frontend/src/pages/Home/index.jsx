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
import Loader from '../../components/LoaderSpinner';

export const Screen = styled.div`
  padding-bottom: 50px;
`

export const LoaderArea = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`


export default function Home() {
  document.title = 'Portal do Ramo';
  const isActive = (useSelector(state => state.data[3]));

  if (!isActive) {
    window.location.href="/primeirologin";
  }

  return (
    <div>
      {(isActive) ?
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
      :
        <LoaderArea>
          <Loader />
        </LoaderArea>
      }
    </div>
  );
}
