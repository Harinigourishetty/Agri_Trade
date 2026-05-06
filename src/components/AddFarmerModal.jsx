import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

export default function AddFarmerModal({ show, onHide, onAdd }) {
  const [form, setForm] = useState({ name: "", location: "", contact: "", crops: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.location || !form.contact) return;
    onAdd(form);
    setForm({ name: "", location: "", contact: "", crops: "" });
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} centered className="custom-modal">
      <Modal.Header closeButton>
        <Modal.Title>Add New Farmer</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Full Name *</Form.Label>
            <Form.Control name="name" value={form.name} onChange={handleChange} placeholder="Enter farmer name" required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Location *</Form.Label>
            <Form.Control name="location" value={form.location} onChange={handleChange} placeholder="Enter location" required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Contact *</Form.Label>
            <Form.Control name="contact" value={form.contact} onChange={handleChange} placeholder="Enter phone number" required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Crops</Form.Label>
            <Form.Control name="crops" value={form.crops} onChange={handleChange} placeholder="e.g. Wheat, Rice" />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={onHide}>Cancel</Button>
          <Button variant="success" type="submit">Add Farmer</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
