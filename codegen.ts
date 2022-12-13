import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "http://localhost:4000",
  documents: "graphql/**/*.gql",
  generates: {
    "graphql/generated/index.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-query",
      ],
    },
  },
  config: {
    fetcher:{
      func: '../fetcher#fetcher'
    },
  },
};

export default config;
