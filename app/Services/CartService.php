<?php

namespace App\Services;

use App\Models\Cart;
use App\Models\Product;
use App\Services\Payment\PaymentService;

class CartService
{
    public function checkCart(): Cart
    {
        return $this->getCart() ?? $this->createCart();
    }

    public function createCart(): Cart
    {
        return Cart::create([
            'user_id' => auth()->user()->id,
        ]);
    }

    public function getCart(): Cart
    {
        return Cart::where('user_id', auth()->user()->id)->first();
    }

    public function addToCart($request): void
    {
        $userCart = $this->checkCart();
        $product = Product::findOrfail($request->product_id);

        if ($this->checkIfOrderQtyIsLessThanMinimumOrderQty($product, $request->quantity)) {
            throw new \Exception('Order quantity is less than minimum order quantity');
        }

        $cartItem = $userCart->cartItems()->create([
            'product_id' => $product->id,
            'qty' => $request->quantity,
            'name' => $product->name,
            'description' => $request->description,
            'variants' => json_decode($request->variants),
            'discount' => $product->discount->active ? $product->discount->discount_percentage : 0,
            'tax' => $product->tax,
        ]);

        if ($request->hasFile('design') && $request->file('design')->isValid()) {
            $cartItem->addMediaFromRequest('design')
                ->withResponsiveImages()
                ->toMediaCollection('cart');
        }
    }

    public function checkIfOrderQtyIsLessThanMinimumOrderQty($product, $qty): bool
    {
        return $qty < $product->minimum_order_quantity;
    }

    public function checkout($data): array
    {
        $paymentService = new PaymentService;
        $orderService = new OrderService;

        $order = $orderService->createOrder($data);

        $snapToken = $paymentService->requestPayment($order);

        return [
            'snap_token' => $snapToken,
            'order_id' => $order->id,
        ];
    }
}
