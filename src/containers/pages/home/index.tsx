'use strict'


import React, { useState } from 'react'
import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { AtButton } from 'taro-ui'
import { ComponentFilter } from 'common/utils/container'

import "taro-ui/dist/style/components/button.scss" // 按需引入

import './index.less'


interface HomeProps {

}

const home: React.FC<HomeProps>  = (props, ref) => {

    const [count, setCount] = useState<number>(0)

    return (
        <View className='index'>
            这是首页
            <AtButton 
                onClick={ () =>  setCount(count+1)}
            >
                添加 {count}
            </AtButton>
        </View>
    )
}

export default ComponentFilter(
    home,
    {
        key: 'home',
        isAuth: true,
        apiRegister: {
        }
    },
);
