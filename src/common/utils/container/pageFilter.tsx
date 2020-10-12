'use strict'


import React, { useEffect } from 'react'
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtMessage } from 'taro-ui'
import { apiRouter } from 'common/api/register'
import { TokenConstant, TokenEnum  } from 'common/utils/persistence'
import { config as globalConfig } from  '&/config.js'

import "taro-ui/dist/style/components/message.scss"

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
            let apiExec: any = apiRouter.router(flag, api)
            apis[key] = (params: any, other: any) => {
                return apiExec.request(params, other).then(
                    (res: any) => {
                        return res
                    }
                ).catch(
                    (res: any) => {
                        throw res
                    }
                )
            }
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

        useEffect(() => {
            if(!authorizeToken(config.isAuth)){
                Taro.atMessage({
                    message: "访问令牌已经失效，请重新登录",
                    type: "error",
                    duration: 2000
                })
                setTimeout(() => {
                    Taro.redirectTo({
                        url: '/containers/base/login/index'
                    })
                }, 2000)
            }
        })

        return (
            <View>
                <AtMessage />
                <Component {...apis}/>
            </View>
        )
    }
    return wrapper
}
