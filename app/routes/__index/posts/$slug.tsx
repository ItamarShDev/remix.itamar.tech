import { json, LinksFunction, useLoaderData } from "remix";
import type { LoaderFunction } from "remix";
import invariant from "tiny-invariant";
import { getPost } from "~/post";
import styles from "~/styles/post.css";
export const links: LinksFunction = () => {
    return [{ rel: "stylesheet", href: styles }];
};
export const loader: LoaderFunction = async ({ params }) => {
    invariant(params.slug, "expected params.slug");
    return json(await getPost(params.slug));
};

export default function PostSlug() {
    const post = useLoaderData();
    return <main dangerouslySetInnerHTML={{ __html: post.html }} />;
}
