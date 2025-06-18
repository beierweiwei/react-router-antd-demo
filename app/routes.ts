import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    // index("layouts/HomeLayout.tsx"), 
    route("home", "layouts/HomeLayout.tsx", [
        index("routes/home.tsx")
    ]),
    route("login", "routes/login.tsx"),
    route("backend", "routes/backend.tsx"),
    route("posts/:id", "routes/post.tsx")
] satisfies RouteConfig;
