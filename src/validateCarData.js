const validateCarData = (data) => {
    const requiredFields = [
      'Car_name', 'car_fule', 'Year_of_Manufacture', 'Seating_Capacity',
      'Features_and_Amenities', 'Numbers_of_days', 'price', 'catgories',
      'car_image', 'car_image2'
    ];
  
    for (const field of requiredFields) {
      if (!(field in data)) {
        return `Missing required field: ${field}`;
      }
    }
  
    if (typeof data.Seating_Capacity !== 'number' || data.Seating_Capacity < 0) {
      return 'Seating Capacity must be a non-negative number';
    }
  
    if (typeof data.Numbers_of_days !== 'number' || data.Numbers_of_days < 0) {
      return 'Numbers of days must be a non-negative number';
    }
  
    if (typeof data.price !== 'number' || data.price < 0) {
      return 'Price must be a non-negative number';
    }
  
    const validateImageField = (image) => {
      const requiredImageFields = ['access', 'path', 'name', 'type', 'size', 'mime', 'meta', 'url'];
      for (const field of requiredImageFields) {
        if (!(field in image)) {
          return `Missing required image field: ${field}`;
        }
      }
      return null;
    };
  
    const imageValidationResult = validateImageField(data.car_image);
    if (imageValidationResult) {
      return imageValidationResult;
    }
  
    const image2ValidationResult = validateImageField(data.car_image2);
    if (image2ValidationResult) {
      return image2ValidationResult;
    }
  
    return null; // No errors
  };
  