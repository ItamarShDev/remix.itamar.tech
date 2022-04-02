import { marked } from "marked";
import type { LoaderFunction } from "remix";
import { json, LinksFunction, useLoaderData } from "remix";
import invariant from "tiny-invariant";
import type { Post } from "~/models/post.server";
import { getPost } from "~/models/post.server";
import styles from "~/styles/post.css";
type LoaderData = {
  post: Post;
  html: string;
};
export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: styles }];
};
export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.slug, "expected params.slug");
  const post = await getPost(params.slug);
  invariant(post, "expected post to exist");
  const html = marked(post.markdown);
  return json<LoaderData>({ post, html });
};

export default function PostSlug() {
  const { post, html } = useLoaderData();
  return (
    <div>
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
