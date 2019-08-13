import register from './Register'

export function Post(options?: { route?: string }) {
    return register(Object.assign(options || {}, { type: "POST" }))
}