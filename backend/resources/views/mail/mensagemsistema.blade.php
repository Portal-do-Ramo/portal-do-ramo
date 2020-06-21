@component('mail::message')

{{ $mensagem }}

<p><i>Essa mensagem foi enviada por meio do sistema {{ config('app.name') }}. Em caso de spam ou conteúdo inadequado, notifique um membro da Diretoria do Ramo Estudantil.</i></p>
@endcomponent
