import React, { useState } from 'react'
import { IconClip } from 'components/Svgs'
import { NOTE_ACTION } from 'hooks/useNote'
import { INote } from 'libs/types'
import { useNoteResize } from 'hooks/useNoteResize'
import s from './Note.module.scss'

function Note({ id, content, width, height, clientXY: { x, y }, dispatch, isCreateMode }: INote) {
  const [isFocus, setFocus] = useState(false)
  const [isDragged, setDragged] = useState(false)
  const noteRef = useNoteResize(id, dispatch)
  const handleOnBlur = ({ target: { value } }: React.FocusEvent<HTMLTextAreaElement>) => {
    updateNote(id, value)
  }
  const handleOnFocus = () => {
    setFocus(true)
  }
  const handleOnKeyDown = ({
    key,
    currentTarget: { value },
  }: React.KeyboardEvent<HTMLTextAreaElement>) => {
    key === 'Escape' && updateNote(id, value)
  }
  const handleOnDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    setDragged(true)
    const startClientX = Number(e.clientX) - Number((e.target as HTMLElement).offsetLeft)
    const startClientY = Number(e.clientY) - Number((e.target as HTMLElement).offsetTop)
    e.dataTransfer.setData('drag', `${id},${startClientX},${startClientY}`)
  }
  const handleOnDragEnd = () => {
    setDragged(false)
  }
  const deleteNote = () => {
    dispatch && dispatch({ type: NOTE_ACTION.DELETE, payload: { id } })
  }
  const updateNote = (id: string, value: string) => {
    dispatch && dispatch({ type: NOTE_ACTION.UPDATE, payload: { id, value } })
    const activeEl = document.activeElement as HTMLElement
    activeEl.blur()
    setFocus(false)
  }

  return (
    <>
      <div
        className={`${s.note} ${isFocus ? s.resize : ''} ${isDragged ? s.dragged : ''}`}
        style={{ top: y, left: x, width, height }}
        draggable={!isCreateMode}
        onDragStart={handleOnDragStart}
        onDragEnd={handleOnDragEnd}
        ref={noteRef}
      >
        {!isFocus && <IconClip isFocus={isFocus} deleteNote={deleteNote} />}
        <textarea
          className={`${s.content}`}
          onBlur={handleOnBlur}
          onFocus={handleOnFocus}
          onKeyDown={handleOnKeyDown}
          defaultValue={content}
        ></textarea>
      </div>
    </>
  )
}
export default Note
