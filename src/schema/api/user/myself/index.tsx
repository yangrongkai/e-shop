'use strict'


import moment from 'moment';
import { ApiInterface } from 'common/interfaces';
import * as fields from 'common/api/fields';
import * as api from 'common/api/core';


export const myselfApi: ApiInterface[] = [
    { 
        name: "customer.myself.get", 
        descriptions: "get myself information",
        servers: ["customer-mobile"],
        type: api.ControllerApi,
        request: {
        },
        response: {
            customer_info:{
                transfer: 'customerInfo',
                dict:{
                    name: {
                        transfer: "name",
                        type: fields.StringField
                    },
                    gender: {
                        transfer: "gender",
                        type: fields.StringField
                    },
                    birthday: {
                        transfer: "birthday",
                        type: fields.DateField
                    },
                    qq: {
                        transfer: "qq",
                        type: fields.StringField
                    },
                    wechat: {
                        transfer: "wechat",
                        type: fields.StringField
                    },
                    phone: {
                        transfer: "phone",
                        type: fields.StringField
                    },
                    email: {
                        transfer: "email",
                        type: fields.StringField
                    },
                }
            }
        },
        mock: {
            success:{
                staff_info:{
                    id: 0,
                    name: 'Yang',
                    birthday: moment('1991-01-02', "YYYY-MM-DD"),
                    gender: 'man',
                    wechat: '15527703115',
                    phone: '15527703115',
                    qq: '237818280',
                    email: '237818280@qq.com',
                    work_number: 'BQ0001',
                    is_admin: true,
                    organization: {
                        id: 1,
                        name: "公司",
                    },
                    position: {
                        id: 1,
                        name: "总经理",
                    },
                    permission: [
                    ],
                    account_info: {
                        nick: 'Roy',
                        head_url: '',
                        username: '15527703115',
                        status: "enable",
                        last_login_time: moment('2020-01-02 11:20', "YYYY-MM-DD hh:mm"), 
                        last_login_ip: "192.168.3.245",
                        register_ip: "192.168.3.243",
                        update_time: moment('2020-01-02 11:22', "YYYY-MM-DD hh:mm"),
                        create_time: moment('2020-01-02 3:21', "YYYY-MM-DD hh:mm"),
                    },
                    company_info: {
                        id: 1,
                        name: 'XXXXXXXXXXXXXXX有限公司',
                        license_number: '038absihndsihkwh9382',
                        create_time: moment('2020-01-01 3:21', "YYYY-MM-DD hh:mm"),
                    }
                }
            },
            failure:{
                code: '9999',
                msg: '获取客户信息失败',
            }
        }
    },
    { 
        name: "customer.myself.update", 
        descriptions: "get myself information",
        servers: ["customer-mobile"],
        type: api.ControllerApi,
        request: {
            myselfInfo:{
                transfer: 'myself_info',
                json: true,
                dict:{
                    name: {
                        transfer: "name",
                        type: fields.StringField,
                        required: false,
                    },
                    birthday: {
                        transfer: "birthday",
                        type: fields.DateField,
                        required: false,
                    },
                    gender: {
                        transfer: "gender",
                        type: fields.StringField,
                        required: false,
                    },
                    phone: {
                        transfer: "phone",
                        type: fields.StringField,
                        required: false,
                    },
                    email: {
                        transfer: "email",
                        type: fields.StringField,
                        required: false,
                    },
                    qq: {
                        transfer: "qq",
                        type: fields.StringField,
                        required: false,
                    },
                    wechat: {
                        transfer: "wechat",
                        type: fields.StringField,
                        required: false,
                    },
                }
            }
        },
        response: {
        },
        mock: {
            success:{
            },
            failure:{
                code: '9999',
                msg: '更新客户信息失败',
            }
        }
    },
]
