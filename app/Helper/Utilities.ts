import _ from 'lodash'

export const delay = (time) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(time)
    }, time)
  })
}

export const removeWwwDomain = (domain) => {
  try {
    return domain.replaceAll('www.', '')
  } catch (_e) {
    return domain
  }
}

export const getPlainDomain = (fullDomain) => {
  try {
    let splited = fullDomain.split('//')
    let res = splited[1] ?? splited[0]
    splited = res.split(':')
    res = splited[0]
    splited = res.split('/')
    res = splited[0]
    return res
  } catch (_e) {
    return fullDomain
  }
}

export const getPlainUrl = (originalUrl) => {
  let onlyUrl = originalUrl

  try {
    const url = new URL(originalUrl)
    onlyUrl = url.pathname
  } catch (e) {}

  onlyUrl.replaceAll('//', '/')

  return onlyUrl
}

export const getIndexSearch = (fullText: any, search: any) => {
  fullText = _.toString(fullText).toLowerCase()
  search = _.toString(search).toLocaleLowerCase()

  let result: number[] = []

  let idx: number | null = fullText.indexOf(search)

  while (idx !== -1) {
    result.push(idx as number)
    idx = fullText.indexOf(search, (idx || 0) + 1)
  }
  return result
}

export const removeNonUtf8Character = (str: string) => {
  const encoder = new TextEncoder()
  const decoder = new TextDecoder('utf-8', { fatal: true })

  const encodedData = encoder.encode(str)
  const decodedString = decoder.decode(encodedData)

  const regex: any = /[^\u0000-\u007F]/g
  return decodedString.replace(regex, '')
}