import React, { useState } from "react";
import { Box, Button, Grid, TextField, Typography, Paper, Alert, Stack, MenuItem } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import { red } from "@mui/material/colors";
import axios from "axios";

const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
});

const InputFileUpload = ({ onImageUpload, index }) => {
    return (
        <Button
            component="label"
            variant="outlined"
            fullWidth
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '10px',
                borderRadius: '8px',
                border: '1px solid #000',
                transition: 'background-color 0.3s ease, border-color 0.3s ease',
                '&:hover': {
                    backgroundColor: '#f0f0f0',
                    borderColor: red[500],
                    '& .MuiSvgIcon-root': {
                        color: red[500],
                    },
                },
            }}
            startIcon={<CloudUploadIcon sx={{ color: red[500] }} />}
        >
            <Typography variant="body1" sx={{ color: '#000' }}>تحميل الصورة</Typography>
            <VisuallyHiddenInput
                type="file"
                accept="image/*"
                onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                        const reader = new FileReader();
                        reader.onload = (event) => {
                            onImageUpload(event.target.result, index);
                        };
                        reader.readAsDataURL(e.target.files[0]);
                    }
                }}
            />
        </Button>
    );
};

const CarForm = () => {
    const [uploadedImages, setUploadedImages] = useState([null, null]);
    const [formValues, setFormValues] = useState({
        Car_name: "",
        Year_of_Manufacture: "",
        car_fule: "",
        Seating_Capacity: "",
        Features_and_Amenities: "",
        Numbers_of_days: "",
        price: "",
        catgories: "",
    });
    const [alert, setAlert] = useState(null);

    const handleImageUpload = (image, index) => {
        const newImages = [...uploadedImages];
        newImages[index] = image;
        setUploadedImages(newImages);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        const numericFields = ["Year_of_Manufacture", "Seating_Capacity", "Numbers_of_days", "price"];
        if (numericFields.includes(name)) {
            if (/^\d*$/.test(value)) {
                setFormValues({ ...formValues, [name]: value });
            }
        } else {
            setFormValues({ ...formValues, [name]: value });
        }
    };

    const validateForm = () => {
        const requiredFields = [
            "Car_name",
            "Year_of_Manufacture",
            "car_fule",
            "Seating_Capacity",
            "Features_and_Amenities",
            "Numbers_of_days",
            "price",
            "catgories",
        ];
        for (let field of requiredFields) {
            if (!formValues[field]) {
                return `${field} مطلوب.`;
            }
        }
        if (!uploadedImages.some((image) => image !== null)) {
            return "مطلوب على الأقل صورة واحدة للسيارة.";
        }
        return null;
    };

    const handleSubmit = async () => {
        const errorMessage = validateForm();
        if (errorMessage) {
            setAlert({ severity: "error", message: errorMessage });
        } else {
            try {
                const formData = new FormData();
                formData.append('Car_name', formValues.Car_name);
                formData.append('Year_of_Manufacture', formValues.Year_of_Manufacture);
                formData.append('car_fule', formValues.car_fule);
                formData.append('Seating_Capacity', formValues.Seating_Capacity);
                formData.append('Features_and_Amenities', formValues.Features_and_Amenities);
                formData.append('Numbers_of_days', formValues.Numbers_of_days);
                formData.append('price', formValues.price);
                formData.append('catgories', formValues.catgories);
                if (uploadedImages[0]) {
                    formData.append('img_one', uploadedImages[0]);
                }
                if (uploadedImages[1]) {
                    formData.append('img_two', uploadedImages[1]);
                }

                await axios.post('https://x8ki-letl-twmt.n7.xano.io/api:IzeJrQwI/carinfo', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

                setAlert({
                    severity: "success",
                    message: "تم النشر بنجاح. يمكن للمستخدمين الآن رؤية منشورك.",
                });
            } catch (error) {
                console.error('Error details:', error);
                console.error('Response data:', error.response?.data);
                setAlert({
                    severity: "error",
                    message: `حدث خطأ أثناء النشر. يرجى المحاولة مرة أخرى. التفاصيل: ${error.response?.data?.message || error.message}`,
                });
            }
        }
    };

    return (
        <Paper elevation={3} sx={{ padding: 3, direction: "rtl", textAlign: "right", backgroundColor: 'transparent', border: 'transparent' }}>
            <Box>
                <Typography variant="h6" gutterBottom>
                    صور السيارة
                </Typography>
                <Grid container spacing={2}>
                    {[0, 1].map((item) => (
                        <Grid item xs={6} key={item}>
                            <Box
                                sx={{
                                    width: "100%",
                                    height: 100,
                                    border: "1px dashed grey",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    borderRadius: 1,
                                    overflow: "hidden",
                                }}
                            >
                                {uploadedImages[item] ? (
                                    <img
                                        src={uploadedImages[item]}
                                        alt="تم التحميل"
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            objectFit: "cover",
                                        }}
                                    />
                                ) : (
                                    <Typography variant="body2" color="textSecondary">
                                        مكان الصورة
                                    </Typography>
                                )}
                            </Box>
                        </Grid>
                    ))}
                    {[0, 1].map((item) => (
                        <Grid item xs={6} key={`upload-${item}`}>
                            <InputFileUpload onImageUpload={handleImageUpload} index={item} />
                        </Grid>
                    ))}
                </Grid>
            </Box>

            <Box mt={3}>
                <Typography variant="h6" gutterBottom>
                    تفاصيل السيارة
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label=" الاسم"
                            variant="outlined"
                            placeholder="مكان النص"
                            name="Car_name"
                            value={formValues.Car_name}
                            onChange={handleInputChange}
                            sx={{
                                "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                                    borderColor: 'gray',
                                },
                                "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                                    borderColor: 'red',
                                },
                                "&.Mui-focused .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                                    borderColor: 'red',
                                },
                                "& .MuiFormLabel-root": {
                                    color: 'gray',
                                },
                                "&.Mui-focused .MuiFormLabel-root": {
                                    color: 'red',
                                },
                            }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="سنة التصنيع"
                            variant="outlined"
                            placeholder="مكان النص"
                            name="Year_of_Manufacture"
                            value={formValues.Year_of_Manufacture}
                            onChange={handleInputChange}
                            sx={{
                                "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                                    borderColor: 'gray',
                                },
                                "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                                    borderColor: 'red',
                                },
                                "&.Mui-focused .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                                    borderColor: 'red',
                                },
                                "& .MuiFormLabel-root": {
                                    color: 'gray',
                                },
                                "&.Mui-focused .MuiFormLabel-root": {
                                    color: 'red',
                                },
                            }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="النوع"
                            variant="outlined"
                            placeholder="مكان النص"
                            name="catgories"
                            value={formValues.catgories}
                            onChange={handleInputChange}
                            select
                            SelectProps={{
                                displayEmpty: true,
                                renderValue: (value) => (value ? value : "اختر نوع السيارة"),
                            }}
                            sx={{
                                "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                                    borderColor: 'gray',
                                },
                                "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                                    borderColor: 'red',
                                },
                                "&.Mui-focused .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                                    borderColor: 'red',
                                },
                                "& .MuiFormLabel-root": {
                                    color: 'gray',
                                },
                                "&.Mui-focused .MuiFormLabel-root": {
                                    color: 'red',
                                },
                            }}
                        >
                            <MenuItem value="سيارات رياضية" sx={{ fontFamily: 'Tajawal, sans-serif' }}>سيارات رياضية</MenuItem>
                            <MenuItem value="سيارات مدمجة" sx={{ fontFamily: 'Tajawal, sans-serif' }}>سيارات مدمجة</MenuItem>
                            <MenuItem value="سيارات كهربائية" sx={{ fontFamily: 'Tajawal, sans-serif' }}>سيارات كهربائية</MenuItem>
                            <MenuItem value="سيارات فخمة" sx={{ fontFamily: 'Tajawal, sans-serif' }}>سيارات فخمة</MenuItem>
                            <MenuItem value="سيارات سيدان" sx={{ fontFamily: 'Tajawal, sans-serif' }}>سيارات سيدان</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="نوع الوقود"
                            variant="outlined"
                            placeholder="مكان النص"
                            name="car_fule"
                            value={formValues.car_fule}
                            onChange={handleInputChange}
                            select
                            SelectProps={{
                                displayEmpty: true,
                                renderValue: (value) => (value ? value : "اختر نوع الوقود"),
                            }}
                            sx={{
                                "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                                    borderColor: 'gray',
                                },
                                "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                                    borderColor: 'red',
                                },
                                "&.Mui-focused .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                                    borderColor: 'red',
                                },
                                "& .MuiFormLabel-root": {
                                    color: 'gray',
                                },
                                "&.Mui-focused .MuiFormLabel-root": {
                                    color: 'red',
                                },
                            }}
                        >
                            <MenuItem value="بنزين محسن" sx={{ fontFamily: 'Tajawal, sans-serif' }}>بنزين محسن</MenuItem>
                            <MenuItem value="بنزين عادي" sx={{ fontFamily: 'Tajawal, sans-serif' }}>بنزين عادي</MenuItem>
                            <MenuItem value="غاز" sx={{ fontFamily: 'Tajawal, sans-serif' }}>غاز</MenuItem>
                            <MenuItem value="كهربائي" sx={{ fontFamily: 'Tajawal, sans-serif' }}>كهربائي</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="عدد الركاب"
                            variant="outlined"
                            placeholder="مكان النص"
                            name="Seating_Capacity"
                            value={formValues.Seating_Capacity}
                            onChange={handleInputChange}
                            inputProps={{
                                inputMode: 'numeric',
                                pattern: '[0-9]*',
                            }}
                            sx={{
                                "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                                    borderColor: 'gray',
                                },
                                "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                                    borderColor: 'red',
                                },
                                "&.Mui-focused .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                                    borderColor: 'red',
                                },
                                "& .MuiFormLabel-root": {
                                    color: 'gray',
                                },
                                "&.Mui-focused .MuiFormLabel-root": {
                                    color: 'red',
                                },
                            }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="عدد الأيام"
                            variant="outlined"
                            placeholder="مكان النص"
                            name="Numbers_of_days"
                            value={formValues.Numbers_of_days}
                            onChange={handleInputChange}
                            inputProps={{
                                inputMode: 'numeric',
                                pattern: '[0-9]*',
                            }}
                            sx={{
                                "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                                    borderColor: 'gray',
                                },
                                "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                                    borderColor: 'red',
                                },
                                "&.Mui-focused .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                                    borderColor: 'red',
                                },
                                "& .MuiFormLabel-root": {
                                    color: 'gray',
                                },
                                "&.Mui-focused .MuiFormLabel-root": {
                                    color: 'red',
                                },
                            }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="السعر"
                            variant="outlined"
                            placeholder="مكان النص"
                            name="price"
                            value={formValues.price}
                            onChange={handleInputChange}
                            inputProps={{
                                inputMode: 'numeric',
                                pattern: '[0-9]*',
                            }}
                            sx={{
                                "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                                    borderColor: 'gray',
                                },
                                "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                                    borderColor: 'red',
                                },
                                "&.Mui-focused .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                                    borderColor: 'red',
                                },
                                "& .MuiFormLabel-root": {
                                    color: 'gray',
                                },
                                "&.Mui-focused .MuiFormLabel-root": {
                                    color: 'red',
                                },
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="الميزات والمرافق"
                            variant="outlined"
                            placeholder="مكان النص"
                            name="Features_and_Amenities"
                            value={formValues.Features_and_Amenities}
                            onChange={handleInputChange}
                            sx={{
                                "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                                    borderColor: 'gray',
                                },
                                "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                                    borderColor: 'red',
                                },
                                "&.Mui-focused .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                                    borderColor: 'red',
                                },
                                "& .MuiFormLabel-root": {
                                    color: 'gray',
                                },
                                "&.Mui-focused .MuiFormLabel-root": {
                                    color: 'red',
                                },
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="وصف إضافي (اختياري)"
                            variant="outlined"
                            placeholder="مكان النص"
                            name="description"
                            value={formValues.description}
                            onChange={handleInputChange}
                            multiline
                            rows={4}
                            sx={{
                                "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                                    borderColor: 'gray',
                                },
                                "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                                    borderColor: 'red',
                                },
                                "&.Mui-focused .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                                    borderColor: 'red',
                                },
                                "& .MuiFormLabel-root": {
                                    color: 'gray',
                                },
                                "&.Mui-focused .MuiFormLabel-root": {
                                    color: 'red',
                                },
                            }}
                        />
                    </Grid>
                </Grid>
            </Box>

            <Box mt={3}>
                <Button
                    onClick={handleSubmit}
                    sx={{
                        color: 'white',
                        width: '20%',
                        backgroundColor: '#E90224',
                        borderRadius: '10px',
                        fontFamily: 'Tajawal, sans-serif'
                    }}
                >
                    نشر
                </Button>
            </Box>

            <Box mt={2}>
                {alert && (
                    <Stack sx={{ width: "100%" }} spacing={2}>
                        <Alert severity={alert.severity}>{alert.message}</Alert>
                    </Stack>
                )}
            </Box>
        </Paper>
    );
};

export default CarForm;
