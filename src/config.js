'use strict';


export const config = {
    // 是否开启debug模式, 不会请求后端接口, 使用mock的数据
    debug: false,
    // 是否开启debug模式, 不会请求后端接口, 使用mock的数据
    allowPermission: true,
    // 是否开启debug模式, 不会请求后端接口, 使用mock的数据
    allowAccess: true,
    // api默认服务
    defaultFlag: "controller-pc",

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
