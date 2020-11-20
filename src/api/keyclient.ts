import request from '@/utils/request';

export const getProvs = (data: any) =>
  request({
    url: '/v1/kms/view/provs',
    method: 'get',
    data
  });
export const getAppInfo = (data: any) =>
  request({
    url: '/v1/kms/view/appinfos',
    method: 'post',
    data
  });
export const getHistory = (data: any) =>
  request({
    url: '/v1/kms/view/historyclientkeys',
    method: 'post',
    data
  });
export const getInfo = (data: any) =>
  request({
    url: '/v1/kms/view/clientinfo',
    method: 'post',
    data
  });

export const getrecords = (data: any) =>
  request({
    url: '/v1/kms/view/clientrecords',
    method: 'get',
    data
  });
export const updateclientInfo = (data: any) =>
  request({
    url: '/v1/kms/user/workerorderupdate',
    method: 'post',
    data
  });

export const addclientInfo = (data: any) =>
  request({
    url: '/v1/kms/user/workeorderadd',
    method: 'post',
    data
  });
