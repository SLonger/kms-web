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

export const logout = (data: any) =>
  request({
    url: '/v1/kms/user/logout',
    method: 'post',
    data
  });

export const userquery = (data: any) =>
  request({
    url: '/v1/kms/user/queryinfo',
    method: 'post',
    data
  });

export const delUser = (data: any) =>
  request({
    url: '/v1/kms/user/userdel',
    method: 'post',
    data
  });
export const editUser = (data: any) =>
  request({
    url: '/v1/kms/user/updateinfo',
    method: 'post',
    data
  });
