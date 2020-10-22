'use strict';


export const config = {
    // 是否开启debug模式, 不会请求后端接口, 使用mock的数据
    debug: false,
    // 是否开启debug模式, 不会请求后端接口, 使用mock的数据
    allowPermission: true,
    // 是否开启debug模式, 不会请求后端接口, 使用mock的数据
    allowAccess: true,
    // api默认服务
    default: {
        nick: "请设置您的昵称 ^_^!",
        headUrl: "http://storage.360buyimg.com/mtd/home/32443566_635798770100444_2113947400891531264_n1533825816008.jpg",

        serverFlag: "customer-mobile",
        loginRouter: "/containers/base/login/index",
    },

    log: {
        // 日志级别, 类似slf4j中的root logger, 目前支持debug/info/warn/error 4种级别
        level: 'debug',
        // 除了root logger以外, 也可以为每个logger单独设置级别
        debug: [],
        info: [],
        warn: [],
        // 示例, 对于loggerA和loggerB使用error级别, 其他logger使用默认的info级别
        error: ['loggerA', 'loggerB'],
    },
};
