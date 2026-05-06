import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useAppContext } from "../context/AppContext";

export default function AddPurchaseModal({ show, onHide, onAdd }) {
  const { farmers } = useAppContext();
  const [form, setForm] = useState({ farmerName: "", crop: "", quantity: "", pricePerUnit: "", date: "", status: "Completed" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.farmerName || !form.crop || !form.quantity || !form.pricePerUnit) return;
    onAdd({ ...form, quantity: Number(form.quantity), pricePerUnit: Number(form.pricePerUnit), unit: "Quintal" });
    setForm({ farmerName: "", crop: "", quantity: "", pricePerUnit: "", date: "", status: "Completed" });
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} centered className="custom-modal">
      <Modal.Header closeButton>
        <Modal.Title>Record Purchase</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Farmer *</Form.Label>
            <Form.Select name="farmerName" value={form.farmerName} onChange={handleChange} required>
              <option value="">Select farmer</option>
              {farmers.map((f) => <option key={f.id} value={f.name}>{f.name}</option>)}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Crop *</Form.Label>
            <Form.Control name="crop" value={form.crop} onChange={handleChange} placeholder="Enter crop name" required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Quantity (Quintal) *</Form.Label>
            <Form.Control type="number" name="quantity" value={form.quantity} onChange={handleChange} placeholder="Enter quantity" required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Price per Unit (₹) *</Form.Label>
            <Form.Control type="number" name="pricePerUnit" value={form.pricePerUnit} onChange={handleChange} placeholder="Enter price" required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Date</Form.Label>
            <Form.Control type="date" name="date" value={form.date} onChange={handleChange} />
          </Form.Group>
          {form.quantity && form.pricePerUnit && (
            <div className="total-preview">
              Total Cost: <strong>₹{(Number(form.quantity) * Number(form.pricePerUnit)).toLocaleString("en-IN")}</strong>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={onHide}>Cancel</Button>
          <Button variant="success" type="submit">Record Purchase</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
