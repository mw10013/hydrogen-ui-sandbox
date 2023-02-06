import {
  Bars3Icon,
  MagnifyingGlassIcon,
  XMarkIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/outline";
import { Logo } from "@/components/Logo";
import { Transition, Dialog } from "@headlessui/react";
import { Link } from "@remix-run/react";
import { useCart } from "@shopify/storefront-kit-react";
import { Fragment, useState } from "react";
import {} from "@heroicons/react/24/outline";

const products = [
  {
    id: 1,
    name: "Throwback Hip Bag",
    href: "#",
    color: "Salmon",
    price: "$90.00",
    quantity: 1,
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg",
    imageAlt:
      "Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.",
  },
  {
    id: 2,
    name: "Medium Stuff Satchel",
    href: "#",
    color: "Blue",
    price: "$32.00",
    quantity: 1,
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg",
    imageAlt:
      "Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.",
  },
  // More products...
];

function ShoppingCart({
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
                        <p>$262.00</p>
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500">
                        Shipping and taxes calculated at checkout.
                      </p>
                      <div className="mt-6">
                        <Link
                          to="#"
                          className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                        >
                          Checkout
                        </Link>
                      </div>
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

export const navigation = {
  categories: [
    // {
    //   id: "women",
    //   name: "Women",
    //   featured: [
    //     {
    //       name: "New Arrivals",
    //       href: "#",
    //       imageSrc:
    //         "https://tailwindui.com/img/ecommerce-images/mega-menu-category-01.jpg",
    //       imageAlt:
    //         "Models sitting back to back, wearing Basic Tee in black and bone.",
    //     },
    //     {
    //       name: "Basic Tees",
    //       href: "#",
    //       imageSrc:
    //         "https://tailwindui.com/img/ecommerce-images/mega-menu-category-02.jpg",
    //       imageAlt:
    //         "Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.",
    //     },
    //   ],
    //   sections: [
    //     {
    //       id: "clothing",
    //       name: "Clothing",
    //       items: [
    //         { name: "Tops", href: "#" },
    //         { name: "Dresses", href: "#" },
    //         { name: "Pants", href: "#" },
    //         { name: "Denim", href: "#" },
    //         { name: "Sweaters", href: "#" },
    //         { name: "T-Shirts", href: "#" },
    //         { name: "Jackets", href: "#" },
    //         { name: "Activewear", href: "#" },
    //         { name: "Browse All", href: "#" },
    //       ],
    //     },
    //     {
    //       id: "accessories",
    //       name: "Accessories",
    //       items: [
    //         { name: "Watches", href: "#" },
    //         { name: "Wallets", href: "#" },
    //         { name: "Bags", href: "#" },
    //         { name: "Sunglasses", href: "#" },
    //         { name: "Hats", href: "#" },
    //         { name: "Belts", href: "#" },
    //       ],
    //     },
    //     {
    //       id: "brands",
    //       name: "Brands",
    //       items: [
    //         { name: "Full Nelson", href: "#" },
    //         { name: "My Way", href: "#" },
    //         { name: "Re-Arranged", href: "#" },
    //         { name: "Counterfeit", href: "#" },
    //         { name: "Significant Other", href: "#" },
    //       ],
    //     },
    //   ],
    // },
    // {
    //   id: "men",
    //   name: "Men",
    //   featured: [
    //     {
    //       name: "New Arrivals",
    //       href: "#",
    //       imageSrc:
    //         "https://tailwindui.com/img/ecommerce-images/product-page-04-detail-product-shot-01.jpg",
    //       imageAlt:
    //         "Drawstring top with elastic loop closure and textured interior padding.",
    //     },
    //     {
    //       name: "Artwork Tees",
    //       href: "#",
    //       imageSrc:
    //         "https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-06.jpg",
    //       imageAlt:
    //         "Three shirts in gray, white, and blue arranged on table with same line drawing of hands and shapes overlapping on front of shirt.",
    //     },
    //   ],
    //   sections: [
    //     {
    //       id: "clothing",
    //       name: "Clothing",
    //       items: [
    //         { name: "Tops", href: "#" },
    //         { name: "Pants", href: "#" },
    //         { name: "Sweaters", href: "#" },
    //         { name: "T-Shirts", href: "#" },
    //         { name: "Jackets", href: "#" },
    //         { name: "Activewear", href: "#" },
    //         { name: "Browse All", href: "#" },
    //       ],
    //     },
    //     {
    //       id: "accessories",
    //       name: "Accessories",
    //       items: [
    //         { name: "Watches", href: "#" },
    //         { name: "Wallets", href: "#" },
    //         { name: "Bags", href: "#" },
    //         { name: "Sunglasses", href: "#" },
    //         { name: "Hats", href: "#" },
    //         { name: "Belts", href: "#" },
    //       ],
    //     },
    //     {
    //       id: "brands",
    //       name: "Brands",
    //       items: [
    //         { name: "Re-Arranged", href: "#" },
    //         { name: "Counterfeit", href: "#" },
    //         { name: "Full Nelson", href: "#" },
    //         { name: "My Way", href: "#" },
    //       ],
    //     },
    //   ],
    // },
  ],
  pages: [
    { name: "Collections", href: "/collections" },
    { name: "Products", href: "/products" },
  ],
};

export function Navigation({ setOpen }: { setOpen: (open: boolean) => void }) {
  const [cartOpen, setCartOpen] = useState(false);
  const { totalQuantity } = useCart();
  return (
    <>
      <ShoppingCart title="Shopping cart" open={cartOpen} setOpen={setCartOpen}>
        {products.map((product) => (
          <li key={product.id} className="flex py-6">
            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
              <img
                src={product.imageSrc}
                alt={product.imageAlt}
                className="h-full w-full object-cover object-center"
              />
            </div>

            <div className="ml-4 flex flex-1 flex-col">
              <div>
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <h3>
                    <a href={product.href}>{product.name}</a>
                  </h3>
                  <p className="ml-4">{product.price}</p>
                </div>
                <p className="mt-1 text-sm text-gray-500">{product.color}</p>
              </div>
              <div className="flex flex-1 items-end justify-between text-sm">
                <p className="text-gray-500">Qty {product.quantity}</p>

                <div className="flex">
                  <button
                    type="button"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ShoppingCart>

      <nav
        aria-label="Top"
        className="relative z-20 bg-white bg-opacity-90 backdrop-blur-xl backdrop-filter"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center">
            <button
              type="button"
              className="rounded-md bg-white p-2 text-gray-400 lg:hidden"
              onClick={() => setOpen(true)}
            >
              <span className="sr-only">Open menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>

            <div className="ml-4 flex lg:ml-0">
              <Link to="/">
                <span className="sr-only">Your Company</span>
                <Logo className="h-8 w-auto" />
              </Link>
            </div>

            <div className="hidden lg:ml-8 lg:block lg:self-stretch">
              <div className="flex h-full space-x-8">
                {navigation.pages.map((page) => (
                  <Link
                    key={page.name}
                    to={page.href}
                    className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                  >
                    {page.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="ml-auto flex items-center">
              <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                <a
                  href="/signin"
                  className="text-sm font-medium text-gray-700 hover:text-gray-800"
                >
                  Sign in
                </a>
                <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                <a
                  href="signup"
                  className="text-sm font-medium text-gray-700 hover:text-gray-800"
                >
                  Create account
                </a>
              </div>

              {/* Search */}
              <div className="flex lg:ml-8">
                <a
                  href="/search"
                  className="p-2 text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">Search</span>
                  <MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true" />
                </a>
              </div>

              {/* Cart */}
              <div className="ml-4 flow-root lg:ml-6">
                <button
                  className="group -m-2 flex items-center p-2"
                  onClick={() => setCartOpen(true)}
                >
                  <ShoppingBagIcon
                    className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                  <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                    {totalQuantity}
                  </span>
                  <span className="sr-only">items in cart, view bag</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
