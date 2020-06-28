import React, { useState, useEffect } from 'react';
import api from '../../services/api';

import Top_Left_Side_Menu from '../../components/Top_Left_Side_Menu';
import Bottom_Right_Side_Menu from '../../components/Bottom_Right_Side_Menu';
import Header from '../../components/Home_Header';
import Title from '../../components/Title';

import { Screen, Content, CardItem } from './styles';

export default function PurchaseOrder() {
  document.title = 'Pedido de Compra';
  const access_token = 'Bearer'.concat(sessionStorage.getItem("access_token"));

  const [count_id, setCount_ID] = useState(0);
  const [listProjects, setListProjects] = useState([]);
  const [viewItems, setViewItems] = useState([]);
  const [alert, setAlert] = useState('');
  const [inputsHidden, setInputsHidden] = useState([]);


  useEffect(() => {
    api.get('/api/projetos/select-projetos', { headers: { Authorization: access_token } })
    .then(response => setListProjects(response.data))
    .catch(() => window.location.href="/error")
  }, [])


  function sendData() {
    let itemsFormatted = [];

    if (document.getElementById('value-transport').value === '') {
      setAlert('<div class="alert alert-danger" role="alert"><strong>Valor do frete inválido!</strong></div>')
      return
    }

    for(var i = 0; i <= (count_id - 1); i++) {
      if (inputsHidden.indexOf(i) === -1) {
        let date = document.getElementById('item_date_'.concat(i)).value.split('-');
        let date_formatted = date[2] + '/' + date[1] + '/' + date[0];
        let price = document.getElementById('item_unit_value_'.concat(i)).value;
        price = price.replace(',', '.')
        let object = {
          "nome_produto": document.getElementById('item_name_'.concat(i)).value,
          "valor_unitario": price,
          "quantidade": document.getElementById('item_qty_'.concat(i)).value,
          "nome_loja": document.getElementById('item_name_shop_'.concat(i)).value,
          "data_pedido": date_formatted,
          "link": document.getElementById('item_link_'.concat(i)).value
        }
        itemsFormatted.push(object)
      }
    }

    if (itemsFormatted.length === 0) {
      setAlert('<div class="alert alert-danger" role="alert"><strong>Adicione items!</strong></div>')
      return
    }

    let price_transport = document.getElementById('value-transport').value;
    price_transport = price_transport.replace(',', '.');

    api.post(`/api/pedidos/pedido-de-compra`, {
      pedidos: itemsFormatted,
      valor_frete: price_transport,
      nome_projeto: document.getElementById('project-name').value
    }, { headers: { Authorization: access_token } })
    .then(() => setAlert('<div class="alert alert-success" role="alert"><strong>Pedido de compra enviado com sucesso!</strong></div>'))
    .catch(() => setAlert('<div class="alert alert-danger" role="alert"><strong>Não foi possível enviar o pedido de compra.</strong> Verifique os dados digitados!</div>'))
  }


  const newInputItem = (
    <CardItem id={'cardInputItem_'.concat(count_id)} key={'cardInputItem_'.concat(count_id)}>
      <header>
        <h2>
          <button id={'btnDeleteItem_' + count_id} className="btn-delete" onClick={e => {
            document.getElementById((e.target.id).replace('btnDeleteItem_','cardInputItem_')).hidden = true
            setInputsHidden(inputsHidden => [...inputsHidden, count_id])
          }}>x</button>
          Item
        </h2>
      </header>

      <div className="row">
        <div className="col-md-5">
          <label htmlFor={'item_name_'.concat(count_id)}>Nome do produto *</label>
          <input type="text" className="form-control" id={'item_name_'.concat(count_id)} name={'item_name_'.concat(count_id)} placeholder="Ex.: Ferro de solda" required />
        </div>
        <div className="col-md-3">
          <label htmlFor={'item_unit_value_'.concat(count_id)}>Valor unitário *</label>
          <input type="text" className="form-control" id={'item_unit_value_'.concat(count_id)} name={'item_unit_value_'.concat(count_id)} placeholder="Ex.: 2,50" required />
        </div>
        <div className="col-md-2">
          <label htmlFor={'item_qty_'.concat(count_id)}>Quantidade *</label>
          <input type="text" className="form-control" id={'item_qty_'.concat(count_id)} name={'item_qty_'.concat(count_id)} placeholder="Ex.: 6" required />
        </div>
        <div className="col-md-2">
          <label htmlFor={'item_date_'.concat(count_id)}>Data da compra *</label>
          <input type="date" className="form-control" id={'item_date_'.concat(count_id)} name={'item_date_'.concat(count_id)} required />
        </div>
      </div>
      <div className="row">
        <div className="col-md-5">
          <label htmlFor={'item_link_'.concat(count_id)}>Link do produto</label>
          <input type="text" className="form-control" id={'item_link_'.concat(count_id)} name={'item_link_'.concat(count_id)} placeholder="Ex.: https://portaldoramo.cefet-rj.br/" required />
        </div>
        <div className="col-md-3">
          <label htmlFor={'item_name_shop_'.concat(count_id)}>Nome da loja *</label>
          <input type="text" className="form-control" id={'item_name_shop_'.concat(count_id)} name={'item_name_shop_'.concat(count_id)} placeholder="JSumo" required />
        </div>
      </div>
    </CardItem>
  )


  useEffect(() => {
    document.getElementById('alert').innerHTML = alert;
  })


  return (
    <Screen>
      <Top_Left_Side_Menu />
      <Bottom_Right_Side_Menu />

      <div className="container">
        <div className="center-alert">
          <div className="area-alert" id="alert" />
        </div>
        <Header />
        <Title title="Pedido de Compra" />

        <Content>
          <p>Campos com * são de preenchimento obrigatório</p>

          <div className="row header">
            <div className="col-md-4">
              <label htmlFor="project-name">Projeto *</label>
              <select className="form-control" id="project-name" name="project-name">
                <option value="">Geral</option>
                {listProjects.map(project => (
                  <option key={project.nome_projeto_slug} value={project.nome_projeto_slug}>{project.nome_projeto}</option>
                ))}
              </select>
            </div>
            <div className="col-md-4">
              <label htmlFor="value-transport">Valor do frete *</label>
              <input type="text" className="form-control" id="value-transport" name="value-transport" />
            </div>
          </div>

          {(viewItems) ?
            viewItems.map(item => (
              item
            ))
          : ''}

          <button className="btn-send" onClick={() => {
            setCount_ID(count_id + 1)
            setViewItems(viewItems => [...viewItems, newInputItem])
          }}>Adicionar</button>

          <div className="center">
            <button className="btn-send" onClick={() => sendData()}>Enviar</button>
          </div>
        </Content>
      </div>
    </Screen>
  )
}
