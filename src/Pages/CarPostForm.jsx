import React, { useState } from 'react';
import { TextField, MenuItem, Button, Snackbar, Alert, Grid, Box, Typography, Paper } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import UploadIcon from '@mui/icons-material/Upload'; // Import the upload icon

const theme = createTheme({
  direction: 'rtl', // Set the direction to RTL
  palette: {
    primary: {
      main: '#d32f2f', // Red color
    },
  },
});

const CarPostForm = () => {
  const [formData, setFormData] = useState({
    Car_name: '',
    Features_and_Amenities: '',
    Numbers_of_days: '',
    price: '',
    Year_of_Manufacture: '',
    Seating_Capacity: '',
    car_fule: 'بانزين محسن',
    catgories: 'سيارات سيدان',
    img_one: null,
    img_two: null
  });

  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: '' });
  const [previewImgOne, setPreviewImgOne] = useState(null);
  const [previewImgTwo, setPreviewImgTwo] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      const file = files[0];
      const previewUrl = URL.createObjectURL(file);
      if (name === 'img_one') {
        setPreviewImgOne(previewUrl);
      } else if (name === 'img_two') {
        setPreviewImgTwo(previewUrl);
      }
    }
    setFormData({
      ...formData,
      [name]: files ? files[0] : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    for (const key in formData) {
      if (formData[key] !== null) {
        data.append(key, formData[key]);
      }
    }

    try {
      const response = await fetch('https://x8ki-letl-twmt.n7.xano.io/api:IzeJrQwI/carinfo', {
        method: 'POST',
        body: data
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const result = await response.json();
      console.log('Success:', result);
      setSnackbar({ open: true, message: 'تم إرسال النموذج بنجاح!', severity: 'success' });
    } catch (error) {
      console.error('Error:', error);
      setSnackbar({ open: true, message: 'فشل إرسال النموذج!', severity: 'error' });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ open: false, message: '', severity: '' });
  };

  return (
    <ThemeProvider theme={theme}>
      <Paper sx={{ padding: 4, borderRadius: '16px', margin: '16px 0' }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              {previewImgOne ? (
                <Box mb={2} textAlign="center">
                  <img
                    src={previewImgOne}
                    alt="Preview 1"
                    style={{ width: '100%', height: '200px', borderRadius: '8px', objectFit: 'cover' }}
                  />
                </Box>
              ) : (
                <Box mb={2} textAlign="center" style={{ width: '100%', height: '200px', border: '1px dashed gray', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Typography variant="body2" color="textSecondary">مكان الصورة</Typography>
                </Box>
              )}
              <Button
                variant="outlined"
                component="label"
                fullWidth
                sx={{ margin: 'normal', backgroundColor: 'white', color: 'red', border: '1px solid red', borderRadius: '8px' }}
              >
                <UploadIcon sx={{ marginLeft: '8px', color: 'red' }} />
                تحميل الصورة
                <input
                  type="file"
                  name="img_one"
                  hidden
                  onChange={handleChange}
                />
              </Button>
              <Typography variant="body2" color="textSecondary" textAlign="center" marginTop={2}>
                يجب أن تكون الصورة  بدون خلفية
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              {previewImgTwo ? (
                <Box mb={2} textAlign="center">
                  <img
                    src={previewImgTwo}
                    alt="Preview 2"
                    style={{ width: '100%', height: '200px', borderRadius: '8px', objectFit: 'cover' }}
                  />
                </Box>
              ) : (
                <Box mb={2} textAlign="center" style={{ width: '100%', height: '200px', border: '1px dashed gray', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Typography variant="body2" color="textSecondary">مكان الصورة</Typography>
                </Box>
              )}
              <Button
                variant="outlined"
                component="label"
                fullWidth
                sx={{ margin: 'normal', backgroundColor: 'white', color: 'red', border: '1px solid red', borderRadius: '8px' }}
              >
                <UploadIcon sx={{ marginLeft: '8px', color: 'red' }} />
                تحميل الصورة
                <input
                  type="file"
                  name="img_two"
                  hidden
                  onChange={handleChange}
                />
              </Button>
              <Typography variant="body2" color="textSecondary" textAlign="center" marginTop={2}>
                يجب أن تكون الصورة  بدون خلفية
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="الاسم"
                name="Car_name"
                value={formData.Car_name}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="سنة التصنيع"
                name="Year_of_Manufacture"
                value={formData.Year_of_Manufacture}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="عدد الركاب"
                name="Seating_Capacity"
                type="number"
                value={formData.Seating_Capacity}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="السعر"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="عدد الأيام"
                name="Numbers_of_days"
                type="number"
                value={formData.Numbers_of_days}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="نوع الوقود"
                name="car_fule"
                select
                value={formData.car_fule}
                onChange={handleChange}
                fullWidth
                margin="normal"
              >
                <MenuItem value="بانزين محسن">بانزين محسن</MenuItem>
                <MenuItem value="بانزين عادي">بانزين عادي</MenuItem>
                <MenuItem value="كاز">كاز</MenuItem>
                <MenuItem value="كهربائي">كهربائي</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="النوع"
                name="catgories"
                select
                value={formData.catgories}
                onChange={handleChange}
                fullWidth
                margin="normal"
              >
                <MenuItem value="سيارات رياضية">سيارات رياضية</MenuItem>
                <MenuItem value="سيارات مدمجة">سيارات مدمجة</MenuItem>
                <MenuItem value="سيارات كهربائية">سيارات كهربائية</MenuItem>
                <MenuItem value="سيارات فخمة">سيارات فخمة</MenuItem>
                <MenuItem value="سيارات سيدان">سيارات سيدان</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="المميزات والمرافق"
                name="Features_and_Amenities"
                value={formData.Features_and_Amenities}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="وصف إضافي (اختياري)"
                name="optional_description"
                value={formData.optional_description}
                onChange={handleChange}
                fullWidth
                margin="normal"
                multiline
                rows={4}
              />
            </Grid>
            <Grid item xs={12} md={3} marginLeft="auto">
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{ margin: 'normal', backgroundColor: 'red', color: 'white', borderRadius: '8px' }}
              >
                نشر
              </Button>
            </Grid>
          </Grid>
          <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar}>
            <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
              {snackbar.message}
            </Alert>
          </Snackbar>
        </form>
      </Paper>
    </ThemeProvider>
  );
};

export default CarPostForm;
