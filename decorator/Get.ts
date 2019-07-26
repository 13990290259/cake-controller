import register from './Register'

export function Get(url?: string) {
    return register('GET', url)
}