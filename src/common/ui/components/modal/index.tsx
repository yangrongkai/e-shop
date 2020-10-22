'use strict'


import React, { useState } from 'react'
import * as classNames from 'classnames';
import { View } from '@tarojs/components'

import './index.scss'


interface PhoneVeriryCodeProps {
    sendFun: any
}

export const PhoneVerifyCode: React.FC<PhoneVeriryCodeProps>  = (props, ref) => {
    const component = View
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
        React.createElement(component, { className: rootClass, onClick: handleClick }, codeRemind)
    )
}

export default PhoneVerifyCode
