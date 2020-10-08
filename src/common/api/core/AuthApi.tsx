'use strict'

import { TokenEnum, TokenConstant } from 'common/utils/persistence';
import { BaseApi } from './base';


export class AuthorizationApi extends BaseApi{

    request(params:any, extraParams: any = undefined){
        if(extraParams == undefined){
            extraParams = {}
        }
        extraParams['auth'] = TokenConstant.get()[TokenEnum.ACCESS_TOKEN] 
        return super._postRequest(params, extraParams, {})
    }

}
