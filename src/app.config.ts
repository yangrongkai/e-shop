'use strict'


export default {
  pages: [
    'containers/base/login/index',
    'containers/pages/home/index',
    'containers/pages/myself/index',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    color: "#666",
    selectedColor: "#b4282d",
    backgroundColor: "#fafafa",
    borderStyle: 'black',
    list: [{
      pagePath: "containers/pages/home/index",
      iconPath: "/assets/image/app/myself-tornado-back-icon.svg",
      selectedIconPath: "/assets/image/app/myself-tornado-front-icon.svg",
      text: "购物风"
    }, {
      pagePath: "containers/pages/myself/index",
      iconPath: "/assets/image/app/home-back-icon.svg",
      selectedIconPath: "/assets/image/app/home-front-icon.svg",
      text: "我的"
    }]
  }
}