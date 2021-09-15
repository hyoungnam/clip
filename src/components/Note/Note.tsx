import React, { useState, useRef } from 'react'
import { IconClip } from 'components/Svgs'
import { ACTION } from 'hooks/useNote'
import { INote } from 'libs/types'
import s from './Note.module.scss'

export function Note({
  id,
  content,
  width,
  height,
  clientXY: { x, y },
  dispatch,
  isCreateMode,
}: INote) {
  const [isFocus, setFocus] = useState(false)
  const [isDragged, setDragged] = useState(false)
  const noteRef = useRef<HTMLDivElement>(null)

  const handleOnBlur = ({ target: { value } }: React.FocusEvent<HTMLTextAreaElement>) => {
    if (noteRef.current) {
      const width = Number(noteRef.current.style.width.slice(0, -2))
      const height = Number(noteRef.current.style.height.slice(0, -2))
      updateNote(id, { value, width, height })
    }
  }
  const handleOnFocus = () => {
    setFocus(true)
  }
  const handleOnKeyDown = ({
    key,
    currentTarget: { value },
  }: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (noteRef.current) {
      const width = Number(noteRef.current.style.width.slice(0, -2))
      const height = Number(noteRef.current.style.height.slice(0, -2))
      key === 'Escape' && updateNote(id, { value, width, height })
    }
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
    dispatch && dispatch({ type: ACTION.DELETE, payload: { id } })
  }
  const updateNote = (
    id: string,
    { value, width, height }: { value: string; width: number; height: number }
  ) => {
    dispatch && dispatch({ type: ACTION.UPDATE, payload: { id, value, width, height } })
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
          autoFocus
        ></textarea>
      </div>
    </>
  )
}
