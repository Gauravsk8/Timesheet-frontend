// src/components/RegisterUserForm.tsx
import React, { useState } from "react";
import axios from "axios";
import { useKeycloak } from "@react-keycloak/web";

const RegisterUserForm = () => {
  const { keycloak } = useKeycloak();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    employeeId: "",
    password: "",
    phone: "",
    enabled: true,
    role: "EMPLOYEE",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type } = target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? target.checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      employeeId: formData.employeeId,
      password: formData.password,
      phone: formData.phone,
      enabled: formData.enabled,
    };

    try {
      await keycloak.updateToken(30); // Refresh token if it's close to expiring

      const response = await axios.post(
        `http://localhost:8098/api/employees/create?role=${formData.role}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${keycloak.token}`,
          },
        }
      );

      alert("User registered: " + response.data);

      // Reset form after success
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        employeeId: "",
        password: "",
        phone: "",
        enabled: true,
        role: "EMPLOYEE",
      });
    } catch (err: any) {
      console.error("Error:", err.response?.data || err.message);
      alert("Registration failed: " + (err.response?.data || err.message));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register New Employee</h2>
      <input
        name="firstName"
        placeholder="First Name"
        value={formData.firstName}
        onChange={handleChange}
        required
      />
      <input
        name="lastName"
        placeholder="Last Name"
        value={formData.lastName}
        onChange={handleChange}
        required
      />
      <input
        name="email"
        placeholder="Email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <input
        name="employeeId"
        placeholder="Employee ID"
        value={formData.employeeId}
        onChange={handleChange}
        required
      />
      <input
        name="password"
        placeholder="Password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        required
      />
      <input
        name="phone"
        placeholder="Phone"
        value={formData.phone}
        onChange={handleChange}
        required
      />
      <label>
        Enabled:
        <input
          type="checkbox"
          name="enabled"
          checked={formData.enabled}
          onChange={handleChange}
        />
      </label>
      <select name="role" value={formData.role} onChange={handleChange}>
        <option value="EMPLOYEE">Employee</option>
        <option value="ADMIN">Admin</option>
        <option value="Manager">Manager</option>
        <option value="HR">HR</option>
      </select>
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Registering..." : "Register"}
      </button>
    </form>
  );
};

export default RegisterUserForm;
