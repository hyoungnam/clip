import React from 'react'

export interface INote {
  id: string
  content: string
  clientXY: { x: number; y: number }
  updateNote?: (id: string, htmlString: string) => void
}
export interface IButton {
  svg?: React.ReactElement
  handleOnClick?: () => void
}
