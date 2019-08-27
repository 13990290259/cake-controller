import * as requireDirectory from 'require-directory'
import * as koa from 'koa'
import { findIndex } from 'lodash'
import { resolve, join } from 'path'

export default class ControllerStorage {
    
    public static Actions: { type: string, method: string, route: string, controller: string, target: any }[] = []


    /**
     * 加载路由
     */
    public static loadRouter() {
        const apiDirectory: string = resolve(join('dist', 'controller'))
        requireDirectory(module, apiDirectory)
    }

    /**
     * 调用控制器
     * @param ctx 
     * @param next 
     */
    public static async invokeController(ctx: koa.Context, next: Function) {
        // 解析路由
        let [controller, method]: string[] = ctx.path.substr(ctx.path.indexOf('/') + 1).split('/')
        if (!controller) controller = 'index'
        if (!method) method = 'index'
        // 方法不存在
        let index: number = findIndex(ControllerStorage.Actions, { controller, route: method })
        if (index == -1) ctx.throw(404)
        // 不允许访问
        if (ControllerStorage.Actions[index].type != ctx.method) ctx.throw(405)
        try {
            // 实例化
            const instance = new ControllerStorage.Actions[index].target(ctx)
            const r = await instance[ControllerStorage.Actions[index].method]()
            ctx.body = r === undefined ? {} : r
        } catch (error) {
            ctx.throw(error.statusCode || error.status || 500, error.message)
        } finally {
            await next()
        }
    }
}

ControllerStorage.loadRouter()