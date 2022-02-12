/*
 * Esse é o Controller responsavel por cadastrar, alterar, consultar ou cancelar/excluir os posts
 * Criado por gustavo.gaia, 05/02/2022
 * Deixe suas modificações aqui:
 *                               
 */
import { boundMethod } from 'autobind-decorator';
import { inject, injectable } from 'tsyringe';
import { DeletePosts, ErrorResponse, InsertPosts, SelectPosts, UpdatePosts } from './types';
import { RegisteredCache, RegisteredPostsRepository } from '~/src/tokens';
import { BAD_REQUEST_ERROR,
         NOT_FOUND_ERROR,
         POST_POSTS_SAMPLE_RESPONSE_200,
         PUT_POSTS_SAMPLE_RESPONSE_200,
         DELETE_POSTS_SAMPLE_RESPONSE_200,
         GET_POSTS_SAMPLE_RESPONSE_200} from './responses';
import {
  Post,
  Put,
  Get,
  Delete,
  Tags,
  Cache,
  Trace,
  Response,
  Controller,
  Description,
  MethodRequest,
  Accept,
  Parameters} from '@tksolution/tks-datasource-api-core';
import { updatePosts, getPosts, insertPosts, delPosts  } from './parameters';
import { PostsRepository, returnReponsePost, returnReponsePostData } from '~/src/repositories/Posts/PostsRepository';
import {  } from './types';

@injectable()
@Controller('/api/v1/Posts')
@Tags('gc-example')
export class PostsController {
  constructor(
    @inject(RegisteredCache) protected cache: Cache,
    @inject(RegisteredPostsRepository) protected postsRepository: PostsRepository,
  ) {}

  @boundMethod
  @Post('/')
  @Accept('application/json')
  @Description('Insert a post')
  @Parameters({ bodySchema: insertPosts })
  @Response<returnReponsePost>(200, 'Posts found', POST_POSTS_SAMPLE_RESPONSE_200)
  @Response<ErrorResponse>(400, 'Bad request', BAD_REQUEST_ERROR)
  @Response<ErrorResponse>(404, 'Posts not found', NOT_FOUND_ERROR)
  @Trace()
  async postPosts(request: MethodRequest<never, InsertPosts>): Promise<returnReponsePost> {
   const { body: post_Posts } = request;  
   const sReturnInc = await this.postsRepository.postPosts(post_Posts); 
   return sReturnInc;
  }
  
  @boundMethod
  @Put('/')
  @Accept('application/json')
  @Description('Update a post')
  @Parameters({ bodySchema: updatePosts})
  @Response<returnReponsePost>(200, 'Post found', PUT_POSTS_SAMPLE_RESPONSE_200)
  @Response<ErrorResponse>(400, 'Bad request', NOT_FOUND_ERROR)
  @Response<ErrorResponse>(404, 'Post not found', NOT_FOUND_ERROR)
  @Trace()
  async putPosts(request: MethodRequest<never, UpdatePosts>): Promise<returnReponsePost> {
   const { body: put_Posts } = request;  
   const sReturnUpd = await this.postsRepository.putPosts(put_Posts);
   return sReturnUpd;
  }

  @boundMethod
  @Get('/')
  @Description('Get a post')
  @Parameters({ queryStringParametersSchema: getPosts })
  @Response<returnReponsePost>(200, 'Post found', GET_POSTS_SAMPLE_RESPONSE_200)
  @Response<ErrorResponse>(400, 'Bad request', BAD_REQUEST_ERROR)
  @Response<ErrorResponse>(404, 'Post not found', NOT_FOUND_ERROR)
  @Trace()
  async getPostsDel(request: MethodRequest<never, never, SelectPosts>): Promise<returnReponsePostData> {
    const { query: get_PostsDel } = request;
    const sReturnGet = await this.postsRepository.getPosts(get_PostsDel);
    return sReturnGet;
  }

  @boundMethod
  @Delete('/')
  @Accept('application/json')
  @Description('Delete posts')
  @Parameters({ bodySchema: delPosts })
  @Response<returnReponsePost>(200, 'Delete sucess', DELETE_POSTS_SAMPLE_RESPONSE_200)
  @Response<ErrorResponse>(400, 'Bad request', BAD_REQUEST_ERROR)
  @Response<ErrorResponse>(404, 'Delete not found', NOT_FOUND_ERROR)
  @Trace()
  async deletePostsDel(request: MethodRequest<never, DeletePosts>): Promise<returnReponsePostData> {
    const { body: delPosts_Del } = request;
    const sRetornoDel = await this.postsRepository.deletePosts(delPosts_Del);
    return sRetornoDel;
  }
};

