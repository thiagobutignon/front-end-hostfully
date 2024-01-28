export const getActiveUrl = (): string => {
  const urlEnvironment = parseURL()
  switch (process.env.ACTIVE_THEME) {
    case 'rivage':
      return `https://${urlEnvironment}.metaoriginal.com/api/v1`
    case 'fisher-island':
      return `https://${urlEnvironment}.metaoriginal.com/api/v1`
    default:
      return `https://${urlEnvironment}.metaoriginal.com/api/v1`
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

// export const makeUrl = (endpoint: string): string => {
//   return getActiveUrl() + endpoint
export const makeUrl = (endpoint: string): string => {
  return 'https://staging.metaoriginal.com/api/v1' + endpoint
}
