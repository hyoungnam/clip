import React from 'react'

interface Note {
  id: string
  content: string
  width: number
  height: number
}
interface Payload extends Note {
  value: string
  left: number
  top: number
  clientX: number
  clientY: number
}

export interface INote extends Note {
  clientXY: { x: number; y: number }
  dispatch?: ({ type, payload }: IDispatch) => void
  isCreateMode?: boolean
}

export type TCreatePayload = Pick<Payload, 'clientX' | 'clientY'>
export type TUpdatePayload = Pick<Payload, 'id' | 'value' | 'width' | 'height'>
export type TdeletePayload = Pick<Payload, 'id'>
export type TdragPayload = Pick<Payload, 'id' | 'left' | 'top'>
export type TpastePayload = Pick<Payload, 'content'>

export interface IDispatch {
  type: string
  payload?: Partial<Payload>
}
export interface IButton {
  svg?: React.ReactElement
  handleOnClick?: () => void
}
