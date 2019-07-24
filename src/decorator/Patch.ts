import register from './Register'

export function Patch(url?: string) {
    return register('PATCH', url)
}