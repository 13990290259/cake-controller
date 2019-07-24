import * as jwt from 'jsonwebtoken'
import { Context, BaseRequest } from 'koa';

interface Request extends BaseRequest {
    body?: any
    files?: {
        [key: string]: File
    }
}

class Base {
    private _ctx: Context

    protected constructor(ctx: Context) {
        this._ctx = ctx
    }

    get ctx() {
        return this._ctx
    }

    set ctx(value: Context) {
        this.ctx = value
    }

    /**
     * 是否method请求
     * @param method 
     */
    protected isMethod(method: string) {
        return this.ctx.method === method.toUpperCase();
    }

    /**
     * 是否ajax请求
     * @param method 
     */
    protected isAjax(method) {
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
    private param(name: string, json: { [index: string]: any }) {
        if (!name) return json
        if (name.indexOf(',') > -1) {
            let arr = name.split(/\s*,\s*/)
            let value: { [index: string]: any } = {}
            arr.forEach(item => {
                value[item] = json[item]
            })
            return value
        } else {
            return json[name] || undefined
        }
    }
}

export default Base