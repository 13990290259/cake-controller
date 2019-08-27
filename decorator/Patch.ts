import register from './Register'

export function Patch(route?: string) {
    return register(Object.assign({ route }, { type: "PATCH" }))
}