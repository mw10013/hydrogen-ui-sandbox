import { graphql } from "@/lib/gql";
import { shopClient } from "@/lib/utils";
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import request from "graphql-request";
import invariant from "tiny-invariant";

const query = graphql(`
  query Product($handle: String!) {
    product(handle: $handle) {
      handle
      title
      description
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
  return json({
    data_,
  });
}) satisfies LoaderFunction;

export default function Product() {
  const { data_ } = useLoaderData<typeof loader>();
  return (
    <div>
      <pre>{JSON.stringify(data_, null, 2)}</pre>
    </div>
  );
}
