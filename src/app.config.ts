'use strict'


export default {
    pages: [
        'containers/pages/home/index',
        'containers/pages/myself/index',
        'containers/base/login/index',
    ],
    subpackages: [
        {
            "root": "containers/modules/",
            "pages": [
                "account/reset/index",
                'person/edit/index',
            ]
        }
    ],
    window: {
        backgroundColor: '#fafbfc',
        backgroundTextStyle: 'light',
        navigationBarBackgroundColor: '#fafbfc',
        navigationBarTitleText: 'WeChat',
        navigationBarTextStyle: 'black'
    },
    tabBar: {
        color: "#666",
        selectedColor: "#b4282d",
        backgroundColor: "#fafbfc",
        borderStyle: 'black',
        list: [{
            pagePath: "containers/pages/home/index",
            iconPath: "./assets/image/app/myself-tornado-back-icon.png",
            selectedIconPath: "./assets/image/app/myself-tornado-front-icon.png",
            text: "购物风"
        }, {
            pagePath: "containers/pages/myself/index",
            iconPath: "./assets/image/app/home-back-icon.png",
            selectedIconPath: "./assets/image/app/home-front-icon.png",
            text: "我的"
        }]
    }
}
