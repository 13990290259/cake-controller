import register from './Register'

export function Put(url?: string) {
    return register('PUT', url)
}