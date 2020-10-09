'use strict'


import React, { useState, useEffect } from 'react'
import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtMessage, AtInput, AtButton } from 'taro-ui'
import { ComponentFilter } from 'common/utils/container'
import { TokenConstant, TokenEnum  } from 'common/utils/persistence'


import "taro-ui/dist/style/components/message.scss"
import "taro-ui/dist/style/components/button.scss"
import "taro-ui/dist/style/components/input.scss"
import "taro-ui/dist/style/components/flex.scss"
import "taro-ui/dist/style/components/article.scss"

import './index.less'


interface LoginProps {
    goToLogin: any;
}

const Login: React.FC<LoginProps>  = (props, ref) => {
    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const goToLogin = () =>{
        props.goToLogin({
            username,
            password
        }, {}).then((res: any) => {
            TokenConstant.save({
                [TokenEnum.ACCESS_TOKEN]: res.accessToken,
                [TokenEnum.EXPIRE_TIME]: res.expireTime,
                [TokenEnum.RENEW_FLAG]: res.renewFlag,
            })
            Taro.switchTab({
                url: '/containers/pages/home/index'
            })
        }).catch((res: any) => {
            Taro.atMessage({
                'message': res.msg,
                'type': "error",
            })
            setPassword("")
        })
    }

    return (
        <View id="main" >
            <AtMessage />
            {process.env.TARO_ENV === 'h5' &&
                <View className='at-row at-row__justify--center mb40'>
                    <View className='at-article__h1'>
                        登录
                    </View>
                </View>
            }
            <View className='at-row at-row__justify--center mb20'>
                <AtInput
                    name='username'
                    title='账号'
                    type='text'
                    placeholder='请输入账号'
                    value={username}
                    onChange={(value: any) => {
                        setUsername(value)
                    }}
                    className='at-col at-col-10'
                />
            </View>
            <View className='at-row at-row__justify--center mb40'>
                <AtInput
                    name='password'
                    title='密码'
                    type='password'
                    placeholder='请输入密码'
                    value={password}
                    className='at-col at-col-10'
                    onChange={(value: any) => {
                        setPassword(value)
                    }}
                />
            </View>
            <View className='at-row at-row__justify--center mb40 center'>
                <View className='at-col at-col-5'>
                    <View
                        className='at-article__h3'
                        onClick={ ()=> { console.log('我被点击了') } }
                    >
                        立即注册
                    </View>
                </View>
                <View className='at-col at-col-2'>
                </View>
                <View className='at-col at-col-5'>
                    <View className="at-article__h3">
                        忘记密码
                    </View>
                </View>
            </View>
            <View className='at-row at-row__justify--center'>
                <AtButton
                    type='primary'
                    onClick={goToLogin}
                    disabled={!(password !=="" && username !=="")}
                    className='at-col at-col-10'
                >
                   登录
                </AtButton>
            </View>
        </View>
    )
}

export default ComponentFilter(
    Login,
    {
        key: 'login',
        isAuth: false,
        apiRegister: {
            goToLogin: 'staff.account.login'
        }
    },
);
