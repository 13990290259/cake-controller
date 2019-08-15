import register from './Register'

export function Delete(route?: string) {
    return register(Object.assign({ route }, { type: "DELETE" }))
}