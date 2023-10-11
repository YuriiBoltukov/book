
/** book item */
export interface Book {
  kind: string;
  id: string;
  volumeInfo: BookVolume;
}

/** Self volume of book  */
export interface BookVolume  {
  title: string;
  subtitle: string;
  authors: string[];
  description: string;
  categories: string[];
  imageLinks: {
    smallThumbnail: string;
    thumbnail: string;
  }
}

export interface CommonQuery {
  searchStr: string;
  filters: {
    category: string;
  };
  sort: string;
}

export interface Pagination {
  from: number;
  limit: number;
  total: number | null;
}