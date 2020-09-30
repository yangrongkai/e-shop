'use strict'


import React, { Component } from 'react'
import { View, Text } from '@tarojs/components'
import { AtButton } from 'taro-ui'

import './index.less'


interface MyselfProps {

}

export const myself: React.FC<MyselfProps>  = (props, ref) => {

  return (
      <View className='index'>
      这是个人中心
      </View>
  )
}

export default myself;
