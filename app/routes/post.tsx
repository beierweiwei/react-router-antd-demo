import { Post, type PostItem } from "~/views/post/post";
import type { Route } from "./+types/post";

export async function clientLoader ({params }: Route.ClientLoaderArgs) {
  const res = await fetch(`http://localhost:3001/posts/${params.id}`)
  const post: PostItem = await res.json()
  return post
}
export default function PostRoute({ loaderData }: Route.ComponentProps) {
  if (!loaderData || typeof loaderData !== 'object') return null; // or render a fallback/loading/error component
  return <Post {...(loaderData as PostItem)} />;
}
