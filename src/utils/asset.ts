const base = import.meta.env.BASE_URL

export function asset(path: string): string {
  const cleanPath = path.startsWith('/') ? path.slice(1) : path
  return `${base}${cleanPath}`
}
