import React, {ChangeEvent, KeyboardEvent, useCallback, useState} from 'react';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import {TextField} from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';

type AddItemFromPropsType = {
   addItem: (title: string) => void
}

const AddItemFrom = React.memo(
   (props: AddItemFromPropsType) => {

      const {addItem} = props

      const [title, setTitle] = useState<string>('')
      const [error, setError] = useState<string | null>(null)

      const clickAddItem = useCallback(
         () => {
            let newTitle = title.trim()
            if (newTitle) {
               addItem(newTitle)
               setTitle('')
            } else {
               setError('Title is required')
            }
         },
         [title, addItem],
      )

      const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
         setTitle(e.currentTarget.value)
      }

      const onPressEnter = (e: KeyboardEvent<HTMLInputElement>) => {
         if (error) {
            setError(null)
         }
         if (e.charCode === 13) {
            clickAddItem()
         }
      }

      return (
         <div>
            <TextField id="outlined-basic"
                       label="Title"
                       variant="outlined"
                       value={title}
                       error={!!error}
                       helperText={error}
                       onChange={changeTitle}
                       onKeyPress={onPressEnter}/>
            <Tooltip title={'Add'} aria-label="add">
               <IconButton aria-label="delete" onClick={clickAddItem}>
                  <AddIcon color="action"/>
               </IconButton>
            </Tooltip>
         </div>
      )
   },
)
export default AddItemFrom
