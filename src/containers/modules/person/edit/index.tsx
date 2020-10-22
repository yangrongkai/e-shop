'use strict'


import React, { useState } from 'react'
import { View, Text, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { 
    AtList, 
    AtListItem ,
    AtInput,
    AtModal,
    AtModalHeader,
    AtModalContent,
    AtModalAction,
} from 'taro-ui'
import { ComponentFilter } from 'common/utils/container'
import { RList } from 'common//ui/components/list'

import './index.scss'



export interface Attribute {
    name: string;
    key: string;
    value: string;
    needArrow: boolean;
    type: string;
    component?: any;
    apiExec?: any;
}


export const attributeModuleList: Attribute[][] = [
    [
        {
            name: "头像",
            key: "headUrl",
            needArrow: false,
            value: "",
            type: 'account',
        },
        {
            name: "昵称",
            key: "nick",
            needArrow: true,
            value: "未设置",
            type: 'account',
        },
        {
            name: "账号",
            key: "usename",
            needArrow: false,
            value: "15527703115",
            type: 'account',
        },
    ],
    [
        {
            name: "性别",
            key: "gender",
            needArrow: true,
            value: "man",
            type: 'person',
        },
        {
            name: "地区",
            key: "area",
            needArrow: true,
            value: "未设置",
            type: 'person',
        },
    ],

]

interface PersonEditProps {
    updateAccount: any,
    updatePerson: any,
}

export const personEdit: React.FC<PersonEditProps>  = (props, ref) => {
    const [isOpened, setOpenState] = useState<boolean>(false)
    const [key, setKey] = useState<string>("未设置")
    const [name, setName] = useState<string>("未设置")
    const [value, setValue] = useState<string>("")

    const generateAttribute = (attributeList: Attribute[]) => {
        return attributeList.map(
            (item: Attribute) => {
                let config:any = {
                    title: item.name,
                    extraText: item.value,
                }
                if(item.needArrow ) config['arrow'] = "right"

                const invokeComponent = (value: any) => {
                    setKey(item.key)
                    setName(item.name)
                    setValue(item.value)
                    setOpenState(true)
                }
                return (
                    <AtListItem
                        key={JSON.stringify(item)}
                        {...config}
                        onClick={invokeComponent}
                        onClose={ () => { setOpenState(false)} }
                        onCancel={ ()=> { setOpenState(false)} }
                    >
                    </AtListItem>
                )
            }
        )

    }

    const generateAttributeModule = () => {
        return attributeModuleList.map(
            (attributeList : Attribute[]) => {
                let attributeItemList = generateAttribute(attributeList)
                return (
                    <AtList key={JSON.stringify(attributeList)}>
                        {attributeItemList}
                    </AtList>
                )

            }
        )
    }


    const updateAttribute = (value: any) => {
    }

    return (
        <View id="edit-person">
            <View id="edit-person-content">
                {generateAttributeModule()}
            </View>
            <View>
                <AtModal isOpened={isOpened}>
                    <AtModalHeader>修改{name}</AtModalHeader>
                    <AtModalContent>
                        <AtInput
                            name={key}
                            title={name}
                            value={value}
                        />
                    </AtModalContent>
                    <AtModalAction> 
                        <Button>取消</Button>
                        <Button
                            onClick={updateAttribute}
                        >
                            确定
                        </Button>
                    </AtModalAction>
                </AtModal>
            <RList/>
            </View>
        </View>
    )
}

export default ComponentFilter(
    personEdit,
    {
        key: 'person-edit',
        title: '个人信息',
        isAuth: true,
        needNavBar: true,
        apiRegister: {
            updateAccount: "customer.account.update",
            updatePerson: "customer.myself.update",
        }
    },
);
