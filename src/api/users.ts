import request from '@/utils/request';

export const sign = (data: any) =>
  request({
    url: '/v1/kms/user/register',
    method: 'post',
    data
  });

export const login = (data: any) =>
  request({
    url: '/v1/kms/user/login',
    method: 'post',
    data
  });

export const logout = () =>
  request({
    url: '/users/logout',
    method: 'post'
  });

export const userquery = (data: any) =>
  request({
    url: '/v1/kms/user/queryInfo',
    method: 'post',
    data
  });
export const delUser = (data: any) =>
  request({
    url: '/v1/kms/user/delete',
    method: 'post',
    data
  });
export const editUser = (data: any) =>
  request({
    url: '/v1/kms/user/updateinfo',
    method: 'post',
    data
  });
