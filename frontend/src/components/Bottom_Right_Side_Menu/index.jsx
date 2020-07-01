import React, { useState } from 'react';
import api from '../../services/api';

import { Menu } from './styles';

import home from './images/home.png';
import profile from './images/profile.png';
import feedback from './images/feedback.png';
import logout_img from './images/logout.png';

export default function Bottom_Right_Side_Menu() {
  const [width, setWidth] = useState(window.innerWidth);
  const [isActive, setIsActive] = useState();

  window.addEventListener('resize', function(){
    setWidth(window.innerWidth)

    if (window.innerWidth <= 1280) {
      setIsActive(false)
    } else {
      setIsActive(true)
    }
  });

  function logout(){
    const access_token = 'Bearer'.concat(sessionStorage.getItem("access_token"));
    api.get(`/api/auth/logout`, { headers: { Authorization: access_token } })
    .then(() => {
        sessionStorage.clear();
        localStorage.clear();
        window.location.href = '/';
    })
    .catch(() => window.location.href = '/error')
  }

  return (
    <Menu className="fab">
      <button className="main" />
      <ul>
        <li><button id="home" onClick={() => window.location.href = '/home'} title="Home" disabled={(width > 1280) ? false : isActive}><img src={home} className="btn-icon" alt="Home"/></button></li>
        <li><button id="profile" onClick={() => window.location.href = '/profile'} title="Meu perfil" disabled={(width > 1280) ? false : isActive}><img src={profile} className="btn-icon" alt="Profile"/></button></li>
        <li><button id="feedback" onClick={() => window.location.href = '/feedback'} title="Feedback" disabled={(width > 1280) ? false : isActive}><img src={feedback} className="btn-icon" alt="Feedback"/></button></li>
        <li><button id="logout" onClick={() => logout()} title="Sair" disabled={(width > 1280) ? false : isActive}><img src={logout_img} className="btn-icon" alt="Logout"/></button></li>
      </ul>
    </Menu>
  )
}
