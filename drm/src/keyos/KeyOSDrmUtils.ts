import { KeyOSDrmConfiguration } from './KeyOSDrmConfiguration';
import { ContentProtectionRequest } from 'react-native-theoplayer/src/api/drm/ContentProtectionRequest';
import { KeySystemConfiguration } from 'react-native-theoplayer/src/api/source/drm/DRMConfiguration';

export function isKeyOSDrmDRMConfiguration(configuration: KeyOSDrmConfiguration): boolean {
  return configuration.integration === 'keyos_buydrm';
}

export const addConfigurationHeaders = (
  request: ContentProtectionRequest,
  drmConfiguration: KeyOSDrmConfiguration,
  keySystemConfiguration?: KeySystemConfiguration,
) => {
  const authorization = drmConfiguration.integrationParameters?.['x-keyos-authorization'];
  if (authorization !== undefined) {
    addHeaders(request, {
      'x-keyos-authorization': authorization,
    });
  }
  if (keySystemConfiguration?.headers !== undefined) {
    addHeaders(request, keySystemConfiguration.headers);
  }
};

export const addHeaders = (request: ContentProtectionRequest, headers: { [headerName: string]: string }) => {
  request.headers = {
    ...request.headers,
    ...headers,
  };
};
