import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Card } from "react-bootstrap";
import { FaSeedling } from "react-icons/fa";
import { useAppContext } from "../context/AppContext";
import { toast } from "react-toastify";

export default function Register() {
  const [form, setForm] = useState({ 
    name: "", 
    email: "", 
    password: "", 
    confirm: "",
    role: "farmer", // 'farmer' or 'trader'
    location: "",
    contact: ""
  });
  const { register } = useAppContext();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirm) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      await register(form);
      toast.success("Account created successfully! Please sign in.");
      navigate("/login");
    } catch (err) {
      toast.error(err.message || "Registration failed");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-bg-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
      </div>
      <Card className="auth-card">
        <Card.Body className="p-4 p-md-5">
          <div className="text-center mb-4">
            <div className="auth-logo">
              <FaSeedling />
            </div>
            <h2 className="auth-title">Join AgriTrade</h2>
            <p className="auth-subtitle">Create your trading account</p>
          </div>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Full Name *</Form.Label>
              <Form.Control name="name" value={form.name} onChange={handleChange} placeholder="Enter your name" className="auth-input" required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email Address *</Form.Label>
              <Form.Control type="email" name="email" value={form.email} onChange={handleChange} placeholder="trader@agritrade.com" className="auth-input" required />
            </Form.Group>
            
            <div className="row">
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label>Role *</Form.Label>
                  <Form.Select name="role" value={form.role} onChange={handleChange} className="auth-input">
                    <option value="farmer">Farmer</option>
                    <option value="trader">Trader</option>
                  </Form.Select>
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label>Contact Number *</Form.Label>
                  <Form.Control name="contact" value={form.contact} onChange={handleChange} placeholder="e.g. +91 9876543210" className="auth-input" required />
                </Form.Group>
              </div>
            </div>

            <Form.Group className="mb-3">
              <Form.Label>Location (State/City) *</Form.Label>
              <Form.Control name="location" value={form.location} onChange={handleChange} placeholder="e.g. Punjab" className="auth-input" required />
            </Form.Group>

            <div className="row">
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label>Password *</Form.Label>
                  <Form.Control type="password" name="password" value={form.password} onChange={handleChange} placeholder="Create password" className="auth-input" required />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label>Confirm Password *</Form.Label>
                  <Form.Control type="password" name="confirm" value={form.confirm} onChange={handleChange} placeholder="Confirm password" className="auth-input" required />
                </Form.Group>
              </div>
            </div>

            <Button variant="success" type="submit" className="w-100 auth-btn mt-2">Create Account</Button>
          </Form>
          <p className="text-center mt-3 mb-0">
            Already have an account? <Link to="/login" className="auth-link">Sign In</Link>
          </p>
        </Card.Body>
      </Card>
    </div>
  );
}
