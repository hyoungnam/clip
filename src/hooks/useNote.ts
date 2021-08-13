import React, { useReducer } from 'react'
import DOMPurify from 'dompurify'
import { nanoid } from 'nanoid'
import { NANO_SIZE } from 'libs/constants'
import { INote } from 'libs/types'

export const NOTE_ACTION = Object.freeze({
  CREATE: 'CREATE',
  UPDATE: 'UPDATE',
})

export const useNote = (initialNote = []) => {
  const [notes, dispatchNote] = useReducer(noteReducer, initialNote)
  return [notes, dispatchNote] as const
}

const noteReducer = (notes: INote[], action: any) => {
  switch (action.type) {
    case 'CREATE':
      return createNote(notes, action.payload)
    case 'UPDATE':
      return updateNote(notes, action.payload)
    default:
      return notes
  }
}

const createNote = (notes: INote[], payload: any) => {
  return [
    ...notes,
    {
      id: nanoid(NANO_SIZE),
      content: '',
      clientXY: { x: payload.clientX - 10, y: payload.clientY - 10 },
    },
  ]
}

const updateNote = (notes: INote[], payload: any) => {
  return notes.map((note) =>
    note.id === payload.id ? { ...note, content: DOMPurify.sanitize(payload.htmlString) } : note
  )
}
