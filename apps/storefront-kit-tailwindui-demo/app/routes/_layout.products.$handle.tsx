import { Container } from "@/components/Container";
import { RadioGroupSmallCards } from "@/components/elements/RadioGroupSmallCards";
import { ProductOptions } from "@/components/product/ProductOptions";
import { graphql } from "@/lib/gql";
import { shopClient } from "@/lib/utils";
import { RadioGroup } from "@headlessui/react";
import type { LoaderFunction, SerializeFrom } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { ProductProvider, useProduct } from "@shopify/storefront-kit-react";
import clsx from "clsx";
import request from "graphql-request";
import { useCallback } from "react";
import invariant from "tiny-invariant";

type ProductType = SerializeFrom<typeof loader>["data_"]["product"];

const query = graphql(`
  query Product($handle: String!) {
    product(handle: $handle) {
      handle
      title
      description
      images(first: 3) {
        nodes {
          id
          url(transform: null)
          altText
        }
      }
      ...productProviderDataFragment
      #   variants(first: 100) {
      #     nodes {
      #       id
      #       priceV2 {
      #         amount
      #       }
      #     }
      #   }
    }
  }

  fragment productProviderDataFragment on Product {
    variants(first: 100) {
      nodes {
        id
        availableForSale
        priceV2 {
          amount
        }
        compareAtPriceV2 {
          amount
        }
        selectedOptions {
          name
          value
        }
      }
    }
  }
`);

export const loader = (async ({ params }) => {
  invariant(params.handle, "Missing product handle");
  const data_ = await request({
    url: shopClient.getStorefrontApiUrl(),
    document: query,
    requestHeaders: shopClient.getPublicTokenHeaders(),
    variables: {
      handle: params.handle,
    },
  });
  if (!data_.product) {
    throw new Error(`Invalid product handle: ${params.handle}`);
  }
  return json({
    data_: { ...data_, product: data_.product },
  });
}) satisfies LoaderFunction;

function ProductTitle({ product }: { product: ProductType }) {
  return (
    <div className="flex justify-between">
      <h1 className="text-xl font-medium text-gray-900">{product.title}</h1>
      <p className="text-xl font-medium text-gray-900">Price</p>
    </div>
  );
}

function ProductGallery({ product }: { product: ProductType }) {
  const { data_ } = useLoaderData<typeof loader>();
  return (
    <>
      <h2 className="sr-only">Images</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-3 lg:gap-8">
        {data_.product.images.nodes.map((image, index) => (
          <img
            key={image.id}
            src={image.url}
            alt={image.altText ?? ""}
            className={clsx(
              index === 0 ? "lg:col-span-2 lg:row-span-2" : "hidden lg:block",
              "rounded-lg"
            )}
          />
        ))}
      </div>
    </>
  );
}

function RadiGroupOptionSmallCard({
  value,
  disabled,
  children,
}: Parameters<typeof RadioGroup.Option>[0]) {
  return (
    <RadioGroup.Option
      value={value}
      className={({ active, checked }) =>
        clsx(
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
      {children}
      {/* <RadioGroup.Label as="span">{name}</RadioGroup.Label> */}
    </RadioGroup.Option>
  );
}

function ProductComponent() {
  const { data_ } = useLoaderData<typeof loader>();
  const { options, selectedOptions, setSelectedOption, selectedVariant } =
    useProduct();
  invariant(options, "Missing options");

  const handleChange = useCallback(
    (name: string, value: string) => {
      console.log({ name, value });
      setSelectedOption(name, value);
    },
    [setSelectedOption]
  );

  return (
    <div>
      <form className="grid gap-10">
        <div className="grid gap-4">
          {options.map((item) => {
            if (
              !item ||
              !item.name ||
              !item.values ||
              item.values.length == 1
            ) {
              return null;
            }
            return (
              <div
                key={item.name}
                className="flex flex-col flex-wrap mb-4 gap-y-2 last:mb-0"
              >
                <legend>{item.name}</legend>
                <div className="flex flex-wrap items-baseline gap-4">
                  <RadioGroupSmallCards
                    label={`Choose ${item.name}`}
                    value={selectedOptions ? selectedOptions[item.name] : ""}
                    onChange={(v: string) =>
                      setSelectedOption(item.name || "", v)
                    }
                  >
                    {item.values
                      .filter((v): v is string => typeof v === "string")
                      .map((v) => (
                        <RadioGroupSmallCards.Option
                          key={v}
                          name={v}
                          value={v}
                          //   disabled={!size.inStock}
                        />
                      ))}
                  </RadioGroupSmallCards>
                </div>
              </div>
            );
          })}
        </div>
        <div className="grid gap-4">
          {options.map((item) => {
            if (
              !item ||
              !item.name ||
              !item.values ||
              item.values.length == 1
            ) {
              return null;
            }
            return (
              <div
                key={item.name}
                className="flex flex-col flex-wrap mb-4 gap-y-2 last:mb-0"
              >
                <legend>{item.name}</legend>
                <div className="flex flex-wrap items-baseline gap-4">
                  <ProductOptions
                    name={item.name}
                    handleChange={handleChange}
                    values={item.values.filter(
                      (item): item is string => typeof item === "string"
                    )}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </form>
      <pre>{JSON.stringify({ selectedOptions }, null, 2)}</pre>
      <pre>{JSON.stringify(data_, null, 2)}</pre>
    </div>
  );
}

export default function ProductRouteComponent() {
  const { data_ } = useLoaderData<typeof loader>();
  return (
    <ProductProvider data={data_.product}>
      <Container className="mt-8">
        <ProductComponent />
        {/* <div className="lg:grid lg:auto-rows-min lg:grid-cols-12 lg:gap-x-8">
          <div className="lg:col-span-5 lg:col-start-8">
            <ProductTitle product={data_.product} />
          </div>
          <div className="mt-8 lg:col-span-7 lg:col-start-1 lg:row-span-3 lg:row-start-1 lg:mt-0">
            <ProductGallery product={data_.product} />
          </div>
        </div> */}
        {/* <div>
          <pre>{JSON.stringify(data_, null, 2)}</pre>
        </div> */}
      </Container>
    </ProductProvider>
  );
}
