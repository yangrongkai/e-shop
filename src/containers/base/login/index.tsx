'use strict'


import React, { useState } from 'react'
import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtInput, AtButton } from 'taro-ui'
import { ComponentFilter } from 'common/utils/container'
import { TokenConstant, TokenEnum  } from 'common/utils/persistence'


import "taro-ui/dist/style/components/button.scss"
import "taro-ui/dist/style/components/input.scss"
import "taro-ui/dist/style/components/flex.scss"

import './index.less'


interface LoginProps {

}

const Login: React.FC<LoginProps>  = (props, ref) => {
    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")
  
    const goToLogin = () =>{
        props.goToLogin.request({
            username,
            password
        }, {}).then((res: any) => {
            TokenConstant.save({
                [TokenEnum.ACCESS_TOKEN]: res.accessToken,
                [TokenEnum.EXPIRE_TIME]: res.expireTime,
                [TokenEnum.RENEW_FLAG]: res.renewFlag,
            })
            Taro.redirectTo({
                url: '/containers/pages/home/index'
            })
        })
    }
  
    return (
        <View style={{margin: "100px auto"}}>
            <Text className='at-row at-row__justify--center mb5'>
                ^_^！ 欢迎回家!
            </Text>
            <View className='at-row at-row__justify--center mb5'>
                <AtInput
                    name='username'
                    title='账号'
                    type='text'
                    placeholder='请输入账号'
                    value={username}
                    onChange={(value: any) => setUsername(value)}
                    className='at-col at-col-10'
                />
            </View>
            <View className='at-row at-row__justify--center mb5'>
                <AtInput
                    name='password'
                    title='密码'
                    type='text'
                    placeholder='请输入密码'
                    value={password}
                    className='at-col at-col-10'
                    onChange={(value: any) => setPassword(value)}
                />
            </View>
            <View className='at-row at-row__justify--center'>
                <AtButton
                   type='primary'
                   onClick={goToLogin}
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
