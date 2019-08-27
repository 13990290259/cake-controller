import register from './Register'

export function Put(route?: string) {
    return register(Object.assign({ route }, { type: "PUT" }))
}