import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "../Pages/Homepage";
import Approve from "../Pages/Approve";
import CarForm from "../Pages/CarForm";
import Login from "../Pages/Login";
import Listing from "../Pages/Listing";
import CarPostForm from '../Pages/CarPostForm'
import CarDetails from "../Pages/CarDetails";
import EditCarForm from "../Pages/EditCarForm"; // Import the new EditCarForm component

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/approve" element={<Approve />} />
      <Route path="/carform" element={<CarForm />} />
      <Route path="/listing" element={<Listing />} />
      <Route path="/CarPostForm" element={<CarPostForm />} />

      <Route path="/car/:id" element={<CarDetails />} />
      <Route path="/car/edit/:id" element={<EditCarForm />} /> {/* Add the route for edit form */}
      <Route path="*" element={<Navigate to="/home" />} />
    </Routes>
  );
};

export default Routers;
