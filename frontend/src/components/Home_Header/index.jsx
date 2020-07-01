import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { HeaderBox, Avatar, Info, HeaderMenu } from './styles';

export default function Header() {
  const nome = useSelector(state => state.data[1])
  const avatarUrl = useSelector(state => state.data[15])
  const hierarquia = useSelector(state => state.data[4])

  return (
    <>
      <HeaderBox>
        <div className="row">
          <Avatar className="col-md-2">
            <img src={avatarUrl} className="img-thumbnail" alt="avatar" />
          </Avatar>

          <Info className="col-md-8">
            <div>
              <h2>{(nome.split(' ')[0]).concat(' ' + nome.split(' ')[1])}</h2>
              <h3>{hierarquia}</h3>
            </div>
          </Info>
        </div>
      </HeaderBox>

      <HeaderMenu className="row">
        <div className="col-sm-6">
          <Link to="/home" className="navbar-brand">
            <span id="logo"/>
          </Link>
        </div>
        <div className="col-sm-6 title">
          <a href="/editprofile" className="btn btn-primary btn-edit">Editar perfil</a>
        </div>
      </HeaderMenu>
    </>
  )
}
