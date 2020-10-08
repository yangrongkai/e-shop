'use strict'


import { taroStorage } from './taroStorage';


export class StorageConstant {

    name: string;
    fields: string[];
    storage: any;

    constructor(name: string, fields: string[], storage: any){
        this.name = name;
        this.fields = fields;
        this.storage = storage
    }

    save(data: any){
        let result: any = {};
        for( let index in this.fields ){
            let realKey: string = this.fields[index];
            if(data.hasOwnProperty(realKey)){
                result[realKey] = data[realKey];
            } else {
                throw new Error("lost constant field!");
            }
        }
        this.storage.sync(this.name, result);
    }

    get(): any{
        return this.storage.load(this.name);
    }

    remove(){
        this.storage.remove(this.name);
    }

}

export enum TokenEnum { 
    ACCESS_TOKEN = "accessToken", 
    RENEW_FLAG = "renewFlag",
    EXPIRE_TIME = "expireTime" 
}
export const TokenConstant: StorageConstant = new StorageConstant(
    "token", 
    [
        TokenEnum.ACCESS_TOKEN, 
        TokenEnum.RENEW_FLAG, 
        TokenEnum.EXPIRE_TIME
    ],
    taroStorage
);
