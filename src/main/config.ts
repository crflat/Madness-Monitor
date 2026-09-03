export function getCBBD_API_KEY(): string {
  const apiKey = import.meta.env.CBBD_API_KEY
  if (!apiKey) {
    throw new Error('CBBD_API_KEY is not defined in the environment variables.')
  }
  return apiKey
}
