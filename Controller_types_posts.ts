import { BasePathSchema } from '@tksolution/tks-datasource-api-core';

export interface InsertPosts extends BasePathSchema {
    id_pessoa: string;
    dt_post: string;
    ds_mensagem: string;
}

export interface UpdatePosts extends BasePathSchema {
    id_pessoa: string;
    dt_post: string;
    ds_mensagem: string;
}

export interface SelectPosts extends BasePathSchema {
    id_pessoa: string;
    dt_post: string;
    in_todos: string;
}

export interface ErrorResponse {
  code: string;
  message: string;
}

export interface SucessResponse {
  status: string;
}

export interface DeletePosts extends BasePathSchema {
    id_pessoa: string;
    dt_posts: string;
}
