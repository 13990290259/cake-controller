import Storage from '../index'


export function Controller(name?: string): Function {
    return (target: Function) => {
        Storage.Controllers.push({
            name: name || target.name,
            constructorName: target.name
        })
    }
}