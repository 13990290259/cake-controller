import register from './Register'

export function Delete(url?: string) {
    return register('DELETE', url)
}