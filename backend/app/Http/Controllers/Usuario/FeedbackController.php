<?php

namespace App\Http\Controllers\Usuario;

use App\Http\Controllers\ApiController;
use App\Models\Feedback;
use App\Repositories\Interfaces\FeedbackRepositoryInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FeedbackController extends ApiController
{
    protected $feedbackRepository;

    public function __construct(FeedbackRepositoryInterface $feedbackRepository)
    {
        parent::__construct();
        $this->feedbackRepository = $feedbackRepository;
        $this->authorizeResource(Feedback::class, 'feedback');
    }

    public function index()
    {
        return $this->feedbackRepository->index();
    }

    public function store(Request $request)
    {
        $this->feedbackRepository->create($request->validate(['assunto' => 'required', 'mensagem' => 'required', 'satisfacao' => 'required']) + ['membro_enviou' => Auth::id()]);
        return response()->json('Feedback criado com sucesso', 201);
    }

    protected function resourceAbilityMap()
    {
        return ['index' => 'viewAny'];
    }
}
