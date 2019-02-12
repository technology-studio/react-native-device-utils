/**
 * @Author: Rostislav Simonik <rostislav.simonik>
 * @Date:   2017-05-26T10:43:16+02:00
 * @Email:  rostislav.simonik@technologystudio.sk
 * @Copyright: Technology Studio
 * @flow
 */

import * as Keychain from 'react-native-keychain'
import DeviceInfo from 'react-native-device-info'
import { Platform } from 'react-native'
import uuidByString from 'uuid-by-string'

const KEYCHAIN_USERNAME_DEVICE_ID = 'deviceId'
const KEYCHAIN_SERVICE_DEVICE_ID = 'sk.technologystudio.deviceId'

var deviceId: ?string = null

export type DeviceConfig = {
  iosKeychainAccessGroup: string,
}

export const getUniqueDeviceId = ({ iosKeychainAccessGroup }: DeviceConfig): Promise<string> => {
  if (Platform.OS === 'ios') {
    if (deviceId) {
      return Promise.resolve(deviceId)
    } else {
      return Keychain.getGenericPassword({
        service: KEYCHAIN_SERVICE_DEVICE_ID,
        accessGroup: iosKeychainAccessGroup,
      }).then((credentials) => {
        if (typeof credentials !== 'object') {
          const newDeviceId = DeviceInfo.getUniqueID()
          deviceId = newDeviceId
          return Keychain.setGenericPassword(KEYCHAIN_USERNAME_DEVICE_ID, newDeviceId, {
            service: KEYCHAIN_SERVICE_DEVICE_ID,
            accessGroup: iosKeychainAccessGroup,
          }).then(() => newDeviceId)
        } else {
          deviceId = credentials.password
          return deviceId
        }
      })
    }
  }
  return Promise.resolve(uuidByString(DeviceInfo.getUniqueID()))
}

export const getPlatformKey = (): string => {
  return Platform.OS
}

export const getPlatformVersion = (): string => {
  return DeviceInfo.getSystemVersion()
}

export const getApplicationVersion = (): string => {
  return DeviceInfo.getVersion()
}

export const _resetUniqueDeviceId = ({ iosKeychainAccessGroup }: DeviceConfig) => {
  if (Platform.OS === 'ios') {
    Keychain.resetGenericPassword({
      service: KEYCHAIN_SERVICE_DEVICE_ID,
      accessGroup: iosKeychainAccessGroup,
    }).then(() => {
      Keychain.getGenericPassword({
        accessGroup: iosKeychainAccessGroup,
        service: KEYCHAIN_SERVICE_DEVICE_ID,
      }).then(() => {})
    })
  }
}
