import { useState } from "react";
import { Button, Badge, Modal, Form } from "react-bootstrap";
import { FaPlus, FaSeedling } from "react-icons/fa";
import DataTable from "../components/DataTable";
import { useAppContext } from "../context/AppContext";
import { toast } from "react-toastify";

export default function MyListings() {
  const { currentFarmer, crops, addCropListing } = useAppContext();
  const [showModal, setShowModal] = useState(false);
  const [newListing, setNewListing] = useState({ cropName: "", quantity: "", unit: "Quintal", expectedPrice: "", location: currentFarmer?.location || "" });

  const myListings = crops.filter(c => c.farmerName === currentFarmer?.name);

  const handleSubmit = (e) => {
    e.preventDefault();
    addCropListing({
      ...newListing,
      farmerId: currentFarmer?.id,
      farmerName: currentFarmer?.name,
      quantity: Number(newListing.quantity),
      expectedPrice: Number(newListing.expectedPrice)
    });
    toast.success("Crop listed successfully!");
    setShowModal(false);
    setNewListing({ cropName: "", quantity: "", unit: "Quintal", expectedPrice: "", location: currentFarmer?.location || "" });
  };

  const columns = [
    { key: "id", label: "#", sortable: true },
    { key: "cropName", label: "Crop Name", sortable: true },
    { key: "quantity", label: "Quantity", render: (val, item) => `${val} ${item.unit}` },
    { key: "expectedPrice", label: "Expected Price (₹)", render: (val) => `₹${val.toLocaleString("en-IN")}` },
    { key: "location", label: "Location" },
    { key: "status", label: "Status", render: (val) => <Badge bg={val === "Available" ? "success" : "secondary"}>{val}</Badge> },
  ];

  return (
    <div>
      <div className="page-header d-flex justify-content-between align-items-center">
        <div>
          <h1 className="page-title"><FaSeedling className="me-2" />My Listings</h1>
          <p className="page-subtitle">Manage the crops you have available for sale</p>
        </div>
        <Button variant="success" onClick={() => setShowModal(true)}>
          <FaPlus className="me-1" /> New Listing
        </Button>
      </div>

      <DataTable columns={columns} data={myListings} searchKeys={["cropName", "location"]} />

      <Modal show={showModal} onHide={() => setShowModal(false)} centered className="custom-modal">
        <Modal.Header closeButton>
          <Modal.Title>List a New Crop</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Crop Name *</Form.Label>
              <Form.Control 
                placeholder="e.g. Basmati Rice" 
                value={newListing.cropName}
                onChange={(e) => setNewListing({...newListing, cropName: e.target.value})}
                required 
              />
            </Form.Group>
            <div className="row">
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label>Quantity *</Form.Label>
                  <Form.Control 
                    type="number"
                    value={newListing.quantity}
                    onChange={(e) => setNewListing({...newListing, quantity: e.target.value})}
                    required 
                  />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label>Unit</Form.Label>
                  <Form.Select 
                    value={newListing.unit}
                    onChange={(e) => setNewListing({...newListing, unit: e.target.value})}
                  >
                    <option>Quintal</option>
                    <option>Ton</option>
                    <option>Kg</option>
                  </Form.Select>
                </Form.Group>
              </div>
            </div>
            <Form.Group className="mb-3">
              <Form.Label>Expected Price per Unit (₹) *</Form.Label>
              <Form.Control 
                type="number"
                value={newListing.expectedPrice}
                onChange={(e) => setNewListing({...newListing, expectedPrice: e.target.value})}
                required 
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Location</Form.Label>
              <Form.Control 
                value={newListing.location}
                onChange={(e) => setNewListing({...newListing, location: e.target.value})}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-secondary" onClick={() => setShowModal(false)}>Cancel</Button>
            <Button variant="success" type="submit">Publish Listing</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}
