'use stict'


/**
 * Created by Roy on 2020/3/6.
 * http通用工具函数
 */
import * as qs from 'qs'
import Taro from '@tarojs/taro'


export class MiniRequest {

    static get(
        url: string,
        msg: string = '网络传输异常',
        headers: any
    ){
        Taro.request({
            url,
            method: "GET",
            header: headers
        }).then(( res: any ) => res.data)
        .catch(( err: any ) => {
            console.error(err, msg)
        })
    }

    static post(
        url: string,
        data: any,
        headers: any = {},
        isqs: boolean = true, 
        isForm: boolean = false, 
        msg: string = '网络传输异常'
    ){
        let parameters: any = data;
        if( isqs ){
            parameters = qs.stringify(data);
        }
        if( isForm ){
            let formData = new FormData()
            for (let key in parameters) {
                formData.append(
                    key, 
                    parameters[key]
                )
            }
            parameters = formData
        }
        headers['content-type'] = "application/x-www-form-urlencoded"
        return Taro.request({
            url,
            data: parameters,
            method: "POST",
            header: headers
        }).then(( res: any ) => {
            if( res.statusCode === 200 ){
                return res.data;
            } else {
                console.error(msg)
            }
        }).catch(( err: any ) => {
            console.error(err)
            throw {
                code: -9999,
                msg: "无法链接服务器，请检查网络"
            }
        })
    }

}
