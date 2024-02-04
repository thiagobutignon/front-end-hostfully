export const getActiveUrl = (): string => {
  const urlEnvironment = parseURL()
  switch (process.env.ACTIVE_THEME) {
    case 'default':
      return `https://${urlEnvironment}.com/api/v1`
    default:
      return `https://${urlEnvironment}.com/api/v1`
  }
}

export const parseURL = (): string => {
  switch (process.env.NODE_ENV) {
    case 'development':
      return 'stag'
    case 'production':
      return 'prod'
    default:
      return 'stag'
  }
}

export const makeUrl = (endpoint: string): string => {
  return 'https://any_url.com/api/v1' + endpoint
}
