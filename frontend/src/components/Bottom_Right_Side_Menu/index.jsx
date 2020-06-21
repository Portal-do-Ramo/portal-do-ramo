import React, { useState } from 'react';
import api from '../../services/api';

import { Menu } from './styles';

import home from './images/home.png';
import profile from './images/profile.png';
import feedback from './images/feedback.png';
import logout_img from './images/logout.png';

export default function Bottom_Right_Side_Menu() {
  const [isActive, setIsActive] = useState(true);

  window.addEventListener("resize", setStatusOnButtons);
  function setStatusOnButtons() {
    let width = window.screen.width;

    if (width > 1280) {
      setIsActive(false);
    } else {
      setIsActive(true);
    }
  }

  function logout(){
    const access_token = 'Bearer'.concat(sessionStorage.getItem("access_token"));
    api.get(`/api/auth/logout`, {headers: { Authorization: access_token }})
    .then(() => {
        sessionStorage.clear();
        localStorage.clear();
        window.location.href = '/';
    })
    .catch(() => window.location.href = '/error')
  }

  return (
    <Menu className="fab">
      {window.onload = setStatusOnButtons}
      <button className="main" onClick={() => setIsActive(!isActive)}/>
      <ul>
        <li><button id="home" onClick={() => window.location.href = '/home'} title="Home" disabled={isActive}><img src={home} className="btn-icon" alt="Home"/></button></li>
        <li><button id="profile" onClick={() => window.location.href = '/profile'} title="Meu perfil" disabled={isActive}><img src={profile} className="btn-icon" alt="Profile"/></button></li>
        <li><button id="feedback" onClick={() => window.location.href = '/feedback'} title="Feedback" disabled={isActive}><img src={feedback} className="btn-icon" alt="Feedback"/></button></li>
        <li><button id="logout" onClick={() => logout()} title="Sair" disabled={isActive}><img src={logout_img} className="btn-icon" alt="Logout"/></button></li>
      </ul>
    </Menu>
  )
}
