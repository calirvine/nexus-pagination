/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type ActionInterface = {
  milestoneId: Scalars['String'];
};

export type ButtonAction = ActionInterface & {
  __typename?: 'ButtonAction';
  milestoneId: Scalars['String'];
  text: Scalars['String'];
  url: Scalars['String'];
};

export type CtaOnboardingGuideCard = GuideInterface & {
  __typename?: 'CtaOnboardingGuideCard';
  action: ButtonAction;
  complete: Scalars['Boolean'];
  description: Scalars['String'];
  id: Scalars['ID'];
  title: Scalars['String'];
};

export type Guide = {
  __typename?: 'Guide';
  addProductTask?: Maybe<GuideInterface>;
  getAppTask?: Maybe<GuideInterface>;
  lookAtAPokemonTask?: Maybe<GuideInterface>;
  name: Scalars['String'];
};

export type GuideInterface = {
  action: ActionInterface;
  complete: Scalars['Boolean'];
  description: Scalars['String'];
  id: Scalars['ID'];
  title: Scalars['String'];
};

export type QrCodeAction = ActionInterface & {
  __typename?: 'QRCodeAction';
  dataUrl: Scalars['String'];
  milestoneId: Scalars['String'];
};

export type QrCodeOnboardingGuideCard = GuideInterface & {
  __typename?: 'QrCodeOnboardingGuideCard';
  action: QrCodeAction;
  complete: Scalars['Boolean'];
  description: Scalars['String'];
  id: Scalars['ID'];
  title: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  fastField: Scalars['String'];
  guide: Guide;
  slowField: Scalars['String'];
};

export type SlowOnboardingGuideCard = GuideInterface & {
  __typename?: 'SlowOnboardingGuideCard';
  action: ButtonAction;
  complete: Scalars['Boolean'];
  description: Scalars['String'];
  id: Scalars['ID'];
  imageUrl: Scalars['String'];
  title: Scalars['String'];
};

export type PageQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type PageQueryQuery = { __typename?: 'Query', guide: (
    { __typename?: 'Guide' }
    & { ' $fragmentRefs'?: { 'GuideFragment': GuideFragment } }
  ) };

export type CtaCardFragment = { __typename?: 'CtaOnboardingGuideCard', id: string, title: string, description: string, complete: boolean, action: { __typename?: 'ButtonAction', text: string, url: string } } & { ' $fragmentName'?: 'CtaCardFragment' };

export type GuideFragment = { __typename: 'Guide', name: string, addProductTask?: (
    { __typename?: 'CtaOnboardingGuideCard' }
    & { ' $fragmentRefs'?: { 'CtaCardFragment': CtaCardFragment } }
  ) | (
    { __typename?: 'QrCodeOnboardingGuideCard' }
    & { ' $fragmentRefs'?: { 'QrCodeCardFragment': QrCodeCardFragment } }
  ) | (
    { __typename?: 'SlowOnboardingGuideCard' }
    & { ' $fragmentRefs'?: { 'PokemonCardFragment': PokemonCardFragment } }
  ) | null, getAppTask?: (
    { __typename?: 'CtaOnboardingGuideCard' }
    & { ' $fragmentRefs'?: { 'CtaCardFragment': CtaCardFragment } }
  ) | (
    { __typename?: 'QrCodeOnboardingGuideCard' }
    & { ' $fragmentRefs'?: { 'QrCodeCardFragment': QrCodeCardFragment } }
  ) | (
    { __typename?: 'SlowOnboardingGuideCard' }
    & { ' $fragmentRefs'?: { 'PokemonCardFragment': PokemonCardFragment } }
  ) | null, lookAtAPokemonTask?: (
    { __typename?: 'CtaOnboardingGuideCard' }
    & { ' $fragmentRefs'?: { 'CtaCardFragment': CtaCardFragment } }
  ) | (
    { __typename?: 'QrCodeOnboardingGuideCard' }
    & { ' $fragmentRefs'?: { 'QrCodeCardFragment': QrCodeCardFragment } }
  ) | (
    { __typename?: 'SlowOnboardingGuideCard' }
    & { ' $fragmentRefs'?: { 'PokemonCardFragment': PokemonCardFragment } }
  ) | null } & { ' $fragmentName'?: 'GuideFragment' };

export type PokemonCardFragment = { __typename?: 'SlowOnboardingGuideCard', id: string, title: string, description: string, complete: boolean, imageUrl: string, action: { __typename?: 'ButtonAction', text: string, url: string } } & { ' $fragmentName'?: 'PokemonCardFragment' };

export type QrCodeCardFragment = { __typename?: 'QrCodeOnboardingGuideCard', id: string, title: string, description: string, complete: boolean, action: { __typename?: 'QRCodeAction', dataUrl: string } } & { ' $fragmentName'?: 'QrCodeCardFragment' };

export const CtaCardFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CtaCard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CtaOnboardingGuideCard"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"complete"}},{"kind":"Field","name":{"kind":"Name","value":"action"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]} as unknown as DocumentNode<CtaCardFragment, unknown>;
export const QrCodeCardFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"QrCodeCard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"QrCodeOnboardingGuideCard"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"complete"}},{"kind":"Field","name":{"kind":"Name","value":"action"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dataUrl"}}]}}]}}]} as unknown as DocumentNode<QrCodeCardFragment, unknown>;
export const PokemonCardFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PokemonCard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SlowOnboardingGuideCard"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"complete"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"action"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]} as unknown as DocumentNode<PokemonCardFragment, unknown>;
export const GuideFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Guide"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Guide"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"addProductTask"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CtaCard"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"QrCodeCard"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PokemonCard"}}]}},{"kind":"Field","name":{"kind":"Name","value":"getAppTask"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CtaCard"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"QrCodeCard"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PokemonCard"}}]}},{"kind":"Field","name":{"kind":"Name","value":"lookAtAPokemonTask"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CtaCard"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"QrCodeCard"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PokemonCard"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CtaCard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CtaOnboardingGuideCard"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"complete"}},{"kind":"Field","name":{"kind":"Name","value":"action"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"QrCodeCard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"QrCodeOnboardingGuideCard"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"complete"}},{"kind":"Field","name":{"kind":"Name","value":"action"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dataUrl"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PokemonCard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SlowOnboardingGuideCard"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"complete"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"action"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]} as unknown as DocumentNode<GuideFragment, unknown>;
export const PageQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PageQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"guide"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Guide"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CtaCard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CtaOnboardingGuideCard"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"complete"}},{"kind":"Field","name":{"kind":"Name","value":"action"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"QrCodeCard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"QrCodeOnboardingGuideCard"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"complete"}},{"kind":"Field","name":{"kind":"Name","value":"action"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dataUrl"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PokemonCard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SlowOnboardingGuideCard"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"complete"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"action"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Guide"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Guide"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"addProductTask"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CtaCard"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"QrCodeCard"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PokemonCard"}}]}},{"kind":"Field","name":{"kind":"Name","value":"getAppTask"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CtaCard"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"QrCodeCard"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PokemonCard"}}]}},{"kind":"Field","name":{"kind":"Name","value":"lookAtAPokemonTask"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CtaCard"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"QrCodeCard"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PokemonCard"}}]}}]}}]} as unknown as DocumentNode<PageQueryQuery, PageQueryQueryVariables>;