import React from 'react'
import { IButton } from 'libs/types'
import s from './Button.module.scss'

function Button({ svg, handleOnClick }: IButton) {
  return (
    <button className={s.button} onClick={handleOnClick}>
      {svg}
    </button>
  )
}

export { Button }
