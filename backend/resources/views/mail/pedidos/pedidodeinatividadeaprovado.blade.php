@component('mail::message')
Caro {{ $pedidoInatividade->membroSolicitante->nome_completo }},

Viemos por meio deste informar a aprovação do seu pedido de inatividade solicitado no dia {{ $pedidoInatividade->data_criado->format('d/m/Y') }}. A partir deste momento, você estará durante um período de inatividade
que durará até o dia {{ $pedidoInatividade->membroSolicitante->data_fim_inatividade }}, sendo que você será notificado ao se aproximar do fim deste período. Caso deseje encerrar antes da data estipulada,
entre em contato com um dos membros da diretoria.

Atenciosamente, Diretoria do Ramo Estudantil IEEE CEFET-RJ
@endcomponent
