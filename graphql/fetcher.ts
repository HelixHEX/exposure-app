import { getToken } from "../utils/helpers";

export const fetcher = <TData, TVariables>(
  query: string,
  variables?: TVariables
) => {
  return async (): Promise<TData> => {
    const res = await fetch("https://api.exposure.eliaswambugu.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `${await getToken()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query, variables }),
    });

    const json = await res.json();

    if (json.errors) {
      const { message } = json.errors[0];

      throw new Error(message);
    }

    return json.data;
  };
};
