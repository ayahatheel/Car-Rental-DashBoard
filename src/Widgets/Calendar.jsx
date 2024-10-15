import React from 'react';
import { Paper, Typography, Box } from '@mui/material';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useTaskContext } from '../Pages/TaskContext';

const localizer = momentLocalizer(moment);

const Calendar = () => {
  const { tasks } = useTaskContext();

  const events = tasks.map(task => ({
    title: task.text,
    start: task.date,
    end: new Date(task.date.getTime() + 60 * 60 * 1000), // 1 hour duration for each task
  }));

  const eventPropGetter = (event) => {
    const backgroundColor = event.title.includes('اجتماع') ? '#d32f2f' : // Red from the logo
                            event.title.includes('ورشة عمل') ? '#b71c1c' : // Darker red
                            event.title.includes('عرض تقديمي') ? '#9e9e9e' : // Gray from the logo
                            event.title.includes('اجتماع فريق') ? '#757575' : // Darker gray
                            event.title.includes('مراجعة المشروع') ? '#616161' : // Even darker gray
                            '#424242'; // Near black

    return {
      style: {
        backgroundColor,
        fontSize: '0.85em',
        padding: '4px 6px',
        borderRadius: '8px',
        color: '#fff',
        border: '1px solid #424242', // Darker gray for contrast
        textAlign: 'center',
      }
    };
  };

  return (
    <Paper sx={{ p: 3, borderRadius: '12px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)', backgroundColor: '#f5f5f5' }}>
      <Typography variant="h5" sx={{ mb: 3, fontFamily: 'Tajawal, sans-serif', textAlign: 'center', color: '#333' }}>
        التقويم
      </Typography>
      <Box sx={{ height: '350px', '& .rbc-calendar': { borderRadius: '10px', boxShadow: '0 3px 6px rgba(0, 0, 0, 0.1)' } }}>
        <BigCalendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: '100%' }}
          eventPropGetter={eventPropGetter}
        />
      </Box>
    </Paper>
  );
};

export default Calendar;
