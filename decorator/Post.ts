import register from './Register'

export function Post(route?: string) {
    return register(Object.assign({ route }, { type: "POST" }))
}