import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  route("home", "layouts/HomeLayout.tsx", [
    index("routes/home.tsx"),
    route("posts/:id", "routes/post.tsx"),
  ]),
  route("login", "routes/login.tsx"),
  route("backend", "layouts/BackendLayout.tsx", [
    index("routes/backend/backend.tsx"),
    route("posts", "routes/backend/posts.tsx"),
  ]),
] satisfies RouteConfig;
