'use strict'


import React, { useState } from 'react'
import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import Skeleton from 'taro-skeleton'
import { AtButton } from 'taro-ui'
import { ComponentFilter } from 'common/utils/container'

import "taro-ui/dist/style/components/button.scss" // 按需引入

import './index.scss'


interface HomeProps {

}

const home: React.FC<HomeProps>  = (props, ref) => {

    const [count, setCount] = useState<number>(0)
    const [isLoading, setLoading] = useState<boolean>(true)

    return (
        <View className='index'>
            <AtButton 
                onClick={ () =>  setCount(count+1) & setLoading(!isLoading)}
            >
                添加 {count}
            </AtButton>
            {isLoading}
            <Skeleton className='search' row={1} rowHeight="30px" action loading={isLoading}>
                这是一个搜索
            </Skeleton>
            <Skeleton className='' classNAme="advertisement" rowHeight="150px" rowWidth="100%" row={1} loading={isLoading}>
                这是一个广告位
            </Skeleton>
            <Skeleton type='column' loading={isLoading} className='goods' contentAlignStyle="center" row={10} rowWidth="170px" rowHeight='250px'/>
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
