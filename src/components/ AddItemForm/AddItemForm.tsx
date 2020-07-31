import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import {TextField} from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';

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
         <TextField id="outlined-basic"
                    label="Title"
                    variant="outlined"
                    value={title}
                    error={!!error}
                    helperText={error}
                    onChange={changeTitle}
                    onKeyPress={onPressEnter}/>
         <Tooltip title={'Add'} aria-label="add">
            <IconButton aria-label="delete" onClick={addItem}>
               <AddIcon color="action"/>
            </IconButton>
         </Tooltip>
      </>
   )
}

export default AddItemFrom
