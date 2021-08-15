import { useLayoutEffect, useRef } from 'react'
import { debounce } from 'libs/utils'
import { NOTE_ACTION } from './useNote'
export const useNoteResize = (id: string, dispatchNote: any) => {
  const noteRef = useRef<HTMLDivElement>(null)
  useLayoutEffect(() => {
    if (!noteRef.current) {
      return
    }
    let RO = new ResizeObserver(
      debounce(() => {
        noteRef.current &&
          dispatchNote({
            type: NOTE_ACTION.RESIZE,
            payload: {
              id,
              width: Number(noteRef.current.style.width.slice(0, -2)),
              height: Number(noteRef.current.style.height.slice(0, -2)),
            },
          })
      }, 1000)
    )
    RO.observe(noteRef.current)
    return () => {
      RO.disconnect()
      RO = null as any
    }
  }, [noteRef])
  return noteRef
}
