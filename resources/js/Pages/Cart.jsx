import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/inertia-react";
import {
  ShoppingCartIcon,
  TrashIcon,
  BanknotesIcon,
} from "@heroicons/react/24/outline";
import Input from "@/Components/Input";
import CurrencyFormater from "@/lib/CurrencyFormater";
import Button from "@/Components/Button";
import { Link } from "@inertiajs/inertia-react";
import { useEffect } from "react";
import { Inertia } from "@inertiajs/inertia";

export default function Cart({
  auth,
  cart,
  cartCount,
  discount,
  priceTotal,
  subtotal,
  tax,
  token,
  weight,
  total,
}) {
  const data = Object.entries(cart).map(([key, value]) => value);

  useEffect(() => {
    //change this to the script source you want to load, for example this is snap.js sandbox env
    const midtransScriptUrl = import.meta.env.VITE_MIDTRANS_SCRIPT_URL;
    //change this according to your client-key
    const MidtransClientKey = import.meta.env.VITE_MIDTRANS_CLIENT_KEY;

    let scriptTag = document.createElement("script");
    scriptTag.src = midtransScriptUrl;
    // optional if you want to set script attribute
    // for example snap.js have data-client-key attribute
    scriptTag.setAttribute("data-client-key", MidtransClientKey);

    document.body.appendChild(scriptTag);
    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);

  const handleCheckout = () => {
    Inertia.get(
      route("cart.checkout"),
      {},
      {
        preserveScroll: true,
        preserveState: true,
        onSuccess: (page) => {
          window.snap.pay(page.props.token, {
            onSuccess: function (result) {
              console.log(result);
            },
          });
        },
      }
    );
  };

  return (
    <AuthenticatedLayout
      auth={auth}
      cartCount={cartCount}
      header={
        <div className="flex justify-between items-center">
          <div className="flex space-x-4 items-center">
            <h1 className="text-2xl font-bold">Cart</h1>
            <ShoppingCartIcon className="h-6 w-6" />
          </div>
        </div>
      }
    >
      <Head title="Cart" />
      <div className="max-w-7xl mx-auto px-8 my-10">
        <div className="grid grid-cols-3 grid-flow-row-dense gap-x-8">
          <div className="col-span-2">
            {data.map((item) => (
              <div key={item.id} className="py-10 border-y">
                <div className="flex space-x-8 justify-between">
                  <div className="rounded-lg">
                    <img
                      src={item.options.design}
                      className="rounded-lg bg-contain w-60 h-60"
                      alt={item.name}
                    />
                  </div>
                  <div className="grow">
                    <div className="space-y-4">
                      <h3 className="text-lg font-bold">{item.name}</h3>
                      <div className="grid grid-cols-3 gap-2">
                        {item.options.variants.map((variant, index) => (
                          <div key={index}>{variant.value}</div>
                        ))}
                      </div>
                      <div>{item.weight + "/kg"}</div>
                      <div>
                        <span className="font-bold">
                          {CurrencyFormater(item.price)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="w-24">
                    <Input
                      type="number"
                      label={"Quantity"}
                      value={item.qty}
                      onChange={(e) => console.log(e.target.value)}
                      className={"input-bordered input-sm"}
                    />
                  </div>
                  <div className="w-24">
                    <Link
                      href={route("cart.destroy", { rowId: item.rowId })}
                      method="delete"
                      className="btn btn-circle btn-ghost"
                      as="button"
                    >
                      <TrashIcon className="h-6 w-6 text-error" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="h-fit rounded-lg bg-base-200">
            <div className="p-8 space-y-4">
              <h2 className="text-xl font-bold">Order Summary</h2>
              <div className="space-y-4">
                <div className="flex justify-between border-b border-base-content pb-4">
                  <div>Price</div>
                  <span>{CurrencyFormater(priceTotal)}</span>
                </div>
                <div className="flex justify-between border-b border-base-content pb-4">
                  <div>Subtotal</div>
                  <span>{CurrencyFormater(subtotal)}</span>
                </div>
                <div className="flex justify-between border-b border-base-content pb-4">
                  <div>Weight</div>
                  <span>{CurrencyFormater(weight)}</span>
                </div>
                <div className="flex justify-between border-b border-base-content pb-4">
                  <div>Tax</div>
                  <span>{CurrencyFormater(tax)}</span>
                </div>
                <div className="flex justify-between border-b border-base-content pb-4">
                  <div>Order Total</div>
                  <span>{CurrencyFormater(total)}</span>
                </div>
              </div>
              <div>
                <button
                  className="btn btn-primary btn-block gap-2"
                  onClick={handleCheckout}
                >
                  Checkout
                  <BanknotesIcon className="h-6 w-6" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
