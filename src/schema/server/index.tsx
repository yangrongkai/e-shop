'use strict'

import { ServerInterface } from 'common/interfaces';


export const serverConfig: ServerInterface[] = [
    {
        flag: 'customer-mobile',
        url: "http://192.168.0.104:8011/interface/",
        description: "中台系统服务"
    },
    {
        flag: 'file',
        url: "http://192.168.0.104:8011/interface/",
        description: "文件系统服务"
    },
]
