import register from './Register'

export function Post(url?: string) {
    return register('POST', url)
}