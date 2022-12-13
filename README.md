# Exposure
This is a social media app built using React Native and a GraphQL API. The app allows users to connect with friends, share updates and photos, and engage with others.
Requirements

- [Node.js](https://nodejs.org/en/)
- [yarn](https://yarnpkg.com/)
- [React Native](https://reactnative.dev/)
- [Expo](https://docs.expo.dev/)

# Getting Started

Install the required dependencies by running

```bash
yarn install
```

Start the app by running 
```bash
expo start
```

Features
- View user profiles
- Post photos
- Like and comment on posts

API Reference

The app connects to a GraphQL API [(*repo*)](https://github.com/HelixHEX/exposure-server) for performing operations such as querying and mutating data. As of now the endpoint is hardcoded to the public api hosted on AWS. If you would like to change the endpoint, you can do so in this [*file*](./graphql/fetcher.ts)

Here are some examples of the types of operations that can be performed using the API:

[*Full list of queries and mutations*](./graphql/schema.gql)

## Querying data

```graphql
query Comments($postId: Int!) {
  comments(post_id: $postId) {
    id
    comment
    createdAt
    profile {
      id
      username
    }
  }
}
```

This query gets all comments for a particular post.

## Mutating data

```graphql
mutation CreateComment($comment: String!, $postId: Int!) {
  createComment(comment: $comment, post_id: $postId) {
    comment {
      comment
    }
  }
}
```

This mutation creates a new comment for a particular post.