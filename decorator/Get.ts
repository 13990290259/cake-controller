import register from './Register'

export function Get(options?: { route?: string }) {
    return register(Object.assign(options || {}, { type: "GET" }))
}