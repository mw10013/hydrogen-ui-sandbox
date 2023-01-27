import { Container } from "@/components/Container";
import { graphql } from "@/lib/gql";
import { ProductsQuery } from "@/lib/gql/graphql";
import { shopClient } from "@/lib/utils";
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import request from "graphql-request";

const FIRST = 6;

const query = graphql(`
  query Products($first: Int!, $after: String) {
    products(first: $first, after: $after) {
      nodes {
        handle
        title
        featuredImage {
          url(transform: null)
          altText
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`);

export const loader = (async () => {
  // https://github.com/remix-run/remix/issues/5211
  const data_ = await request({
    url: shopClient.getStorefrontApiUrl(),
    document: query,
    requestHeaders: shopClient.getPublicTokenHeaders(),
    variables: {
      first: FIRST,
      after: null,
    },
  });

  return json({
    data_,
  });
}) satisfies LoaderFunction;

type T = ProductsQuery;

function ProductGrid() {
  // https://github.com/remix-run/remix/issues/5211
  const { data_ } = useLoaderData<typeof loader>();

  return (
    <div className="mt-6 grid grid-cols-1 gap-y-10 sm:grid-cols-3 sm:gap-y-0 sm:gap-x-6 lg:gap-x-8">
      {data_.products.nodes.map((product) => (
        <div key={product.handle} className="group relative">
          <div className="h-96 w-full overflow-hidden rounded-lg group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-3 sm:h-auto">
            <img
              src={product.featuredImage?.url}
              alt={product.featuredImage?.altText ?? ""}
              className="h-full w-full object-cover object-center"
            />
          </div>
          <h3 className="mt-4 text-base font-semibold text-gray-900">
            <Link to={`/products/${product.handle}`}>
              <span className="absolute inset-0" />
              {product.title}
            </Link>
          </h3>
          {/* <p className="mt-1 text-sm text-gray-500">{product.price}</p> */}
        </div>
      ))}
    </div>
  );
}

export default function Products() {
  // https://github.com/remix-run/remix/issues/5211
  // const { data_ } = useLoaderData<typeof loader>();

  return (
    <Container className="py-8">
      <h2 className="text-2xl font-bold tracking-tight text-gray-900">
        Products
      </h2>
      <ProductGrid />
      {/* <pre>{JSON.stringify(data_, null, 2)}</pre> */}
    </Container>
  );
}
