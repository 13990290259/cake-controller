import * as requireDirectory from 'require-directory'
import * as koa from 'koa'
import { findIndex } from 'lodash'
import { resolve, join } from 'path'

export default class ControllerStorage {

    constructor(app: koa) {
        this.init(app)
    }

    public static Controllers: { name: string, constructorName: string }[] = []

    public static Actions: { type: string, method: string, route: string, controller: string, target: any }[] = []

    private init(app: koa) {
        ControllerStorage.loadRouter()
        app.use(this.invokeController)
    }

    /**
     * 加载路由
     */
    private static loadRouter() {
        const apiDirectory: string = resolve(join('dist', 'controller'))
        requireDirectory(module, apiDirectory)
    }

    /**
     * 调用控制器
     * @param ctx 
     * @param next 
     */
    private async invokeController(ctx: koa.Context, next: Function) {
        // 解析路由
        let [controller, method]: string[] = ctx.path.substr(ctx.path.indexOf('/') + 1).split('/')
        if (!controller) controller = 'index'
        if (!method) method = 'index'

        let controllerIndex: number = findIndex(ControllerStorage.Controllers, { name: controller })
        // 控制器不存在
        if (controllerIndex == -1) ctx.throw(404)

        let actionsIndex: number = findIndex(ControllerStorage.Actions, { controller: ControllerStorage.Controllers[controllerIndex].constructorName, route: method })
        // 方法不存在
        if (actionsIndex == -1) ctx.throw(404)
        // 不允许访问
        if (ControllerStorage.Actions[actionsIndex].type != ctx.method) ctx.throw(405)
        try {
            // 实例化
            const instance = new ControllerStorage.Actions[actionsIndex].target(ctx)
            ctx.body = await instance[ControllerStorage.Actions[actionsIndex].method]() || ""
        } catch (error) {
            ctx.throw(500, error.message)
        } finally {
            await next()
        }
    }
}