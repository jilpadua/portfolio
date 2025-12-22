import { groq } from 'next-sanity';

export const HOME_PAGE_QUERY = groq`
  *[_type == "page" && title == "Home"][0]{
    title,
    sections[]{
      _type,
      ...,
      backgroundImage{
        asset->{
          _id,
          url
        }
      }
    }
  }
`;