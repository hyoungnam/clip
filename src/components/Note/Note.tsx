import React, { useState } from 'react'
import { IconClip } from 'components/Svgs'
import { INote } from 'libs/types'
import s from './Note.module.scss'

function Note({ id, content, clientXY: { x, y }, updateNote }: INote) {
  const [isFocus, setFocus] = useState(false)

  const handleOnBlur = ({ target: { innerHTML } }: React.FocusEvent) => {
    updateEditedNote(id, innerHTML)
  }
  const handleOnFocus = () => {
    setFocus(true)
  }
  const handleOnKeyDown = ({ key, target }: React.KeyboardEvent) => {
    key === 'Escape' && updateEditedNote(id, (target as HTMLElement).innerHTML)
  }
  const updateEditedNote = (id: string, innerHTML: string) => {
    const activeEl = document.activeElement as HTMLElement
    activeEl.blur()
    updateNote && updateNote(id, innerHTML)
    setFocus(false)
  }

  return (
    <>
      <div className={`${s.note} ${isFocus ? s.resize : ''}`} style={{ top: y, left: x }}>
        <IconClip isFocus={isFocus} />
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
export { Note }
