export interface SingleElementType {
  id: string
  type?: string
  src?: any
  alt?: string
  content?: string
  position: {
    position: any
    top: string
    left: string
  }
}

export interface PopupDataType {
  mainPopup: {
    background: string
  }
  button: {
    background: string
    color: string
  }
  text: {
    color: string
  }
}
