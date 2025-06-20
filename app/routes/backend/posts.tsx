import { Post, type PostItem } from "~/views/post/post";
import type { Route } from "./+types/backend";
import { PostMange } from "~/views/backend/post/post";
import type { FC } from "react";

export async function clientLoader ({params }: Route.ClientLoaderArgs) {
  const res = await fetch(`http://localhost:3001/posts`)
  const post: PostItem = await res.json()
  return post
}
export default function PostRoute({ loaderData }: Route.ComponentProps): FC {
  if (!loaderData || typeof loaderData !== 'object') return null; // or render a fallback/loading/error component
  return <PostMange data={loaderData}/>;
}
