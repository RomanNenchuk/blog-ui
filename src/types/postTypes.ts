type PostAuthor = {
  id: string;
  name: string;
};

type Post = {
  id: number;
  title: string;
  body: string;
  author: PostAuthor;
  imageUrl?: string;
};
