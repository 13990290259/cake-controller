import register from './Register'

export function Patch(options?: { route?: string }) {
    return register(Object.assign(options || {}, { type: "PATCH" }))
}