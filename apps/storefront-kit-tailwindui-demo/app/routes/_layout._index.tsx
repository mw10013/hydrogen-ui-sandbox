import { graphql } from "@/lib/gql";
import { request } from "graphql-request";
import { shopClient } from "@/lib/utils";
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

const query = graphql(`
  query Home {
    shop {
      name
    }
    products(first: 1) {
      nodes {
        # if you uncomment 'blah', it should have a GraphQL validation error in your IDE if you have a GraphQL plugin. It should also give an error during 'npm run dev'
        # blah
        id
        title
        publishedAt
        handle
        variants(first: 1) {
          nodes {
            id
            image {
              url
              altText
              width
              height
            }
          }
        }
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
  });

  return json({
    data_,
  });
}) satisfies LoaderFunction;

export default function Home() {
  // https://github.com/remix-run/remix/issues/5211
  const { data_ } = useLoaderData<typeof loader>();
  return (
    <div>
      <p>Index</p>
      <pre>{JSON.stringify(data_, null, 2)}</pre>
    </div>
  );
}
