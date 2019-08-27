import register from './Register'

export function Get(route?: string) {
    return register(Object.assign({ route }, { type: "GET" }))
}