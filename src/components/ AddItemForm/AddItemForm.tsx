import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type AddItemFromPropsType = {
   addItem: (title: string) => void
}

function AddItemFrom(props: AddItemFromPropsType) {

   const [title, setTitle] = useState<string>('')
   const [error, setError] = useState<string | null>(null)

   const addItem = () => {
      if (title.trim()) {
         props.addItem(title)
      } else {
         setError('Empty field')
      }
      setTitle('')
   }

   const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
      setTitle(e.currentTarget.value)
      setError(null)
   }

   const onPressEnter = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
         addItem()
      }
   }

   return (
      <>
         <input type="text"
                value={title}
                onChange={changeTitle}
                onKeyPress={onPressEnter} className={error ? 'error' : ''}/>
         <button onClick={addItem}>add</button>
         {error ? <div className={'error-message'}>{error}</div> : ''}
      </>
   )
}

export default AddItemFrom
