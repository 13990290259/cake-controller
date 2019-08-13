import register from './Register'

export function Put(options?: { route?: string }) {
    return register(Object.assign(options || {}, { type: "PUT" }))
}