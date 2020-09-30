'use strict'


import React, { Component } from 'react'
import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { AtButton } from 'taro-ui'

import "taro-ui/dist/style/components/button.scss" // 按需引入

import './index.less'


interface HomeProps {

}

export const home: React.FC<HomeProps>  = (props, ref) => {

  const redirect = () => {
    Taro.redirectTo({
		  url: '/containers/base/login/index'
		})
  }

  Taro.setTopBarText({
    text: 'hello, world!'
  })

  return (
      <View className='index'>
        这是首页
        <AtButton type='primary' onClick={redirect}>
          跳转登录
        </AtButton>
      </View>
  )
}

export default home;
