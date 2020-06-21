import React from 'react';
import { useSelector } from 'react-redux';

import { Menu, MenuOption, Search } from './styles';

import menu_icon from './images/icone.png';
import logo_ramo from './images/Logo_Ramo_Branco.png'
import logo_portal from './images/Logo_PortaldoRamo.png'
import user_icon from './images/user_icon.png';
import person_icon from './images/person_icon.png';
import team_icon from './images/team_icon.png';
import project_icon from './images/project_icon.png';
import strike_icon from './images/strike_icon.png';
import finance_icon from './images/finance_icon.png';
import search_icon from './images/search.png';
import arrow from './images/arrow.png';

export default function Top_Left_Side_Menu() {
  const username = (useSelector(state => state.data[1])).split(' ')[0];
  const hierarquia = (useSelector(state => state.data[4]));

  function sendSearch(e) {
    e.preventDefault();
    const valueSearched = document.getElementById("input-search").value;
    window.location.href = `/search?${valueSearched}`;
  }

  function statusGPButtons() {
    if (
      hierarquia === 'Diretor de Gestão de Pessoas' ||
      hierarquia === 'Presidente' ||
      hierarquia === 'Vice-Presidente'
    ) {
      return false;
    } else {
      return true;
    }
  }

  function statusTeamsButtons() {
    if (
      hierarquia === 'Presidente' ||
      hierarquia === 'Vice-Presidente' ||
      hierarquia === 'Diretor de Gestão de Pessoas' ||
      hierarquia === 'Coordenador' ||
      hierarquia === 'Assessor de Coordenador'
    ) {
      return false;
    } else {
      return true;
    }
  }

  function statusProjectsButtons() {
    if (
      hierarquia === 'Presidente' ||
      hierarquia === 'Vice-Presidente' ||
      hierarquia === 'Diretor de Projetos'
    ) {
      return false;
    } else {
      return true;
    }
  }

  function statusFinanceButtons() {
    if (
      hierarquia === 'Presidente' ||
      hierarquia === 'Vice-Presidente' ||
      hierarquia === 'Diretor Financeiro' ||
      hierarquia === 'Assessor de Gestão'
    ) {
      return false;
    } else {
      return true;
    }
  }

  return (
    <Menu>
      <input type="checkbox" id="check" />
        <label id="icon" htmlFor="check"><img src={menu_icon} alt="icon-menu"/></label>
        <div className="sidebar">
          <nav>
            <div className="logo-menu">
              <img src={logo_ramo} className="logo-ramo" alt="logo-ramo"/>
            </div>
            <ul>
              <Search className="form-inline" onSubmit={sendSearch}>
                <input className="form-control mr-sm-2" id="input-search" type="search" placeholder="Buscar" aria-label="Pesquisar" />
                <button className="btn btn-outline-success my-2 my-sm-0" id="btn-search" type="submit"><img src={search_icon} id="img-search" alt="search"/></button>
              </Search>

              <MenuOption className="nav-item dropdown dropright">
                <a className="nav-link" href="#" id="dropdownId" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <img src={user_icon} className="Icon" alt="icon"/>
                  {username}
                  <img src={arrow} className="Arrow" alt="arrow"/>
                </a>
                <div className="dropdown-menu" aria-labelledby="dropdownId">
                  <button className="menu-dropdown-option" id="btn-my-absences" onClick={() => window.location.href='/absences/myabsences'}>Minhas faltas</button>
                  <button className="menu-dropdown-option" id="btn-my-teams" onClick={() => window.location.href='/teams/myteams'}>Minhas equipes</button>
                  <button className="menu-dropdown-option" id="btn-my-projects" onClick={() => window.location.href='/projects/myprojects'}>Meus projetos</button>
                  <button className="menu-dropdown-option" id="btn-my-strikes" onClick={() => window.location.href='/strikes/mystrikes'}>Meus strikes</button>
                  <button className="menu-dropdown-option" id="btn-requests" onClick={() => window.location.href='/requests'}>Pedidos</button>
                  <button className="menu-dropdown-option" id="btn-selective-process" onClick={() => window.location.href='/selectiveprocess'} disabled>Processos seletivos</button>
                </div>
              </MenuOption>

              <MenuOption className="nav-item dropdown dropright">
                <a className="nav-link" href="#" id="dropdownId" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <img src={person_icon} className="Icon" alt="icon"/>
                  Pessoas
                  <img src={arrow} className="Arrow" alt="arrow"/>
                </a>
                <div className="dropdown-menu" aria-labelledby="dropdownId">
                  <button className="menu-dropdown-option" id="btn-message" onClick={() => window.location.href='/message'}>Mensagem</button>
                  <button className="menu-dropdown-option" id="btn-manage-members" onClick={() => window.location.href='/managemembers'} disabled={statusGPButtons()}>Gerenciar Membros</button>
                  <button className="menu-dropdown-option" id="btn-manage-absences" onClick={() => window.location.href='/manageabsences'} disabled={statusGPButtons()}>Gerenciar Faltas</button>
                  <button className="menu-dropdown-option" id="btn-manage-psi" onClick={() => window.location.href='/managepsi'} disabled>Gerenciar PSI</button>
                </div>
              </MenuOption>

              <MenuOption className="nav-item dropdown dropright">
                <a className="nav-link" href="#" id="dropdownId" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <img src={team_icon} className="Icon" alt="icon"/>
                  Equipes
                  <img src={arrow} className="Arrow" alt="arrow"/>
                </a>
                <div className="dropdown-menu" aria-labelledby="dropdownId">
                  <button className="menu-dropdown-option" id="btn-my-teams-2" onClick={() => window.location.href='/team/myteams'}>Minhas equipes</button>
                  <button className="menu-dropdown-option" id="btn-manage-teams" onClick={() => window.location.href='/team/manageteams'} disabled={statusTeamsButtons()}>Gerenciar equipes</button>
                </div>
              </MenuOption>

              <MenuOption className="nav-item dropdown dropright">
                <a className="nav-link" href="#" id="dropdownId" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <img src={project_icon} className="Icon" alt="icon"/>
                  Projetos
                  <img src={arrow} className="Arrow" alt="arrow"/>
                </a>
                <div className="dropdown-menu" aria-labelledby="dropdownId">
                  <button className="menu-dropdown-option" id="btn-my-projects" onClick={() => window.location.href='/myprojects'}>Meus projetos</button>
                  <button className="menu-dropdown-option" id="btn-manage-projects" onClick={() => window.location.href='/projects/manage'} disabled={statusProjectsButtons()}>Gerenciar projetos</button>
                  <button className="menu-dropdown-option" id="btn-historic-projects" onClick={() => window.location.href='/projects/historic'} disabled={statusProjectsButtons()}>Histórico</button>
                </div>
              </MenuOption>

              <MenuOption className="nav-item dropdown dropright">
                <a className="nav-link" href="#" id="dropdownId" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <img src={strike_icon} className="Icon" alt="icon"/>
                  Strikes
                  <img src={arrow} className="Arrow" alt="arrow"/>
                </a>
                <div className="dropdown-menu" aria-labelledby="dropdownId">
                  <button className="menu-dropdown-option" id="btn-my-strikes-2" onClick={() => window.location.href='/strike/my'}>Meus strikes</button>
                  <button className="menu-dropdown-option" id="btn-apply-strike" onClick={() => window.location.href='/strike'}>Aplicar strike</button>
                  <button className="menu-dropdown-option" id="btn-manage-strikes" onClick={() => window.location.href='/strike/manage'} disabled={statusGPButtons()}>Gerenciar strikes</button>
                </div>
              </MenuOption>

              <MenuOption className="nav-item dropdown dropright">
                <a className="nav-link" href="#" id="dropdownId" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <img src={finance_icon} className="Icon" alt="icon"/>
                  Financeiro
                  <img src={arrow} className="Arrow" alt="arrow"/>
                </a>
                <div className="dropdown-menu" aria-labelledby="dropdownId">
                  <button className="menu-dropdown-option" id="btn-finances" onClick={() => window.location.href='/finances'} disabled>Ver caixa</button>
                  <button className="menu-dropdown-option" id="btn-manage-finances" onClick={() => window.location.href='/finances/manage'} disabled={statusFinanceButtons()}>Gerenciar caixa</button>
                  <button className="menu-dropdown-option" id="btn-requests-2" onClick={() => window.location.href='/requests'}>Pedidos</button>
                </div>
              </MenuOption>
            </ul>
            <div className="logo-menu">
              <img src={logo_portal} className="logo-portal" alt="logo-portal"/>
            </div>
          </nav>
        </div>
    </Menu>
  )
}
