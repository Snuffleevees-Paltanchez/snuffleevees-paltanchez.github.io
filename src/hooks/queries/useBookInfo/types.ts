interface VolumeInfo {
  title: string
  authors: string[]
  publishedDate: string
  description: string
  industryIdentifiers: IndustryIdentifier[]
  readingModes: ReadingModes
  pageCount: number
  printType: string
  categories: string[]
  averageRating: number
  ratingCount: number
  maturityRating: string
  allowAnonLogging: boolean
  contentVersion: string
  panelizationSummary: PanelizationSummary
  imageLinks: ImageLinks
  language: string
  previewLink: string
  infoLink: string
  canonicalVolumeLink: string
}

interface IndustryIdentifier {
  type: string
  identifier: string
}

interface ReadingModes {
  text: boolean
  image: boolean
}

interface PanelizationSummary {
  containsEpubBubbles: boolean
  containsImageBubbles: boolean
}

interface ImageLinks {
  smallThumbnail: string
  thumbnail: string
}

interface SaleInfo {
  country: string
  saleability: string
  isEbook: boolean
}

interface AccessInfo {
  country: string
  viewability: string
  embeddable: boolean
  publicDomain: boolean
  textToSpeechPermission: string
  epub: FormatAvailability
  pdf: FormatAvailability
  webReaderLink: string
  accessViewStatus: string
  quoteSharingAllowed: boolean
}

interface FormatAvailability {
  isAvailable: boolean
}

interface SearchInfo {
  textSnippet: string
}

interface Item {
  kind: string
  id: string
  etag: string
  selfLink: string
  volumeInfo: VolumeInfo
  saleInfo: SaleInfo
  accessInfo: AccessInfo
  searchInfo: SearchInfo
}

export interface BooksResponse {
  kind: string
  totalItems: number
  items: Item[]
}

export type BookInfo = {
  title: string
  authors: string[]
  description: string
  image: string
  publishedDate: string
}
