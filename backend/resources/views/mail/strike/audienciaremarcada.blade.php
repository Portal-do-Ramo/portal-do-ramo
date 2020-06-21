@component('mail::message')
Caros,

Foi remarcada a audiência prevista para o dia {{ $dataOriginal }} as {{ $horaOriginal }}, para o dia {{ $strike->data_audiencia->format('d/m/Y') }} as {{ $strike->hora_audiencia }}

Atenciosamente, Diretoria do Ramo IEEE CEFET-RJ
@endcomponent
