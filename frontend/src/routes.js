import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import store from './store/index';
import { Provider } from 'react-redux';

/* MEMBER */
import Profile from './pages/Profile';
import RegisterMembers from './pages/RegisterMembers';
import ManageMembers from './pages/ManageMembers';
import ManageRequests from './pages/ManageRequests';
import MemberData from './pages/MemberData';
import EditProfile from './pages/EditProfile';
import Message from './pages/Message';

/* ABSENCES */
import MyAbsences from './pages/MyAbsences';
import ManageAbsences from './pages/ManageAbsences';
import HistoricAbsences from './pages/HistoricAbsences';

/* TEAMS */
import ManageTeams from './pages/ManageTeams';
import ControlTeam from './pages/ControlTeam';
import MyTeams from './pages/MyTeams';
import NewTeam from './pages/NewTeam';
import TeamScreen from './pages/TeamScreen';
import ViewTeam from './pages/ViewTeam';

/* FEEDBACK, NOTIFICATIONS AND SEARCH */
import SendFeedback from './pages/SendFeedBack';
import ListFeedback from './pages/ListFeedback';
import Notifications from './pages/Notifications';
import Search from './pages/Search';
import TermosDeUso from './pages/TermosDeUso';
import PoliticasDePrivacidade from './pages/PoliticasDePrivacidade';

/* LOGIN, HOME, ERROR AND OTHERS*/
import Home from './pages/Home';
import Login from './pages/LoginForm';
import FirstLogin from './pages/FirstLogin';
import RecoverPassword from './pages/RecoverPassword';
import NewPassword from './pages/NewPassword';
import ErrorServer from './pages/ErrorServer'
import NotAccess from './pages/NotAccess';

/* PSI */
import ControlPSI from './pages/ControlPSI';
import ManagePSI from './pages/ManagePSI';
import NewPSI from './pages/NewPSI';
import SelectiveProcess from './pages/SelectiveProcess';

/* STRIKES */
import Strike from './pages/ApplyStrike';
import MyStrikes from './pages/MyStrikes';
import ManageStrikes from './pages/ManageStrikes';
import HistoricStrikes from './pages/HistoricStrikes';

/* PROJECTS */
import ProjectScreen from './pages/ProjectScreen';
import ControlProject from './pages/ControlProject';
import NewProject from './pages/NewProject';
import MyProjects from './pages/MyProjects';
import ManageProjects from './pages/ManageProjects';
import HistoricProjects from './pages/HistoricProjects';
import ViewProject from './pages/ViewProject';

/* FINANCES */
import ManageFinances from './pages/ManageFinances';
import ManageFinancesAdvisor from './pages/ManageFinancesAdvisor';
import HistoricLittleCow from './pages/HistoricLittleCow';
import Finances from './pages/ViewFinances';

/* REQUESTS */
import Requests from './pages/Requests';
import ShutdownRequest from './pages/ShutdownRequest';
import InactivityRequest from './pages/InactivityRequest';
import OutputProjectRequest from './pages/OutputProjectRequest';
import PurchaseOrder from './pages/PurchaseOrder';
import RefundRequest from './pages/RefundRequest';
import HistoricRequests from './pages/HistoricRequests';
import MyRequests from './pages/MyRequests';

/* MARKETING */
import ViewPartners from './pages/ViewPartners';


function isAuthenticated() {
  const access_token = sessionStorage.getItem("access_token");
  if (access_token != null) {
    return true
  } else {
    return false
  }
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: '/', state: { from: props.location } }} />
      )
    }
  />
);

export default function Routes () {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path='/' exact component={ () => <Login /> } />
          <Route path='/error' component={ () => <ErrorServer /> } />
          <PrivateRoute path='/primeirologin' component={ () => <FirstLogin /> } />
          <PrivateRoute path='/home' exact component={ () => <Home /> } />
          <Route path='/recover-password' component={ () => <RecoverPassword /> } />

          <Route path="/new-password">
            <NewPassword />
          </Route>

          {/* Routers - User */}
          <PrivateRoute path='/absences/myabsences' component={ () => <MyAbsences /> } />
          <PrivateRoute path='/teams/myteams' exact component={ () => <MyTeams /> } />
          <PrivateRoute path='/projects/myprojects' component={ () => <MyProjects/> } />
          <PrivateRoute path='/strikes/mystrikes' component={ () => <MyStrikes /> } />
          <PrivateRoute path='/requests/myrequests' component={ () => <MyRequests /> } />
          {/* <PrivateRoute path='/selectiveprocess' exact component={ () => <SelectiveProcess /> } /> */}

          {/* Routers - Pessoas */}
          <PrivateRoute path='/message' component={ () => <Message /> } />
          <PrivateRoute path='/managemembers' exact component={ () => <ManageMembers /> } />
          <PrivateRoute path='/managemembers/member' component={ () => <MemberData /> } />
          {/* <PrivateRoute path='/managepsi' exact component={ () => <ManagePSI /> } /> */}
          {/* <PrivateRoute path='/managepsi/control' component={ () => <ControlPSI /> } /> */}
          <PrivateRoute path='/managepsi/new' component={ () => <NewPSI /> } />
          <PrivateRoute path='/manageabsences' exact component={ () => <ManageAbsences /> } />
          <PrivateRoute path='/manageabsences/historic' component={ () => <HistoricAbsences /> } />
          <PrivateRoute path='/managerequests' component={ () => <ManageRequests /> } />
          <PrivateRoute path='/registermembers' component={ () => <RegisterMembers /> } />

          {/* Routers - Equipes */}
          <PrivateRoute path='/team/manageteams' exact component={ () => <ManageTeams /> } />
          <PrivateRoute path='/team/manageteams/manage' exact component={ () => <ControlTeam /> } />
          <PrivateRoute path='/team/manageteams/newteam' component={ () => <NewTeam /> } />
          <PrivateRoute path='/team/selected' component={ () => <TeamScreen /> } />
          <Route path='/team/view' component={ () => <ViewTeam /> } />

          {/* Routers - Projetos */}
          <PrivateRoute path='/projects/manage/control' component={ () => <ControlProject /> } />
          <PrivateRoute path='/projects/manage' exact component={ () => <ManageProjects /> } />
          <PrivateRoute path='/projects/new-project' component={ () => <NewProject /> } />
          <PrivateRoute path='/projects/selected' component={ () => <ProjectScreen/> } />
          <PrivateRoute path='/projects/view' component={ () => <ViewProject /> } />
          <PrivateRoute path='/projects/historic' component={ () => <HistoricProjects /> } />

          {/* Routers - Strikes */}
          <PrivateRoute path='/strike' exact component={ () => <Strike /> } />
          <PrivateRoute path='/strike/manage' exact component={ () => <ManageStrikes /> } />
          <PrivateRoute path='/strike/manage/historic' component={ () => <HistoricStrikes /> } />

          {/* Routers - Financeiro */}
          <PrivateRoute path='/finances' exact component={ () => <Finances /> } />
          <PrivateRoute path='/finances/manage' exact component={ () => <ManageFinances /> } />
          <PrivateRoute path='/finances/manage/advisor' component={ () => <ManageFinancesAdvisor /> } />
          <PrivateRoute path='/finances/historic/little-cow' component={ () => <HistoricLittleCow /> } />

          {/* Routers - Right-Bottom Menu */}
          <PrivateRoute path='/profile' component={ () => <Profile /> } />
          <PrivateRoute path='/feedback' exact component={ () => <SendFeedback /> } />
          <PrivateRoute path='/feedback/list' component={ () => <ListFeedback /> } />

          {/* Routers - Pedidos */}
          <PrivateRoute path='/requests' exact component={ () => <Requests /> } />
          <PrivateRoute path='/requests/purchase-order' component={ () => <PurchaseOrder /> } />
          <PrivateRoute path='/requests/refund-request' component={ () => <RefundRequest /> } />
          <PrivateRoute path='/requests/shutdown' component={ () => <ShutdownRequest /> } />
          <PrivateRoute path='/requests/inactivity' component={ () => <InactivityRequest /> } />
          <PrivateRoute path='/requests/output-projects' component={ () => <OutputProjectRequest /> } />
          <PrivateRoute path='/requests/historic' component={ () => <HistoricRequests /> } />

          {/* Routers - Marketing */}
          <PrivateRoute path='/partners' component={ () => <ViewPartners />} />

          {/* Outros */}
          <PrivateRoute path='/editprofile' component={ () => <EditProfile /> } />
          <PrivateRoute path='/search' component={ () => <Search /> } />
          <PrivateRoute path='/notifications' component={ () => <Notifications /> } />
          <PrivateRoute path='/termos' component={ () => <TermosDeUso /> } />
          <Route path='/politicas' component={ () => <PoliticasDePrivacidade /> } />
          <Route path='/noaccess' component={ () => <NotAccess /> } />
        </Switch>
      </Router>
    </Provider>
  );
}
