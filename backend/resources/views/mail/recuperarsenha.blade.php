@component('mail::message')
Caro, {{ $membro->nome_completo }}

Você solicitou uma modificação de senha para sua conta no {{ config('app.name') }},
para realizar a mudança pressione o botão abaixo:

@component('mail::button', ['url' => $url])
Link para mudança
@endcomponent

<p><i>Caso não tenha sido você que solicitou tal modificação, contate um dos administradores</i></p>
Atenciosamente, Diretoria do Ramo IEEE CEFET-RJ
@endcomponent
