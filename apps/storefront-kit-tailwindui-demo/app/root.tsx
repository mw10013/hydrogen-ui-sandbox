import type { LinksFunction, V2_MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { CartProvider, ShopifyProvider } from "@shopify/storefront-kit-react";
import tailwindStylesheetUrl from "./styles/tailwind.css";

// export type ContextType = {};

// export const loader = (async () => {
//   return json({
//     data: "data",
//   });
// }) satisfies LoaderFunction;

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: tailwindStylesheetUrl }];
};

export const meta: V2_MetaFunction = () => {
  return [
    { title: "Storefront Kit TailwindUI Demo" },
    {
      name: "description",
      content: "Shopify demo using storefront kit and tailwindui.",
    },
  ];
};

export default function App() {
  // const context: ContextType = {};

  // https://tailwindui.com/components/ecommerce/page-examples/storefront-pages
  // With image tiles and feature sections
  // <body>
  // <div> with min-h-full help register layout correctly.
  // Mimics nextjs: #__next { min-height: 100%; }
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="antialiased font-sans bg-gray-200 overflow-hidden">
        <ShopifyProvider
          shopifyConfig={{
            storeDomain: `https://hydrogen-preview.myshopify.com`,
            storefrontToken: "3b580e70970c4528da70c98e097c2fa0",
            storefrontApiVersion: "2023-01",
            locale: "EN-US",
          }}
        >
          <CartProvider>
            {/* <Outlet /> */}
            <div className="min-h-full">
              <Outlet />
            </div>
          </CartProvider>
        </ShopifyProvider>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
