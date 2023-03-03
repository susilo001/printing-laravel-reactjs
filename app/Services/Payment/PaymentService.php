<?php

namespace App\Services\Payment;

use Gloudemans\Shoppingcart\Facades\Cart;

class PaymentService extends Midtrans
{
    public function requestPayment(): string
    {
        $cart = Cart::content();
        $cartDiscount = Cart::discount();
        $cartTax = Cart::tax();
        $cartTotal = Cart::total();

        $transaction = [
            'transaction_details' => [
                'order_id' => now()->timestamp,
                'gross_amount' => (int) $cartTotal,
            ],

            'customer_details' => [
                'first_name' => auth()->user()->name,
                'last_name' => auth()->user()->name,
                'email' => auth()->user()->email,
                'phone' => auth()->user()->phone_number,
                'billing_address' => [
                    'first_name' => 'Budi',
                    'last_name' => 'Susanto',
                    'email' => 'budisusanto@example.com',
                    'phone' => '08123456789',
                    'address' => 'Sudirman No.12',
                    'city' => 'Jakarta',
                    'postal_code' => '12190',
                    'country_code' => 'IDN',
                ],
                'shipping_address' => [
                    'first_name' => 'Budi',
                    'last_name' => 'Susanto',
                    'email' => 'budisusanto@example.com',
                    'phone' => '08123456789',
                    'address' => 'Sudirman No.12',
                    'city' => 'Jakarta',
                    'postal_code' => '12190',
                    'country_code' => 'IDN',
                ],
            ],

            'item_details' => array_map(function ($item) {
                return [
                    'id' => (int) $item['options']['product_id'],
                    'name' => $item['name'],
                    'price' => $item['price'],
                    'quantity' => (int) $item['qty'],
                ];
            }, array_values($cart->toArray())),
        ];

        $additionalFee = [
            [
                'id' => 'D01',
                'name' => 'Discount',
                'price' => (int) -$cartDiscount,
                'quantity' => 1,
            ],
            [
                'id' => 'T01',
                'name' => 'Tax',
                'price' => (int) $cartTax,
                'quantity' => 1,
            ],

        ];

        $transaction['item_details'] = array_merge($transaction['item_details'], $additionalFee);

        return $this->getSnapToken($transaction);
    }
}