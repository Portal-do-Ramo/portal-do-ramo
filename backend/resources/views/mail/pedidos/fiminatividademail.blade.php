@component('mail::message')
Caro, {{ $usuario->nome_completo }}

@if($usuario->membro->pagante)
Viemos por meio deste, lembrar a você que seu período de inatividade está chegando ao fim. Lembrando que por você ser um membro pagante, não precisa se inscrever 
em um próximo Processo Seletivo Interno para poder continuar vinculado ao Ramo.
@else
Viemos por meio deste, lembrar a você que seu período de inatividade está chegando ao fim. Lembrando que por você não ser um membro pagante, deve se inscrever 
em um próximo Processo Seletivo Interno para poder continuar exercendo suas atividades pelo Ramo.
@endif

Atenciosamente, Diretoria do Ramo IEEE CEFET-RJ
@endcomponent
