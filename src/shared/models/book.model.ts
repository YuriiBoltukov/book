
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