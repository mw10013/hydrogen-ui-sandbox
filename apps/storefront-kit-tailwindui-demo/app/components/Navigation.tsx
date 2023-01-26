import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/outline";
import { Logo } from "@/components/Logo";
import { Popover, Transition } from "@headlessui/react";
import clsx from "clsx";
import { Fragment } from "react";

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
  return (
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
            <a href="/">
              <span className="sr-only">Your Company</span>
              <Logo className="h-8 w-auto" />
            </a>
          </div>

          <div className="hidden lg:ml-8 lg:block lg:self-stretch">
            <div className="flex h-full space-x-8">
              {navigation.pages.map((page) => (
                <a
                  key={page.name}
                  href={page.href}
                  className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                >
                  {page.name}
                </a>
              ))}
            </div>
          </div>

          <div className="ml-auto flex items-center">
            <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
              <a
                href="#"
                className="text-sm font-medium text-gray-700 hover:text-gray-800"
              >
                Sign in
              </a>
              <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
              <a
                href="#"
                className="text-sm font-medium text-gray-700 hover:text-gray-800"
              >
                Create account
              </a>
            </div>

            <div className="hidden lg:ml-8 lg:flex">
              <a
                href="#"
                className="flex items-center text-gray-700 hover:text-gray-800"
              >
                <img
                  src="https://tailwindui.com/img/flags/flag-canada.svg"
                  alt=""
                  className="block h-auto w-5 flex-shrink-0"
                />
                <span className="ml-3 block text-sm font-medium">CAD</span>
                <span className="sr-only">, change currency</span>
              </a>
            </div>

            {/* Search */}
            <div className="flex lg:ml-6">
              <a href="#" className="p-2 text-gray-400 hover:text-gray-500">
                <span className="sr-only">Search</span>
                <MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true" />
              </a>
            </div>

            {/* Cart */}
            <div className="ml-4 flow-root lg:ml-6">
              <a href="#" className="group -m-2 flex items-center p-2">
                <ShoppingBagIcon
                  className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                  aria-hidden="true"
                />
                <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                  0
                </span>
                <span className="sr-only">items in cart, view bag</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
