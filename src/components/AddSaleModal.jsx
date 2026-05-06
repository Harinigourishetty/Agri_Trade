import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

export default function AddSaleModal({ show, onHide, onAdd }) {
  const [form, setForm] = useState({ buyerName: "", crop: "", quantity: "", sellingPrice: "", date: "", status: "Completed" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.buyerName || !form.crop || !form.quantity || !form.sellingPrice) return;
    onAdd({ ...form, quantity: Number(form.quantity), sellingPrice: Number(form.sellingPrice), unit: "Quintal" });
    setForm({ buyerName: "", crop: "", quantity: "", sellingPrice: "", date: "", status: "Completed" });
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} centered className="custom-modal">
      <Modal.Header closeButton>
        <Modal.Title>Record Sale</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Buyer Name *</Form.Label>
            <Form.Control name="buyerName" value={form.buyerName} onChange={handleChange} placeholder="Enter buyer name" required />
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
            <Form.Label>Selling Price per Unit (₹) *</Form.Label>
            <Form.Control type="number" name="sellingPrice" value={form.sellingPrice} onChange={handleChange} placeholder="Enter price" required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Date</Form.Label>
            <Form.Control type="date" name="date" value={form.date} onChange={handleChange} />
          </Form.Group>
          {form.quantity && form.sellingPrice && (
            <div className="total-preview">
              Total Revenue: <strong>₹{(Number(form.quantity) * Number(form.sellingPrice)).toLocaleString("en-IN")}</strong>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={onHide}>Cancel</Button>
          <Button variant="success" type="submit">Record Sale</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
