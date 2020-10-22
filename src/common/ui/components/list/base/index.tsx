'use strict'

import React, { useState } from 'react'
import * as classNames from 'classnames';
import { View } from '@tarojs/components'

import './index.scss'


interface RListProps {
    sendFun: any
}

const RList: React.FC<RListProps>  = (props, ref) => {
    const seconds = 60
    const codeInitRemind: string = "发送短信"
    const [codeRemind, setCodeRemind] = useState<string>(codeInitRemind)
    const [isSending, setSendStatus] = useState<boolean>(false)

    const timeCounter = (num: number) => {
        setTimeout(
            () => {
                setCodeRemind(num + " s")
                let newNum = num -1
                if(newNum < 0){
                    setSendStatus(false)
                    setCodeRemind(codeInitRemind)
                } else {
                    timeCounter(newNum)
                }
            }
            , 1000
        );
    }

    const handleClick = () => {
        if( !isSending ) {
            timeCounter(seconds)
            setSendStatus(true)
            props.sendFun()
        }
    }

    let rootClass = classNames('verify-phone-code-button')
    return (
        React.createElement(View, { className: rootClass, onClick: handleClick }, codeRemind)
    )
}

export default RList
