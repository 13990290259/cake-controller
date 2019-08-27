import Storage from '../index'

export default function register(options: { type: string, route?: string }): Function {
    return (target: Object, method: string, descriptor: PropertyDescriptor) => {
        Storage.Actions.push({
            type: options.type,
            method,
            route: options.route || method,
            target: target.constructor,
            controller: target.constructor.name
        })
    }
}