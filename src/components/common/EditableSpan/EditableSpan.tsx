import React, {ChangeEvent, KeyboardEvent, useCallback, useState} from 'react';
import {TextField} from '@material-ui/core';

type EditableSpanPropsType = {
   value: string
   changeValue: (value: string) => void
}

const EditableSpan = React.memo(
   (props: EditableSpanPropsType) => {
      console.log('render editable span')
      const {value, changeValue} = props

      const [editMode, setEditMode] = useState<boolean>(false)
      const [title, setTitle] = useState<string>(props.value)

      const onMode = () => setEditMode(true)
      const offMode = useCallback(
         () => {
            setEditMode(false)
            !title.trim()
               ? changeValue(value)
               : changeValue(title)
         },
         [changeValue, value, title],
      )

      const changeTitle = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)

      const onCtrlEnter = (e: KeyboardEvent<HTMLInputElement>) => {
         if (e.ctrlKey && e.charCode === 13) {
            offMode()
         }
      }

      return (
         <>
            {
               editMode
                  ? <TextField value={title}
                               onChange={changeTitle}
                               onKeyPress={onCtrlEnter}
                               onBlur={offMode}
                               autoFocus/>
                  : <span onDoubleClick={onMode}>{props.value}</span>
            }
         </>
      )
   },
)
export default EditableSpan
