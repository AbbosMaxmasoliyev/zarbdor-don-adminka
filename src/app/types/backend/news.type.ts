export interface INews {
  _id:string,
  image: string | File,
  slug: string,
  category: string,
  createdAt: Date,
  contents: {
    [key: string]: {
      title: string,
      description: string,
      content: string
    }
  }
}
