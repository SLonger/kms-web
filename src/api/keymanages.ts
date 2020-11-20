import request from '@/utils/request';

export const provkeys = (data: any) =>
  request({
    url: '/v1/kms/view/provkeys',
    method: 'get',
    data
  });

export const dispatchrecords = (data: any) =>
  request({
    url: '/v1/kms/view/dispatchs',
    method: 'get',
    data
  });

export const screct = (data: any) =>
  request({
    url: '/v1/kms/view/screct',
    method: 'post',
    data
  });

export const historyprovscrets = (data: any) =>
  request({
    url: '/v1/kms/view/historyprovscrets',
    method: 'post',
    data
  });

export const manualquerykey = (data: any) =>
  request({
    url: '/v1/kms/view/screct',
    method: 'post',
    data
  });
