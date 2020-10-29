'use strict'


import { ApiInterface } from 'common/interfaces';
import * as fields from 'common/api/fields';
import * as api from 'common/api/core';
import { accountCodeApi } from './code';


export const accountApi: ApiInterface[] = [
    ...accountCodeApi,
    { 
        name: "customer.account.login", 
        descriptions: "it will login by username and password",
        servers: ["customer-mobile"],
        type: api.UnAuthorizationApi,
        request: {
            username: {
                transfer: "username",
                type: fields.StringField,
            },
            password: {
                transfer: 'password',
                type: fields.Md5StringField,
            },
        },
        response:{
            access_token:{
                transfer: 'accessToken',
                type: fields.StringField,
            },
            renew_flag:{
                transfer: 'renewFlag',
                type: fields.StringField,
            },
            expire_time:{
                transfer: 'expireTime',
                type: fields.StringField,
            },
        },
        mock: {
            success:{
                access_token: "a5ffc062fee0634f",
                renew_flag: "d6a22c4fd8262b04",
                expire_time: '1596783223',
            },
            failure:{
                code: '9999',
                msg: '账号密码错误',
            }
        }
    },
    { 
        name: "customer.account.phonelogin", 
        descriptions: "it will login by username and password",
        servers: ["customer-mobile"],
        type: api.UnAuthorizationApi,
        request: {
            phone: {
                transfer: "phone",
                type: fields.StringField,
            },
            code: {
                transfer: 'verify_code',
                type: fields.StringField,
            },
        },
        response:{
            access_token:{
                transfer: 'accessToken',
                type: fields.StringField,
            },
            renew_flag:{
                transfer: 'renewFlag',
                type: fields.StringField,
            },
            expire_time:{
                transfer: 'expireTime',
                type: fields.StringField,
            },
        },
        mock: {
            success:{
                access_token: "a5ffc062fee0634f",
                renew_flag: "d6a22c4fd8262b04",
                expire_time: '1596783223',
            },
            failure:{
                code: '9999',
                msg: '手机验证码错误',
            }
        }
    },
    { 
        name: "customer.account.logout", 
        descriptions: "go to logout account",
        servers: ["customer-mobile"],
        type: api.ControllerApi,
        request: {
        },
        response:{
        },
        mock: {
            success:{
            },
            failure:{
                code: '9999',
                msg: '注销失败',
            }
        }
    },
    { 
        name: "customer.account.get", 
        descriptions: "",
        servers: ["customer-mobile"],
        type: api.ControllerApi,
        request: {
        },
        response:{
            account_info:{
                transfer: 'accountInfo',
                dict:{
                    nick: {
                        transfer: 'nick',
                        type: fields.StringField,
                    },
                    head_url: {
                        transfer: 'headUrl',
                        type: fields.StringField,
                    },
                    username: {
                        transfer: 'username',
                        type: fields.StringField,
                    },
                    register_time: {
                        transfer: 'registerTime',
                        type: fields.DatetimeField,
                    },
                    blank_password: {
                        transfer: 'blankPassword',
                        type: fields.BooleanField,
                    },
                },
            },
        },
        mock: {
            success:{
                nick: "我是小小兵",
                head_url: "我是小小兵",
                register_time: "2020-12-12 11:11",
            },
            failure:{
                code: '9999',
                msg: '注销失败',
            }
        }
    },
    { 
        name: "customer.account.update", 
        descriptions: "go to update account information",
        servers: ["customer-mobile"],
        type: api.ControllerApi,
        request: {
            updateInfo:{
                transfer: 'update_info',
                json: true,
                dict:{
                    nick: {
                        transfer: "nick",
                        type: fields.StringField,
                        required: false,
                    },
                    headUrl: {
                        transfer: "head_url",
                        type: fields.StringField,
                        required: false,
                    },
                }
            }
        },
        response:{
        },
        mock: {
            success:{
            },
            failure:{
                code: '9999',
                msg: '更新失败',
            }
        }
    },
    { 
        name: "customer.account.password.modify", 
        descriptions: "",
        servers: ["customer-mobile"],
        type: api.ControllerApi,
        request: {
            newPassword: {
                transfer: "new_password",
                type: fields.Md5StringField
            },
            oldPassword: {
                transfer: "old_password",
                type: fields.Md5StringField
            },
        },
        response:{
        },
        mock: {
            success:{
            },
            failure:{
                code: '9999',
                msg: '修改密码失败',
            }
        }
    },
    { 
        name: "customer.account.password.reset", 
        descriptions: "go to reset account password",
        servers: ["customer-mobile"],
        type: api.ControllerApi,
        request: {
            staffId: {
                transfer: "staff_id",
                type: fields.IntField
            },
        },
        response:{
        },
        mock: {
            success:{
            },
            failure:{
                code: '9999',
                msg: '重置密码失败',
            }
        }
    },
]
