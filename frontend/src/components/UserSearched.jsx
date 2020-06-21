import React from 'react';

export default function UserSearched({ user }) {
  return (
    <li className="item-searched">
      <header>
        <div className="user-info">
          <strong>{user.nome}</strong>
        </div>
      </header>
    </li>
  )
}
