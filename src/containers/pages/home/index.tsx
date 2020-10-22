'use strict'


import React, { useState, useEffect } from 'react'
import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { AtButton } from 'taro-ui'
import { ComponentFilter } from 'common/utils/container'

import './index.scss'


interface HomeProps {
}

const home: React.FC<HomeProps>  = (props, ref) => {

    return (
        <View className='index'>
            hello world
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
