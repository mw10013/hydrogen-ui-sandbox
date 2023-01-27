import { Container } from "@/components/Container";
import { graphql } from "@/lib/gql";
import { shopClient } from "@/lib/utils";
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import request from "graphql-request";

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
      first: 6,
      after: null,
    },
  });

  return json({
    data_,
  });
}) satisfies LoaderFunction;

export default function Products() {
  // https://github.com/remix-run/remix/issues/5211
  const { data_ } = useLoaderData<typeof loader>();

  return (
    <Container className="py-8">
      <h2 className="text-2xl font-bold tracking-tight text-gray-900">
        Products
      </h2>
      <pre>{JSON.stringify(data_, null, 2)}</pre>
    </Container>
  );
}
