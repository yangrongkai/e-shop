'use strict'


import React, { useState, useEffect } from 'react'
import Taro, { useRouter, getCurrentInstance } from '@tarojs/taro'
import { View, Text, Button } from '@tarojs/components'
import { 
    AtInput,
    AtButton
} from 'taro-ui'
import { ComponentFilter } from 'common/utils/container'
import { TokenConstant, TokenEnum  } from 'common/utils/persistence'
import { config } from  '&/config.js'


import './index.scss'


interface ResetPasswordProps {
    getAccount: any;
    logout: any;
    resetPassword: any;
}

export const resetPassword: React.FC<ResetPasswordProps>  = (props, ref) => {

    const [isInitialize, setPasswordState] = useState<boolean>(false)
    const [oldPassword, setOldPassword] = useState<string>("")
    const [newPassword, setNewPassword] = useState<string>("")
    const [confirmPassword, setConfirmPassword] = useState<string>("")

    useEffect(
        () => {
            props.getAccount({

            }).then(
                (res: any) => {
                    setPasswordState(res.blankPassword)
                }
            )
        }, []
    )

    const resetPassword = () => {
        props.resetPassword({
            oldPassword,
            newPassword,
        }).then(
            () => {
                props.logout({})
                TokenConstant.remove()
                Taro.reLaunch({
                    url: config.default.loginRouter,
                })
            }
        )
    }

    return (
        <View id='reset-password-main'>
            <View id="reset-password-main-input" >
                {  !isInitialize && 
                    <View
                        id="reset-password-main-input-old"
                    >
                        <AtInput
                            name='oldPassowrd'
                            title='原密码'
                            type='password'
                            placeholder='请输入原密码'
                            value={oldPassword}
                            onChange={ (value: any) => { setOldPassword(value) } }
                        />
                    </View>
                }
                <View 
                    id="reset-password-main-input-new"
                >
                    <View>
                        <AtInput
                            name='newPassowrd'
                            title='新密码'
                            type='password'
                            placeholder='请输入新密码'
                            value={newPassword}
                            onChange={ (value: any) => { setNewPassword(value) } }
                        />
                    </View>
                    <View>
                        <AtInput
                            name='confirmPassowrd'
                            title='确认密码'
                            type='password'
                            placeholder='请确认新密码'
                            value={confirmPassword}
                            onChange={ (value: any) => { setConfirmPassword(value) } }
                        />
                    </View>
                </View>
            </View>
            <View id="reset-password-main-operation">
                <AtButton
                    type='primary'
                    onClick={resetPassword}
                    className='at-col at-col-10'
                >
                    修改密码
                </AtButton>
            </View>
        </View>
    )
}

export default ComponentFilter(
    resetPassword,
    {
        key: 'resetPassword',
        title: "修改密码",
        isAuth: true,
        needNavBar: true,
        apiRegister: {
            getAccount: 'customer.account.get',
            logout: "customer.account.logout",
            resetPassword: "customer.account.password.modify",
        }
    },
);
