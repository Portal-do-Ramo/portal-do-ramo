<?php

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

/**
 *
 * Rotas referentes aos controladores relacionados a autenticação
 *
 */

use Illuminate\Support\Facades\Route;

Route::prefix('/auth')->group(function() {
    Route::get('/logout', 'Auth\LoginController@logout');
    Route::post('/login', 'Auth\LoginController@login');
    Route::post('/recuperar-senha', 'Auth\ForgotPasswordController@sendResetLinkEmail');
    Route::post('/alterar-senha', 'Auth\ResetPasswordController@reset');
});

/**
 *
 * Rotas referentes aos controladores relacionados a membro
 *
 */
Route::apiResource('usuarios', 'Usuario\UsuarioController')->except('show');
Route::prefix('/usuarios')->group(function() {
    Route::get('/perfil/{usuario}', 'Usuario\UsuarioController@show');
    Route::get('/perfil-completo/{usuario}', 'Usuario\UsuarioController@showFully');
    Route::get('/editar-meu-perfil', 'Usuario\UsuarioController@meuPerfil');
    Route::get('/search', 'Usuario\UsuarioController@search');
    Route::get('/index-mensagem', 'Usuario\UsuarioController@indexMensagem');
    Route::get('/minhas-notificacoes', 'Usuario\NotificacoesController@minhasNotificacoes');

    Route::get('/lista-presenca', 'Usuario\UsuarioExportController@listaPresenca');
    Route::get('/lista-pagantes', 'Usuario\UsuarioExportController@listaMembrosPagantes');
    Route::get('/lista-inativos', 'Usuario\UsuarioExportController@listaMembrosInativos');
    Route::get('/lista-desligados', 'Usuario\UsuarioExportController@listaMembrosDesligados');

    Route::post('/mensagem', 'Usuario\NotificacoesController@enviarMensagem');
    Route::match(['PUT', 'PATCH'], '/atualizar-totalmente/{usuario}', 'Usuario\UsuarioController@updateFully');
    Route::match(['PUT', 'PATCH'], '/primeiro-login/{usuario}', 'Usuario\UsuarioController@primeiroLogin');
    Route::match(['PUT', 'PATCH'], '/foto-perfil/{usuario}', 'Usuario\UsuarioController@updateFotoPerfil');
    Route::match(['PUT', 'PATCH'], '/notificacoes/ler/{notificacao}', 'Usuario\NotificacoesController@marcarNotificacaoComoLida');
});

Route::get('/hierarquias', 'Usuario\HierarquiaController@index');
Route::get('/cursos', 'Usuario\CursoController@index');

Route::get('/feedbacks', 'Usuario\FeedbackController@index');
Route::post('/feedbacks', 'Usuario\FeedbackController@store');

/**
 *
 * Rotas referentes aos controladores relacionados a faltas
 *
 */
Route::apiResource('faltas', 'Falta\FaltaController')->except('update', 'show');
Route::prefix('faltas')->group(function() {
    Route::get('/minhas-faltas', 'Falta\FaltaController@minhasFaltas');
    Route::get('/historico-faltas/{usuario}', 'Falta\FaltaController@historico');
    Route::get('/lista-faltas', 'Falta\FaltaExportController@getListaFaltas');
});
Route::get('/tipo-faltas', 'Falta\TipoFaltaController@index');

/**
 *
 * Rotas referentes aos controladores relacionados a strike
 *
 */
Route::apiResource('strikes', 'Strike\StrikeController')->except('update', 'show');
Route::prefix('/strikes')->group(function() {
    Route::get('/meus-strikes', 'Strike\StrikeController@meusStrikes');
    Route::get('/historico-strikes/{usuario}', 'Strike\StrikeController@historico');
    Route::get('/strikes-solicitados', 'Strike\StrikeController@strikesSolicitados');
    Route::get('/strikes-audiencia-solicitada', 'Strike\AudienciaStrikeController@strikesComAudiencia');
    Route::get('/lista-strikes-aprovados', 'Strike\StrikeExportController@getListaAprovados');

    Route::match(['PUT', 'PATCH'], '/aprovar/{strike}', 'Strike\StrikeController@aprovar');
    Route::match(['PUT', 'PATCH'], '/manter/{strike}', 'Strike\StrikeController@manter');
    Route::match(['PUT', 'PATCH'], '/solicitar-audiencia/{strike}', 'Strike\AudienciaStrikeController@solicitarAudiencia');
    Route::match(['PUT', 'PATCH'], '/marcar-audiencia/{strike}', 'Strike\AudienciaStrikeController@marcarAudiencia');
    Route::match(['PUT', 'PATCH'], '/remarcar-audiencia/{strike}', 'Strike\AudienciaStrikeController@remarcarAudiencia');
    Route::match(['PUT', 'PATCH'], '/desmarcar-audiencia/{strike}', 'Strike\AudienciaStrikeController@desmarcarAudiencia');
});

Route::prefix('reavaliacoes')->group(function() {
    Route::get('/{strike}/reavaliacoes', 'Strike\ReavaliacaoController@index');
    Route::post('/{strike}/reavaliacoes', 'Strike\ReavaliacaoController@store');
    Route::delete('/{reavaliacao}', 'Strike\ReavaliacaoController@destroy');
});

/**
 *
 * Rotas referentes aos controladores relacionados a projetos
 *
 */
Route::prefix('projetos')->group(function() {
    Route::get('/select-projetos', 'Projeto\ProjetoController@selectProjetos');
    Route::get('/select-projetos-psi', 'Projeto\ProjetoController@selectProjetosPSI');
    Route::get('/projeto-completo/{projeto}', 'Projeto\ProjetoController@showFully');
    Route::get('/meus-projetos', 'Projeto\ProjetoMembroController@meusProjetos');
    Route::get('/historico-projetos/{usuario}', 'Projeto\ProjetoMembroController@historicoProjetos');
    Route::get('/membros-disponiveis/{projeto}', 'Projeto\ProjetoMembroController@membrosDisponiveis');
    Route::match(['PUT', 'PATCH'], '/atualizar-areas/{projeto}', 'Projeto\ProjetoController@atualizarAreas');

    Route::post('/{projeto}/adicionar-membro', 'Projeto\ProjetoMembroController@store');
    Route::post('/{projeto}/adicionar-assessor', 'Projeto\ProjetoMembroController@adicionarAssessor');
    Route::match(['PUT','PATCH'], '/{projeto}/atualizar-membro/{inscricao}', 'Projeto\ProjetoMembroController@update');
    Route::delete('/{projeto}/remover-membro/{inscricao}', 'Projeto\ProjetoMembroController@destroy');
});
Route::apiResource('projetos', 'Projeto\ProjetoController');

/**
 *
 * Rotas referentes aos controladores relacionados a equipes
 *
 */
Route::prefix('equipes')->group(function() {
    Route::get('/select-equipes', 'Equipe\EquipeController@selectEquipes');
    Route::get('/equipe-completa/{equipe}', 'Equipe\EquipeController@showFully');
    Route::match(['PUT', 'PATCH'], '/alterar-coordenador/{equipe}', 'Equipe\EquipeController@updateCoordenador');
    Route::match(['PUT', 'PATCH'], '/alterar-assessor/{equipe}', 'Equipe\EquipeController@updateAssessor');
    Route::match(['PUT', 'PATCH'], '/alterar-logo/{equipe}', 'Equipe\EquipeController@updateLogo');
});
Route::apiResource('equipes', 'Equipe\EquipeController')->except('destroy');

/**
 *
 * Rotas referentes aos controladores relacionados a psi
 *
 */
Route::get('/psis-tipos-areas', 'Psi\PsiController@tiposAreas');
Route::apiResource('psis', 'Psi\PsiController');
Route::prefix('psis')->group(function() {
    Route::post('/{psi}/projetos', 'Psi\ProjetosPsiController@store');
    Route::delete('/{psi}/projetos/{projeto}', 'Psi\ProjetosPsiController@destroy');

    Route::post('/{psi}/equipes', 'Psi\EquipesPsiController@store');
    Route::delete('/{psi}/equipes/{equipe}', 'Psi\EquipesPsiController@destroy');

    Route::match(['PUT', 'PATCH'], '/{psi}/gestao', 'Psi\PsiController@storeGestao');
    Route::delete('/{psi}/gestao/{gestao}', 'Psi\PsiController@destroyGestao');
});
Route::post('inscricoes-psi', 'Psi\InscricaoPsiController@store');
Route::delete('inscricoes-psi/{inscricao}', 'Psi\InscricaoPsiController@destroy');
Route::match(['PUT','PATCH'],'inscricoes-psi/{inscricao}/aprovar', 'Psi\InscricaoPsiController@aprovarInscricao');
Route::match(['PUT','PATCH'],'inscricoes-psi/{inscricao}/reprovar', 'Psi\InscricaoPsiController@reprovarInscricao');



/**
 *
 * Rotas referentes aos controladores relacionados a pedidos
 *
 */
Route::prefix('pedidos')->group(function() {
    Route::get('/index-pessoas', 'Pedidos\PedidoController@indexPessoas');
    Route::get('/index-financeiro', 'Pedidos\PedidoController@indexFinanceiro');
    Route::get('/index-pessoas-pendentes', 'Pedidos\PedidoController@indexPessoasPendentes');
    Route::get('/index-financeiro-pendentes', 'Pedidos\PedidoController@indexFinanceiroPendentes');
    Route::get('/historico-pessoas/{usuario}', 'Pedidos\PedidoController@historicoPessoas');
    Route::get('/historico-financeiro/{usuario}', 'Pedidos\PedidoController@historicoFinanceiro');
    Route::get('/meus-pedidos', 'Pedidos\PedidoController@meusPedidos');

    Route::post('/pedido-de-compra', 'Pedidos\PedidoDeCompraController@store');
    Route::post('/pedido-de-desligamento', 'Pedidos\PedidoDeDesligamentoController@store');
    Route::post('/pedido-de-inatividade', 'Pedidos\PedidoDeInatividadeController@store');
    Route::post('/{pedido}/solicitar-reembolso', 'Pedidos\PedidoDeReembolsoController@store');
    Route::post('/pedido-de-saida-de-projeto', 'Pedidos\PedidoDeSaidaDeProjetoController@store');

    Route::match(['PUT', 'PATCH'], '/pedido-de-compra/aprovar/{pedido}', 'Pedidos\PedidoDeCompraController@aprovar');
    Route::match(['PUT', 'PATCH'], '/pedido-de-desligamento/aprovar/{pedido}', 'Pedidos\PedidoDeDesligamentoController@aprovar');
    Route::match(['PUT', 'PATCH'], '/pedido-de-inatividade/aprovar/{pedido}', 'Pedidos\PedidoDeInatividadeController@aprovar');
    Route::match(['PUT', 'PATCH'], '/pedido-de-reembolso/aprovar/{pedido}', 'Pedidos\PedidoDeReembolsoController@aprovar');
    Route::match(['PUT', 'PATCH'], '/pedido-de-saida-de-projeto/aprovar/{pedido}', 'Pedidos\PedidoDeSaidaDeProjetoController@aprovar');

    Route::delete('/pedido-de-compra/recusar/{pedido}', 'Pedidos\PedidoDeCompraController@recusar');
    Route::delete('/pedido-de-desligamento/recusar/{pedido}', 'Pedidos\PedidoDeDesligamentoController@recusar');
    Route::delete('/pedido-de-inatividade/recusar/{pedido}', 'Pedidos\PedidoDeInatividadeController@recusar');
    Route::delete('/pedido-de-reembolso/recusar/{pedido}', 'Pedidos\PedidoDeReembolsoController@recusar');
    Route::delete('/pedido-de-saida-de-projeto/recusar/{pedido}', 'Pedidos\PedidoDeSaidaDeProjetoController@recusar');
});

/**
 * 
 * Rotas referentes aos controladores relacionados a vaquinha
 * 
 */
Route::apiResource('/vaquinhas', 'Vaquinha\VaquinhaController')->only('index', 'store');
Route::prefix('/vaquinhas')->group(function() {
    Route::get('/vaquinha-aberta-atual', 'Vaquinha\VaquinhaController@vaquinhaAbertaAtual');
    Route::post('/{vaquinha}/adicionar-doacao', 'Vaquinha\VaquinhaController@adicionarDoacao');

    Route::get('/minhas-doacoes-vaquinhas', 'Vaquinha\DoacoesVaquinhaController@minhasVaquinhas');
    Route::get('/historico/{usuario}', 'Vaquinha\DoacoesVaquinhaController@historico');
});

/**
 * 
 * Rotas referentes aos controladores relacionados a eventos
 * 
 */
Route::apiResource('eventos', 'Evento\EventoController')->only('index', 'store', 'update', 'destroy');
Route::prefix('/eventos')->group(function() {
    Route::get('/meus-eventos', 'Evento\EventoController@meusEventos');

    Route::post('/criar-evento-equipe/{equipe}', 'Evento\EventoEquipeController@store');
    Route::match(['PUT', 'PATCH'], '/{equipe}/atualizar-evento-equipe/{evento}', 'Evento\EventoEquipeController@update');
    Route::delete('/{equipe}/deletar-evento-equipe/{evento}', 'Evento\EventoEquipeController@destroy');

    Route::post('/criar-evento-projeto/{projeto}', 'Evento\EventoProjetoController@store');
    Route::match(['PUT', 'PATCH'], '/{projeto}/atualizar-evento-projeto/{evento}', 'Evento\EventoProjetoController@update');
    Route::delete('/{projeto}/deletar-evento-projeto/{evento}', 'Evento\EventoProjetoController@destroy');
});

/**
 * 
 * Rotas referentes aos controladores relacionados a registros de caixa
 * 
 */
Route::apiResource('/registros-de-caixa', 'RegistroDeCaixa\RegistroDeCaixaController')->only('index', 'store');
Route::prefix('registros-de-caixa')->group(function() {
    Route::get('/anos-select', 'RegistroDeCaixa\RegistroDeCaixaController@anosDisponiveis');
    Route::get('/registros-anuais', 'RegistroDeCaixa\RegistroDeCaixaController@registrosAnuais');
    Route::get('/gastos-anuais', 'RegistroDeCaixa\RegistroDeCaixaController@todosGastosAnuais');
    Route::get('/gastos-anuais-equipes', 'RegistroDeCaixa\RegistroDeCaixaController@gastosAnuaisEquipes');
    Route::get('/fluxo-anual', 'RegistroDeCaixa\RegistroDeCaixaController@fluxoAnual');
});

/**
 * 
 * Rotas referentes aos controladores relacionados a caixas
 * 
 */
Route::apiResource('/caixas', 'Caixa\CaixaController')->only('index', 'update');
Route::prefix('caixas')->group(function() {
    Route::get('/info-gerais', 'Caixa\CaixaController@infosGerais');
});

/**
 * 
 * Rotas referentes aos controladores relacionados a arquivos
 * 
 */
Route::prefix('arquivos')->group(function() {
    Route::get('/download/{arquivo}', 'Arquivo\DownloadArquivoController');

    Route::post('/upload-arquivo-equipe/{equipe}', 'Equipe\EquipeArquivosController@store');
    Route::match(['PUT', 'PATCH'], '/{equipe}/alterar-arquivo-equipe/{arquivo}', 'Equipe\EquipeArquivosController@update');
    Route::delete('/{equipe}/remover-arquivo-equipe/{arquivo}', 'Equipe\EquipeArquivosController@destroy');
    
    Route::post('/upload-arquivo-projeto/{projeto}', 'Projeto\ProjetoArquivosController@store');
    Route::match(['PUT', 'PATCH'], '{projeto}/alterar-arquivo-projeto/{arquivo}', 'Projeto\ProjetoArquivosController@update');
    Route::delete('{projeto}/remover-arquivo-projeto/{arquivo}', 'Projeto\ProjetoArquivosController@destroy');
});

/**
 * 
 * Rotas referentes aos controladores relacionados a parcerias
 * 
 */
 Route::apiResource('parcerias', 'Parceria\ParceriaController');
 Route::prefix('/parcerias')->group(function() {
    Route::get('/index-publicas', 'Parceria\ParceriaController@indexPublicas');
    Route::post('/create-consolidada', 'Parceria\ParceriaController@storeConsolidada');
    Route::match(['PUT', 'PATCH'], '/consolidar/{parceria}', 'Parceria\ParceriaController@consolidar');
 });