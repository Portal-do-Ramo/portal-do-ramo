import React, { useState, useEffect } from 'react';
import api from '../../services/api';

import Top_Left_Side_Menu from '../../components/Top_Left_Side_Menu';
import Bottom_Right_Side_Menu from '../../components/Bottom_Right_Side_Menu';
import Header from '../../components/Home_Header';
import Title from '../../components/Title';
import PieChart from '../../components/PieChart';
import BarChart from '../../components/BarChart';
import Loader from '../../components/LoaderSpinner';

import next from './images/next.png';
import back from './images/back.png';

import { Screen, Content, ModalScreen, BoxModalScreen, ConfirmBoxModalScreen, CardCash, Register } from './styles';

export default function ManageFinances () {
  document.title = 'Gerenciar o financeiro';
  const access_token = 'Bearer'.concat(sessionStorage.getItem("access_token"));

  // if (true) {
  //   window.location.href = '/noaccess';
  // }

  // GENERAL
  const [infoGerais, setInfoGerais] = useState();
  const [littleCowData, setLittleCowData] = useState();
  const [requestList, setRequestList] = useState();
  const [members, setMembers] = useState([]);
  const [listTeams, setListTeams] = useState([]);
  const [alert, setAlert] = useState('');
  const [isLoadedGeneral, setIsLoadedGeneral] = useState(false);
  const [isLoadedLittleCow, setIsLoadedLittleCow] = useState(false);
  const [isLoadedCharts, setIsLoadedCharts] = useState(false);
  const [isLoadedCaixas, setIsLoadedCaixas] = useState(false);
  const [purchaseOrderSelected, setPurchaseOrderSelected] = useState();
  const [refundRequestSelected, setRefundRequestSelected] = useState();
  const [monthsToRegister, setMonthsToRegister] = useState(1);

  // IN/OUT CASH
  const [isInputExclusive, setIsInputExclusive] = useState(false);
  const [isOutputExclusive, setIsOutputExclusive] = useState(false);
  const [selectedInputCash, setSelectedInputCash] = useState('emergencial');
  const [selectedOutputCash, setSelectedOutputCash] = useState('emergencial');
  const [selectedLCIMember, setSelectedLCIMember] = useState();

  // CHARTS
  const date = new Date();
  const actualMonth = date.getMonth();
  const actualYear = date.getFullYear();
  const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
  const monthsLowerCase = ['janeiro', 'fevereiro', 'marco', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];

  const [count, setCount] = useState(actualMonth);
  const [optionChart, setOptionChart] = useState('gastos-mensais');
  const [years, setYears] = useState();
  const [selectedYear, setSelectedYear] = useState(actualYear);
  const [team, setTeam] = useState({name: 'wolfbotz', value: [35, 20, 45]})
  const [entradasAnuais, setEntradasAnuais] = useState([]);
  const [saidasAnuais, setSaidasAnuais] = useState([]);
  const [gastosMensais, setGastosMensais] = useState([]);
  const [dataWolfBotz, setDataWolfBotz] = useState([]);
  const [dataSocialWolf, setDataSocialWolf] = useState([]);
  const [registers, setRegisters] = useState([]);
  const [dataCash, setDataCash] = useState([]);
  const [caixa, setCaixa] = useState([]);
  const [percents, setPercents] = useState([]);

  var count_id = 0;


  useEffect(() => {
    api.get('api/usuarios', { headers: { Authorization: access_token } })
    .then(response => {
      setMembers(response.data.Ativo)
      setSelectedLCIMember(response.data.Ativo[0].matricula)
    })
    .catch(() => window.location.href = '/error')
  }, [])


  useEffect(() => {
    api.get('/api/caixas/info-gerais', { headers: { Authorization: access_token } })
    .then(response => setInfoGerais(response.data))
    .catch(() => window.location.href = '/error')
    .finally(() => setIsLoadedGeneral(true))
  }, [])


  useEffect(() => {
    api.get(`/api/registros-de-caixa?meses=${monthsToRegister}`, { headers: { Authorization: access_token } })
    .then(response => setRegisters(response.data))
    .catch(() => window.location.href = '/error')
  }, [])


  useEffect(() => {
    api.get('/api/vaquinhas/vaquinha-aberta-atual', { headers: { Authorization: access_token } })
    .then(response => setLittleCowData(response.data))
    .catch(error => {
      if(error.response.status !== 404) {
        window.location.href = '/error'
      }
    })
    .finally(() => setIsLoadedLittleCow(true))
  }, [])


  useEffect(() => {
    api.get('/api/pedidos/index-financeiro-pendentes', { headers: { Authorization: access_token } })
    .then(response => setRequestList(response.data))
    .catch(() => window.location.href = '/error')
  }, [])


  useEffect(() => {
    api.get('/api/equipes', { headers: { Authorization: access_token } })
    .then(response => setListTeams(response.data))
    .catch(() => window.location.href = '/error')
  }, [])


  useEffect(() => {
    api.get('/api/registros-de-caixa/anos-select', { headers: { Authorization: access_token } })
    .then(response => setYears(response.data))
    .catch(() => window.location.href = '/error')
  }, [])


  useEffect(() => {
    api.get(`/api/registros-de-caixa/registros-anuais?ano=${selectedYear}`, { headers: { Authorization: access_token } })
    .then(response => {
      setEntradasAnuais(response.data.entrada)
      setSaidasAnuais(response.data.saida)
    })
    .catch(() => window.location.href = '/error')
    .finally(() => setIsLoadedCharts(true))
  }, [])


  useEffect(() => {
    api.get(`/api/registros-de-caixa/gastos-anuais?ano=${selectedYear}`, { headers: { Authorization: access_token } })
    .then(response => setGastosMensais(response.data))
    .catch(() => window.location.href = '/error')
  }, [])


  useEffect(() => {
    api.get(`/api/registros-de-caixa/gastos-anuais-equipes?ano=${selectedYear}`, { headers: { Authorization: access_token } })
    .then(response => {
      setDataWolfBotz(response.data.wolfbotz)
      setDataSocialWolf(response.data.socialwolf)
    })
    .catch(() => window.location.href = '/error')
  }, [])

  useEffect(() => {
    api.get('/api/caixas', { headers: { Authorization: access_token } })
    .then(response => setDataCash(response.data))
    .catch(() => window.location.href = '/error')
    .finally(() => setIsLoadedCaixas(true))
  }, [])

  setTimeout(() => {
    if (alert !== '') {
      setAlert('')
    }
  }, 4000);

  function setCash(type) {
    let value = 0;
    let selectedCash = '';
    let exclusive = false;

    const date = document.getElementById(type + '-date').value.split('-');
    const date_formatted = date[2] + '/' + date[1] + '/' + date[0];

    if(type == "output") {
      value = document.getElementById("output-value").value;
      value = value.replace(',', '.');
      value = value * -1;
      exclusive = (isInputExclusive) ? true : false;
      selectedCash = (exclusive) ? selectedOutputCash : '';
    } else {
      value = document.getElementById("input-value").value;
      value = value.replace(',', '.');
      exclusive = (isInputExclusive) ? true : false;
      selectedCash =  (exclusive) ? selectedInputCash : '';
    }

    if(exclusive) {
      selectedCash = 'caixa-'.concat(selectedCash);
    } else {
      selectedCash = '';
    }
    console.log(selectedCash)
    api.post('/api/registros-de-caixa', {
      descricao: document.getElementById(type + '-description').value,
      valor: value,
      data: date_formatted,
      exclusivo: exclusive,
      caixa_relacionado: selectedCash
    }, { headers: { Authorization: access_token } })
    .then(() => setAlert('<div class="alert alert-success" role="alert"><strong>Novo registro de caixa realizado com sucesso!</strong></div>'))
    // .catch(() => setAlert('<div class="alert alert-danger" role="alert"><strong>Não foi possível excluir fazer o registro.</strong> Se o problema persistir, favor contate a diretoria.</div>'))
    .catch(error => console.log(error.response))
  }


  function setSituationOfRequest(type, uuid) {
    api.put(`/api/pedidos/pedido-de-${type}/aprovar/${uuid}`, {}, { headers: { Authorization: access_token } })
    .then(() => {
      document.getElementById(uuid).animate([{ transform: 'translateX(0px)' },{ transform: 'translateX(-500px)' }], { duration: 500, iterations: Infinity })
      setTimeout(() => document.getElementById(uuid).hidden = true, 500);
    })
    .catch(() => setAlert('<div class="alert alert-danger" role="alert"><strong>Não foi possível aprovar o pedido.</strong> Se o problema persistir, favor contate a diretoria.</div>'))
  }


  function reproveRequest(type, uuid) {
    api.delete(`/api/pedidos/pedido-de-${type}/recusar/${uuid}`, { headers: { Authorization: access_token } })
    .then(() => {
      document.getElementById(uuid).animate([{ transform: 'translateX(0px)' },{ transform: 'translateX(-500px)' }], { duration: 500, iterations: Infinity })
      setTimeout(() => document.getElementById(uuid).hidden = true, 500);
    })
    .catch(() => setAlert('<div class="alert alert-danger" role="alert"><strong>Não foi possível reprovar o pedido.</strong> Se o problema persistir, favor contate a diretoria.</div>'))
  }


  function setPercent() {
    let teamsPercents = [];
    let projectsPercents = [];
    let values = [];

    for (let i=0; i < dataCash.map; i++) {
      values.push(document.getElementById(`percent-cash-${i}`).value)
    }

    api.put('/api/caixas', {
      equipes: teamsPercents,
      projetos: projectsPercents
    }, { headers: { Authorization: access_token } })
    .then(() => {
      document.getElementById('set-percent').style.display='none'
      setAlert('<div class="alert alert-success" role="alert"><strong>Vaquinha criada com sucesso!</strong></div>')
    })
    .catch(() => setAlert('<div class="alert alert-danger" role="alert"><strong>Não foi possível criar a vaquinha.</strong> Se o problema persistir, favor contate a diretoria.</div>'))
  }


  function newLittleCow() {
    const initial_date = document.getElementById('new-little-cow-initial_date').value.split('-');
    const initial_date_formatted = initial_date[2] + '/' + initial_date[1] + '/' + initial_date[0];
    const month = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
    let aux = parseInt(initial_date[1])

    api.post('/api/vaquinhas', {
      nome_vaquinha: 'Vaquinha ' + month[aux - 1] + ' ' + initial_date[0],
      data_inicio: initial_date_formatted
    }, { headers: { Authorization: access_token } })
    .then(() => {
      document.getElementById('new-little-cow').style.display='none'
      setAlert('<div class="alert alert-success" role="alert"><strong>Vaquinha criada com sucesso!</strong></div>')
    })
    .catch(() => setAlert('<div class="alert alert-danger" role="alert"><strong>Não foi possível criar a vaquinha.</strong> Se o problema persistir, favor contate a diretoria.</div>'))
  }


  function cashInputLittleCow() {
    const ilc_date = document.getElementById('ILC-date').value.split('-');
    const ilc_date_formatted = ilc_date[2] + '/' + ilc_date[1] + '/' + ilc_date[0];

    api.post(`/api/vaquinhas/${littleCowData.nome_vaquinha_slug}/adicionar-doacao`, {
      matricula_membro_doador: selectedLCIMember,
      valor: document.getElementById('ILC-value').value,
      data: ilc_date_formatted
    }, { headers: { Authorization: access_token } })
    .then(() => setAlert('<div class="alert alert-success" role="alert"><strong>Registro realizado com sucesso!</strong></div>'))
    .catch(error => setAlert(`<div class="alert alert-danger" role="alert"><strong>${error.response.data.errors.data[0]}.</strong> Se o problema persistir, favor contate a diretoria.</div>`))
  }


  function labelsTeams() {
    let aux = ['Administrativo'];

    if (listTeams) {
      for (let i=0; i < listTeams.length; i++) {
        aux.push(listTeams[i].nome_equipe)
      }
    }

    aux.push('Emergencial');

    return aux;
  }


  function cashOutflowsOfTheYear() {
    let QTY_YEARS = 12;
    let month = [];
    let values = [];
    let values_formatted = [];

    for(let i = 0; i < gastosMensais.length; i++) {
      const aux = gastosMensais[i];
      for (var k in aux) {
        values.push(aux[k]);
      }
    }

    for (let count = 0; count < QTY_YEARS; count ++) {
      for (let i = 0; i < values.length; i++) {
        month.push(values[i][count].valor_total);
      }
      values_formatted.push(month);
      month = [];
    }

    return values_formatted;
  }


  function yearsValuesToArray(arr) {
    let aux = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    if (arr != '') {
      for (let i=0; i < arr.length; i++) {
        if(months.indexOf(arr[i].mes) !== -1) {
          aux.splice(months.indexOf(arr[i].mes), 1, arr[i].valor_total)
        }
      }
    }

    return aux;
  }


  function fluxoCaixa() {
    const entrada = yearsValuesToArray(entradasAnuais);
    const saida = yearsValuesToArray(saidasAnuais);
    const QTY_MONTHS = 12;

    let aux = [];

    for (let i=0; i < QTY_MONTHS; i++) {
      aux.push([entrada[i], saida[i]])
    }

    return aux;
  }


  function getLabelsOfTeam(team) {
    let labels = [];

    if (team === 'wolfbotz') {
      for(let i = 0; i < dataWolfBotz.length; i++) {
        for(var k in dataWolfBotz[i]){
          labels.push(((((k.replace('caixa-', '')).replace('wolfbotz', '')).split('-')).join(' ')).toUpperCase())
        }
      }
    } else if (team === 'socialwolf') {
      for(let i = 0; i < dataSocialWolf.length; i++) {
        for(var k in dataSocialWolf[i]){
          labels.push(((((k.replace('caixa-', '')).replace('socialwolf', '')).split('-')).join(' ')).toUpperCase())
        }
      }
    }

    return labels;
  }


  function getValuesOfTeam(team) {
    let QTY_YEARS = 12;
    let month = [];
    let values = [];
    let values_formatted = [];

    if (team == 'wolfbotz') {
      for(let i = 0; i < dataWolfBotz.length; i++) {
        const aux = dataWolfBotz[i];
        for (let k in aux) {
          values.push(aux[k]);
        }
      }
    } else if (team === 'socialwolf') {
      for(let i = 0; i < dataSocialWolf.length; i++) {
        const aux = dataSocialWolf[i];
        for (var k in aux) {
          values.push(aux[k]);
        }
      }
    }

    for (let count = 0; count < QTY_YEARS; count ++) {
      for (let i = 0; i < values.length; i++) {
        month.push(values[i][count].valor_total);
      }
      values_formatted.push(month);
      month = [];
    }

    return values_formatted;
  }


  function valueOfChartTeams(team) {
    if (team === 'wolfbotz') {
      return getValuesOfTeam('wolfbotz')
    } else {
      return getValuesOfTeam('socialwolf')
    }
  }


  function getNovosRegistrosDeCaixaAnual(year) {
    api.get(`/api/registros-de-caixa/registros-anuais?ano=${year}`, { headers: { Authorization: access_token } })
    .then(response => {
      setEntradasAnuais(response.data.entrada)
      setSaidasAnuais(response.data.saida)
      setSelectedYear(year)
    })
    .catch(() => window.location.href = '/error')
  }


  function getNovosGastosAnuais(year) {
    api.get(`/api/registros-de-caixa/gastos-anuais?ano=${year}`, { headers: { Authorization: access_token } })
    .then(response => {
      setGastosMensais(response.data)
      setSelectedYear(year)
    })
    .catch(() => window.location.href = '/error')
  }


  function getGastosAnuaisBotzSocial(year) {
    api.get(`/api/registros-de-caixa/gastos-anuais-equipes?ano=${year}`, { headers: { Authorization: access_token } })
    .then(response => {
      setDataWolfBotz(response.data.wolfbotz)
      setDataSocialWolf(response.data.socialwolf)
      setSelectedYear(year)
    })
    .catch(() => window.location.href = '/error')
  }


  function getExtrato(time) {
    api.get(`/api/registros-de-caixa?meses=${time}`, { headers: { Authorization: access_token } })
    .then(response => {
      setRegisters(response.data)
      setMonthsToRegister(time)
    })
    .catch(() => window.location.href = '/error')
  }


  /* CHARTS */
  const GastosMensais = (
    <div className="area-charts">
      <PieChart labels={labelsTeams()} value={(cashOutflowsOfTheYear())[count]}/>
      <div className="area-navigation">
        <button className="btn-navigation" onClick={() => {
          setCount((count > 0) ? count - 1 : count)
        }}>
          <img src={back} alt="back" title={months[count - 1]}/>
        </button>
        <h1>{months[count]}</h1>
        <button className="btn-navigation" onClick={() => setCount((count < 11) ? count + 1 : count)}>
          <img src={next} alt="next" title={months[count + 1]}/>
        </button>
      </div>
    </div>
  );


  const FluxoMensal = (
    <div className="area-charts">
      <BarChart value={(fluxoCaixa())[count]}/>
      <div className="area-navigation">
        <button className="btn-navigation" onClick={() => {
          setCount((count > 0) ? count - 1 : count)
        }}>
          <img src={back} alt="back" title={months[count - 1]}/>
        </button>
        <h1>{months[count]}</h1>
        <button className="btn-navigation" onClick={() => setCount((count < 11) ? count + 1 : count)}>
          <img src={next} alt="next" title={months[count + 1]}/>
        </button>
      </div>
    </div>
  );


  const PorEquipes = (
    <div className="area-charts">
      <div className="area-tabs">
        <button className="btn-tab" onClick={() => setTeam({name: 'wolfbotz'})}>WolfBotz</button>
        <button className="btn-tab" onClick={() => setTeam({name: 'socialwolf'})}>SocialWolf</button>
      </div>
      <PieChart labels={getLabelsOfTeam(team.name)} value={(valueOfChartTeams(team.name))[count]}/>
      <div className="area-navigation">
        <button className="btn-navigation" onClick={() => setCount((count > 0) ? count - 1 : count)}>
          <img src={back} alt="back" title={months[count - 1]}/>
        </button>
        <h1>{months[count]}</h1>
        <button className="btn-navigation" onClick={() => setCount((count < 11) ? count + 1 : count)}>
          <img src={next} alt="next" title={months[count + 1]}/>
        </button>
      </div>
    </div>
  );


  const EntradasAnuais = (
    <div className="area-charts">
      <PieChart labels={months} value={yearsValuesToArray(entradasAnuais)}/>
    </div>
  );


  const SaidasAnuais = (
    <div className="area-charts">
      <PieChart labels={months} value={yearsValuesToArray(saidasAnuais)}/>
    </div>
  );


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

        <Title title="Financeiro" />

          <div className="row">
            <div className="col-md-6">
              <div className="left-box-gray">
                <h1 className="title-box-blue">Caixa</h1>
                <hr />
                {(isLoadedGeneral) ?
                  <div>
                    { (infoGerais) ?
                      <div>
                        <h2 className="data-finance"><strong>Valor total:</strong> R$ {infoGerais[0].orcamento_total}</h2>
                        <h2 className="data-finance"><strong>Entradas no mês:</strong> R$ {infoGerais[0].total_entradas}</h2>
                        <h2 className="data-finance"><strong>Saídas no mês:</strong> R$ {(infoGerais[0].total_saidas) * (-1)}</h2>
                      </div>
                    : '' }
                    <br />
                    <button className="btn-option-box" onClick={() => document.getElementById('extract-complete').style.display='block'}>Ver extrato completo</button><br />
                    <hr />
                    <div className="row">
                      <div className="col-md-6">
                        <button className="btn-option-box" onClick={() => document.getElementById('new-input').style.display='block'}>Nova Entrada de caixa</button><br />
                      </div>
                      <div className="col-md-6">
                        <button className="btn-option-box" onClick={() => document.getElementById('new-output').style.display='block'}>Nova Saída de Caixa</button><br />
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-md-6">
                        <button className="btn-option-box" onClick={() => document.getElementById('purchase-order').style.display='block'} disabled={(requestList) ? false : true}>Solicitações de Compra</button><br />
                      </div>
                      <div className="col-md-6">
                        <button className="btn-option-box" onClick={() => document.getElementById('refund-request').style.display='block'} disabled={(requestList) ? false : true}>Solicitações de Reembolso</button><br />
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-md-6">
                        <button className="btn-option-box" onClick={() => document.getElementById('set-percent').style.display='block'}>Porcentagens de caixas</button><br />
                      </div>
                      <div className="col-md-6">
                        <button className="btn-option-box" onClick={() => window.location.href = '/requests/historic'}>Histórico de Pedidos</button><br />
                      </div>
                    </div>
                    <br />
                  </div>
                :
                  <div className="area-loader">
                    <Loader />
                  </div>
                }
              </div>
            </div>
            <div className="col-md-6">
              <div className="right-box-blue-gradient">
                <h1 className="title-box-white">Vaquinhas</h1>
                <hr />
                {(isLoadedLittleCow) ?
                  <div>
                    <div className="row">
                      <div className="col-md-6">
                        <button className="btn-option-box-white" onClick={() => document.getElementById('new-little-cow').style.display='block'} disabled={(littleCowData) ? true : false}>Nova vaquinha</button>
                      </div>
                      <div className="col-md-6">
                        <button className="btn-option-box-white" onClick={() => window.location.href="/finances/historic/little-cow"}>Histórico</button>
                      </div>
                    </div>
                    <hr />
                    {(littleCowData) ?
                      <div>
                        <h1 className="title-box-white">Vaquinha atual</h1>
                        <span>{littleCowData.data_inicio} até {littleCowData.data_fim}</span>
                        <h5 className="subtitle-white"><button className="btn-circle" onClick={() => document.getElementById('new-input-little-cow').style.display='block'}>+</button>Entradas</h5>
                        <div className="view-extract">
                          <ul>
                            {(littleCowData.doacoes).map(donate => (
                              <li key={donate.uuid}><strong>[ {donate.data} ]</strong>  {((donate.nome_membro_doador).split(' ')[0]).concat(' ' + (donate.nome_membro_doador).split(' ')[1])} {'--->'} R$ {donate.valor}</li>
                            )).reverse()}
                          </ul>
                        </div>
                      </div>
                    : <h1 className="title-box-white">Sem vaquinha aberta</h1>}
                  </div>
                :
                  <div className="area-loader">
                    <Loader />
                  </div>
                }
              </div>
            </div>
          </div>

          <ModalScreen id="extract-complete" className="modal">
            <BoxModalScreen className="container box-modal-screen">
              <div className="modal-content animate view">
                <div className='row'>
                  <h1 className="title">Extrato</h1>
                </div>
                <div className="inside-area">
                  <select className="form-control" defaultValue={monthsToRegister} onChange={e => getExtrato(e.target.value)}>
                    <option value="1">Último mês</option>
                    <option value="6">Últimos 6 meses</option>
                    <option value="12">Último ano</option>
                    <option value="">Todos</option>
                  </select>
                  <div className="view-extract-complete">
                    {(registers) ?
                      registers.map(register => (
                        <div className="register-box" key={register.uuid}>
                          <Register color={(register.valor < 0) ? '#FF0000' : '#222'}><strong>{register.data}</strong> {'-->'} R$ {register.valor}</Register>
                        </div>
                      )).reverse()
                    : ''}
                  </div>
                  <div className="row buttons-area">
                    <button className="btn btn-primary back" onClick={() => {
                      document.getElementById('extract-complete').style.display='none'
                    }}>
                      Voltar
                    </button>
                  </div>
                </div>
              </div>
            </BoxModalScreen>
          </ModalScreen>

          <ModalScreen id="new-input" className="modal">
            <BoxModalScreen className="container box-modal-screen">
              <div className="modal-content animate view">
                <div className='row'>
                  <h1 className="title">Nova entrada de caixa</h1>
                </div>
                <div className="inside-area">
                  <div className="row">
                    <div className="col-md-12">
                      <label htmlFor="input-description">Descrição *</label>
                      <input type="text" className="form-control" id="input-description" placeholder="Descrição da entrada do caixa" required />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label htmlFor="input_date">Data *</label>
                      <input type="date" className="form-control" id="input-date" required />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="input-value">Valor *</label>
                      <input
                        type="text"
                        className="form-control"
                        name="input-value"
                        id="input-value"
                        required
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label htmlFor="is-input-exclusive">
                        <input
                          className="checkbox"
                          type="checkbox"
                          name="is-input-exclusive"
                          id="is-input-exclusive"
                          value={true}
                          onClick={() => setIsInputExclusive(!isInputExclusive)}
                        />Exclusivo
                      </label><br />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="input-locale-cash" title="Ignore caso não seja uma entrada exclusiva">Selecione o destino</label><br />
                      <select className="form-control" id="input-locale-cash" title="Ignore caso não seja uma entrada exclusiva" onChange={e => setSelectedInputCash(e.target.value)}>
                        <option value="administrativo">Administrativo</option>
                        <option value="emergencial">Emergência</option>
                        {listTeams.map(team => (
                          <option key={team.nome_equipe_slug} value={team.nome_equipe_slug}>{team.nome_equipe}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="row buttons-area">
                    <button className="btn btn-primary" onClick={() => document.getElementById('new-input').style.display='none'}>
                      Cancelar
                    </button>
                    <button className="btn btn-primary" onClick={() => setCash("input")}>
                      Salvar
                    </button>
                  </div>
                </div>
              </div>
            </BoxModalScreen>
          </ModalScreen>

          <ModalScreen id="new-output" className="modal">
            <BoxModalScreen className="container box-modal-screen">
              <div className="modal-content animate view">
                <div className='row'>
                  <h1 className="title">Nova saída de caixa</h1>
                </div>
                <div className="inside-area">
                  <div className="row">
                    <div className="col-md-12">
                      <label htmlFor="output-description">Descrição</label>
                      <input type="text" className="form-control" id="output-description" placeholder="Descrição da saída do caixa" required />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label htmlFor="output-date">Data *</label>
                      <input type="date" className="form-control" id="output-date" required />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="output-value">Valor *</label>
                      <input
                        type="text"
                        className="form-control"
                        name="output-value"
                        id="output-value"
                        required
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label htmlFor="is-output-exclusive">
                        <input
                          className="checkbox"
                          type="checkbox"
                          name="is-output-exclusive"
                          id="is-output-exclusive"
                          value={true}
                          onClick={() => setIsOutputExclusive(!isOutputExclusive)}
                        />Exclusivo
                      </label><br />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="output-locale-cash" title="Ignore caso não seja uma saída exclusiva">Selecione o caixa</label><br />
                      <select className="form-control" id="output-locale-cash" title="Ignore caso não seja uma saída exclusiva" onChange={e => setSelectedOutputCash(e.target.value)}>
                        <option value="administrativo">Administrativo</option>
                        <option value="emergencial">Emergência</option>
                        {listTeams.map(team => (
                          <option key={team.nome_equipe_slug} value={team.nome_equipe_slug}>{team.nome_equipe}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="row buttons-area">
                    <button className="btn btn-primary" onClick={() => document.getElementById('new-output').style.display='none'}>
                      Cancelar
                    </button>
                    <button className="btn btn-primary" onClick={() => setCash("output")}>
                      Salvar
                    </button>
                  </div>
                </div>
              </div>
            </BoxModalScreen>
          </ModalScreen>

          <ModalScreen id="purchase-order" className="modal">
            <BoxModalScreen className="container box-modal-screen">
              <div className="modal-content animate view">
                <div className='row'>
                  <h1 className="title">Solicitações de Compra</h1>
                </div>
                <div className="inside-area">
                  <div className="view-requests">
                    {(requestList) ?
                      (requestList.pedido_de_compra).map(request => (
                        <div key={request.uuid} className="card-request" id={request.uuid}>
                          <h1><strong>Solicitante:</strong> {((request.nome_membro_solicitou).split(' ')[0]).concat(' ' + (request.nome_membro_solicitou).split(' ')[1])}</h1>
                          <div className="row">
                            <div className="col-md-6">
                              <h2><strong>Projeto:</strong> {request.nome_projeto_solicitado}</h2>
                            </div>
                            <div className="col-md-3">
                              <h2><strong>Frete: R$</strong> {request.dados_pedido.valor_frete}</h2>
                            </div>
                            <div className="col-md-3">
                              <h2><strong>Total: R$</strong> {request.dados_pedido.valor_total}</h2>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-4">
                              <h2><strong>Data de solicitação:</strong> {request.data_criado}</h2>
                            </div>
                            <div className="col-md-4">
                              <h2><strong>Qtd. produtos:</strong> {(request.dados_pedido.pedidos).length}</h2>
                            </div>
                            <div className="col-md-4">
                              <button className="btn-products" onClick={() => {
                                setPurchaseOrderSelected(request.dados_pedido.pedidos)
                                document.getElementById('purchase-order').style.display='none'
                                document.getElementById('purchase-order-products').style.display='block'
                              }}>Ver produtos</button>
                            </div>
                          </div>

                          <div className="row right">
                            <button className="btn-approve" onClick={() => setSituationOfRequest('compra', request.uuid)}>Aprovar</button>
                            <button className="btn-disapprove" onClick={() => reproveRequest('compra', request.uuid)}>Reprovar</button>
                          </div>
                        </div>
                      ))
                    : ''}
                  </div>
                  <div className="row buttons-area">
                    <button className="btn btn-primary cancel" onClick={() => document.getElementById('purchase-order').style.display='none'}>
                      Fechar
                    </button>
                  </div>
                </div>
              </div>
            </BoxModalScreen>
          </ModalScreen>

          <ModalScreen id="purchase-order-products" className="modal">
            <BoxModalScreen className="container box-modal-screen">
              <div className="modal-content animate view">
                <div className='row'>
                  <h1 className="title">Produtos</h1>
                </div>
                <div className="inside-area">
                  <div className="view-products">
                    {(purchaseOrderSelected) ?
                      purchaseOrderSelected.map(product => (
                        <div key={(product.nome_produto).concat(product.link)} className="card-request">
                          <div className="row">
                            <div className="col-md-12">
                              <h2><strong>Produto:</strong> {product.nome_produto}</h2>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-4">
                              <h2><strong>Quantidade: </strong> {product.quantidade}</h2>
                            </div>
                            <div className="col-md-4">
                              <h2><strong>Valor unitário: R$</strong> {product.valor_unitario}</h2>
                            </div>
                            <div className="col-md-4">
                              <h2><strong>Loja: </strong> {product.nome_loja}</h2>
                            </div>
                          </div>
                          <div className="row">
                            <a href={product.link} target="_blank"><h2>Acessar página do produto</h2></a>
                          </div>
                        </div>
                      ))
                    : ''}
                  </div>
                  <div className="row buttons-area">
                    <button className="btn btn-primary back" onClick={() => {
                      document.getElementById('purchase-order-products').style.display='none'
                      document.getElementById('purchase-order').style.display='block'
                    }}>
                      Voltar
                    </button>
                  </div>
                </div>
              </div>
            </BoxModalScreen>
          </ModalScreen>

          <ModalScreen id="refund-request" className="modal">
            <BoxModalScreen className="container box-modal-screen">
              <div className="modal-content animate view">
                <div className='row'>
                  <h1 className="title">Solicitações de Reembolso</h1>
                </div>
                <div className="inside-area">
                  <div className="view-requests">
                    {(requestList) ?
                      (requestList.pedido_de_reembolso).map(request => (
                        <div key={request.uuid} className="card-request" id={request.uuid}>
                          <h1><strong>Solicitante:</strong> {((request.nome_membro_solicitou).split(' ')[0]).concat(' ' + (request.nome_membro_solicitou).split(' ')[1])}</h1>
                          <div className="row">
                            <div className="col-md-6">
                              <h2><strong>Projeto:</strong> {request.nome_projeto_solicitado}</h2>
                            </div>
                            <div className="col-md-6">
                              <h2><strong>Total: R$</strong> {request.dados_pedido.valor_total}</h2>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-6">
                              <h2><strong>Data de solicitação:</strong> {request.data_criado}</h2>
                            </div>
                            <div className="col-md-2" />
                            <div className="col-md-4">
                              <button className="btn-products" onClick={() => {
                                setRefundRequestSelected(request.dados_pedido.pedidos)
                                document.getElementById('refund-request').style.display='none'
                                document.getElementById('refund-request-products').style.display='block'
                              }}>Ver pedido</button>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-6">
                              <h2><a href={request.dados_pedido.foto_comprovante} target="_blank">Ver comprovante</a></h2>
                            </div>
                          </div>

                          <div className="row right">
                            <button className="btn-approve" onClick={() => setSituationOfRequest('reembolso', request.uuid)}>Aprovar</button>
                            <button className="btn-disapprove" onClick={() => reproveRequest('reembolso', request.uuid)}>Reprovar</button>
                          </div>
                        </div>
                      ))
                    : ''}
                  </div>
                  <div className="row buttons-area">
                    <button className="btn btn-primary cancel" onClick={() => document.getElementById('refund-request').style.display='none'}>
                      Fechar
                    </button>
                  </div>
                </div>
              </div>
            </BoxModalScreen>
          </ModalScreen>

          <ModalScreen id="refund-request-products" className="modal">
            <BoxModalScreen className="container box-modal-screen">
              <div className="modal-content animate view">
                <div className='row'>
                  <h1 className="title">Pedido</h1>
                </div>
                <div className="inside-area">
                  <div className="view-products">
                    {(refundRequestSelected) ?
                      refundRequestSelected.map(product => (
                        <div key={(product.nome_produto).concat(product.link)} className="card-request">
                          <div className="row">
                            <div className="col-md-12">
                              <h2><strong>Produto:</strong> {product.nome_produto}</h2>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-4">
                              <h2><strong>Quantidade: </strong> {product.quantidade}</h2>
                            </div>
                            <div className="col-md-4">
                              <h2><strong>Valor unitário: R$</strong> {product.valor_unitario}</h2>
                            </div>
                            <div className="col-md-4">
                              <h2><strong>Loja: </strong> {product.nome_loja}</h2>
                            </div>
                          </div>
                          <div className="row">
                            <a href={product.link} target="_blank"><h2>Acessar página do produto</h2></a>
                          </div>
                        </div>
                      ))
                    : ''}
                  </div>
                  <div className="row buttons-area">
                    <button className="btn btn-primary back" onClick={() => {
                      document.getElementById('refund-request-products').style.display='none'
                      document.getElementById('refund-request').style.display='block'
                    }}>
                      Voltar
                    </button>
                  </div>
                </div>
              </div>
            </BoxModalScreen>
          </ModalScreen>

          <ModalScreen id="set-percent" className="modal">
            <BoxModalScreen className="container box-modal-screen">
              <div className="modal-content animate view">
                <div className='row'>
                  <h1 className="title">Porcentagem</h1>
                </div>
                <div className="inside-area">
                  <div className="view-products">
                    <div className="row">
                      {(percents) ?
                        percents.map(percent => (
                          <div className="col-md-4" key={percent.nome_caixa_slug}>
                            <label htmlFor="percent">{percent.nome_caixa.replace('Caixa ', '')}</label>
                            <input type="text" id={"percent-cash-".concat(count_id++)} className="form-control" defaultValue={percent.porcentagem_orcamento} />
                          </div>
                        ))
                      : ''}
                    </div>
                  </div>
                  <div className="row buttons-area">
                    <button className="btn btn-primary" onClick={() => document.getElementById('set-percent').style.display='none'}>
                      Voltar
                    </button>
                    <button className="btn btn-primary" onClick={() => setPercent()}>
                      Salvar
                    </button>
                  </div>
                </div>
              </div>
            </BoxModalScreen>
          </ModalScreen>

          <ModalScreen id="new-little-cow" className="modal">
            <ConfirmBoxModalScreen className="container box-modal-screen">
              <div className="modal-content animate view">
                <div className='row'>
                  <h1 className="title">Nova Vaquinha</h1>
                </div>
                <div className="inside-area">
                  <label htmlFor="initial_date">Data de início *</label>
                  <input type="date" className="form-control" id="new-little-cow-initial_date" required />
                  <div className="row buttons-area">
                    <button className="btn btn-primary" onClick={() => document.getElementById('new-little-cow').style.display='none'}>
                      Cancelar
                    </button>
                    <button className="btn btn-primary" onClick={() => newLittleCow()}>
                      Criar
                    </button>
                  </div>
                </div>
              </div>
            </ConfirmBoxModalScreen>
          </ModalScreen>

          <ModalScreen id="new-input-little-cow" className="modal">
            <BoxModalScreen className="container box-modal-screen">
              <div className="modal-content animate view">
                <div className='row'>
                  <h1 className="title">{(littleCowData) ? littleCowData.nome_vaquinha : ''}</h1>
                </div>
                <div className="inside-area">
                  <div className="row">
                    <div className="col-md-12">
                      <label htmlFor="ILC-member">Selecione o membro</label>
                      <select className="form-control" id="ILC-member" onChange={e => setSelectedLCIMember(e.target.value)}>
                        {members.map(member => (
                            <option key={member.matricula} value={member.matricula}>{((member.nome_completo).split(' ')[0]).concat(' ' + (member.nome_completo).split(' ')[1]) + ' - ' + member.matricula}</option>
                          ))}
                      </select>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label htmlFor="ILC-date">Data</label>
                      <input type="date" className="form-control" id="ILC-date" required />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="ILC-value">Valor</label>
                      <input
                        type="text"
                        className="form-control"
                        name="ILC-value"
                        id="ILC-value"
                        required
                      />
                    </div>
                  </div>
                  <div className="row buttons-area">
                    <button className="btn btn-primary" onClick={() => document.getElementById('new-input-little-cow').style.display='none'}>
                      Cancelar
                    </button>
                    <button className="btn btn-primary" onClick={() => cashInputLittleCow()}>
                      Criar
                    </button>
                  </div>
                </div>
              </div>
            </BoxModalScreen>
          </ModalScreen>

        <Content>
          {(isLoadedCaixas) ?
            <div className="row">
              {(dataCash) ?
                dataCash.map(cash => (
                  <div className="col-md-3" key={cash.nome_caixa} onClick={() => {
                    setCaixa(cash.registros_de_caixa)
                    document.getElementById('extract').style.display='block'
                  }}>
                    <CardCash>
                      <h1 className="title">{cash.nome_caixa}</h1>
                      <h2 className="value"><strong>Caixa:</strong> R$ {cash.orcamento_atual}</h2>
                      <h2 className="value"><strong>% no caixa:</strong> {cash.porcentagem_orcamento}%</h2>
                    </CardCash>
                  </div>
                ))
              : ''}
            </div>
          :
            <div className="area-loader">
              <Loader />
            </div>
          }
        </Content>

        <Content>
          {(isLoadedCharts) ?
            <div>
              <h1 className="title-box-blue">Gráficos</h1>
              <div className="row">
                <div className="col-md-2">
                  <select id="years" className="form-control" defaultValue={selectedYear} onChange={e => {
                    getNovosRegistrosDeCaixaAnual(e.target.value)
                    getNovosGastosAnuais(e.target.value)
                    getGastosAnuaisBotzSocial(e.target.value)
                  }}>
                    {(years) ? years.map(year => (
                      <option value={year} key={year}>{year}</option>
                    )) : ''}
                  </select>
                </div>
              </div>
              <div className="view-chart">
                <button className="btn-tab" onClick={() => {
                  setCount(0)
                  setOptionChart('gastos-mensais')
                }}>Gastos Mensais</button>
                <button className="btn-tab" onClick={() => {
                  setCount(0)
                  setOptionChart('fluxo-mensal')
                }}>Fluxo Mensal</button>
                <button className="btn-tab" onClick={() => {
                  setOptionChart('equipes')
                  setCount(0)
                }}>Botz - Social</button>
                <button className="btn-tab" onClick={() => {
                  setOptionChart('entrada-anual')
                  setCount(0)
                }}>Entrada anual</button>
                <button className="btn-tab" onClick={() => {
                  setOptionChart('saida-anual')
                  setCount(0)
                }}>Saída anual</button>

                {(optionChart === 'gastos-mensais') ? GastosMensais : ''}
                {(optionChart === 'fluxo-mensal') ? FluxoMensal : ''}
                {(optionChart === 'equipes') ? PorEquipes : ''}
                {(optionChart === 'entrada-anual') ? EntradasAnuais : ''}
                {(optionChart === 'saida-anual') ? SaidasAnuais : ''}
              </div>
            </div>
          :
            <div className="area-loader">
              <Loader />
            </div>
          }
        </Content>

        <ModalScreen id="extract" className="modal" onClick={() => document.getElementById('extract').style.display='none'}>
          <BoxModalScreen className="container box-modal-screen">
            <div className="modal-content animate view">
              <div className="row">
                <h1 className="title">Extrato</h1>
              </div>
              <div className="inside-area">
                <div className="view-registers">
                  {(caixa) ?
                    caixa.map(register => (
                      <div className="register-box">
                        <Register color={(register.valor < 0) ? '#FF0000' : '#222'}><strong>{register.data}</strong> {'---->'} R$ {register.valor}</Register>
                      </div>
                    ))
                  : ''}
                </div>
                <div className="row buttons-area">
                  <button className="btn btn-primary" onClick={() => document.getElementById('extract').style.display='none' }>
                    Fechar
                  </button>
                </div>
              </div>
            </div>
          </BoxModalScreen>
        </ModalScreen>
      </div>
    </Screen>
  )
}
