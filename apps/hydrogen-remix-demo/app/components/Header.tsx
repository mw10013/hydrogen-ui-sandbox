import { Navigation, navigation } from "@/components/Navigation";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "@remix-run/react";
import {
  CartLinePrice,
  CartLineProvider,
  Money,
  ShopPayButton,
  useCart,
  useCartLine,
} from "@shopify/hydrogen-react";
import React, { Fragment, useMemo } from "react";
import type { CartLine as TCartLine } from "@shopify/hydrogen-react/storefront-api-types";
import invariant from "tiny-invariant";
import { CartLineQuantityAdjustButton } from "@/components/CartLineQuantityAdjustButton";
import { optional } from "zod";

export function CartShopPayButton(
  props: Omit<React.ComponentProps<typeof ShopPayButton>, "variantIds">
) {
  const { lines } = useCart();
  invariant(lines, "Missing lines");
  const idsAndQuantities = useMemo(() => {
    return lines.map((line) => {
      invariant(
        line && line.merchandise && line.merchandise.id && line.quantity,
        "Invalid line"
      );
      return {
        id: line?.merchandise?.id,
        quantity: line?.quantity,
      };
    });
  }, [lines]);
  return React.createElement(ShopPayButton, {
    variantIdsAndQuantities: idsAndQuantities,
    ...props,
  });
}

function CartLineQuantityAdjust() {
  const line = useCartLine();
  return (
    <div className="flex items-center border rounded ">
      <CartLineQuantityAdjustButton
        adjust="decrease"
        aria-label="Decrease quantity"
        className="w-10 h-10 transition text-gray-500 hover:text-gray-900 disabled:cursor-wait"
      >
        &#8722;
      </CartLineQuantityAdjustButton>
      {/* <CartLineQuantity as="div" className="px-2 text-center" /> */}
      <p className="text-gray-500 text-center">{line.quantity}</p>
      <CartLineQuantityAdjustButton
        adjust="increase"
        aria-label="Increase quantity"
        className="w-10 h-10 transition hover:text-gray-900 disabled:cursor-wait text-gray-500"
      >
        &#43;
      </CartLineQuantityAdjustButton>
    </div>
  );
}

function CartLine() {
  const line = useCartLine();
  const { linesRemove } = useCart();

  return (
    <li className="flex py-6">
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
        <img
          src={line.merchandise.image?.url}
          alt={line.merchandise.image?.altText ?? ""}
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div className="ml-4 flex flex-1 flex-col">
        <div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <h3>
              <Link to={`/products/${line.merchandise.product.handle}`}>
                {line.merchandise.product.title}
              </Link>
            </h3>
            <p className="ml-4">
              <CartLinePrice data={line!} />
            </p>
          </div>
        </div>
        {(line.merchandise.selectedOptions || []).map((option) => (
          <p key={line.id} className="mt-1 text-sm text-gray-500">
            {option.name}: {option.value}
          </p>
        ))}

        <div className="flex flex-1 items-end justify-between text-sm mt-1">
          <CartLineQuantityAdjust />

          <div className="flex">
            <button
              type="button"
              className="font-medium text-indigo-600 hover:text-indigo-500"
              onClick={() => linesRemove([line.id])}
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}

function Cart({
  open,
  setOpen,
  title,
  children,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  title: React.ReactNode;
  children: React.ReactNode;
}) {
  const { cost, checkoutUrl } = useCart();
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-40" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-gray-900">
                          {title}
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                            onClick={() => setOpen(false)}
                          >
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      <div className="mt-8">
                        <div className="flow-root">
                          <ul className="-my-6 divide-y divide-gray-200">
                            {children}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Subtotal</p>
                        <p>
                          {cost?.subtotalAmount?.amount ? (
                            <Money data={cost?.subtotalAmount} />
                          ) : (
                            "-"
                          )}
                        </p>
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500">
                        Shipping and taxes calculated at checkout.
                      </p>
                      <div className="mt-6">
                        <a
                          href={checkoutUrl!}
                          className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                        >
                          Checkout
                        </a>
                      </div>
                      <CartShopPayButton className="mt-4" />
                      <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                        <p>
                          or{" "}
                          <button
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                            onClick={() => setOpen(false)}
                          >
                            Continue Shopping
                            <span aria-hidden="true"> &rarr;</span>
                          </button>
                        </p>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

function MobileMenu({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 z-40 flex">
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
              <div className="flex px-4 pt-5 pb-2">
                <button
                  type="button"
                  className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                  onClick={() => setOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              <div className="space-y-6 border-t border-gray-200 py-6 px-4">
                {navigation.pages.map((page) => (
                  <div key={page.name} className="flow-root">
                    <a
                      href={page.href}
                      className="-m-2 block p-2 font-medium text-gray-900"
                    >
                      {page.name}
                    </a>
                  </div>
                ))}
              </div>

              <div className="space-y-6 border-t border-gray-200 py-6 px-4">
                <div className="flow-root">
                  <a
                    href="/signin"
                    className="-m-2 block p-2 font-medium text-gray-900"
                  >
                    Sign in
                  </a>
                </div>
                <div className="flow-root">
                  <a
                    href="/signup"
                    className="-m-2 block p-2 font-medium text-gray-900"
                  >
                    Create account
                  </a>
                </div>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export function Header() {
  const [cartOpen, setCartOpen] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const { lines } = useCart();
  return (
    <>
      <Cart title="Shopping cart" open={cartOpen} setOpen={setCartOpen}>
        {lines?.map((line) => (
          <CartLineProvider key={line?.id} line={line as TCartLine}>
            <CartLine />
          </CartLineProvider>
        ))}
      </Cart>
      <MobileMenu open={mobileMenuOpen} setOpen={setMobileMenuOpen} />
      <header className="relative overflow-hidden">
        <Navigation
          setCartOpen={setCartOpen}
          setMobileMenuOpen={setMobileMenuOpen}
        />
      </header>
    </>
  );
}
