@component('mail::message')
Prezado {{ $membro->nome_completo }},

A Diretoria do Ramo Estudantil IEEE CEFET/RJ vem por meio deste e-mail comunicar a reavaliação de seu strike.

O strike aprovado em: "{{ $strike->data_aprovado->format('d/m/Y') }}"

Conclusão da reavaliação: "{{ $reavaliacao->constatacao }}"

Atenciosamente, Diretoria do Ramo IEEE CEFET-RJ
@endcomponent
