import { ContentProtectionIntegration, LicenseRequest, MaybeAsync, BufferSource } from 'react-native-theoplayer';
import { KeyOSDrmConfiguration } from './KeyOSDrmConfiguration';
import { addConfigurationHeaders, isKeyOSDrmDRMConfiguration } from './KeyOSDrmUtils';

export class KeyOSDrmPlayReadyContentProtectionIntegration implements ContentProtectionIntegration {
  private readonly contentProtectionConfiguration: KeyOSDrmConfiguration;

  constructor(configuration: KeyOSDrmConfiguration) {
    if (!isKeyOSDrmDRMConfiguration(configuration)) {
      throw new Error('Invalid KeyOSDrmConfiguration.');
    }
    this.contentProtectionConfiguration = configuration;
  }

  onLicenseRequest(request: LicenseRequest): MaybeAsync<Partial<LicenseRequest> | BufferSource> {
    if (!this.contentProtectionConfiguration.playready?.licenseAcquisitionURL) {
      throw new Error('The PlayReady KeyOS license url has not been correctly configured.');
    }
    request.url = this.contentProtectionConfiguration.playready?.licenseAcquisitionURL;
    addConfigurationHeaders(request, this.contentProtectionConfiguration, this.contentProtectionConfiguration.playready);
    return request;
  }
}
