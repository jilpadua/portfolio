import { client } from '@/src/lib/sanityClient';
import { POSTS_QUERY } from '@/src/sanity/queries';

interface Post {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
}

export default async function HomePage() {
  const posts = await client.fetch(POSTS_QUERY);

  return (
    <main>
      <ul>
        {posts.map((post: Post) => (
          <li key={post._id}>{post.title}</li>
        ))}
      </ul>
    </main>
  );
}