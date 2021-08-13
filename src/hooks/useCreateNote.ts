import React, { useState } from 'react'
import DOMPurify from 'dompurify'
import { nanoid } from 'nanoid'
import { NANO_SIZE } from 'libs/constants'
interface INotes {
  id: string
  content: string
  clientXY: { x: number; y: number }
}

export const useCreateNote = (initialNote = []) => {
  const [notes, setNote] = useState<INotes[]>(initialNote)
  const createNote = (clientX: number, clientY: number) => {
    setNote([
      ...notes,
      { id: nanoid(NANO_SIZE), content: '', clientXY: { x: clientX - 10, y: clientY - 10 } },
    ])
  }
  const updateNote = (id: string, htmlString: string) => {
    setNote(
      notes.map((note) =>
        note.id === id ? { ...note, content: DOMPurify.sanitize(htmlString) } : note
      )
    )
  }

  return [notes, createNote, updateNote] as const
}
