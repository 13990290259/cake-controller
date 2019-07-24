import Storage from '../index'

export default function register(type: string, url?: string): Function {
    return (target: Object, methodName: string) => {
        let name: string = target.constructor.name
        if (Storage.Controllers.includes(name) == false) Storage.Controllers.push(name)
        Storage.Actions.push({
            type,
            target: target.constructor,
            method: methodName,
            route: url || methodName,
            controller: name
        })
    }
}