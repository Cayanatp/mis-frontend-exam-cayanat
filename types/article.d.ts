interface article {
  id: number;
  title: string;
  content: string;
  hit: number;
  pin: boolean;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  img: Img;
}

interface Img {
  url: string;
}

interface articleList {
  totalItems: number;
  rows: article[];
  totalPages: number;
  currentPage: number;
}
