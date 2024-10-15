import React, { useState } from 'react';
import { Box, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useTaskContext } from '../Pages/TaskContext';

const TaskAdd = () => {
  const { addTask } = useTaskContext();
  const [text, setText] = useState('');
  const [date, setDate] = useState('');
  const [open, setOpen] = useState(false);

  const handleAdd = () => {
    if (text.trim() && date) {
      addTask({ text, completed: false, date: new Date(date) });
      setText('');
      setDate('');
      setOpen(false);
    }
  };

  return (
    <Box sx={{ p: 2, boxShadow: 1, mt: 2, borderRadius: '8px' }}>
      <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
        إضافة مهمة
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>إضافة مهمة جديدة</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="المهمة"
            fullWidth
            variant="standard"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <TextField
            margin="dense"
            label="التاريخ"
            type="datetime-local"
            fullWidth
            variant="standard"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>إلغاء</Button>
          <Button onClick={handleAdd}>إضافة</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TaskAdd;
