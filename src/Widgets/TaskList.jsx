import React, { useState } from 'react';
import { Box, Typography, List, ListItem, ListItemText, Checkbox, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { useTaskContext } from '../Pages/TaskContext';

const TaskList = () => {
  const { tasks, updateTask, deleteTask } = useTaskContext();
  const [editTask, setEditTask] = useState(null);
  const [editTaskText, setEditTaskText] = useState('');

  const handleToggle = (task) => () => {
    updateTask(task.id, { ...task, completed: !task.completed });
  };

  const handleEdit = (task) => {
    setEditTask(task);
    setEditTaskText(task.text);
  };

  const handleSaveEditTask = () => {
    updateTask(editTask.id, { ...editTask, text: editTaskText });
    setEditTask(null);
    setEditTaskText('');
  };

  const handleClose = () => {
    setEditTask(null);
  };

  return (
    <Box sx={{ p: 2, boxShadow: 1, borderRadius: '8px' }}>
      <Typography variant="h6" sx={{ mb: 2, fontFamily: 'Tajawal, sans-serif' }}>المهام</Typography>
      <List>
        {tasks.map((task) => (
          <ListItem key={task.id} disablePadding>
            <Checkbox
              edge="start"
              checked={task.completed}
              tabIndex={-1}
              disableRipple
              inputProps={{ 'aria-labelledby': task.id }}
              onClick={handleToggle(task)}
            />
            <ListItemText id={task.id} primary={task.text} />
            <IconButton onClick={() => handleEdit(task)}>
              <Edit />
            </IconButton>
            <IconButton onClick={() => deleteTask(task.id)}>
              <Delete />
            </IconButton>
          </ListItem>
        ))}
      </List>

      <Dialog open={Boolean(editTask)} onClose={handleClose}>
        <DialogTitle>تعديل المهمة</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="المهمة"
            fullWidth
            variant="standard"
            value={editTaskText}
            onChange={(e) => setEditTaskText(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>إلغاء</Button>
          <Button onClick={handleSaveEditTask}>حفظ</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TaskList;
