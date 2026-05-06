import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Card } from "react-bootstrap";
import { FaSeedling } from "react-icons/fa";
import { useAppContext } from "../context/AppContext";
import { toast } from "react-toastify";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const { login } = useAppContext();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.password !== form.confirm) {
      toast.error("Passwords do not match");
      return;
    }
    if (form.name && form.email && form.password) {
      login();
      toast.success("Account created successfully!");
      navigate("/dashboard");
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
              <Form.Label>Full Name</Form.Label>
              <Form.Control name="name" value={form.name} onChange={handleChange} placeholder="Enter your name" className="auth-input" required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email Address</Form.Label>
              <Form.Control type="email" name="email" value={form.email} onChange={handleChange} placeholder="trader@agritrade.com" className="auth-input" required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" name="password" value={form.password} onChange={handleChange} placeholder="Create a password" className="auth-input" required />
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type="password" name="confirm" value={form.confirm} onChange={handleChange} placeholder="Confirm password" className="auth-input" required />
            </Form.Group>
            <Button variant="success" type="submit" className="w-100 auth-btn">Create Account</Button>
          </Form>
          <p className="text-center mt-3 mb-0">
            Already have an account? <Link to="/login" className="auth-link">Sign In</Link>
          </p>
        </Card.Body>
      </Card>
    </div>
  );
}
