type InfoContent = {
  id: string;
  title: string;
  content: React.ReactNode;
  author: ContentAuthor;
};

type ContentAuthor = {
  name: string;
  // email is used to link to the user profile (only applied to the user exists in the database)
  email?: string;
  classOf: string;
};

export type { InfoContent, ContentAuthor };
