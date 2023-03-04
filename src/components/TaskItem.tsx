'use client'

import React from 'react';
import { useRouter } from 'next/navigation';
import { ListItem, ListItemButton, ListItemText, Modal, Box, TextField, Button, 
  IconButton, ListItemIcon, Stack, Typography, Checkbox } from "@mui/material";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { ToDoItem } from '@/interface/task';
import PointService from '@/services/service';

export default function TaskItem({ toDo }: any) {
  const service = new PointService();
  const router = useRouter();

  const { id, title, isCompleted } = toDo as ToDoItem || { };
  
  const [checked, setChecked] = React.useState(isCompleted);  
  const [open, setOpen] = React.useState(false);
  const [newTitle, setNewTitle] = React.useState(title);

  const labelId = `task-item-${id}`;

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setNewTitle(title);
    setOpen(false);
  }

  const handleToggle = async() => {
    const newChecked = !checked;

    await service.fetchPut(`/tasks/${id}`, JSON.stringify({
      "title": title,
      "isCompleted": newChecked
    }))
    
    setChecked(newChecked);
  };

  const handleDeleteTask = async() => {
    await service.fetchDelete(`/tasks/${id}`);

    router.refresh();
  };

  const handleEditTask = async() => {

    await service.fetchPut(`/tasks/${id}`, JSON.stringify({
      "title": newTitle
    }))

    router.refresh();
  }

  const style = {
      position: 'absolute' as 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 400,
      bgcolor: 'background.paper',
      border: '2px solid #000',
      boxShadow: 24,
      p: 4,
    };

  return (
    <>
    <ListItem
        secondaryAction={
          <Stack direction='row'>
            <IconButton sx={{mr: 1}} edge="end" aria-label="edit" onClick={handleOpen}>
              <BorderColorIcon/>
            </IconButton>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Stack component='form' onSubmit={handleEditTask} spacing={2}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                        }}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Edit Task
                        </Typography>
                        <TextField 
                            value={newTitle}
                            onChange={(e) => setNewTitle(e.target.value)}
                            id="filled-basic" 
                            label="Title" 
                            variant="filled" />
                        <Stack direction='row' justifyContent='flex-end'>
                            <Button onClick={handleClose} sx={{}} variant="text">Cancel</Button>
                            <Button type='submit' sx={{}} variant="text">Save Changes</Button>
                        </Stack>
                        
                    </Stack>
                </Box>
            </Modal>
            <IconButton edge="end" aria-label="delete" onClick={handleDeleteTask}>
              <HighlightOffIcon/>
            </IconButton>
          </Stack>
        }
        disablePadding
      >
        <ListItemButton role={undefined} onClick={handleToggle} dense>
          <ListItemIcon>
            <Checkbox
              edge="start"
              checked={checked}
              tabIndex={-1}
              disableRipple
              inputProps={{ 'aria-labelledby': labelId }}
            />
          </ListItemIcon>
          <ListItemText id={labelId} primary={title} />
        </ListItemButton>
      </ListItem>
    </>
  );
}