export interface Post {
  id: string
  title: string
  content: string
  author: string
  isPublished: boolean
  createdAt: Date
  updatedAt: Date
}

export interface CreatePostData {
  title: string
  content: string
  author: string
  isPublished?: boolean
}

export interface UpdatePostData {
  title?: string
  content?: string
  author?: string
  isPublished?: boolean
}
