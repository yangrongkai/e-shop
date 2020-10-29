'use strict'


import React, { useState, useEffect } from 'react'
import * as classNames from 'classnames';
import { View , Button} from '@tarojs/components'
import { 
    AtFloatLayout,
    AtRadio,
} from 'taro-ui'

import './index.scss'


interface FloatRadioProps {
    isOpened: boolean;
    attr: string;
    name: string;
    value: string;
    onConfirm: any;
    onCancel: any;
    onClose: any;
}

export const FloatRadio: React.FC<FloatRadioProps>  = (props, ref) => {
    const [isOpened, setOpenState] = useState<boolean>(false)
    const [value, setValue] = useState<string>(props.value)

    const handleConfirm = (value: any) => {
        setValue(value)
        if (typeof props.onConfirm === 'function') {
            props.onConfirm(value);
        }
    }

    const handleClose = (event: any) => {
        if (typeof props.onCancel === 'function') {
            props.onClose(event);
        }
    }


    useEffect(
        () => {
            setOpenState(props.isOpened)
            setValue(props.value)
        }, [props.isOpened]
    )

    return (
        <AtFloatLayout 
            isOpened={isOpened}
            onClose={handleClose}
        >
        <AtRadio
            options={[
                { label: '男', value: 'man' },
                { label: '女', value: 'woman' },
            ]}
            value={value}
            onClick={handleConfirm}
        />
        </AtFloatLayout>
    )
}

export default FloatRadio
