import {
  PolymorphicButton,
  PolymorphicText,
} from "@/components/PolymorphicComponent";
import { graphql } from "@/lib/gql";
import { request } from "graphql-request";
import { shopClient } from "@/lib/utils";
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

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
  const data = await request({
    url: shopClient.getStorefrontApiUrl(),
    document: query,
    requestHeaders: shopClient.getPublicTokenHeaders(),
  });

  return json({
    data,
  });
}) satisfies LoaderFunction;

export default function Home() {
  const { data } = useLoaderData<typeof loader>();
  // const { session } = useOutletContext<ContextType>();
  return (
    <div className="mt-8 max-w-sm mx-auto font-bold text-lg">
      <PolymorphicText as="div" color="indigo" className="text-4xl">
        Storefront Kit TailwindUI Demo
      </PolymorphicText>
      <div className="flex flex-col w-32 mx-auto gap-4 mt-8">
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    </div>
  );
}
