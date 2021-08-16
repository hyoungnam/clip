import React, { useState } from 'react'
import { IconClip } from 'components/Svgs'
import { NOTE_ACTION } from 'hooks/useNote'
import { INote } from 'libs/types'
import { useNoteResize } from 'hooks/useNoteResize'
import s from './Note.module.scss'

function Note({ id, content, width, height, clientXY: { x, y }, dispatch, isCreateMode }: INote) {
  const [isFocus, setFocus] = useState(false)
  const noteRef = useNoteResize(id, dispatch)
  const handleOnBlur = ({ target: { innerHTML } }: React.FocusEvent) => {
    updateEditedNote(id, innerHTML)
  }
  const handleOnFocus = () => {
    setFocus(true)
  }
  const handleOnKeyDown = ({ key, target }: React.KeyboardEvent) => {
    key === 'Escape' && updateEditedNote(id, (target as HTMLElement).innerHTML)
  }
  const handleOnDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    const startClientX = Number(e.clientX) - Number((e.target as HTMLElement).offsetLeft)
    const startClientY = Number(e.clientY) - Number((e.target as HTMLElement).offsetTop)
    e.dataTransfer.setData('drag', `${id},${startClientX},${startClientY}`)
  }
  const updateEditedNote = (id: string, innerHTML: string) => {
    const activeEl = document.activeElement as HTMLElement
    activeEl.blur()
    dispatch && dispatch({ type: NOTE_ACTION.UPDATE, payload: { id, innerHTML } })
    setFocus(false)
  }

  return (
    <>
      <div
        className={`${s.note} ${isFocus ? s.resize : ''}`}
        style={{ top: y, left: x, width, height }}
        draggable={!isCreateMode}
        onDragStart={handleOnDragStart}
        ref={noteRef}
      >
        {!isFocus && <IconClip isFocus={isFocus} />}
        <p
          className={s.content}
          contentEditable
          suppressContentEditableWarning
          dangerouslySetInnerHTML={{ __html: content }}
          onBlur={handleOnBlur}
          onFocus={handleOnFocus}
          onKeyDown={handleOnKeyDown}
        ></p>
      </div>
    </>
  )
}
export default Note
