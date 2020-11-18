import request from '@/utils/request';

export const provkeys = (data: any) =>
  request({
    url: '/v1/kms/key/provkeys',
    method: 'post',
    data
  });

export const dispatchs = (data: any) =>
  request({
    url: '/v1/kms/key/dispatchs',
    method: 'post',
    data
  });

export const screct = (data: any) =>
  request({
    url: '/v1/kms/key/screct',
    method: 'post',
    data
  });

export const historyprovscrets = (data: any) =>
  request({
    url: '/v1/kms/key/historyprovscrets',
    method: 'post',
    data
  });
