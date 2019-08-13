import Storage from '../index'

export default function register(options: { type: string, route?: string, prefix?: string }): Function {
    return (target: Object, method: string) => {
        Storage.Actions.push({
            type: options.type,
            method,
            route: (options && options.route) || method,
            target: target.constructor,
            controller: target.constructor.name
        })
    }
}