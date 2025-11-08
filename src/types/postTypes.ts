type PostAuthor = {
  id: string;
  fullname: string;
};

type Post = {
  id: number;
  title: string;
  body: string;
  author: PostAuthor;
  imageUrl?: string;
};
