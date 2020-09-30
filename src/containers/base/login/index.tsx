'use strict'


import React, { useState } from 'react'
import { View, Text } from '@tarojs/components'
import { AtInput, AtButton } from 'taro-ui'
// import { apiRouter } from 'common/api/register'


import "taro-ui/dist/style/components/button.scss"
import "taro-ui/dist/style/components/input.scss"
import "taro-ui/dist/style/components/flex.scss"

import './index.less'


interface LoginProps {

}

export const Login: React.FC<LoginProps>  = (props, ref) => {
  const [username, setUsername] = useState<string>("")
  const [password, setPassword] = useState<string>("")

  const goToLogin = () =>{
    console.log('-------->>>>>> ', username, password)
    /*
    apiRouter.router('controller-pc', 'staff.account.login').request({

    }).then((res: any) => {
      console.log('~~~~~~~>> login to result ---> ', res)
    })
    */
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
            onChange={(value: string) => setUsername(value)}
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
            onChange={(value: string) => setPassword(value)}
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

export default Login;
