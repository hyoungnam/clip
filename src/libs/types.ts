import React from 'react'

export interface INote {
  id: string
  content: string
  width: number
  height: number
  clientXY: { x: number; y: number }
  dispatch?: ({ type, payload }: INoteDispatch) => void
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
