import { useState } from 'react'
import { nanoid } from 'nanoid'
import { NANO_SIZE } from 'libs/constants'
import { INote } from 'libs/types'
import { storage } from 'storage'
import { handleError } from 'storage/handleError'
import { blurActiveElement } from 'libs/utils'

export const ACTION = Object.freeze({
  CREATE: 'CREATE',
  CREATE_QUICK: 'CREATE_QUICK',
  READ: 'READ',
  UPDATE: 'UPDATE',
  DELETE: 'DELETE',
  DRAG: 'DRAG',
  PASTE: 'PASTE',
})

export const useNote = (initialNote = []) => {
  const [notes, setNotes] = useState<INote[]>(initialNote)

  const dispatch = (action: { type: string; payload?: any }) => {
    switch (action.type) {
      case 'CREATE':
        createNote(notes, action.payload, setNotes)
        break
      case 'CREATE_QUICK':
        createQuickNote(notes, setNotes)
        break
      case 'READ':
        readNotes(setNotes)
        break
      case 'UPDATE':
        updateNote(notes, action.payload, setNotes)
        break
      case 'DELETE':
        deleteNote(notes, action.payload, setNotes)
        break
      case 'DRAG':
        dragNote(notes, action.payload, setNotes)
        break
      case 'PASTE':
        pasteNote(notes, action.payload, setNotes)
        break
      default:
        notes
    }
  }
  return [notes, dispatch] as const
}

const createNote = (
  prevNotes: INote[],
  payload: { clientX: number; clientY: number },
  setNotes: (notes: INote[]) => void
) => {
  const id = nanoid(NANO_SIZE)
  const note = {
    id,
    content: '',
    width: 20,
    height: 20,
    clientXY: { x: payload.clientX - 10, y: payload.clientY - 10 },
  }
  const notes = [...prevNotes, note]

  storage()
    .set(id, note)
    .then(() => setNotes(notes))
    .catch(handleError)
}

const createQuickNote = (prevNotes: INote[], setNotes: (notes: INote[]) => void) => {
  const id = nanoid(NANO_SIZE)
  const note = {
    id,
    content: '',
    width: 144,
    height: 144,
    clientXY: { x: 32, y: 32 },
  }
  const notes = [...prevNotes, note]

  storage()
    .set(id, note)
    .then(() => {
      setNotes(notes)
    })
    .catch(handleError)
}

const readNotes = (setNotes: (notes: INote[]) => void) => {
  storage()
    .get()
    .then((notes) => {
      setNotes(notes)
      blurActiveElement()
    })
    .catch(handleError)
}

const updateNote = (
  prevNotes: INote[],
  payload: { id: string; value: string; width: number; height: number },
  setNotes: (notes: INote[]) => void
) => {
  const note = {
    ...prevNotes.find((note) => note.id === payload.id),
    content: payload.value,
    width: payload.width,
    height: payload.height,
  } as INote
  const notes = prevNotes.map((prevNote) => (prevNote.id === payload.id ? note : prevNote))

  storage()
    .set(payload.id, note)
    .then(() => setNotes(notes))
    .catch(handleError)
}
const deleteNote = (
  prevNotes: INote[],
  payload: { id: string },
  setNotes: (notes: INote[]) => void
) => {
  const notes = prevNotes.filter((note) => note.id !== payload.id)

  storage()
    .remove(payload.id)
    .then(() => setNotes(notes))
    .catch(handleError)
}

const dragNote = (
  prevNotes: INote[],
  payload: { id: string; left: number; top: number },
  setNotes: (notes: INote[]) => void
) => {
  const note = {
    ...prevNotes.find((note) => note.id === payload.id),
    clientXY: { x: payload.left, y: payload.top },
  } as INote
  const notes = prevNotes.map((prevNote) => (prevNote.id === payload.id ? note : prevNote))

  storage()
    .set(payload.id, note)
    .then(() => {
      setNotes(notes)
      blurActiveElement()
    })
    .catch(handleError)
}

const pasteNote = (
  prevNotes: INote[],
  payload: { content: string },
  setNotes: (notes: INote[]) => void
) => {
  const id = nanoid(NANO_SIZE)
  const note = {
    id,
    content: payload.content,
    width: 144,
    height: 144,
    clientXY: { x: 32, y: 32 },
  }
  const notes = [...prevNotes, note]

  storage()
    .set(id, note)
    .then(() => {
      setNotes(notes)
      blurActiveElement()
    })
    .catch(handleError)
}
