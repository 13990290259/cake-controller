import register from './Register'

export function Delete(options?: { route?: string }) {
    return register(Object.assign(options || {}, { type: "DELETE" }))
}