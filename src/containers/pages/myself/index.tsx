'use strict'


import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtAvatar, AtCard, AtGrid, AtList, AtListItem, AtButton } from 'taro-ui'
import { ComponentFilter } from 'common/utils/container'

import './index.scss'


interface MyselfProps {

}

export const myself: React.FC<MyselfProps>  = (props, ref) => {

    const goToEditPerson = () => {
        Taro.navigateTo({
            url: '/containers/modules/person/edit/index'
        })
    }

    return (
        <View id='myself-main'>
            <View id="myself-main-header" className='at-row'>
                    <AtAvatar 
                        circle={true}
                        image="http://storage.360buyimg.com/mtd/home/32443566_635798770100444_2113947400891531264_n1533825816008.jpg"
                    ></AtAvatar>
                <Text className="at-article__h2" onClick={goToEditPerson}>
                    小狗爸爸
                </Text>
            </View>
            <View id="myself-main-wallet" className="myself-card">
                <AtCard 
                    className='at-article__h1'
                    title='我的钱包'
                >
                    <AtGrid
                        mode="square"
                        hasBorder={false}
                        columnNum={4}
                        data={
                            [
                                {
                                    image: 'https://img20.360buyimg.com/jdphoto/s72x72_jfs/t15151/308/1012305375/2300/536ee6ef/5a411466N040a074b.png',
                                    value: '我的余额'
                                },
                                {
                                    image: 'https://img10.360buyimg.com/jdphoto/s72x72_jfs/t5872/209/5240187906/2872/8fa98cd/595c3b2aN4155b931.png',
                                    value: '我的充值'
                                },
                                {
                                    image: 'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t10660/330/203667368/1672/801735d7/59c85643N31e68303.png',
                                    value: '我的账单'
                                },
                            ]
                        }
                    >
                    </AtGrid>
                </AtCard>
            </View>
            <View id="myself-main-wallet" className="myself-card">
                <AtCard 
                    className='at-article__h1'
                    title='我的订单'
                >
                    <AtGrid
                        mode="square"
                        hasBorder={false}
                        columnNum={4}
                        data={
                            [
                                {
                                    image: 'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png',
                                    value: '未支付'
                                },
                                {
                                    image: 'https://img20.360buyimg.com/jdphoto/s72x72_jfs/t15151/308/1012305375/2300/536ee6ef/5a411466N040a074b.png',
                                    value: '待收货'
                                },
                                {
                                    image: 'https://img10.360buyimg.com/jdphoto/s72x72_jfs/t5872/209/5240187906/2872/8fa98cd/595c3b2aN4155b931.png',
                                    value: '已完成'
                                },
                                {
                                    image: 'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t10660/330/203667368/1672/801735d7/59c85643N31e68303.png',
                                    value: '全部订单'
                                },
                            ]
                        }
                    >
                    </AtGrid>
                </AtCard>
            </View>
            <View className='list-content'>
                <AtList>
                    <AtListItem
                        title='修改密码'
                        arrow='right'
                        thumb='https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png'
                    />
                    <AtListItem
                        title='地址管理'
                        arrow='right'
                        thumb='http://img10.360buyimg.com/jdphoto/s72x72_jfs/t5872/209/5240187906/2872/8fa98cd/595c3b2aN4155b931.png'
                    />
                    <AtListItem
                        title='银行卡管理'
                        arrow='right'
                        thumb='http://img12.360buyimg.com/jdphoto/s72x72_jfs/t10660/330/203667368/1672/801735d7/59c85643N31e68303.png'
                    />
                    <AtListItem
                        title='意见反馈'
                        arrow='right'
                        thumb='http://img12.360buyimg.com/jdphoto/s72x72_jfs/t10660/330/203667368/1672/801735d7/59c85643N31e68303.png'
                    />
                </AtList>
            </View>
        </View>
    )
}

export default ComponentFilter(
    myself,
    {
        key: 'myself',
        isAuth: true,
        apiRegister: {
        }
    },
);
