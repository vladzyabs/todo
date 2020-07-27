import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type EditableSpanPropsType = {
   value: string
   changeValue: (value: string) => void
}

function EditableSpan(props: EditableSpanPropsType) {

   const [editMode, setEditMode] = useState<boolean>(false)
   const [title, setTitle] = useState<string>(props.value)

   const onMode = () => setEditMode(true)
   const offMode = () => {
      setEditMode(false)
      props.changeValue(title)
   }

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
               ? <input type="text" value={title} onChange={changeTitle} onKeyPress={onCtrlEnter} autoFocus onBlur={offMode}/>
               : <span onDoubleClick={onMode}>{props.value}</span>
         }
      </>
   )
}

export default EditableSpan
