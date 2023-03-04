'use client'

import React from 'react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Button, TextField, Box, Modal, IconButton, Stack, Typography } from "@mui/material";
import { useRouter } from 'next/navigation';
import PointService from '@/services/service';

export default function CreateTask() {
    const service = new PointService();

    const router = useRouter();

    const [open, setOpen] = React.useState(false);
    const [title, setTitle] = React.useState('');

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const createTask = async() => {
        await service.fetchPost('/tasks', JSON.stringify({
            "title": title,
            "isComplited": false
        }))

        setTitle('');

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
        <IconButton onClick={handleOpen} aria-label='add-note' size='large'>
          <AddCircleOutlineIcon />
        </IconButton>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Stack component='form' onSubmit={createTask} spacing={2}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Create Task
                    </Typography>
                    <TextField 
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        id="filled-basic" 
                        label="Title" 
                        variant="filled" />
                    <Stack direction='row' justifyContent='flex-end'>
                        <Button onClick={handleClose} sx={{}} variant="text">Cancel</Button>
                        <Button type='submit' sx={{}} variant="text">Create</Button>
                    </Stack>
                    
                </Stack>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                </Typography>
            </Box>
        </Modal>
        </>
        
    )
}