import client from '@/src/lib/sanityClient';
import { POSTS_QUERY } from '@/src/sanity/queries';

interface Post {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
}

export default async function HomePage() {
  try {
    console.log('Environment Variables:', {
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET
    });

    const posts = await client.fetch(POSTS_QUERY);
    console.log('Sanity API Response:', {
      query: POSTS_QUERY,
      response: posts
    });
    
    return (
      <main>
       
          <ul>
            {posts.map((post: Post) => (
              <li key={post._id}>
                <h2>{post.title}</h2>
              </li>
            ))}
          </ul>
      </main>
    );
  } catch (error) {
    console.error('Error fetching posts:', error);
    return (
      <div>
        <p>Error loading posts. Check the console for details.</p>
        <pre>{error instanceof Error ? error.message : 'Unknown error'}</pre>
      </div>
    );
  }
}