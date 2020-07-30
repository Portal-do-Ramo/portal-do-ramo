import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { Menu, Search } from './styles';

import menu_icon from './images/icone.png';
import logo_ramo from './images/Logo_Ramo_Branco.png'
import logo_portal from './images/Logo_PortaldoRamo.png'
import user_icon from './images/user_icon.png';
import person_icon from './images/person_icon.png';
import team_icon from './images/team_icon.png';
import project_icon from './images/project_icon.png';
import strike_icon from './images/strike_icon.png';
import finance_icon from './images/finance_icon.png';
import marketing_icon from './images/marketing_icon.png';
import search_icon from './images/search.png';
import arrow from './images/arrow.png';

import Dropdown from 'react-bootstrap/Dropdown';

export default function Top_Left_Side_Menu() {
  const username = (useSelector(state => state.data[1])).split(' ')[0];
  const hierarquia = (useSelector(state => state.data[4]));

  const [width, setWidth] = useState(window.innerWidth);

  window.addEventListener('resize', function(){
    setWidth(window.innerWidth)
  });

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
      hierarquia === 'Diretor de Projetos'
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
      hierarquia === 'Diretor Financeiro'
    ) {
      return false;
    } else {
      return true;
    }
  }

  function statusFinanceAssessorButtons() {
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

  function statusMarketingButtons() {
    if (
      hierarquia === 'Presidente' ||
      hierarquia === 'Vice-Presidente' ||
      hierarquia === 'Diretor de Marketing'
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

              <Dropdown drop={(width < 767.98) ? 'down' : 'right'}>
                <Dropdown.Toggle variant="menu-option" id="menu-option" className="menu-option">
                  <img src={user_icon} className="Icon" alt="icon"/>
                  {username}
                  <img src={arrow} className="Arrow" alt="arrow"/>
                </Dropdown.Toggle>

                <Dropdown.Menu variant="dropdown-menu" className="dropdown-menu" id="dropdown-menu" >
                  <Dropdown.Item variant="menu-dropdown-option" className="menu-dropdown-option" href="/absences/myabsences" id="btn-my-absences">Minhas Faltas</Dropdown.Item>
                  <Dropdown.Item variant="menu-dropdown-option" className="menu-dropdown-option" href="/teams/myteams" id="btn-my-teams">Minhas equipes</Dropdown.Item>
                  <Dropdown.Item variant="menu-dropdown-option" className="menu-dropdown-option" href="/projects/myprojects" id="btn-my-projects">Meus projetos</Dropdown.Item>
                  <Dropdown.Item variant="menu-dropdown-option" className="menu-dropdown-option" href="/strikes/mystrikes" id="btn-my-strikes">Meus strikes</Dropdown.Item>
                  <Dropdown.Item variant="menu-dropdown-option" className="menu-dropdown-option" href="/requests/myrequests" id="btn-my-strikes">Meus pedidos</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>

              <Dropdown drop={(width < 767.98) ? 'down' : 'right'}>
                <Dropdown.Toggle variant="menu-option" id="menu-option" className="menu-option">
                  <img src={person_icon} className="Icon" alt="icon"/>
                  Pessoas
                  <img src={arrow} className="Arrow" alt="arrow"/>
                </Dropdown.Toggle>

                <Dropdown.Menu variant="dropdown-menu" className="dropdown-menu" id="dropdown-menu">
                  <Dropdown.Item variant="menu-dropdown-option" className="menu-dropdown-option" href="/message" id="btn-message">Mensagem</Dropdown.Item>
                  <Dropdown.Item variant="menu-dropdown-option" className="menu-dropdown-option" href="/requests" id="btn-requests">Pedidos</Dropdown.Item>
                  {/* <Dropdown.Item variant="menu-dropdown-option" className="menu-dropdown-option" href="/selectiveprocess" id="btn-selective-process" disabled>Processos seletivos</Dropdown.Item> */}
                  <Dropdown.Item variant="menu-dropdown-option" className="menu-dropdown-option" href="/managemembers" id="btn-manage-members" disabled={ statusGPButtons() }>Gerenciar membros</Dropdown.Item>
                  <Dropdown.Item variant="menu-dropdown-option" className="menu-dropdown-option" href="/manageabsences" id="btn-manage-absences" disabled={ statusGPButtons() }>Gerenciar faltas</Dropdown.Item>
                  <Dropdown.Item variant="menu-dropdown-option" className="menu-dropdown-option" href="/managerequests" id="btn-manage-requests" disabled={ statusGPButtons() }>Gerenciar pedidos</Dropdown.Item>
                  {/* <Dropdown.Item variant="menu-dropdown-option" className="menu-dropdown-option" href="/managepsi" id="btn-manage-psi" disabled>Gerenciar PSI</Dropdown.Item> */}
                </Dropdown.Menu>
              </Dropdown>

              <Dropdown drop={(width < 767.98) ? 'down' : 'right'}>
                <Dropdown.Toggle variant="menu-option" id="menu-option" className="menu-option">
                  <img src={team_icon} className="Icon" alt="icon"/>
                  Equipes
                  <img src={arrow} className="Arrow" alt="arrow"/>
                </Dropdown.Toggle>

                <Dropdown.Menu variant="dropdown-menu" className="dropdown-menu" id="dropdown-menu">
                  <Dropdown.Item variant="menu-dropdown-option" className="menu-dropdown-option" href="/teams/myteams" id="btn-my-teams-2">Minhas equipes</Dropdown.Item>
                  <Dropdown.Item variant="menu-dropdown-option" className="menu-dropdown-option" href="/team/manageteams" id="btn-manage-teams" disabled={ statusTeamsButtons() }>Gerenciar equipes</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>

              <Dropdown drop={(width < 767.98) ? 'down' : 'right'}>
                <Dropdown.Toggle variant="menu-option" id="menu-option" className="menu-option">
                  <img src={project_icon} className="Icon" alt="icon"/>
                  Projetos
                  <img src={arrow} className="Arrow" alt="arrow"/>
                </Dropdown.Toggle>

                <Dropdown.Menu variant="dropdown-menu" className="dropdown-menu" id="dropdown-menu" >
                  <Dropdown.Item variant="menu-dropdown-option" className="menu-dropdown-option" href="/projects/myprojects" id="btn-my-projects">Meus projetos</Dropdown.Item>
                  <Dropdown.Item variant="menu-dropdown-option" className="menu-dropdown-option" href="/projects/manage" id="btn-manage-projects" disabled={statusProjectsButtons()}>Gerenciar projetos</Dropdown.Item>
                  <Dropdown.Item variant="menu-dropdown-option" className="menu-dropdown-option" href="/projects/historic" id="btn-historic-projects" disabled={statusProjectsButtons()}>Histórico de projetos</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>

              <Dropdown drop={(width < 767.98) ? 'down' : 'right'}>
                <Dropdown.Toggle variant="menu-option" id="menu-option" className="menu-option">
                  <img src={strike_icon} className="Icon" alt="icon"/>
                  Strikes
                  <img src={arrow} className="Arrow" alt="arrow"/>
                </Dropdown.Toggle>

                <Dropdown.Menu variant="dropdown-menu" className="dropdown-menu" id="dropdown-menu" >
                  <Dropdown.Item variant="menu-dropdown-option" className="menu-dropdown-option" href="/strikes/mystrikes" id="btn-my-strikes-2">Meus strikes</Dropdown.Item>
                  <Dropdown.Item variant="menu-dropdown-option" className="menu-dropdown-option" href="/strike" id="btn-apply-strike">Aplicar strikes</Dropdown.Item>
                  <Dropdown.Item variant="menu-dropdown-option" className="menu-dropdown-option" href="/strike/manage" id="btn-manage-strikes" disabled={statusGPButtons()}>Gerenciar strikes</Dropdown.Item>
                  <Dropdown.Item variant="menu-dropdown-option" className="menu-dropdown-option" href="/strike/manage/reavaliacao" id="btn-manage-strikes" disabled={statusGPButtons()}>Reavaliações</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>

              <Dropdown drop={(width < 767.98) ? 'down' : 'right'}>
                <Dropdown.Toggle variant="menu-option" id="menu-option" className="menu-option">
                  <img src={finance_icon} className="Icon" alt="icon"/>
                  Financeiro
                  <img src={arrow} className="Arrow" alt="arrow"/>
                </Dropdown.Toggle>

                <Dropdown.Menu variant="dropdown-menu" className="dropdown-menu" id="dropdown-menu" >
                  <Dropdown.Item variant="menu-dropdown-option" className="menu-dropdown-option" href="/requests" id="btn-requests-2">Pedidos</Dropdown.Item>
                  <Dropdown.Item variant="menu-dropdown-option" className="menu-dropdown-option" href="/finances" id="btn-finances">Ver caixa</Dropdown.Item>
                  <Dropdown.Item variant="menu-dropdown-option" className="menu-dropdown-option" href="/finances/manage" id="btn-manage-finances" disabled={statusFinanceButtons()}>Gerenciar caixa</Dropdown.Item>
                  <Dropdown.Item variant="menu-dropdown-option" className="menu-dropdown-option" href="/finances/manage/advisor" id="btn-manage-finances" disabled={statusFinanceAssessorButtons()}>Tela do Assessor</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>

              <Dropdown drop={(width < 767.98) ? 'down' : 'right'}>
                <Dropdown.Toggle variant="menu-option" id="menu-option" className="menu-option">
                  <img src={marketing_icon} className="Icon" alt="icon"/>
                  Marketing
                  <img src={arrow} className="Arrow" alt="arrow"/>
                </Dropdown.Toggle>

                <Dropdown.Menu variant="dropdown-menu" className="dropdown-menu" id="dropdown-menu" >
                  <Dropdown.Item variant="menu-dropdown-option" className={(true) ? "menu-dropdown-option-disabled" : "menu-dropdown-option"} href="/partners" id="btn-finances" disabled={true}>Parcerias</Dropdown.Item>
                  <Dropdown.Item variant="menu-dropdown-option" className={(true) ? "menu-dropdown-option-disabled" : "menu-dropdown-option"} disabled={true}>Gerenciar parcerias</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </ul>
            <div className="logo-menu">
              <img src={logo_portal} className="logo-portal" alt="logo-portal"/>
            </div>
          </nav>
        </div>
    </Menu>
  )
}
