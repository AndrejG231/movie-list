/**
 * Movie Api response types
 * Generated by:
 * >> https://jvilk.com/MakeTypes/
 */
export interface IMovie {
  name: string
  shortName: string
  iconUri: string
  manifestUri: string
  source: string
  focus: boolean
  disabled: boolean
  extraText?: (ExtraTextEntity | null)[] | null
  certificateUri?: null
  description?: string | null
  isFeatured: boolean
  drm?: string[] | null
  features?: string[] | null
  licenseServers: LicenseServers
  licenseRequestHeaders: LicenseRequestHeaders
  requestFilter?: null
  responseFilter?: null
  clearKeys: LicenseServersOrLicenseRequestHeadersOrClearKeys
  extraConfig?: ExtraConfig | null
  adTagUri?: string | null
  imaVideoId?: string | null
  imaAssetKey?: string | null
  imaContentSrcId?: number | null
  mimeType?: null
  mediaPlaylistFullMimeType?: string | null
  storedProgress: number
  storedContent?: StoredContent | null
}

export interface ExtraTextEntity {
  uri: string
  language: string
  kind: string
  mime: string
}

export interface LicenseServers {
  "com.widevine.alpha"?: string | null
  "org.w3.clearkey"?: string | null
  "com.microsoft.playready"?: string | null
}

export interface LicenseRequestHeaders {
  "X-AxDRM-Message"?: string | null
}

export interface LicenseServersOrLicenseRequestHeadersOrClearKeys {}

export type ExtraConfig = {
  [Category in string]?: {
    [SubCaregory in string]?: {
      [Option in string]?: string
    }
  }
}

export interface StoredContent {
  offlineUri: string
  originalManifestUri: string
  duration: number
  size: number
  expiration?: null
  tracks?: TracksEntity[] | null
  appMetadata: AppMetadata
  isIncomplete: boolean
}

export interface TracksEntity {
  id: number
  active: boolean
  type: string
  bandwidth: number
  language: string
  label?: string | null
  kind?: null
  width: number
  height: number
  frameRate?: number | null
  pixelAspectRatio?: null
  hdr?: null
  mimeType: string
  audioMimeType: string
  videoMimeType: string
  codecs: string
  audioCodec: string
  videoCodec: string
  primary: boolean
  roles?: null[] | null
  audioRoles?: null[] | null
  forced: boolean
  videoId: number
  audioId: number
  channelsCount?: null
  audioSamplingRate?: null
  spatialAudio: boolean
  tilesLayout?: null
  audioBandwidth?: null
  videoBandwidth?: null
  originalVideoId?: number | null
  originalAudioId: string | number
  originalTextId?: null
  originalImageId?: null
}

export interface AppMetadata {
  identifier: string
  downloaded: string
}
