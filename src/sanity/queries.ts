export const POSTS_QUERY = `*[_type == "post"]{
  _id,
  title,
  slug
}`;