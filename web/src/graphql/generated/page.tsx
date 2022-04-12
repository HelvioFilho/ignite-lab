import * as Types from './graphql';

import * as Operations from './graphql';
import { NextPage } from 'next';
import { NextRouter, useRouter } from 'next/router'
import { QueryHookOptions, useQuery } from '@apollo/client';
import * as Apollo from '@apollo/client';
import type React from 'react';
import { getApolloClient, ApolloClientContext } from '../../lib/withApollo';

export async function getServerPageMe
  (options: Omit<Apollo.QueryOptions<Types.GetProductsQueryVariables>, 'query'>, ctx: ApolloClientContext) {
  const apolloClient = getApolloClient(ctx);

  const data = await apolloClient.query<Types.GetProductsQueryVariables>({ ...options, query: Operations.GetProductsDocument });

  const apolloState = apolloClient.cache.extract();

  return {
    props: {
      apolloState: apolloState,
      data: data?.data,
      error: data?.error ?? data?.errors ?? null,
    },
  };
}
export const useMe = (
  optionsFunc?: (router: NextRouter) => QueryHookOptions<Types.GetProductsQuery, Types.GetProductsQuery>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.GetProductsDocument, options);
};
export type PageMeComp = React.FC<{ data?: Types.GetProductsQuery, error?: Apollo.ApolloError }>;
export const withPageMe = (optionsFunc?: (router: NextRouter) => QueryHookOptions<Types.GetProductsQuery, Types.GetProductsQuery>) => (WrappedComponent: PageMeComp): NextPage => (props) => {
  const router = useRouter()
  const options = optionsFunc ? optionsFunc(router) : {};
  const { data, error } = useQuery(Operations.GetProductsDocument, options)
  return <WrappedComponent {...props} data={data} error={error} />;

};
export const ssrMe = {
  getServerPage: getServerPageMe,
  withPage: withPageMe,
  usePage: useMe,
}