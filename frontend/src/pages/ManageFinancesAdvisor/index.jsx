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

export default function ManageFinancesAdvisor () {
  document.title = 'Gerenciar o financeiro';
  const access_token = 'Bearer'.concat(sessionStorage.getItem("access_token"));

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
  const [selectedInputCash, setSelectedInputCash] = useState('emergencia');
  const [selectedOutputCash, setSelectedOutputCash] = useState('emergencia');
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
    .catch(() => window.location.href = '/error')
    .finally(() => setIsLoadedLittleCow(true))
  }, [])


  useEffect(() => {
    api.get('/api/pedidos/index-financeiro-pendentes', { headers: { Authorization: access_token } })
    .then(response => {
      setRequestList(response.data)
    })
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

        <Title title="Financeiro - Assessor" />

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
                    <hr />
                    <div className="row">
                      <div className="col-md-6">
                      <button className="btn-option-box" onClick={() => document.getElementById('extract-complete').style.display='block'}>Ver extrato completo</button><br />
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
                {(isLoadedLittleCow) ?
                  <div>
                    {(littleCowData) ?
                      <div>
                        <h1 className="title-box-white">Vaquinha atual</h1>
                        <span>{littleCowData.data_inicio} até {littleCowData.data_fim}</span>
                        <h5 className="subtitle-white"><button className="btn-circle" onClick={() => document.getElementById('new-input-little-cow').style.display='block'}>+</button>Entradas</h5>
                        <div className="view-extract">
                          <ul>
                            {(littleCowData.doacoes).map(donate => (
                              <li key={donate.uuid}><strong>[ {donate.data} ]</strong>  {((donate.nome_membro_doador).split(' ')[0]).concat(' ' + (donate.nome_membro_doador).split(' ')[1])} {'--->'} R$ {donate.valor}</li>
                            ))}
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
                        <div className="register-box">
                          <Register color={(register.valor < 0) ? '#FF0000' : '#222'}><strong>{register.data}</strong> {'---->'} R$ {register.valor}</Register>
                        </div>
                      ))
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
