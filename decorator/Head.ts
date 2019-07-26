import register from './Register'

export function Head(url?: string) {
    return register('HEAD', url)
}