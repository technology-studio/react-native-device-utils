/**
 * @Author: Rostislav Simonik <rostislav.simonik>
 * @Date:   2017-06-07T21:42:17+02:00
 * @Email:  rostislav.simonik@technologystudio.sk
 * @Copyright: Technology Studio
 * @flow
 */

declare module 'react-native-device-info' {
  declare module.exports: {
    getUniqueID: () => string,
    getManufacturer: () => string,
    getBrand: () => string,
    getModel: () => string,
    getDeviceId: () => string,
    getSystemName: () => string,
    getSystemVersion: () => string,
    getBundleId: () => string,
    getApplicationName: () => string,
    getBuildNumber: () => string,
    getVersion: () => string,
    getReadableVersion: () => string,
    getDeviceName: () => string,
    getUserAgent: () => string,
    getDeviceLocale: () => string,
    getDeviceCountry: () => string,
    getTimezone: () => string,
    getInstanceID: () => string,
    getInstallReferrer: () => string,
    isEmulator: () => boolean,
    isTablet: () => boolean,
    getFontScale: () => number,
    is24Hour: () => boolean,
    isPinOrFingerprintSet: () => (
      cb: (isPinOrFingerprintSet: boolean) => void
    ) => void,
    hasNotch: () => boolean,
    getFirstInstallTime: () => number,
    getLastUpdateTime: () => number,
    getSerialNumber: () => string,
    getAPILevel: () => number,
    getIPAddress: () => Promise<string>,
    getMACAddress: () => Promise<string>,
    getPhoneNumber: () => ?string,
    getCarrier: () => string,
    getTotalMemory: () => number,
    getMaxMemory: () => number,
    getTotalDiskCapacity: () => number,
    getFreeDiskStorage: () => number,
    getBatteryLevel: () => Promise<number>,
    isLandscape: () => boolean,
    isAirPlaneMode: () => Promise<boolean>,
  };
}
