import * as oracledb from 'oracledb';
import { boundMethod } from 'autobind-decorator';
import { inject, injectable } from 'tsyringe';
import { Cache, AbstractRepository } from '@tksolution/tks-datasource-api-core';
import { RegisteredCache, RegisteredOracleDb } from '~/src/tokens';
import { DeletePosts, InsertPosts, SelectPosts, UpdatePosts } from '~/src/controllers/Posts/types';

import { returnReponsePost, returnReponsePostData } from './PostsRepository';

@injectable()
export class DLPostsRepository extends AbstractRepository implements DLPostsRepository {
    constructor(@inject(RegisteredOracleDb) oracleDb: typeof oracledb, @inject(RegisteredCache) cache: Cache) {
        super(oracleDb, cache);
        this.repositoryDomain = 'posts';
    }

    repositoryDomain: string;

    @boundMethod
    async getPosts(aGetPosts: SelectPosts): Promise<returnReponsePostData> {

        let getposts: any;
        let lsPostsReturn: returnReponsePostData;

        let query = ` SELECT DS_MENSAGEM
                        FROM  POSTS_DEL`;
        if (aGetPosts.in_todos === 'N'){
            query = query + `WHERE   DT_CANC IS NULL `
        }
        else{
            query = query + `WHERE   1 = 1 `
        }  

        const binds = { id_servico: aGetPosts.id_pessoa,
                        dt_post: aGetPosts.dt_post };
        aGetPosts.id_pessoa ? query = query + `AND ID_PESSOA = :id_pessoa ` : null;                
        aGetPosts.dt_post ? query = query + `AND TRUNC(DT_POST) = TRUNC(:dt_post) ` : null; 
        
        getposts = await this.execute<PostsQueryResult>(
            query,
            binds,
            {},
            {
                ttlInSecs: 3600,
                cacheEmptyQueryResult: false,
            },
        );

        if (getposts.length === 0) {
            lsPostsReturn = {
                status: "Error: Nenhum post a ser retornado pelos parâmetros passados!",
                data: []
            }
        }
        else {
            lsPostsReturn = {
                status: "OK",
                data: getposts
            }
        }
        return lsPostsReturn;
    }


    @boundMethod
    async postPosts(aInsertPosts: InsertPosts): Promise<returnReponsePost> {

        let postposts: any;
        let lsPostsReturn: returnReponsePost;

        const query = ` INSERT INTO POSTS_DEL
                        (ID_POST, DT_POST, DS_MENSAGEM)
                        VALUES
                        (:id_POST, :dt_post, :ds_mensagem)`;

        const binds = {
            id_servico: aInsertPosts.id_pessoa,
            dt_posts: aInsertPosts.dt_post,
            ds_mensagem: aInsertPosts.ds_mensagem
        };

        postposts = await this.execute<PostsQueryResult>(
            query,
            binds,
            {},
            {
                ttlInSecs: 3600,
                cacheEmptyQueryResult: false,
            },
        );

        if (postposts.length === 0) {
            lsPostsReturn = {
                status: "Error: Nenhum post incluido com os parâmetros passados!",
                data: []
            }
        }
        else {
            lsPostsReturn = {
                status: "OK",
                data: postposts
            }
        }
        return lsPostsReturn;
    };

    @boundMethod
    async putPosts(aUpdatePosts: UpdatePosts): Promise<returnReponsePost> {

        let putposts: any;
        let lsPostsReturn: returnReponsePost;

        const query = ` UPDATE POSTS_DEL
                        SET   DS_MENSAGEM = :ds_mensagem 
                        WHERE ID_PESSOA = :id_pessoa
                        AND   DT_POST   = :dt_post `;

        const binds = {
            id_pessoa: aUpdatePosts.id_pessoa,
            dt_post: aUpdatePosts.dt_post,
            ds_mensagem: aUpdatePosts.dt_mensagem
        };

        putposts = await this.execute<PostsQueryResult>(
            query,
            binds,
            {},
            {
                ttlInSecs: 3600,
                cacheEmptyQueryResult: false,
            },
        );

        if (putposts.length === 0) {
            lsPostsReturn = {
                status: "Error: Nenhum post a ser alterado com os parâmetros passados!",
                data: []
            }
        }
        else {
            lsPostsReturn = {
                status: "OK",
                data: putposts
            }
        }
        return lsPostsReturn;
    };

@boundMethod
async deletePosts(aDeletePosts: DeletePosts): Promise<returnReponsePost> {

    let deleteposts: any;
    let lsPostsReturn: returnReponsePost;

    const query = ` UPDATE POSTS_DEL
                    SET   DT_CANC = TRUNC(SYSDATE)
                    WHERE ID_PESSOA = :id_pessoa
                    AND   DT_POST   = :dt_post `;

    const binds = {
        id_pessoa: aDeletePosts.id_pessoa,
        dt_post: aDeletePosts.dt_post
    };

    deleteposts = await this.execute<PostsQueryResult>(
        query,
        binds,
        {},
        {
            ttlInSecs: 3600,
            cacheEmptyQueryResult: false,
        },
    );

    if (deleteposts.length === 0) {
        lsPostsReturn = {
            status: "Error: Nenhum post a ser excluído com os parâmetros passados!",
            data: []
        }
    }
    else {
        lsPostsReturn = {
            status: "OK",
            data: deleteposts
        }
    }
    return lsPostsReturn;
};
}

export interface PostsQueryResult {
    ID_PESSOA: string,
    DS_POST: Date,
    DS_MENSAGEM: string
}
