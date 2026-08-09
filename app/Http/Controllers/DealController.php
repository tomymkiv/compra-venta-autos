<?php

namespace App\Http\Controllers;

use App\Models\Deal;
use App\Models\Post;
use App\Models\User;

class DealController extends Controller
{
    // mis propios deals, sin ninguna operacion (solo visualizacion)
    public function user_deals(User $user)
    {
        if ($user->id !== auth()->id()) {
            abort(403);
        }
        $deals = Deal::with(['post.carModel.carBrand', 'seller', 'buyer'])
            ->where('buyer_id', $user->id)
            ->orWhere('seller_id', $user->id)
            ->orderBy('created_at', 'desc')
            ->paginate(10);
        return inertia('user/deals/user_deals', [
            'deal' => $deals,
            'thisUser' => $user
        ]);
    }
    // deal por publicacion, desde la perspectiva del vendedor
    public function index(Post $post)
    {
        $userId = auth()->id();
        if ($post->id_user == $userId) {
            $isSeller = $post->id_user === $userId;
            $isBuyer = Deal::where('post_id', $post->id)->where('buyer_id', $userId)->exists();

            if (!$isSeller && !$isBuyer) {
                abort(403);
            }

            $query = Deal::with(['post.carModel.carBrand', 'seller', 'buyer'])
                ->where('post_id', $post->id)
                ->orderBy('created_at', 'desc');

            // El comprador solo ve su propio deal
            if (!$isSeller) {
                $query->where('buyer_id', $userId);
            }

            $deal = $query->paginate(10);

            return inertia('user/deals/index', [
                'deal' => $deal,
                'post' => $post->load(['carModel.carBrand', 'user']),
            ]);
        }
        abort(403);
    }
    // iniciar deal (en la pagina del post)
    public function store(Post $post)
    {
        $deal = new Deal();
        $deal->post_id = $post->id;
        $deal->buyer_id = auth()->id();
        $deal->seller_id = $post->id_user;
        $deal->deal_status_id = 3;
        $deal->save();
        return redirect()->back();
    }
    // cancelar deal (comprador)
    public function destroy_as_buyer(Post $post) // al clickear en "cancelar Deal"
    {
        $deal = Deal::where('post_id', $post->id)
            ->where('buyer_id', auth()->id())
            ->first();

        $deal->delete();
        return redirect()->back()->with('success', 'Deal cancelado.');
    }
    // rechazar deal
    public function update_status(Deal $deal) // al rechazar
    {
        $deal->update([
            'deal_status_id' => 2,
            'rejected_at' => now(),
        ]);

        return redirect()->back()->with('success', 'Deal rechazado.');
    }
    // aceptar deal
    public function accept_deal(Deal $deal)
    {
        $deal->update([
            'deal_status_id' => 1,
        ]);
        return redirect()->back();
    }
    // eliminar deal (vendedor)
    public function destroy_as_seller(Deal $deal) // al rechazar y posteriormente darle a "eliminar Deal"
    {
        $deal->delete();
        return redirect()->back()->with('success', 'Deal rechazado.');
    }
}
