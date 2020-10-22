'use strict'


import { ApiInterface } from 'common/interfaces';
import * as fields from 'common/api/fields';
import * as api from 'common/api/core';


export const accountCodeApi: ApiInterface[] = [
    { 
        name: "customer.account.vcode.phone", 
        descriptions: "",
        servers: ["customer-mobile"],
        type: api.UnAuthorizationApi,
        request: {
            phoneNumber: {
                transfer: "number",
                type: fields.StringField,
            },
            smsType: {
                transfer: 'sms_type',
                type: fields.StringField,
            },
        },
        response:{
        },
        mock: {
            success:{
            },
            failure:{
                code: '9999',
                msg: '短信发送是爱',
            }
        }
    },
]
