import React from 'react';

import Top_Left_Side_Menu from '../../components/Top_Left_Side_Menu';
import Bottom_Right_Side_Menu from '../../components/Bottom_Right_Side_Menu';
import Header from '../../components/Home_Header';
import Title from '../../components/Title';

import { Screen, Content, BTNCard } from './styles';

export default function Requests() {
  return (
    <Screen>
      <Top_Left_Side_Menu />
      <Bottom_Right_Side_Menu />

      <div className="container">
        <Header />
        <Title title="Pedidos" />

        <Content>
          <div className="row">
            <div className="col-md-4">
              <BTNCard onClick={() => window.location.href='/requests/inactivity'}>Pedido de Inatividade</BTNCard>
            </div>
            <div className="col-md-4">
              <BTNCard onClick={() => window.location.href='/requests/shutdown'}>Pedido de Desligamento</BTNCard>
            </div>
            <div className="col-md-4">
              <BTNCard onClick={() => window.location.href='/requests/output-projects'}>Pedido de Saída de Projeto</BTNCard>
            </div>
          </div>

          <div className="row">
            <div className="col-md-4"><BTNCard onClick={() => window.location.href='/requests/purchase-order'}>Pedido de Compra</BTNCard></div>
            <div className="col-md-4"><BTNCard onClick={() => window.location.href='/requests/refund-request'}>Pedido de Reembolso</BTNCard></div>
          </div>
        </Content>
      </div>
    </Screen>
  )
}
