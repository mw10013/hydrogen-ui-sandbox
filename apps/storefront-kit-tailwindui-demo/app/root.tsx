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
    { title: "Remix Template" },
    { name: "description", content: "Template for remix and tailwind." },
  ];
};

export default function App() {
  // const context: ContextType = {};

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
      <body>
        <ShopifyProvider
          shopifyConfig={{
            storeDomain: `https://hydrogen-preview.myshopify.com`,
            storefrontToken: "3b580e70970c4528da70c98e097c2fa0",
            storefrontApiVersion: "2023-01",
            locale: "EN-US",
          }}
        >
          <CartProvider>
            <div className="min-h-full">
              {/* <Outlet context={context} /> */}
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
