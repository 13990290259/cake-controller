import Storage from '../index'


export function Controller(options?: { name?: string }): Function {
    return (target: Function) => {
        Storage.Controllers.push({
            name: (options && options.name) || target.name,
            constructorName: target.name
        })
    }
}