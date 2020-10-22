'use strict'


import React, { useState, useEffect } from 'react'
import Taro from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import { PhoneVerifyCode } from 'common/ui/components/code/phone'
import { AtInput, AtButton } from 'taro-ui'
import { ComponentFilter } from 'common/utils/container'
import { TokenConstant, TokenEnum  } from 'common/utils/persistence'

import './index.scss'


interface LoginProps {
    goToLogin: any;
    goToPhoneLogin: any;
    getPhoneCode: any;
}

const Login: React.FC<LoginProps>  = (props, ref) => {
    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [phone, setPhone] = useState<string>("")
    const [code, setCode] = useState<string>("")
    const [loginType, setLoginType] = useState<string>("password")

    const goToLogin = () =>{
        props.goToLogin({
            username,
            password
        }, {}).then((res: any) => {
            TokenConstant.save({
                [TokenEnum.ACCESS_TOKEN]: res.accessToken,
                [TokenEnum.EXPIRE_TIME]: res.expireTime,
                [TokenEnum.RENEW_FLAG]: res.renewFlag,
            })
            Taro.switchTab({
                url: '/containers/pages/home/index'
            })
        }).catch((res: any) => {
            Taro.atMessage({
                'message': res.msg,
                'type': "error",
            })
            setPassword("")
        })
    }

    const goToPhoneLogin = () =>{
        props.goToPhoneLogin({
            phone,
            code
        }, {}).then((res: any) => {
            TokenConstant.save({
                [TokenEnum.ACCESS_TOKEN]: res.accessToken,
                [TokenEnum.EXPIRE_TIME]: res.expireTime,
                [TokenEnum.RENEW_FLAG]: res.renewFlag,
            })
            Taro.switchTab({
                url: '/containers/pages/home/index'
            })
        }).catch((res: any) => {
            Taro.atMessage({
                'message': res.msg,
                'type': "error",
            })
            setCode("")
        })
    }

    const getPhoneCode = (value: any) => {
        props.getPhoneCode({
            phoneNumber: username,
            smsType: 'login',
        })
    }

    return (
        <View id="login-main" >
            {process.env.TARO_ENV === 'h5' &&
                <View id="login-main-header"className='at-row at-row__justify--center'>
                    <View className='title-h1'>
                        登录
                    </View>
                </View>
            }
            {
                loginType === "password" &&
                <View id="login-main-password">
                    <View className='at-row at-row__justify--center'>
                        <AtInput
                            name='username'
                            title='账号'
                            type='text'
                            placeholder='请输入用户账号'
                            value={username}
                            onChange={(value: any) => {
                                setUsername(value)
                            }}
                            className='at-col at-col-10'
                        />
                    </View>
                    <View className='at-row at-row__justify--center'>
                        <AtInput
                            name='password'
                            title='密码'
                            type='password'
                            placeholder='请输入用户密码'
                            value={password}
                            className='at-col at-col-10'
                            onChange={(value: any) => {
                                setPassword(value)
                            }}
                        />
                    </View>
                    <View className='at-row at-row__justify--center submit-button'>
                        <AtButton
                            type='primary'
                            onClick={goToLogin}
                            disabled={!(password !=="" && username !=="")}
                            className='at-col at-col-10'
                        >
                           登录
                        </AtButton>
                    </View>
                    <View className='at-row at-row__justify--center transfer-button'>
                        <View
                            className='text-small-button'
                            onClick={ ()=> { setLoginType("sms") } }
                        >
                            短信验证码登录
                        </View>
                    </View>
                </View>
            }
            {
                loginType === "sms" &&
                <View id="login-main-sms">
                    <View className='at-row at-row__justify--center'>
                        <AtInput
                            name='phone'
                            title='手机号'
                            type='text'
                            placeholder='请输入手机号'
                            value={phone}
                            onChange={(value: any) => {
                                setPhone(value)
                            }}
                            className='at-col at-col-10'
                        />
                    </View>
                    <View className='at-row at-row__justify--center'>
                        <AtInput
                            name="code"
                            title=' 验证码'
                            type='text'
                            placeholder='请输入验证码'
                            value={code}
                            className='at-col at-col-10'
                            onChange={ (value: any) => { 
                                setCode(value) 
                            }}
                        >
                            <PhoneVerifyCode
                                sendFun={getPhoneCode}
                            >
                            </PhoneVerifyCode>
                        </AtInput>
                    </View>
                    <View className='at-row at-row__justify--center submit-button'>
                        <AtButton
                            type='primary'
                            onClick={goToPhoneLogin}
                            disabled={!(phone !=="" && code !=="")}
                            className='at-col at-col-10'
                        >
                           登录
                        </AtButton>
                    </View>
                    <View className='at-row at-row__justify--center transfer-button'>
                        <View
                            className='text-small-button'
                            onClick={ ()=> { setLoginType("password") } }
                        >
                            账号密码登录
                        </View>
                    </View>
                </View>
            }
        </View>
    )
}

export default ComponentFilter(
    Login,
    {
        key: 'login',
        isAuth: false,
        apiRegister: {
            goToLogin: 'customer.account.login',
            goToPhoneLogin: 'customer.account.phonelogin',
            getPhoneCode: 'customer.account.vcode.phone',
        }
    },
);
