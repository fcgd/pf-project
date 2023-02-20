import { client } from "@/lib/sanity.client";
import { groq } from "next-sanity";

type Props = {
  params: {
    slug: string;
  };
};

async function Post({ params: { slug } }: Props) {
  const query = groq`
  *[_type=='post && slug.current == $slug'][0]
  {
    ...,
    author->,
    categories[]->
  }
  `;

  const post: Post = await client.fetch(query, { slug });

  return <div>Post: {slug}</div>;
}

export default Post;
