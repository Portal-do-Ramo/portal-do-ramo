import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import InputMask from "react-input-mask";

import { Screen, Header } from "./styles";
import Logo_Portal from "./Logo_PortaldoRamo.png";
import api from "../../services/api";

function setUserData(user){
  return { type: 'SET_USER_DATA', user }
}

export default function FirstLogin() {
  document.title = "Portal do Ramo";
  const access_token = "Bearer".concat(sessionStorage.getItem("access_token"));

  const nome = useSelector((state) => state.data[1]).split(" ")[0];

  const [alert, setAlert] = useState("");
  const [cpf, setCPF] = useState("");
  const [telefone, setTelefone] = useState("");
  const [isActive, setIsActive] = useState("");

  const dispatch = useDispatch();

  const matricula = useSelector(state => state.data[0]);
  const nome_completo = useSelector(state => state.data[1]);
  const email = useSelector(state => state.data[2]);
  const hierarquia = useSelector(state => state.data[4]);
  const data_nascimento = useSelector(state => state.data[5]);
  const idade = useSelector(state => state.data[6]);
  const curso = useSelector(state => state.data[7]);
  const telefone_principal = useSelector(state => state.data[8]);
  const pagante = useSelector(state => state.data[9]);
  const situacao = useSelector(state => state.data[10]);
  const quantidade_strikes = useSelector(state => state.data[11]);
  const quantidade_faltas_rg = useSelector(state => state.data[12]);
  const quantidade_faltas_equipe = useSelector(state => state.data[13]);
  const quantidade_faltas_exposup = useSelector(state => state.data[14]);
  const foto_url = useSelector(state => state.data[15]);
  const gerenciar_membros = useSelector(state => state.data[16]);
  const criar_membros = useSelector(state => state.data[17]);
  const gerenciar_strikes = useSelector(state => state.data[18]);
  const gerenciar_faltas = useSelector(state => state.data[19]);

  function EnviarCadastro(e) {
    e.preventDefault();

    const senha_usuario = document.getElementById("senha_usuario").value;
    const senha_usuario_confirmation = document.getElementById(
      "senha_usuario_confirmada"
    ).value;

    if (senha_usuario != senha_usuario_confirmation) {
      setAlert(
        '<div class="alert alert-warning" role="alert">As senhas não coinscidem!</div>'
      );
      document.getElementById("senha_usuario_confirmada").focus();
      return false;
    }

    api.patch(`/api/usuarios/primeiro-login/${matricula}`, {
      cpf_usuario: document.getElementById("cpf_usuario").value,
      rg_usuario: document.getElementById("rg_usuario").value,
      telefone_secundario: document.getElementById("telefone_fixo").value,
      senha_usuario: document.getElementById("senha_usuario").value,
      tipo_sanguineo: document.getElementById("tipo_sanguineo").value,
      medicamentos_utiliza: document.getElementById("utiliza_medicamento").value,
      medicamentos_alergico: document.getElementById("alergico_medicamento").value,
      condicao_especial: document.getElementById("condicao_especial").value,
      alimentos_alergico: document.getElementById("alergico_alimento").value,
      nome_contato_emergencia: document.getElementById("nome_emergencia").value,
      grau_parentesco_contato: document.getElementById("grau_parentesco").value,
      telefone_contato_emergencia: document.getElementById("telefone_emergencia").value,
    }, { headers: { Authorization: access_token } })
    .then(() => {
      const user = {
        matricula: matricula,
        nome: nome_completo,
        email: email,
        ativo: true,
        hierarquia: hierarquia,
        data_nascimento: data_nascimento,
        idade: idade,
        curso: curso,
        telefone_principal: telefone_principal,
        pagante: pagante,
        situacao: situacao,
        quantidade_strikes: quantidade_strikes,
        quantidade_faltas_rg: quantidade_faltas_rg,
        quantidade_faltas_equipe: quantidade_faltas_equipe,
        quantidade_faltas_exposup: quantidade_faltas_equipe,
        foto_url: foto_url,
        gerenciar_membros: gerenciar_membros,
        criar_membros: criar_membros,
        gerenciar_strikes: gerenciar_strikes,
        gerenciar_faltas: gerenciar_faltas
      }
      dispatch(setUserData(user))
      window.location.href = "/home"
    })
    .catch(error => {
      for(let erro in error.response.data.errors) {
        setAlert(`<div class="alert alert-danger" role="alert">${error.response.data.errors[erro]}</div>`)
      }
    })
  }


  useEffect(() => {
    document.getElementById("alert").innerHTML = alert;
  });


  return (
    <Screen>
      <img src={Logo_Portal} className="img-fluid" />
      <div className="col-md-10">
        <Header>
          <h2>Olá, {nome}</h2>
          <p>
            Como este é seu primeiro login, precisamos que informe alguns dados
            para completar seu cadastro!
          </p>
          <small>Os campos com * são de preenchimento obrigatório</small>
        </Header>

        <form onSubmit={EnviarCadastro}>
          <div id="alert" />
          <div className="row justify-content-center">
            <h4>Informações pessoais</h4>
          </div>
          <div className="row">
            <div className="col-md-4">
              <label htmlFor="cpf_usuario">CPF *</label>
              <InputMask
                type="text"
                className="form-control"
                name="cpf_usuario"
                id="cpf_usuario"
                value={cpf}
                onChange={(e) => setCPF(e.target.value)}
                mask="999.999.999-99"
                maskChar=" "
                required
              />
            </div>

            <div className="col-md-4">
              <label htmlFor="rg_usuario">RG *</label>
              <input
                className="form-control"
                type="text"
                name="rg_usuario"
                id="rg_usuario"
                placeholder="00000.000-0"
                maxLength="11"
                autoComplete="off"
                required
              />
            </div>

            <div className="col-md-4">
              <label htmlFor="telefone_fixo">Telefone Fixo</label>
              <InputMask
                type="tel"
                className="form-control"
                name="telefone_fixo"
                id="telefone_fixo"
                mask="(99) 9999-9999"
                maskChar=" "
              />
            </div>
          </div>

          <div className="row justify-content-center">
            <h4>Sua nova senha *</h4>
          </div>
          <div className="row">
            <div className="col-md-6">
              <input
                className="form-control"
                type="password"
                name="senha"
                id="senha_usuario"
                placeholder="Nova senha *"
                maxLength="40"
                required
              />
            </div>

            <div className="col-md-6">
              <input
                className="form-control"
                type="password"
                name="senha_usuario_confirmada"
                id="senha_usuario_confirmada"
                placeholder="Confirme sua senha *"
                maxLength="40"
                required
              />
            </div>
          </div>

          <div className="row justify-content-center">
            <h4>Dados médicos *</h4>
          </div>
          <div className="row">
            <div className="col-md-2">
              <label htmlFor="tipo_sanguineo">Sangue *</label>
              <select
                className="form-control"
                name="tipo_sanguineo"
                id="tipo_sanguineo"
              >
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>

            <div className="col-md-5">
              <label htmlFor="utiliza_medicamento">
                Medicamento(s) utilizado(s) *
              </label>
              <input
                className="form-control"
                type="text"
                name="utiliza_medicamento"
                id="utiliza_medicamento"
                placeholder="Utiliza algum medicamento? Quais?"
                required
                autoComplete="off"
              />
            </div>

            <div className="col-md-5">
              <label htmlFor="alergico_medicamento">
                Medicamento(s) alérgico(s) *
              </label>
              <input
                className="form-control"
                type="text"
                name="alergico_medicamento"
                id="alergico_medicamento"
                placeholder="Alérgico à algum medicamento? Quais?"
                required
                autoComplete="off"
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <label htmlFor="condicao_especial">Condição especial *</label>
              <input
                className="form-control"
                type="text"
                name="condicao_especial"
                id="condicao_especial"
                placeholder="Possui alguma condição especial? Quais?"
                required
                autoComplete="off"
              />
            </div>

            <div className="col-md-6">
              <label htmlFor="alergico_alimento">
                Alimento(s) alérgico(s) *
              </label>
              <input
                className="form-control"
                type="text"
                name="alergico_alimento"
                id="alergico_alimento"
                placeholder="Alérgico à algum alimento? Quais?"
                required
                autoComplete="off"
              />
            </div>
          </div>

          <div className="row justify-content-center">
            <h4>Contato de emergência *</h4>
          </div>
          <div className="row">
            <div className="col-md-4">
              <label htmlFor="nome_emergencia">Nome *</label>
              <input
                className="form-control"
                type="text"
                name="nome_emergencia"
                id="nome_emergencia"
                placeholder="Ex.: Maria de Lourdes*"
                maxLength="90"
                required
                autoComplete="off"
              />
            </div>

            <div className="col-md-4">
              <label htmlFor="grau_parentesco">Grau de parentesco *</label>
              <input
                className="form-control"
                type="text"
                name="grau_parentesco"
                id="grau_parentesco"
                placeholder="Ex.: Mãe"
                required
                autoComplete="off"
              />
            </div>

            <div className="col-md-4">
              <label htmlFor="telefone_emergencia">Telefone *</label>
              <InputMask
                type="tel"
                className="form-control"
                name="telefone_emergencia"
                id="telefone_emergencia"
                mask="(99) 99999-9999"
                maskChar=" "
                required
              />
            </div>
          </div>
          <div className="row center">
            <button type="submit" className="btn btn-primary">
              Enviar
            </button>
          </div>
        </form>
      </div>
    </Screen>
  );
}
