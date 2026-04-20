<?php

namespace App\Http\Controllers;

use Http;
use KayedSpace\N8n\Facades\N8nClient;
use Request;

class N8nController extends Controller
{
    public function test()
    {
        $payload = ['test' => 'hola'];

        $response = Http::get('http://localhost:5678/webhook-test/test', $payload);
        // uso el objeto HTTP para hacer responses personalizadas, ya que usando N8nClient::webhooks()->request('path') solo toma métodos post
        if ($response->status() >= 400 && $response->status() <= 450) {
            return response()->json(['Error ' . $response->status() => 'No se pudo setear el webhook'], $response->status());
        }
        return response()->json($response->json());
    }
    public function newPostWebhook(Request $req)
    {
        // este metodo se ejecutará con un webhook "post",
        /**
         * cuando creo un post, a esa persona le llegará un correo diciendole que se creó un post exitosamente, mencionando su username, marca, modelo, etc (toda la informacion del post, incluso su fecha de publicacion).
         * Request será el encargado de recibir toda esta informacion y enviarla por correo.
         * http://localhost:5678/webhook-test/new-post-notification - POST
         */
        dd($req->all());
    }
}