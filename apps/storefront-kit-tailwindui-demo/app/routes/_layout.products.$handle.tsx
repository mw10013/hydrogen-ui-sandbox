import { Container } from "@/components/Container";
import { graphql } from "@/lib/gql";
import { shopClient } from "@/lib/utils";
import type { LoaderFunction, SerializeFrom } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import clsx from "clsx";
import request from "graphql-request";
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
      options {
        name
        values
      }
      variants(first: 100) {
        nodes {
          id
          priceV2 {
            amount
          }
          selectedOptions {
            name
            value
          }
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
    data_: { product: data_.product },
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

export default function Product() {
  const { data_ } = useLoaderData<typeof loader>();
  return (
    <Container className="mt-8">
      <div className="lg:grid lg:auto-rows-min lg:grid-cols-12 lg:gap-x-8">
        <div className="lg:col-span-5 lg:col-start-8">
          <ProductTitle product={data_.product} />
        </div>
        <div className="mt-8 lg:col-span-7 lg:col-start-1 lg:row-span-3 lg:row-start-1 lg:mt-0">
          <ProductGallery product={data_.product} />
        </div>
      </div>
      <div>
        <pre>{JSON.stringify(data_, null, 2)}</pre>
      </div>
    </Container>
  );
}
