import type { Route } from "./+types/home";
import { Home as _Home, type Post } from "../views/home/home";



export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export async function clientLoader ({}: Route.ClientLoaderArgs) {
  const res = await fetch('http://localhost:3001/posts')
  const posts: Post[] = await res.json()
  return posts
}

export default function Home({ loaderData }: Route.ComponentProps) {
  return <_Home data={loaderData} />;
}
