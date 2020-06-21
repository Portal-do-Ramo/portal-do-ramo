<?php

namespace App\Http\Middleware;

use Closure;

class CheckIP
{
    private $whiteListedIPs = ['127.0.0.1'];
    
    
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if(!in_array($request->ip(), $this->whiteListedIPs))
            return response()->json('IP inválido', 403);

        return $next($request);
    }
}
