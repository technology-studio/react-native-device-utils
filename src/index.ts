/**
 * @Author: Rostislav Simonik <rostislav.simonik>
 * @Date:   2017-05-26T10:43:16+02:00
 * @Email:  rostislav.simonik@technologystudio.sk
 * @Copyright: Technology Studio
**/

import * as Keychain from 'react-native-keychain'
import {
  getUniqueIdSync,
  getSystemVersion,
  getVersion,
  getDeviceNameSync,
  getDeviceId,
  getModel,
  isTablet as deviceInfoIsTablet,
} from 'react-native-device-info'
import { Platform } from 'react-native'
import { v3 as uuidv3 } from 'uuid'
import iosDevices from 'ios-device-list'

const KEYCHAIN_USERNAME_DEVICE_ID = 'deviceId'
const KEYCHAIN_SERVICE_DEVICE_ID = 'sk.technologystudio.deviceId'

let deviceId: string | null = null

export type DeviceConfig = {
  iosKeychainAccessGroup: string,
}

export const getUniqueDeviceId = async ({ iosKeychainAccessGroup }: DeviceConfig): Promise<string> => {
  if (Platform.OS === 'ios') {
    if (deviceId != null && deviceId !== '') {
      return await Promise.resolve(deviceId)
    } else {
      return await Keychain.getGenericPassword({
        service: KEYCHAIN_SERVICE_DEVICE_ID,
        accessGroup: iosKeychainAccessGroup,
      }).then(async (credentials) => {
        if (typeof credentials !== 'object') {
          const newDeviceId = getUniqueIdSync()
          deviceId = newDeviceId
          return await Keychain.setGenericPassword(KEYCHAIN_USERNAME_DEVICE_ID, newDeviceId, {
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
  return await Promise.resolve(uuidv3(getUniqueIdSync(), uuidv3.DNS))
}

export const getPlatformKey = (): string => Platform.OS

export const getPlatformVersion = (): string => getSystemVersion()

export const getApplicationVersion = (): string => getVersion()

export const _resetUniqueDeviceId = ({ iosKeychainAccessGroup }: DeviceConfig): void => {
  if (Platform.OS === 'ios') {
    void Keychain.resetGenericPassword({
      service: KEYCHAIN_SERVICE_DEVICE_ID,
      accessGroup: iosKeychainAccessGroup,
    }).then(() => {
      void Keychain.getGenericPassword({
        accessGroup: iosKeychainAccessGroup,
        service: KEYCHAIN_SERVICE_DEVICE_ID,
      }).then(() => undefined)
    })
  }
}

export const getDeviceName: () => string = getDeviceNameSync

export const getDeviceModel = (): string => {
  if (Platform.OS === 'ios') {
    const deviceId = getDeviceId()
    const iosDeviceModel: string | null = iosDevices.generationByIdentifier(deviceId)
    return iosDeviceModel ?? `Not mapped (${deviceId})`
  }
  return getModel()
}

let _isTablet: boolean | undefined

export const isTablet = (): boolean => {
  if (typeof _isTablet !== 'boolean') {
    _isTablet = deviceInfoIsTablet()
  }
  return !!_isTablet
}
