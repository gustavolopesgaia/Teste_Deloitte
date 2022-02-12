import { DeletePosts, InsertPosts, SelectPosts, UpdatePosts } from "~/src/controllers/Posts/types";
  
export interface PostsRepository {
      postPosts(insertPosts : InsertPosts): Promise<returnReponsePost>;
      putPosts(updatePosts : UpdatePosts): Promise<returnReponsePost>;
      getPosts(getPosts: SelectPosts): Promise<returnReponsePostData>;
      deletePosts(deletePosts: DeletePosts): Promise<returnReponsePostData>;
}

export interface returnReponsePostData {
    status: string;
    data: Array<PostsGet>;
  }
  
export interface PostsGet {
    id_pessoa: number,
    dt_post: Date,
    ds_mensagem: string
  }

export interface returnReponsePost {
    status: string;
    data: Array<PostsAll>;
  }
  
  export interface PostsAll {
    id_pessoa: number,
    dt_post: Date,
    ds_mensagem: string
  }  
