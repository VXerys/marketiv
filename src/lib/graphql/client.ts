/**
 * GitHub GraphQL API Client
 *
 * Initialized with a Bearer token for authenticated requests.
 * Used exclusively in Server Components and Server Actions to keep
 * GITHUB_ACCESS_TOKEN secret and off the client bundle.
 *
 * 📱 Mobile Analogy: Like a Retrofit service interface with an
 * OkHttp interceptor that automatically attaches an Authorization
 * header to every request — defined once, used everywhere.
 *
 * Usage:
 *   import { githubClient } from "@/lib/graphql/client";
 *   const data = await githubClient.request(QUERY, variables);
 */

import { GraphQLClient } from "graphql-request";

const GITHUB_GRAPHQL_ENDPOINT = "https://api.github.com/graphql";

export const githubClient = new GraphQLClient(GITHUB_GRAPHQL_ENDPOINT, {
  headers: {
    Authorization: `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
    "Content-Type": "application/json",
    Accept: "application/vnd.github.v4+json",
  },
});
