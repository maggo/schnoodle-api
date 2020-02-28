import { KVNamespace } from "@cloudflare/workers-types";

declare global {
  const SCHNOODLE_GRAPHQL_CACHE: KVNamespace;
}
