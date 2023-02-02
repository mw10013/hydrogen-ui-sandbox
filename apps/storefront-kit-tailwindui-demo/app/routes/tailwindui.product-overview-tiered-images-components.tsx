/* eslint-disable jsx-a11y/anchor-is-valid */
/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/typography'),
    ],
  }
  ```
*/
import React, { useState } from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import { RadioGroup } from "@headlessui/react";
import {
  CurrencyDollarIcon,
  GlobeAmericasIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";

const product = {
  name: "Basic Tee",
  price: "$35",
  rating: 3.9,
  reviewCount: 512,
  href: "#",
  breadcrumbs: [
    { id: 1, name: "Women", href: "#" },
    { id: 2, name: "Clothing", href: "#" },
  ],
  images: [
    {
      id: 1,
      imageSrc:
        "https://tailwindui.com/img/ecommerce-images/product-page-01-featured-product-shot.jpg",
      imageAlt: "Back of women's Basic Tee in black.",
      primary: true,
    },
    {
      id: 2,
      imageSrc:
        "https://tailwindui.com/img/ecommerce-images/product-page-01-product-shot-01.jpg",
      imageAlt: "Side profile of women's Basic Tee in black.",
      primary: false,
    },
    {
      id: 3,
      imageSrc:
        "https://tailwindui.com/img/ecommerce-images/product-page-01-product-shot-02.jpg",
      imageAlt: "Front of women's Basic Tee in black.",
      primary: false,
    },
  ],
  colors: [
    { name: "Black", bgColor: "bg-gray-900", selectedColor: "ring-gray-900" },
    {
      name: "Heather Grey",
      bgColor: "bg-gray-400",
      selectedColor: "ring-gray-400",
    },
  ],
  sizes: [
    { name: "XXS", inStock: true },
    { name: "XS", inStock: true },
    { name: "S", inStock: true },
    { name: "M", inStock: true },
    { name: "L", inStock: true },
    { name: "XL", inStock: false },
  ],
  description: `
    <p>The Basic tee is an honest new take on a classic. The tee uses super soft, pre-shrunk cotton for true comfort and a dependable fit. They are hand cut and sewn locally, with a special dye technique that gives each tee it's own look.</p>
    <p>Looking to stock your closet? The Basic tee also comes in a 3-pack or 5-pack at a bundle discount.</p>
  `,
  details: [
    "Only the best materials",
    "Ethically and locally made",
    "Pre-washed and pre-shrunk",
    "Machine wash cold with similar colors",
  ],
};
const policies = [
  {
    name: "International delivery",
    icon: GlobeAmericasIcon,
    description: "Get your order in 2 years",
  },
  {
    name: "Loyalty rewards",
    icon: CurrencyDollarIcon,
    description: "Don't look at other tees",
  },
];

function classNames(...classes: (string | boolean | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white">
      <div className="pt-6 pb-16 sm:pb-24">{children}</div>
    </div>
  );
}

// https://css-tricks.com/best-way-implement-wrapper-css/
export function Wrapper({
  className,
  children,
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={clsx(
        className,
        "mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8"
      )}
    >
      {children}
    </div>
  );
}

export function ProductTitle({ productData }: { productData: typeof product }) {
  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-xl font-medium text-gray-900">{product.name}</h1>
        <p className="text-xl font-medium text-gray-900">{product.price}</p>
      </div>
      <div className="mt-4">
        <h2 className="sr-only">Reviews</h2>
        <div className="flex items-center">
          <p className="text-sm text-gray-700">
            {product.rating}
            <span className="sr-only"> out of 5 stars</span>
          </p>
          <div className="ml-1 flex items-center">
            {[0, 1, 2, 3, 4].map((rating) => (
              <StarIcon
                key={rating}
                className={classNames(
                  product.rating > rating ? "text-yellow-400" : "text-gray-200",
                  "h-5 w-5 flex-shrink-0"
                )}
                aria-hidden="true"
              />
            ))}
          </div>
          <div aria-hidden="true" className="ml-4 text-sm text-gray-300">
            ·
          </div>
          <div className="ml-4 flex">
            <a
              href="#"
              className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
            >
              See all {product.reviewCount} reviews
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export function ProductGallery({
  productData,
}: {
  productData: typeof product;
}) {
  return (
    <>
      <h2 className="sr-only">Images</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-3 lg:gap-8">
        {product.images.map((image) => (
          <img
            key={image.id}
            src={image.imageSrc}
            alt={image.imageAlt}
            className={classNames(
              image.primary ? "lg:col-span-2 lg:row-span-2" : "hidden lg:block",
              "rounded-lg"
            )}
          />
        ))}
      </div>
    </>
  );
}

export function RadioGroupSmallCards({
  label,
  children,
  ...props
}: Parameters<typeof RadioGroup>[0] & {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <RadioGroup {...props}>
      <RadioGroup.Label className="sr-only">{label}</RadioGroup.Label>
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">{children}</div>
    </RadioGroup>
  );
}

RadioGroupSmallCards.Option = function RadioGroupSmallCardsOption({
  name,
  value,
  disabled,
}: Parameters<typeof RadioGroup.Option>[0]) {
  return (
    <RadioGroup.Option
      value={value}
      className={({ active, checked }) =>
        classNames(
          disabled
            ? "opacity-25 cursor-not-allowed"
            : "cursor-pointer focus:outline-none",
          active ? "ring-2 ring-offset-2 ring-indigo-500" : "",
          checked
            ? "bg-indigo-600 border-transparent text-white hover:bg-indigo-700"
            : "bg-white border-gray-200 text-gray-900 hover:bg-gray-50",
          "border rounded-md py-3 px-3 flex items-center justify-center text-sm font-medium uppercase sm:flex-1"
        )
      }
      disabled={disabled}
    >
      <RadioGroup.Label as="span">{name}</RadioGroup.Label>
    </RadioGroup.Option>
  );
};

export function ProductForm({ productData }: { productData: typeof product }) {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[2]);

  return (
    <form>
      {/* Color picker */}
      <div>
        <h2 className="text-sm font-medium text-gray-900">Color</h2>

        <RadioGroup
          value={selectedColor}
          onChange={setSelectedColor}
          className="mt-2"
        >
          <RadioGroup.Label className="sr-only">
            {" "}
            Choose a color{" "}
          </RadioGroup.Label>
          <div className="flex items-center space-x-3">
            {product.colors.map((color) => (
              <RadioGroup.Option
                key={color.name}
                value={color}
                className={({ active, checked }) =>
                  classNames(
                    color.selectedColor,
                    active && checked ? "ring ring-offset-1" : "",
                    !active && checked ? "ring-2" : "",
                    "-m-0.5 relative p-0.5 rounded-full flex items-center justify-center cursor-pointer focus:outline-none"
                  )
                }
              >
                <RadioGroup.Label as="span" className="sr-only">
                  {" "}
                  {color.name}{" "}
                </RadioGroup.Label>
                <span
                  aria-hidden="true"
                  className={classNames(
                    color.bgColor,
                    "h-8 w-8 border border-black border-opacity-10 rounded-full"
                  )}
                />
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      </div>

      {/* Size picker */}
      <div className="mt-8">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-medium text-gray-900">Size</h2>
          <a
            href="#"
            className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
          >
            See sizing chart
          </a>
        </div>

        <RadioGroupSmallCards
          label="Choose a size"
          value={selectedSize}
          onChange={setSelectedSize}
          className="mt-2"
        >
          {product.sizes.map((size) => (
            <RadioGroupSmallCards.Option
              key={size.name}
              name={size.name}
              value={size}
              disabled={!size.inStock}
            />
          ))}
        </RadioGroupSmallCards>
      </div>

      <button
        type="submit"
        className="mt-8 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Add to cart
      </button>
    </form>
  );
}

export default function Example() {
  return (
    <Container>
      <Wrapper>
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center space-x-4">
            {product.breadcrumbs.map((breadcrumb) => (
              <li key={breadcrumb.id}>
                <div className="flex items-center">
                  <a
                    href={breadcrumb.href}
                    className="mr-4 text-sm font-medium text-gray-900"
                  >
                    {breadcrumb.name}
                  </a>
                  <svg
                    viewBox="0 0 6 20"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    className="h-5 w-auto text-gray-300"
                  >
                    <path
                      d="M4.878 4.34H3.551L.27 16.532h1.327l3.281-12.19z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
              </li>
            ))}
            <li className="text-sm">
              <a
                href={product.href}
                aria-current="page"
                className="font-medium text-gray-500 hover:text-gray-600"
              >
                {product.name}
              </a>
            </li>
          </ol>
        </nav>
      </Wrapper>
      <Wrapper className="mt-8">
        <div className="lg:grid lg:auto-rows-min lg:grid-cols-12 lg:gap-x-8">
          <div className="lg:col-span-5 lg:col-start-8">
            <ProductTitle productData={product} />
          </div>
          <div className="mt-8 lg:col-span-7 lg:col-start-1 lg:row-span-3 lg:row-start-1 lg:mt-0">
            <ProductGallery productData={product} />
          </div>

          <div className="mt-8 lg:col-span-5">
            <ProductForm productData={product} />
            <div className="mt-10">
              <h2 className="text-sm font-medium text-gray-900">Description</h2>
              <div
                className="prose prose-sm mt-4 text-gray-500"
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
            </div>
            <div className="mt-8 border-t border-gray-200 pt-8">
              <h2 className="text-sm font-medium text-gray-900">
                Fabric &amp; Care
              </h2>
              <div className="prose prose-sm mt-4 text-gray-500">
                <ul>
                  {product.details.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
            <section aria-labelledby="policies-heading" className="mt-10">
              <h2 id="policies-heading" className="sr-only">
                Our Policies
              </h2>

              <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                {policies.map((policy) => (
                  <div
                    key={policy.name}
                    className="rounded-lg border border-gray-200 bg-gray-50 p-6 text-center"
                  >
                    <dt>
                      <policy.icon
                        className="mx-auto h-6 w-6 flex-shrink-0 text-gray-400"
                        aria-hidden="true"
                      />
                      <span className="mt-4 text-sm font-medium text-gray-900">
                        {policy.name}
                      </span>
                    </dt>
                    <dd className="mt-1 text-sm text-gray-500">
                      {policy.description}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
          </div>
        </div>
      </Wrapper>
    </Container>
  );
}
