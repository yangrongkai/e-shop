'use strict'


import React, { useState, useEffect } from 'react'
import { View, Text, Picker } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { 
    AtList, 
    AtListItem ,
} from 'taro-ui'
import { ComponentFilter } from 'common/utils/container'
import { ItemUpdateModal } from 'common/ui/components/modal'
import { FloatRadio } from 'common/ui/components/radio'
import { AddressPicker } from 'common/ui/components/picker'
import { deepClone } from 'common/utils/tools'

import './index.scss'



export interface Attribute {
    name: string;
    attr: string;
    value: string;
    needArrow: boolean;
    enumDict?: any;  // 数据字典
    type?: number;  // Api访问类型
    component?: any;  // 挂载组件
}

export enum UpdateType {
    ACCOUNT,
    PERSON,
}

export const attributeModuleList: Attribute[][] = [
    [
        {
            name: "头像",
            attr: "headUrl",
            needArrow: false,
            component: ItemUpdateModal,
            value: "",
            type: UpdateType.ACCOUNT,
        },
        {
            name: "昵称",
            attr: "nick",
            needArrow: true,
            component: ItemUpdateModal,
            value: "未设置",
            type: UpdateType.ACCOUNT,
        },
        {
            name: "账号",
            attr: "username",
            needArrow: false,
            value: "",
            type: UpdateType.ACCOUNT,
        },
    ],
    [
        {
            name: "性别",
            attr: "gender",
            needArrow: true,
            component: FloatRadio,
            value: "man",
            enumDict: {'man': '男', 'woman': '女'},
            type: UpdateType.PERSON,
        },
        {
            name: "地区",
            attr: "area",
            needArrow: true,
            component: AddressPicker,
            value: "未设置",
        },
    ],

]

interface PersonEditProps {
    getAccount: any,
    getPerson: any,
    updateAccount: any,
    updatePerson: any,
}


export const personEdit: React.FC<PersonEditProps>  = (props, ref) => {
    const [openFlag, setOpenFlag] = useState<string>("")
    const loadingComponents: any[] = []
    const [personInfo, setPersonInfo] = useState<any>(
        deepClone(attributeModuleList)
    )

    const hungAttributeValues = (res: any, attributeTemplate: any[][], updateType: number) => {
        let newPersonInfo = deepClone(attributeTemplate)
        for(let key in newPersonInfo){
            for(let subKey in newPersonInfo[key]){
                let item = newPersonInfo[key][subKey]
                if( item.type == updateType && item.attr in res ){
                    item.value = res[item.attr]
                }
            }
        }
        return newPersonInfo
    }

    useEffect(
        () => {
            props.getAccount({
            }).then(
                (account: any) => {
                    props.getPerson({
                    }).then(
                        (myself: any) => {
                            let newPersonInfo = personInfo
                            let updateList = [
                                [account.accountInfo, UpdateType.ACCOUNT],
                                [myself.customerInfo, UpdateType.PERSON],
                            ]
                            for( let index in updateList ){
                                let [parms, execType] = updateList[index]
                                newPersonInfo = hungAttributeValues(parms, newPersonInfo, execType)
                            }
                            setPersonInfo(
                                newPersonInfo
                            )
                        }
                    )
                }
            )
        }, []
    )

    const generateAttribute = (attributeList: Attribute[]) => {
        return attributeList.map(
            (item: Attribute) => {
                let config:any = {
                    title: item.name,
                    extraText: item.enumDict ? item.enumDict[item.value]: item.value,
                }

                if(item.needArrow ) config['arrow'] = "right"
                if(item.component ) {
                    let updateComponent = (
                        <item.component 
                            isOpened={ item.attr === openFlag }
                            {...item}
                            onConfirm={(value: any) => { 
                                setOpenFlag("")
                                if(item.type === UpdateType.ACCOUNT) {
                                    props.updateAccount({
                                        updateInfo: {
                                            [item.attr]: value
                                        }
                                    })
                                } else if (item.type === UpdateType.PERSON){
                                    props.updatePerson({
                                        myselfInfo: {
                                            [item.attr]: value
                                        }
                                    })
                                }
                                setPersonInfo(
                                    hungAttributeValues({
                                        [item.attr]: value
                                    }, personInfo, item.type)
                                )
                            }}
                            
                            onCancel={() => { setOpenFlag("") }}
                            onClose={() => { setOpenFlag("") }}
                        />
                    )
                    loadingComponents.push(updateComponent)
                }

                const invokeComponent = (value: any) => {
                    setOpenFlag(item.attr)
                }

                return (
                    <AtListItem
                        key={JSON.stringify(item)}
                        {...config}
                        onClick={invokeComponent}
                    >
                    </AtListItem>
                )
            }
        )
    }

    const generateAttributeModule = (moduleList: Attribute[][]) => {
        return moduleList.map(
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

    let attribuiteComponents = generateAttributeModule(
        personInfo
    )

    return (
        <View id="edit-person">
            <View id="edit-person-content">
                {attribuiteComponents}
                {loadingComponents}
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
            getAccount: "customer.account.get",
            getPerson: "customer.myself.get",
            updateAccount: "customer.account.update",
            updatePerson: "customer.myself.update",
        }
    },
);
