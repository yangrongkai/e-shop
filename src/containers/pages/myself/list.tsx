'use strict'


export interface ListItemContent {
    title: string;
    thumb: string;
    router?: string;
}

export interface ListContent {
    key: string;
    itemList: ListItemContent[]
}

export const listContentList: ListContent[] = [
    {
        key: 'list-item--1',
        itemList: [
            {
                title: '银行卡管理',
                thumb: 'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png',
                router: '1',
            },
            {
                title: '地址管理',
                thumb: 'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png',
                router: '2',
            },
        ]
    },
    {
        key: 'list-item--2',
        itemList: [
            {
                title: '账户安全',
                thumb: 'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png',
                router: '3',
            },
            {
                title: '关于我们',
                thumb: 'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png',
                router: '4',
            },
            {
                title: '意见反馈',
                thumb: 'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png',
                router: '5',
            },
            {
                title: '修改密码',
                thumb: 'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png',
                router: '/containers/modules/account/reset/index',
            },
        ]
    },
]

