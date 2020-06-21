@component('mail::message')
Caros,

A audiência do solicitada pelo membro {{ $strike->membroRecebeu->nome_completo }}, referente ao strike aplicado pelo membro {{ $strike->membroAplicou->nome_completo }} foi marcada para o dia {{ $strike->data_audiencia->format('d/m/Y') }} as {{ $strike->hora_audiencia }}

Atenciosamente, Diretoria do Ramo Estudantil IEEE CEFET-RJ
@endcomponent
