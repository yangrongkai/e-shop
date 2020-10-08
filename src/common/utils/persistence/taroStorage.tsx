'use strict'

import { BaseStorage } from './base'
import Taro from '@tarojs/taro'


export class TaroStorage extends BaseStorage {
    storage: any;

    constructor(){
        super();
    }

    sync(key: any, value: any){
        Taro.setStorage({
            key: key,
            data: JSON.stringify(value),
        });
    }

    load(key: any): any{
        try{
            return JSON.parse(
                Taro.getStorageSync(key)
            )
        }catch (e) {
            return undefined
        }
    }

    remove(key: any): boolean {
        Taro.clearStorage()
        return true;
    }

}

export const taroStorage = new TaroStorage();
