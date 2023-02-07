// https://tailwindui.com/components/ecommerce/components/product-lists
// With tall images and CTA link

/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
*/
const products = [
  {
    id: 1,
    name: "Black Basic Tee",
    price: "$32",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/home-page-03-favorite-01.jpg",
    imageAlt: "Model wearing women's black cotton crewneck tee.",
  },
  {
    id: 2,
    name: "Black Basic Tee",
    price: "$32",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/home-page-03-favorite-02.jpg",
    imageAlt: "Model wearing women's black cotton crewneck tee.",
  },
  {
    id: 3,
    name: "Black Basic Tee",
    price: "$36",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/home-page-03-favorite-03.jpg",
    imageAlt: "Model wearing women's black cotton crewneck tee.",
  },
];

export function ContentHeader() {
  return (
    <div className="sm:flex sm:items-baseline sm:justify-between">
      <h2 className="text-2xl font-bold tracking-tight text-gray-900">
        Our Favorites
      </h2>
      <a
        href="#"
        className="hidden text-sm font-semibold text-indigo-600 hover:text-indigo-500 sm:block"
      >
        Browse all favorites
        <span aria-hidden="true"> &rarr;</span>
      </a>
    </div>
  );
}

export function Products() {
  return (
    <div className="mt-6 grid grid-cols-1 gap-y-10 sm:grid-cols-3 sm:gap-y-0 sm:gap-x-6 lg:gap-x-8">
      {products.map((product) => (
        <div key={product.id} className="group relative">
          <div className="h-96 w-full overflow-hidden rounded-lg group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-3 sm:h-auto">
            <img
              src={product.imageSrc}
              alt={product.imageAlt}
              className="h-full w-full object-cover object-center"
            />
          </div>
          <h3 className="mt-4 text-base font-semibold text-gray-900">
            <a href={product.href}>
              <span className="absolute inset-0" />
              {product.name}
            </a>
          </h3>
          <p className="mt-1 text-sm text-gray-500">{product.price}</p>
        </div>
      ))}
    </div>
  );
}

export function ContentFooter() {
  return (
    <div className="mt-6 sm:hidden">
      <a
        href="#"
        className="block text-sm font-semibold text-indigo-600 hover:text-indigo-500"
      >
        Browse all favorites
        <span aria-hidden="true"> &rarr;</span>
      </a>
    </div>
  );
}

export default function Example() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <ContentHeader />
        <Products />
        <ContentFooter />
      </div>
    </div>
  );
}
