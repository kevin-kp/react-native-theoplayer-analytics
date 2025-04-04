import { KeyOSDrmConfiguration } from './KeyOSDrmConfiguration';
import { ContentProtectionRequest } from 'react-native-theoplayer/src/api/drm/ContentProtectionRequest';

export function isKeyOSDrmDRMConfiguration(configuration: KeyOSDrmConfiguration): boolean {
  return configuration.integration === 'keyos_buydrm';
}

export const addConfigurationHeaders = (request: ContentProtectionRequest, configuration: KeyOSDrmConfiguration) => {
  const authorization = configuration.integrationParameters?.['x-keyos-authorization'];
  if (authorization !== undefined) {
    addHeaders(request, {
      'x-keyos-authorization': authorization,
    });
  }
  if (configuration.headers !== undefined) {
    addHeaders(request, configuration.headers);
  }
};

export const addHeaders = (request: ContentProtectionRequest, headers: { [headerName: string]: string }) => {
  request.headers = {
    ...request.headers,
    ...headers,
  };
};
