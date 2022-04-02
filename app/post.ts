import path from "path";
import fs from "fs/promises";
import parseFrontMatter from "front-matter";
import invariant from "tiny-invariant";
import { marked } from "marked";
import { json } from "remix";
export type PostMarkdownAttributes = {
  title: string;
};
export type Post = {
  title: string;
  slug: string;
  markdown: string;
};
type NewPost = {
  title: string;
  slug: string;
  markdown: string;
};
const postsPath = path.join(__dirname, "..", "posts", "en");
function isValidPostAttributes(
  attributes: any
): attributes is PostMarkdownAttributes {
  return attributes?.title;
}

export async function getPosts() {
  const dir = await fs.readdir(postsPath);
  return Promise.all(
    dir.map(async (filename) => {
      const file = await fs.readFile(path.join(postsPath, filename));
      const { attributes } = parseFrontMatter(file.toString());
      invariant(
        isValidPostAttributes(attributes),
        `${filename} has bad meta data!`
      );
      return {
        slug: filename.replace(/\.mdx$/, ""),
        title: attributes.title,
        markdown: file.toString(),
      };
    })
  );
}
