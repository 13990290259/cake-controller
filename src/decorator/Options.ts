import register from './Register'

export function Options(url?: string) {
    return register('OPTIONS', url)
}