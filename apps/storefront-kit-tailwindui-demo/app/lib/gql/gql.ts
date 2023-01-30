/* eslint-disable */
import * as types from './graphql';
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel-plugin for production.
 */
const documents = {
    "\n    fragment ImageFragment on Image {\n        url\n        altText \n    }\n": types.ImageFragmentFragmentDoc,
    "\n  fragment MediaFragment on Media {\n    __typename\n    mediaContentType\n    alt\n    previewImage {\n      url\n    }\n    ... on MediaImage {\n      id\n      image {\n        url\n        width\n        height\n      }\n    }\n    ... on Video {\n      id\n      sources {\n        mimeType\n        url\n      }\n    }\n    ... on Model3d {\n      id\n      sources {\n        mimeType\n        url\n      }\n    }\n    ... on ExternalVideo {\n      id\n      embedUrl\n      host\n    }\n  }\n": types.MediaFragmentFragmentDoc,
    "\n  fragment ProductCardFragment on Product {\n    id\n    title\n    publishedAt\n    handle\n    variants(first: 1) {\n      nodes {\n        id\n        image {\n          url\n          altText\n          width\n          height\n        }\n        priceV2 {\n          amount\n          currencyCode\n        }\n        compareAtPriceV2 {\n          amount\n          currencyCode\n        }\n      }\n    }\n  }\n": types.ProductCardFragmentFragmentDoc,
    "\n  query Home {\n    shop {\n      name\n    }\n    products(first: 1) {\n      nodes {\n        # if you uncomment 'blah', it should have a GraphQL validation error in your IDE if you have a GraphQL plugin. It should also give an error during 'npm run dev'\n        # blah\n        id\n        title\n        publishedAt\n        handle\n        variants(first: 1) {\n          nodes {\n            id\n            image {\n              url\n              altText\n              width\n              height\n            }\n          }\n        }\n      }\n    }\n  }\n": types.HomeDocument,
    "\n  query Products($first: Int!, $after: String) {\n    products(first: $first, after: $after) {\n      nodes {\n        handle\n        title\n        priceRange {\n          maxVariantPrice {\n            amount\n            currencyCode\n          }\n          minVariantPrice {\n            amount\n            currencyCode\n          }\n        }\n        featuredImage {\n          url(transform: null)\n          altText\n        }\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n  }\n": types.ProductsDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    fragment ImageFragment on Image {\n        url\n        altText \n    }\n"): (typeof documents)["\n    fragment ImageFragment on Image {\n        url\n        altText \n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment MediaFragment on Media {\n    __typename\n    mediaContentType\n    alt\n    previewImage {\n      url\n    }\n    ... on MediaImage {\n      id\n      image {\n        url\n        width\n        height\n      }\n    }\n    ... on Video {\n      id\n      sources {\n        mimeType\n        url\n      }\n    }\n    ... on Model3d {\n      id\n      sources {\n        mimeType\n        url\n      }\n    }\n    ... on ExternalVideo {\n      id\n      embedUrl\n      host\n    }\n  }\n"): (typeof documents)["\n  fragment MediaFragment on Media {\n    __typename\n    mediaContentType\n    alt\n    previewImage {\n      url\n    }\n    ... on MediaImage {\n      id\n      image {\n        url\n        width\n        height\n      }\n    }\n    ... on Video {\n      id\n      sources {\n        mimeType\n        url\n      }\n    }\n    ... on Model3d {\n      id\n      sources {\n        mimeType\n        url\n      }\n    }\n    ... on ExternalVideo {\n      id\n      embedUrl\n      host\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment ProductCardFragment on Product {\n    id\n    title\n    publishedAt\n    handle\n    variants(first: 1) {\n      nodes {\n        id\n        image {\n          url\n          altText\n          width\n          height\n        }\n        priceV2 {\n          amount\n          currencyCode\n        }\n        compareAtPriceV2 {\n          amount\n          currencyCode\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  fragment ProductCardFragment on Product {\n    id\n    title\n    publishedAt\n    handle\n    variants(first: 1) {\n      nodes {\n        id\n        image {\n          url\n          altText\n          width\n          height\n        }\n        priceV2 {\n          amount\n          currencyCode\n        }\n        compareAtPriceV2 {\n          amount\n          currencyCode\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Home {\n    shop {\n      name\n    }\n    products(first: 1) {\n      nodes {\n        # if you uncomment 'blah', it should have a GraphQL validation error in your IDE if you have a GraphQL plugin. It should also give an error during 'npm run dev'\n        # blah\n        id\n        title\n        publishedAt\n        handle\n        variants(first: 1) {\n          nodes {\n            id\n            image {\n              url\n              altText\n              width\n              height\n            }\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query Home {\n    shop {\n      name\n    }\n    products(first: 1) {\n      nodes {\n        # if you uncomment 'blah', it should have a GraphQL validation error in your IDE if you have a GraphQL plugin. It should also give an error during 'npm run dev'\n        # blah\n        id\n        title\n        publishedAt\n        handle\n        variants(first: 1) {\n          nodes {\n            id\n            image {\n              url\n              altText\n              width\n              height\n            }\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Products($first: Int!, $after: String) {\n    products(first: $first, after: $after) {\n      nodes {\n        handle\n        title\n        priceRange {\n          maxVariantPrice {\n            amount\n            currencyCode\n          }\n          minVariantPrice {\n            amount\n            currencyCode\n          }\n        }\n        featuredImage {\n          url(transform: null)\n          altText\n        }\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n  }\n"): (typeof documents)["\n  query Products($first: Int!, $after: String) {\n    products(first: $first, after: $after) {\n      nodes {\n        handle\n        title\n        priceRange {\n          maxVariantPrice {\n            amount\n            currencyCode\n          }\n          minVariantPrice {\n            amount\n            currencyCode\n          }\n        }\n        featuredImage {\n          url(transform: null)\n          altText\n        }\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;