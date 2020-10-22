'use strict'


export interface GridContent {
    image: string;
    value: string;
    router?: string;
}

export interface CardContent {
    key: string;
    title: string;
    itemList: GridContent[]
}

export const cardContentList: CardContent[] = [
    {
        key: 'myself-wallet',
        title: "我的钱包",
        itemList: [
            {
                image: 'https://img20.360buyimg.com/jdphoto/s72x72_jfs/t15151/308/1012305375/2300/536ee6ef/5a411466N040a074b.png',
                value: '我的余额',
                router:'1',
            },
            {
                image: 'https://img10.360buyimg.com/jdphoto/s72x72_jfs/t5872/209/5240187906/2872/8fa98cd/595c3b2aN4155b931.png',
                value: '我的充值',
                router:'2',
            },
            {
                image: 'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t10660/330/203667368/1672/801735d7/59c85643N31e68303.png',
                value: '我的账单',
                router:'3',
            },
        ]
    },
    {
        key: 'myself-order',
        title: "我的订单",
        itemList: [
            {
                image: 'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png',
                value: '未支付',
                router: '1',
            },
            {
                image: 'https://img20.360buyimg.com/jdphoto/s72x72_jfs/t15151/308/1012305375/2300/536ee6ef/5a411466N040a074b.png',
                value: '待收货',
                router: '2',
            },
            {
                image: 'https://img10.360buyimg.com/jdphoto/s72x72_jfs/t5872/209/5240187906/2872/8fa98cd/595c3b2aN4155b931.png',
                value: '已完成',
                router: '3',
            },
            {
                image: 'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t10660/330/203667368/1672/801735d7/59c85643N31e68303.png',
                value: '全部订单',
                router: '4',
            },
        ]
    },
]
