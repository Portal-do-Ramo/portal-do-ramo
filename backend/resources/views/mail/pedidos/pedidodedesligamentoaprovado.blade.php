@component('mail::message')
Caro, {{ $usuario->nome_completo }}

Seu pedido de desligamento realizado no dia {{ $pedidoDesligamento->data_criado->format('d/m/Y') }} foi aprovado pela diretoria. Precisamos agora apenas marcar um dia para a assinatura do termo de desligamento,
logo pedimos que entre em contato com algum dos membros da diretoria para que isso possa ser arranjado.

Atenciosamente, Diretoria do Ramo Estudantil IEEE CEFET-RJ
@endcomponent