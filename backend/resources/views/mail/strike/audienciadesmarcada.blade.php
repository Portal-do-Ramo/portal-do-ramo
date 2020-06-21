@component('mail::message')
Caros,

Caros, foi desmarcada a audiência prevista para o dia {{ $strike->data_audiencia->format('d/m/Y') }} as {{ $strike->hora_audiencia }}, referente ao strike aplicado pelo membro {{ $strike->membroAplicou->nome_completo }} ao membro {{ $strike->membroRecebeu->nome_completo }}

Atenciosamente, Diretoria do Ramo IEEE CEFET-RJ
@endcomponent
