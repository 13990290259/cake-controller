import { Context, BaseRequest } from 'koa'
import ControllerStorage from '../index'
import { findIndex } from 'lodash'
import { DB } from 'cake-mysql'

interface Request extends BaseRequest {
    body?: any
    files?: {
        [key: string]: File
    }
}

export default class Base {
    protected ctx: Context

    constructor(ctx: Context) {
        this.ctx = ctx
    }

    /**
     * 获取DB类
     */
    protected get DB() {
        return DB
    }

    /**
     * 获取IP
     */
    protected get ip(): string {
        return this.ctx.request.ip
    }

    /**
     * 当前访问域名包括端口号
     */
    protected get host(): string {
        return this.ctx.request.host
    }

    /**
     * 当前访问域名
     */
    protected get hostname(): string {
        return this.ctx.request.hostname
    }

    /**
     * 当前URL 不含querystring
     */
    protected get baseUrl(): string {
        return this.ctx.request.origin + this.ctx.request.path
    }

    /**
     * 完整URL
     */
    protected get url(): string {
        return this.ctx.request.href
    }

    /**
     * 是否method请求
     * @param method 
     */
    protected isMethod(method: string): boolean {
        return this.ctx.method === method.toUpperCase();
    }

    /**
     * 是否ajax请求
     * @param method 
     */
    protected isAjax(method: string): boolean {
        if (method && !this.isMethod(method)) return false
        return this.ctx.header['x-requested-with'] === 'XMLHttpRequest'
    }

    /**
     * 获取post参数
     * @param name 
     */
    protected post(name?: string) {
        const json = (this.ctx.request as Request).body
        return this.param(name, json)
    }

    /**
     * 获取文件
     * @param name 
     */
    protected files(name?: string) {
        const json = (this.ctx.request as Request).files
        return this.param(name, json)
    }

    /**
     * 获取get参数
     * @param name 
     */
    protected get(name?: string) {
        const json = this.ctx.request.query
        return this.param(name, json)
    }

    /**
     * 获取参数
     * @param name 
     * @param json 
     */
    private param(name: string, json: { [index: string]: any }): { [index: string]: any } {
        if (!name) return json
        if (name.includes(',')) {
            let arr = name.split(/\s*,\s*/)
            let value: { [index: string]: any } = {}
            arr.forEach(item => {
                if (json[item] !== undefined) value[item] = json[item]
            })
            return value
        } else {
            return json[name] || {}
        }
    }

    /**
     * 抛出错误
     * @param msg 
     * @param code 
     */
    protected error(msg: string, code: number = 500): void {
        this.ctx.throw(msg, code)
    }

    /**
     * 调用控制器下的方法
     * @param controller 
     * @param method 
     */
    protected async action(controller: string, method: string): Promise<any> {
        let index: number = findIndex(ControllerStorage.Actions, { controller, method })
        if (index == -1) this.error('Not Found')
        const instance = new ControllerStorage.Actions[index].target(this.ctx)
        return await instance[ControllerStorage.Actions[index].method]()
    }

    /**
     * session
     * @param name 
     * @param value 
     */
    protected session(name: string | null, value?: any) {
        if (value) {
            return this.ctx.session[name] = value
        } else {
            if (name == null) {
                this.ctx.session = null
                return false
            } else {
                if (!this.ctx.session) return false
                return this.ctx.session[name]
            }
        }
    }
}