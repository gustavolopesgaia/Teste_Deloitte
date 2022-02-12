import { returnReponsePost } from '~/src/repositories/Posts/PostsRepository';
import { ErrorResponse } from './types';

export const NOT_FOUND_ERROR: ErrorResponse[] = [
  {
    code: 'NOT_FOUND',
    message: 'The posts could not be found',
  },
];

export const BAD_REQUEST_ERROR: ErrorResponse[] = [
  {
    code: 'BAD_REQUEST',
    message: 'Error to find posts',
  },
];

export const PUT_POSTS_SAMPLE_RESPONSE_200: returnReponsePost[] = [
  {
    status: 'OK',
    data:[{
      id_pessoa: 1,
      dt_post: new Date('03/02/2022 10:00:00'),
      ds_mensagem: 'Registration Successfully updated'
    }]
  },
];

export const POST_POSTS_SAMPLE_RESPONSE_200: returnReponsePost[] = [
  {
    status: 'OK',
    data:[{
        id_pessoa: 1,
        dt_post: new Date('03/02/2022 10:00:00'),
        ds_mensagem: 'Registration Successfully inserted'
      }]
  }
];

export const GET_POSTS_SAMPLE_RESPONSE_200: returnReponsePost[] = [
    {
      status: 'OK',
      data:[{
        id_pessoa: 1,
        dt_post: new Date('03/02/2022 10:00:00'),
        ds_mensagem: 'Registration Successfully recovered'
      }]
    }
  ];

  export const DELETE_POSTS_SAMPLE_RESPONSE_200: returnReponsePost[] = [
    {
      status: 'OK',
      data:[{
        id_pessoa: 1,
        dt_post: new Date('03/02/2022 10:00:00'),
        ds_mensagem: 'Registration Successfully deleted'
      }]
    }
  ];