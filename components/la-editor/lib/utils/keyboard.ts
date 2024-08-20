import { isMacOS } from './platform'

export function getShortcutKey(key: string) {
  const lowercaseKey = key.toLowerCase()
  if (lowercaseKey === 'mod') {
    return isMacOS() ? { symbol: '⌘', readable: 'Command' } : { symbol: 'Ctrl', readable: 'Control' }
  } else if (lowercaseKey === 'alt') {
    return isMacOS() ? { symbol: '⌥', readable: 'Option' } : { symbol: 'Alt', readable: 'Alt' }
  } else if (lowercaseKey === 'shift') {
    return isMacOS() ? { symbol: '⇧', readable: 'Shift' } : { symbol: 'Shift', readable: 'Shift' }
  } else {
    return { symbol: key, readable: key }
  }
}

export const getShortcutKeys = (keys: string | string[], separator: string = '') => {
  const keyArray = Array.isArray(keys) ? keys : keys.split(/\s+/)
  const shortcutKeys = keyArray.map(getShortcutKey)
  return shortcutKeys.join(separator)
}

export default { getShortcutKey, getShortcutKeys }
