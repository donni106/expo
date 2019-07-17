import { Platform, UnavailabilityError } from '@unimodules/core';
import ExpoDevice from './ExpoDevice';
import { deviceNamesByCode } from './DeviceNameByCode';
import { DeviceType as _DeviceType } from './Device.types';
export { _DeviceType as DeviceType };
export const brand = ExpoDevice ? ExpoDevice.brand : null;
export const manufacturer = ExpoDevice ? ExpoDevice.manufacturer : null;
export let modelName;
export let osBuildFingerprint;
export let modelId;
export let designName;
export let productName;
export let platformApiLevel;
if (Platform.OS === 'ios') {
    let IosDeviceName;
    let IosModelId = ExpoDevice.modelId;
    if (IosModelId) {
        IosDeviceName = deviceNamesByCode[IosModelId];
        if (!IosDeviceName) {
            // Not found on database. At least guess main device type from string contents:
            if (IosModelId.startsWith('iPod')) {
                IosDeviceName = 'iPod Touch';
            }
            else if (IosModelId.startsWith('iPad')) {
                IosDeviceName = 'iPad';
            }
            else if (IosModelId.startsWith('iPhone')) {
                IosDeviceName = 'iPhone';
            }
            else if (IosModelId.startsWith('AppleTV')) {
                IosDeviceName = 'Apple TV';
            }
        }
    }
    modelName = IosDeviceName;
    osBuildFingerprint = null;
    modelId = ExpoDevice ? ExpoDevice.m : null;
    designName = null;
    productName = null;
    platformApiLevel = null;
}
else {
    modelName = ExpoDevice ? ExpoDevice.modelName : null;
    osBuildFingerprint = ExpoDevice ? ExpoDevice.osBuildFingerprint : null;
    modelId = null;
    designName = ExpoDevice ? ExpoDevice.designName : null;
    productName = ExpoDevice ? ExpoDevice.productName : null;
    platformApiLevel = ExpoDevice ? ExpoDevice.platformApiLevel : null;
}
export const osName = ExpoDevice ? ExpoDevice.osName : null;
export const totalMemory = ExpoDevice ? ExpoDevice.totalMemory : null;
export const isDevice = ExpoDevice ? ExpoDevice.isDevice : null;
export const supportedCpuArchitectures = ExpoDevice ? ExpoDevice.supportedCpuArchitectures : null;
export const osBuildId = ExpoDevice ? ExpoDevice.osBuildId : null;
export const osVersion = ExpoDevice ? ExpoDevice.osVersion : null;
export const deviceName = ExpoDevice ? ExpoDevice.deviceName : null;
export const osInternalBuildId = ExpoDevice ? ExpoDevice.osInternalBuildId : null;
export const deviceYearClass = ExpoDevice ? ExpoDevice.deviceYearClass : null;
export async function hasPlatformFeatureAsync(feature) {
    if (!ExpoDevice.hasPlatformFeatureAsync) {
        throw new UnavailabilityError('expo-device', 'hasPlatformFeatureAsync');
    }
    return await ExpoDevice.hasPlatformFeatureAsync(feature);
}
export async function getPlatformFeaturesAsync() {
    if (!ExpoDevice.getPlatformFeaturesAsync) {
        throw new UnavailabilityError('expo-device', 'getPlatformFeaturesAsync');
    }
    return await ExpoDevice.getPlatformFeaturesAsync();
}
export async function getMaxMemoryAsync() {
    if (!ExpoDevice.getMaxMemoryAsync) {
        throw new UnavailabilityError('expo-device', 'getMaxMemoryAsync');
    }
    let maxMemory = await ExpoDevice.getMaxMemoryAsync();
    if (maxMemory === -1) {
        maxMemory = Number.MAX_SAFE_INTEGER;
    }
    return Promise.resolve(maxMemory);
}
export async function isSideLoadingEnabledAsync() {
    if (!ExpoDevice.isSideLoadingEnabledAsync) {
        throw new UnavailabilityError('expo-device', 'isSideLoadingEnabledAsync');
    }
    return await ExpoDevice.isSideLoadingEnabledAsync();
}
export async function getUptimeAsync() {
    if (!ExpoDevice.getUptimeAsync) {
        throw new UnavailabilityError('expo-device', 'getUptimeAsync');
    }
    return await ExpoDevice.getUptimeAsync();
}
export async function isRootedExperimentalAsync() {
    if (!ExpoDevice.isRootedExperimentalAsync) {
        throw new UnavailabilityError('expo-device', 'isRootedExperimentalAsync');
    }
    return await ExpoDevice.isRootedExperimentalAsync();
}
export async function getDeviceTypeAsync() {
    if (!ExpoDevice.getDeviceTypeAsync) {
        throw new UnavailabilityError('expo-device', 'getDeviceTypeAsync');
    }
    const deviceType = await ExpoDevice.getDeviceTypeAsync();
    switch (deviceType) {
        case _DeviceType.PHONE:
            return _DeviceType.PHONE;
        case _DeviceType.TABLET:
            return _DeviceType.TABLET;
        case _DeviceType.TV:
            return _DeviceType.TV;
        case _DeviceType.DESKTOP:
            return _DeviceType.DESKTOP;
        default:
            return _DeviceType.UNKNOWN;
    }
}
//# sourceMappingURL=Device.js.map