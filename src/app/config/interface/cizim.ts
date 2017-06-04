export interface Cizim {
  title: String,
  url: URL,
  description: String,
  markdown: any,
  thumbnail: CizimImage,
  largImage: CizimImage,
  imagePath: String,
  desktopBase64: String,
  timestamp: Number
}

interface CizimImage {
  url: String,
  image: File,
  base64: String,
  name: String
}
