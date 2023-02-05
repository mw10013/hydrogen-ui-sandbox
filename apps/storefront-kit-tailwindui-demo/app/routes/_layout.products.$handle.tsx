import { Container } from "@/components/Container";
import { RadioGroupSmallCards } from "@/components/RadioGroupSmallCards";
import { graphql } from "@/lib/gql";
import { shopClient } from "@/lib/utils";
import { RadioGroup } from "@headlessui/react";
import type { LoaderFunction, SerializeFrom } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import {
  AddToCartButton,
  Money,
  ProductProvider,
  useProduct,
} from "@shopify/storefront-kit-react";
import clsx from "clsx";
import request from "graphql-request";
import invariant from "tiny-invariant";
import { SelectMenuSimpleCustom } from "@/components/SelectMenuSimpleCustom";

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
          currencyCode
        }
        compareAtPriceV2 {
          amount
          currencyCode
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
      {/* <p className="text-xl font-medium text-gray-900">Price</p> */}
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

function ProductForm() {
  const { options, selectedOptions, setSelectedOption, selectedVariant } =
    useProduct();
  invariant(options, "Missing options");

  const isOutOfStock = !selectedVariant?.availableForSale || false;
  const isOnSale =
    selectedVariant?.priceV2?.amount &&
    selectedVariant?.compareAtPriceV2?.amount
      ? selectedVariant?.priceV2?.amount <
        selectedVariant?.compareAtPriceV2?.amount
      : false;

  return (
    <form>
      <div className="">
        {options.map((item) => {
          if (!item || !item.name || !item.values || item.values.length == 1) {
            return null;
          }
          const value = selectedOptions ? selectedOptions[item.name] : "";
          const onChange = (v: string) => setSelectedOption(item.name || "", v);
          return (
            <div key={item.name} className="mt-8">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-medium text-gray-900">
                  {item.name}
                </h2>
              </div>
              {item.values.length < 7 ? (
                <RadioGroupSmallCards
                  value={value}
                  className="mt-2"
                  srLabel={`Choose ${item.name}`}
                  onChange={onChange}
                >
                  {/* <div className="grid grid-cols-3 gap-3 sm:grid-cols-6"> */}
                  <div className="flex flex-wrap gap-3">
                    {item.values
                      .filter((v): v is string => typeof v === "string")
                      .map((v) => (
                        <RadioGroupSmallCards.Option
                          key={v}
                          value={v}
                          //   disabled={!size.inStock}
                        >
                          <RadioGroup.Label as="span">{v}</RadioGroup.Label>
                        </RadioGroupSmallCards.Option>
                      ))}
                  </div>
                </RadioGroupSmallCards>
              ) : (
                <SelectMenuSimpleCustom
                  value={value}
                  displayValue={value}
                  onChange={onChange}
                >
                  {item.values
                    .filter((v): v is string => typeof v === "string")
                    .map((v) => (
                      <SelectMenuSimpleCustom.Option key={v} value={v}>
                        {v}
                      </SelectMenuSimpleCustom.Option>
                    ))}
                </SelectMenuSimpleCustom>
              )}
            </div>
          );
        })}
        <AddToCartButton
          className="mt-8 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          variantId={selectedVariant?.id}
          quantity={1}
          accessibleAddingToCartLabel="Adding item to your cart"
          disabled={isOutOfStock}
          type="button"
        >
          {/* <Button
            width="full"
            variant={isOutOfStock ? "secondary" : "primary"}
            as="span"
          > */}
          {isOutOfStock ? (
            <span>Sold out</span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              <span>Add to bag</span> <span>·</span>{" "}
              <Money
                withoutTrailingZeros
                data={selectedVariant.priceV2!}
                as="span"
              />
              {isOnSale && (
                <Money
                  withoutTrailingZeros
                  data={selectedVariant.compareAtPriceV2!}
                  as="span"
                  className="opacity-50 line-through"
                />
              )}
            </span>
          )}
        </AddToCartButton>
      </div>
    </form>
  );
}

export default function ProductRouteComponent() {
  const { data_ } = useLoaderData<typeof loader>();
  return (
    <ProductProvider data={data_.product}>
      <Container className="mt-8">
        <div className="lg:grid lg:auto-rows-min lg:grid-cols-12 lg:gap-x-8">
          <div className="lg:col-span-5 lg:col-start-8">
            <ProductTitle product={data_.product} />
          </div>
          <div className="mt-8 lg:col-span-7 lg:col-start-1 lg:row-span-3 lg:row-start-1 lg:mt-0">
            <ProductGallery product={data_.product} />
          </div>
          <div className="mt-8 lg:col-span-5">
            <ProductForm />
          </div>
        </div>
        {/* <div>
          <pre>{JSON.stringify(data_, null, 2)}</pre>
        </div> */}
      </Container>
    </ProductProvider>
  );
}
