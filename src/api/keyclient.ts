import request from '@/utils/request';

export const getProvs = (data: any) =>
	request({
		url: '/v1/kms/key/provs',
		method: 'post',
		data
	});
export const getAppInfo = (data: any) =>
	request({
		url: '/v1/kms/key/appinfos',
		method: 'post',
		data
	});
export const getHistory = (data: any) =>
	request({
		url: '/v1/kms/key/historyclientkeys',
		method: 'post',
		data
	});
export const getInfo = (data: any) =>
	request({
		url: '/v1/kms/key/clientinfo',
		method: 'post',
		data
	});


