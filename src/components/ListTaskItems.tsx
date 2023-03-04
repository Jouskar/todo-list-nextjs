'use client'

import React, { useState } from 'react';
import { List, Container, Box, CssBaseline, Stack, FormControl, 
  InputLabel, Select, MenuItem, SelectChangeEvent, Grid } from "@mui/material";
import { ToDoItem } from '@/interface/task';
import { useRouter } from 'next/navigation';
import TaskItem from './TaskItem';
import CreateTask from './CreateTask';

export default function ListTaskItems({toDos }: any) {
  const [showType, setShowType] = useState('All');

  const router = useRouter();

  const handleChange = (event: SelectChangeEvent) => {
    setShowType(event.target.value as string);

    router.refresh();
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container >
        <Stack sx={{mt: 2}} direction='row' justifyContent='flex-end' spacing={2}>
          <FormControl>
          <InputLabel id="task-type-select-label">View</InputLabel>
          <Select
            labelId="task-type-select-label"
            id="task-type-select"
            value={showType}
            label="showType"
            onChange={handleChange}
            sx={{width: 200}}
          >
            <MenuItem value={'All'}>All</MenuItem>
            <MenuItem value={'Complete'}>Completed</MenuItem>
            <MenuItem value={'Incomplete'}>Incomplete</MenuItem>
          </Select>
        </FormControl>
          <CreateTask/>
        </Stack>
        <List sx={{ width: '100%', maxWidth: 'auto', bgcolor: 'background.paper' }}>
          {toDos?.map((toDo:ToDoItem) => {
            switch (showType) {
              case 'Complete':
                if (toDo.isCompleted) {
                  return <TaskItem key={toDo.id} toDo={toDo} />;
                }
                break;
              case 'Incomplete':
                if (!toDo.isCompleted) {
                  return <TaskItem key={toDo.id} toDo={toDo} />;
                }
                break;
              default:
                return <TaskItem key={toDo.id} toDo={toDo} />;
            }
          })}
        </List>
      </Container>
      
    </React.Fragment>
      
  );
}