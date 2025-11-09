type PostAuthor = {
  id: string;
  fullname: string;
};

type Post = {
  id: string;
  title: string;
  body: string;
  author: PostAuthor;
  createdAt: Date;
  imageUrl?: string;
};
