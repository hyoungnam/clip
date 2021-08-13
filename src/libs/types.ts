import React from 'react'

export interface INote {
  id: string
  content: string
  clientXY: { x: number; y: number }
  dispatchNote?: ({ type, payload }: INoteDispatch) => void
  isCreateMode?: boolean
}
export interface INoteDispatch {
  type: string
  payload: any
}
export interface IButton {
  svg?: React.ReactElement
  handleOnClick?: () => void
}
