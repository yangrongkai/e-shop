'use strict'


import React, { useState, useEffect } from 'react'
import Taro from '@tarojs/taro'
import { View, Text, Button } from '@tarojs/components'
import { 
    AtModal,
    AtAvatar,
    AtCard,
    AtGrid,
    AtList,
    AtListItem,
    AtButton
} from 'taro-ui'
import { ComponentFilter } from 'common/utils/container'
import { TokenConstant, TokenEnum  } from 'common/utils/persistence'
import { config } from  '&/config.js'

import { CardContent, cardContentList } from './card'
import { ListItemContent, ListContent, listContentList } from './list'

import './index.scss'


interface MyselfProps {
    logout: any;
    getAccount: any;
}

export const myself: React.FC<MyselfProps>  = (props, ref) => {

    const [nick, setNick] = useState<string>(config.default.nick)
    const [headUrl, setHeadUrl]= useState<string>(config.default.headUrl)
    const [isRemind, setRemindState] = useState<boolean>(false)

    const goToEditPerson = () => {
        Taro.navigateTo({
            url: '/containers/modules/person/edit/index'
        })
    }

    const goToResetPassword  = () => {
        Taro.navigateTo({
            url: '/containers/modules/account/reset/index'
        }).then(
            () => {
                setRemindState(false)
            }
        )
    }

    useEffect(
        () => {
            let tokenInfo = TokenConstant.get()
            if(
                tokenInfo !== undefined &&
                tokenInfo[TokenEnum.ACCESS_TOKEN] !== undefined
            ) {
                props.getAccount({
                }).then(
                    (res: any) => {
                        res.nick !== "" && setNick(res.nick)
                        res.headUrl !== "" && setHeadUrl(res.headUrl)
                        setRemindState(res.blankPassword)
                    }
                )
            }
        }, []
    )

    const logout = () => {
        props.logout({})
        TokenConstant.remove()
        Taro.reLaunch({
            url: config.default.loginRouter,
        })
    }

    const cardContents = cardContentList.map(
        (cardContent: CardContent) => {
            const clickGrid = (item: any) => {
                Taro.navigateTo({
                    url: item.router
                })
            }
            return (
                <View className="card-content" key={cardContent.key}>
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
                        Taro.navigateTo({
                            url: item.router
                        })
                    }
                    return (
                        <AtListItem
                            key={listContent.key + item.router}
                            title={item.title}
                            arrow='right'
                            thumb={item.thumb}
                            onClick={clickItem}
                        />
                    )
                }
            )
            return (
                <View className='list-content' key={listContent.key}>
                    <AtList >
                        {listContents}
                    </AtList>
                </View>
            )
        }
    )

    return (
        <View id='myself-main'>
            <View id="myself-main-remind">
                <AtModal 
                    isOpened={isRemind}
                    onClose={ () => { setRemindState(false) } } 
                    onCancel={ () => { setRemindState(false) } }
                    onConfirm={ goToResetPassword }
                    content="您还未设置账号密码，是否前去设置 ^_^!"
                    cancelText="取消"
                    confirmText="前去设置"
                >
                </AtModal>
            </View>
            <View id="myself-main-header" className='at-row'>
                <View
                    id="myself-main-header-portrait"
                >
                    <AtAvatar 
                        circle={true}
                        image={headUrl}
                    ></AtAvatar>
                </View>
                <View 
                    id="myself-main-header-nick"
                    onClick={goToEditPerson}
                >
                    {nick}
                </View>
            </View>
            {cardContents}
            {listContents}
            <View className="foot" >
                <AtButton
                    className="logout"
                    onClick={logout}
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
            logout: "customer.account.logout",
            getAccount: 'customer.account.get',
        }
    },
);
