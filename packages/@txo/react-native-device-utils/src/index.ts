/**
 * @Author: Rostislav Simonik <rostislav.simonik>
 * @Date:   2017-05-26T10:43:16+02:00
 * @Email:  rostislav.simonik@technologystudio.sk
 * @Copyright: Technology Studio
**/

import * as Keychain from 'react-native-keychain'
import DeviceInfo from 'react-native-device-info'
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
    if (deviceId) {
      return Promise.resolve(deviceId)
    } else {
      return Keychain.getGenericPassword({
        service: KEYCHAIN_SERVICE_DEVICE_ID,
        accessGroup: iosKeychainAccessGroup,
      }).then((credentials) => {
        if (typeof credentials !== 'object') {
          const newDeviceId = DeviceInfo.getUniqueId()
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
  return Promise.resolve(uuidv3(DeviceInfo.getUniqueId(), uuidv3.DNS))
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

export const getDeviceName: () => string = DeviceInfo.getDeviceNameSync

export const getDeviceModel = (): string => {
  if (Platform.OS === 'ios') {
    const deviceId = DeviceInfo.getDeviceId()
    const iosDeviceModel: string | null = iosDevices.generationByIdentifier(deviceId)
    return iosDeviceModel ?? `Not mapped (${deviceId})`
  }
  return DeviceInfo.getModel()
}

let _isTablet: boolean | undefined

export const isTablet = (): boolean => {
  if (typeof _isTablet !== 'boolean') {
    _isTablet = DeviceInfo.isTablet()
  }
  return !!_isTablet
}
