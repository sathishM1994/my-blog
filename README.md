# Blog App

Full-stack blog app for the Full Stack Developer assignment — React frontend, Node/GraphQL backend, MongoDB for storage. You can see all posts on the homepage and add new ones with a simple form.

**Stack:** React (Vite) on the frontend, Node.js + Express + Apollo Server on the backend, GraphQL as the API layer, MongoDB/Mongoose for storage.



## How it's put together

The backend is just Express with Apollo Server mounted on `/graphql`. One `Post` model in Mongoose (title, content, author, timestamps). The schema has two queries — `posts` for the full list (newest first) and `post(id)` for a single one — plus `addPost` and `deletePost` mutations. Nothing fancy, no auth, since that wasn't part of the requirements.

On the frontend I went with Vite instead of Create React App — CRA is basically unmaintained at this point and Vite is faster to work with. `PostForm` fires the `addPost` mutation and refetches the post list so the page updates without a manual refresh. `PostList` just runs the `posts` query and maps over the results into `PostItem` cards. Styling is plain CSS (no Tailwind/Sass, wanted to keep dependencies light) with a two-column layout that stacks into one column under 800px.

Everything goes through GraphQL — didn't add any REST routes on top.

## Running it locally

You'll need Node 18+ and a MongoDB instance running somewhere (local install or a free Atlas cluster both work fine).

**Backend first:**

```bash
cd backend
npm install
cp .env.example .env
# edit MONGODB_URI in .env if you're not running Mongo on localhost:27017
npm run dev
```

Should be up on `http://localhost:4000/graphql`.

**Then the frontend, in another terminal:**

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

Opens on `http://localhost:3000`. Make sure the backend's already running or the page will just show a loading/error state.

### Env vars

Backend `.env`:
- `PORT` — defaults to 4000
- `MONGODB_URI` — defaults to `mongodb://127.0.0.1:27017/blog-app`

Frontend `.env`:
- `VITE_GRAPHQL_URI` — defaults to `http://localhost:4000/graphql`

## Trying the API directly

The endpoint is `POST /graphql`. Example queries if you want to poke at it with Postman/Apollo Sandbox instead of the UI:

```graphql
query {
  posts {
    id
    title
    content
    author
    createdAt
  }
}
```

```graphql
mutation {
  addPost(input: { title: "Hello World", content: "My first post!", author: "Jane" }) {
    id
    title
    createdAt
  }
}
```

## Building for production

```bash
cd frontend
npm run build
```

Output goes to `frontend/dist` — serve it with any static host and point `VITE_GRAPHQL_URI` at wherever the backend ends up deployed.

## A few notes

- CORS is wide open on the backend right now since this is just a local/demo setup — would lock that down for anything real.
- The `id` field coming back from GraphQL is just Mongo's `_id` cast to a string.
- Kept validation minimal (empty title/content gets rejected) since the assignment didn't call for more.
