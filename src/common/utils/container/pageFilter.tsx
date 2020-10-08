'use strict'


import React from 'react'
import Taro from '@tarojs/taro'
import { apiRouter } from 'common/api/register'
import { TokenConstant, TokenEnum  } from 'common/utils/persistence'
import { config as globalConfig } from  '&/config.js'

export interface ComponentApiRegister {
    [key: string]: string | string[];
}
export interface ComponentConfig {
    key: string;
    isAuth?: boolean;
    apiRegister: ComponentApiRegister;
}


const hungApis: any = (apiRegister: ComponentApiRegister) => {
    let apis: any = {}
    if( apiRegister !== undefined ){
        for(let key in apiRegister){
            let apiParams = apiRegister[key]
            let flag: string = globalConfig.defaultFlag 
            let api: string = ""
            if( typeof(apiParams) !== "string" ) {
                if(apiParams.length && apiParams.length> 0){
                    console.log(apiParams, apiParams.length)
                    if( apiParams.length == 1 ) {
                        api = apiParams[0]
                    } else if (apiParams.length == 2 ){
                        flag = apiParams[0]
                        api = apiParams[1]
                    } else {
                        throw Error("conponent config is error, please go to check !!!")
                    }
                }
            } else {
                api = apiParams
            }
            apis[key] = apiRouter.router(
                flag,
                api
            )
        }
    }
    return apis
}

const authorizeToken = (needAuth: boolean = true): boolean => {
    let isPassed = false;
    if(needAuth === undefined || needAuth){
        let tokenInfo = TokenConstant.get()
        if(
            tokenInfo !== undefined &&
            tokenInfo !== null &&
            tokenInfo[TokenEnum.ACCESS_TOKEN] !== undefined &&
            tokenInfo[TokenEnum.EXPIRE_TIME] !== undefined &&
            tokenInfo[TokenEnum.RENEW_FLAG]
        ) {
            isPassed = true;
        }

    } else {
        isPassed = true
    }
    return isPassed
}

/* *
 *  组件所需要的高阶函数,用于依赖注入
 *  1、注入api，用于组件进行访问
 *  2、提前验证是否需要权限，同时，如果需要进行api续签
 * */
export const ComponentFilter = (Component: any, config: ComponentConfig = undefined ) => {
    let apis: any = hungApis(config.apiRegister)
    let wrapper: React.FC = (
        props,
        ref
    ) => {

        if(!authorizeToken(config.isAuth)){
            Taro.redirectTo({
                url: '/containers/base/login/index'
            })
        }

        return (
            <Component {...apis}/>
        )
    }
    return wrapper
}
