'use strict'


import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtAvatar, AtCard, AtGrid, AtList, AtListItem, AtButton } from 'taro-ui'
import { ComponentFilter } from 'common/utils/container'

import './index.scss'

interface GridContent {
    image: string;
    value: string;
    router?: string;
}

interface CardContent {
    title: string;
    itemList: GridContent[]
}

interface ListItemContent {
    title: string;
    thumb: string;
    router?: string;
}

interface ListContent {
    itemList: ListItemContent[]
}

interface MyselfProps {

}

const cardContentList: CardContent[] = [
    {
        title: "我的钱包",
        itemList: [
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
    },
    {
        title: "我的订单",
        itemList: [
            {
                image: 'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png',
                value: '未支付',
                router: '1',
            },
            {
                image: 'https://img20.360buyimg.com/jdphoto/s72x72_jfs/t15151/308/1012305375/2300/536ee6ef/5a411466N040a074b.png',
                value: '待收货',
            },
            {
                image: 'https://img10.360buyimg.com/jdphoto/s72x72_jfs/t5872/209/5240187906/2872/8fa98cd/595c3b2aN4155b931.png',
                value: '已完成',
            },
            {
                image: 'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t10660/330/203667368/1672/801735d7/59c85643N31e68303.png',
                value: '全部订单,'
            },
        ]
    },
]

const listContentList: ListContent[] = [
    {
        itemList: [
            {
                title: '银行卡管理',
                thumb: 'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png',
                router: '1',
            },
            {
                title: '地址管理',
                thumb: 'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png',
                router: '2',
            },
        ]
    },
    {
        itemList: [
            {
                title: '账户安全',
                thumb: 'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png',
            },
            {
                title: '关于我们',
                thumb: 'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png',
            },
            {
                title: '意见反馈',
                thumb: 'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png',
            },
        ]
    },
]

export const myself: React.FC<MyselfProps>  = (props, ref) => {

    const goToEditPerson = () => {
        Taro.navigateTo({
            url: '/containers/modules/person/edit/index'
        })
    }

    const cardContents = cardContentList.map(
        (cardContent: CardContent) => {
            const clickGrid = (value: any) => {
            }
            return (
                <View className="card-content">
                    <AtCard 
                        className='at-article__h1'
                        title={cardContent.title}
                    >
                        <AtGrid
                            mode="square"
                            hasBorder={false}
                            columnNum={4}
                            data={cardContent.itemList}
                            onClick={clickGrid}
                        >
                        </AtGrid>
                    </AtCard>
                </View>
            )
        }
    )

    const listContents = listContentList.map(
        (listContent: ListContent) => {
            const listContents = listContent.itemList.map(
                (item: ListItemContent) => {
                    let clickItem = (value: any) => {

                    }
                    return (
                        <AtListItem
                            title={item.title}
                            arrow='right'
                            thumb={item.thumb}
                            onClick={clickItem}
                        />
                    )
                }
            )
            return (
                <View className='list-content'>
                    <AtList>
                        {listContents}
                    </AtList>
                </View>
            )
        }
    )

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
            {cardContents}
            {listContents}
            <View className="foot" >
                <AtButton
                    className="logout"
                >
                    退出登录
                </AtButton>
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
