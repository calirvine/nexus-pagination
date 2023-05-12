/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  \n  query PageQuery {\n    guide {\n      ...Guide\n    }\n  }\n": types.PageQueryDocument,
    "\n  fragment CtaCard on CtaOnboardingGuideCard {\n    id\n    title\n    description\n    complete\n    action {\n      text\n      url\n    }\n  }\n": types.CtaCardFragmentDoc,
    "\n  \n  \n  \n  fragment Guide on Guide {\n    __typename\n    name\n    addProductTask {\n      ...CtaCard\n      ...QrCodeCard\n      ...PokemonCard\n    }\n    getAppTask {\n      ...CtaCard\n      ...QrCodeCard\n      ...PokemonCard\n    }\n    lookAtAPokemonTask {\n      ...CtaCard\n      ...QrCodeCard\n      ...PokemonCard\n    }\n  }\n": types.GuideFragmentDoc,
    "\n  fragment PokemonCard on SlowOnboardingGuideCard {\n    id\n    title\n    description\n    complete\n    imageUrl\n    action {\n      text\n      url\n    }\n  }\n": types.PokemonCardFragmentDoc,
    "\n  fragment QrCodeCard on QrCodeOnboardingGuideCard {\n    id\n    title\n    description\n    complete\n    action {\n      dataUrl\n    }\n  }\n": types.QrCodeCardFragmentDoc,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  \n  query PageQuery {\n    guide {\n      ...Guide\n    }\n  }\n"): (typeof documents)["\n  \n  query PageQuery {\n    guide {\n      ...Guide\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment CtaCard on CtaOnboardingGuideCard {\n    id\n    title\n    description\n    complete\n    action {\n      text\n      url\n    }\n  }\n"): (typeof documents)["\n  fragment CtaCard on CtaOnboardingGuideCard {\n    id\n    title\n    description\n    complete\n    action {\n      text\n      url\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  \n  \n  \n  fragment Guide on Guide {\n    __typename\n    name\n    addProductTask {\n      ...CtaCard\n      ...QrCodeCard\n      ...PokemonCard\n    }\n    getAppTask {\n      ...CtaCard\n      ...QrCodeCard\n      ...PokemonCard\n    }\n    lookAtAPokemonTask {\n      ...CtaCard\n      ...QrCodeCard\n      ...PokemonCard\n    }\n  }\n"): (typeof documents)["\n  \n  \n  \n  fragment Guide on Guide {\n    __typename\n    name\n    addProductTask {\n      ...CtaCard\n      ...QrCodeCard\n      ...PokemonCard\n    }\n    getAppTask {\n      ...CtaCard\n      ...QrCodeCard\n      ...PokemonCard\n    }\n    lookAtAPokemonTask {\n      ...CtaCard\n      ...QrCodeCard\n      ...PokemonCard\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment PokemonCard on SlowOnboardingGuideCard {\n    id\n    title\n    description\n    complete\n    imageUrl\n    action {\n      text\n      url\n    }\n  }\n"): (typeof documents)["\n  fragment PokemonCard on SlowOnboardingGuideCard {\n    id\n    title\n    description\n    complete\n    imageUrl\n    action {\n      text\n      url\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment QrCodeCard on QrCodeOnboardingGuideCard {\n    id\n    title\n    description\n    complete\n    action {\n      dataUrl\n    }\n  }\n"): (typeof documents)["\n  fragment QrCodeCard on QrCodeOnboardingGuideCard {\n    id\n    title\n    description\n    complete\n    action {\n      dataUrl\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;