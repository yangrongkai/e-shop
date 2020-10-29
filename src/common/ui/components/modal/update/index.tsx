'use strict'


import React, { useState, useEffect } from 'react'
import * as classNames from 'classnames';
import { View , Button} from '@tarojs/components'
import { 
    AtInput,
    AtModal,
    AtModalHeader,
    AtModalContent,
    AtModalAction,
} from 'taro-ui'

import './index.scss'


interface ItemUpdateProps {
    isOpened: boolean;
    attr: string;
    name: string;
    value: string;
    onConfirm: any;
    onCancel: any;
}

export const ItemUpdateModal: React.FC<ItemUpdateProps>  = (props, ref) => {
    const [isOpened, setOpenState] = useState<boolean>(false)
    const [value, setValue] = useState<string>(props.value)

    const handleConfirm = (event: any) => {
        if (typeof props.onConfirm === 'function') {
            props.onConfirm(value);
        }
    }

    const handleCancel = (event: any) => {
        if (typeof props.onCancel === 'function') {
            props.onCancel(event);
        }
    }

    useEffect(
        () => {
            setOpenState(props.isOpened)
            setValue(props.value)
        }, [props.isOpened]
    )

    return (
        <View>
            <AtModal isOpened={ isOpened }>
                <AtModalHeader>修改{props.name}</AtModalHeader>
                <AtModalContent>
                    <AtInput
                        name={props.attr}
                        title={props.name}
                        value={value}
                        onChange={ (value: any) => {setValue(value)} }
                    />
                </AtModalContent>
                <AtModalAction> 
                    <Button
                        onClick={handleCancel}
                    >
                        取消
                    </Button>
                    <Button
                        onClick={handleConfirm}
                    >
                        确定
                    </Button>
                </AtModalAction>
            </AtModal>
        </View>
    )
}

export default ItemUpdateModal
