import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Box, Button, Grid, TextField, Typography, Paper, Alert, Stack, MenuItem } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import { red } from "@mui/material/colors";

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

const EditCarForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [uploadedImages, setUploadedImages] = useState([null, null]);
    const [formValues, setFormValues] = useState({
        Car_name: "",
        car_fule: "",
        Year_of_Manufacture: "",
        Seating_Capacity: "",
        Features_and_Amenities: "",
        Numbers_of_days: "",
        price: "",
        catgories: "",
        transmissionType: "",
        description: "",
    });
    const [alert, setAlert] = useState(null);

    useEffect(() => {
        const fetchCarData = async () => {
            try {
                const response = await axios.get(`https://x8ki-letl-twmt.n7.xano.io/api:IzeJrQwI/carinfo/${id}`);
                const data = response.data;
                setFormValues({
                    Car_name: data.Car_name,
                    car_fule: data.car_fule,
                    Year_of_Manufacture: data.Year_of_Manufacture,
                    Seating_Capacity: data.Seating_Capacity,
                    Features_and_Amenities: data.Features_and_Amenities,
                    Numbers_of_days: data.Numbers_of_days,
                    price: data.price,
                    catgories: data.catgories,
                    transmissionType: data.transmissionType,
                    description: data.description || "",
                });
                setUploadedImages([data.car_image.url, data.car_image2.url]);
            } catch (error) {
                console.error("Error fetching car data:", error);
            }
        };

        fetchCarData();
    }, [id]);

    const handleImageUpload = (image, index) => {
        const newImages = [...uploadedImages];
        newImages[index] = image;
        setUploadedImages(newImages);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const validateForm = () => {
        const requiredFields = [
            "Car_name",
            "car_fule",
            "Year_of_Manufacture",
            "Seating_Capacity",
            "Features_and_Amenities",
            "Numbers_of_days",
            "price",
            "catgories",
            "transmissionType",
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errorMessage = validateForm();
        if (errorMessage) {
            setAlert({ severity: "error", message: errorMessage });
        } else {
            try {
                const updatedData = { ...formValues, car_image: { url: uploadedImages[0] }, car_image2: { url: uploadedImages[1] } };
                await axios.put(`https://x8ki-letl-twmt.n7.xano.io/api:IzeJrQwI/carinfo/${id}`, updatedData);
                setAlert({ severity: "success", message: "تم حفظ التغييرات بنجاح." });
                setTimeout(() => {
                    navigate(`/car/${id}`);
                }, 2000); // Navigate after 2 seconds to show success message
            } catch (error) {
                setAlert({ severity: "error", message: "حدث خطأ أثناء حفظ التغييرات." });
                console.error("Error updating car data:", error);
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
                            label="اسم السيارة"
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
                            label="سنة الصنع"
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
                            <MenuItem value="" sx={{ fontFamily: 'Tajawal, sans-serif' }}>اختر نوع الوقود</MenuItem>
                            <MenuItem value="بنزين" sx={{ fontFamily: 'Tajawal, sans-serif' }}>بنزين</MenuItem>
                            <MenuItem value="ديزل" sx={{ fontFamily: 'Tajawal, sans-serif' }}>ديزل</MenuItem>
                            <MenuItem value="كهربائي" sx={{ fontFamily: 'Tajawal, sans-serif' }}>كهربائي</MenuItem>
                            <MenuItem value="هجين" sx={{ fontFamily: 'Tajawal, sans-serif' }}>هجين</MenuItem>
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
                            label="نوع النقل"
                            variant="outlined"
                            placeholder="مكان النص"
                            name="transmissionType"
                            value={formValues.transmissionType}
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
                    حفظ التغييرات
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

export default EditCarForm;
