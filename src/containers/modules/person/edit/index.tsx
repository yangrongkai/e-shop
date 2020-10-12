'use strict'


import React, { Component } from 'react'
import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { AtNavBar } from 'taro-ui'
import { ComponentFilter } from 'common/utils/container'

import './index.scss'


interface PersonEditProps {

}

export const personEdit: React.FC<PersonEditProps>  = (props, ref) => {
    const callBack = () => {
        Taro.navigateBack({
            delta: 1
        })
    }

    return (
        <AtNavBar
          onClickRgIconSt={callBack}
          onClickRgIconNd={callBack}
          onClickLeftIcon={callBack}
          color='#000'
          leftText='返回'
          rightFirstIconType='bullet-list'
          rightSecondIconType='user'
        >
            <View id='person-edit-main'>
                客户编辑页面
            </View>
        </AtNavBar>
    )
}

export default ComponentFilter(
    personEdit,
    {
        key: 'person-edit',
        isAuth: true,
        apiRegister: {
        }
    },
);
