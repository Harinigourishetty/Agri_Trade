import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Card } from "react-bootstrap";
import { FaSeedling } from "react-icons/fa";
import { useAppContext } from "../context/AppContext";
import { toast } from "react-toastify";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("trader"); // 'trader' or 'farmer'
  const { login } = useAppContext();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email && password) {
      try {
        await login(email, password, role);
        toast.success(`Welcome back, ${role === 'trader' ? 'Trader' : 'Farmer'}!`);
        navigate(role === 'trader' ? "/dashboard" : "/farmer-dashboard");
      } catch (err) {
        toast.error(err.message || "Login failed");
      }
    } else {
      toast.error("Please fill in all fields");
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
            <h2 className="auth-title">AgriTrade</h2>
            <p className="auth-subtitle">Choose your role to sign in</p>
          </div>

          <div className="d-flex justify-content-center mb-4">
            <div className="role-selector">
              <button 
                className={`role-btn ${role === 'trader' ? 'active' : ''}`}
                onClick={() => setRole('trader')}
              >
                Trader
              </button>
              <button 
                className={`role-btn ${role === 'farmer' ? 'active' : ''}`}
                onClick={() => setRole('farmer')}
              >
                Farmer
              </button>
            </div>
          </div>

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="trader@agritrade.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="auth-input"
              />
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="auth-input"
              />
            </Form.Group>
            <Button variant="success" type="submit" className="w-100 auth-btn">
              Sign In
            </Button>
          </Form>
          <p className="text-center mt-3 mb-0">
            Don't have an account? <Link to="/register" className="auth-link">Register</Link>
          </p>
        </Card.Body>
      </Card>
    </div>
  );
}
