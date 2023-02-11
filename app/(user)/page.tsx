import "../globals.css";
import { previewData } from "next/headers";
import { groq } from "next-sanity";
import { client } from "@/lib/sanity.client";
import PreviewSuspense from "../../components/PreviewSuspense";
import { PreviewBlogList } from "@/components/PreviewBlogList";
import BlogList from "@/components/BlogList";

const query = groq`
  *[_type=='post'] {
    ...,
    author->,
    categories[]->
  } | order(_createdAt desc)
`;

export default async function Home() {
  if (previewData()) {
    return (
      <PreviewSuspense
        fallback={
          <div role="status">
            <p className="text-center text-lg animate-pulse text-orange-300">
              Loading Preview Data...
            </p>
          </div>
        }
      >
        <main className="bg-black h-screen flex text-center">
          <h1 className="text-white m-auto text-4xl">Preview Mode</h1>
          <PreviewBlogList query={query} />
        </main>
      </PreviewSuspense>
    );
  }

  const posts = await client.fetch(query);

  return (
    <main className="bg-black h-screen flex text-center">
      <h1 className="text-white m-auto text-4xl">Not in Preview Mode</h1>

      <BlogList posts={posts} />
    </main>
  );
}
