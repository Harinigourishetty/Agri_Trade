import { Card, Row, Col, Badge, Button } from "react-bootstrap";
import { FaBuilding, FaPhone, FaMapMarkerAlt, FaSearch } from "react-icons/fa";
import DataTable from "../components/DataTable";

const buyers = [
  { id: 1, name: "Agro Foods Ltd.", location: "Delhi", contact: "011-2345678", specialty: "Grains, Pulses", rating: 4.8 },
  { id: 2, name: "Fresh Mills Pvt.", location: "Mumbai", contact: "022-9876543", specialty: "Rice, Wheat", rating: 4.5 },
  { id: 3, name: "Sweet Sugar Co.", location: "Pune", contact: "020-5550123", specialty: "Sugarcane", rating: 4.2 },
  { id: 4, name: "Textile World", location: "Surat", contact: "0261-4443322", specialty: "Cotton", rating: 4.9 },
  { id: 5, name: "Oil Express", location: "Indore", contact: "0731-8889900", specialty: "Soybean, Mustard", rating: 4.6 },
  { id: 6, name: "Spice Junction", location: "Kochi", contact: "0484-2221133", specialty: "Spices, Turmeric", rating: 4.7 },
  { id: 7, name: "Grain Traders Inc.", location: "Chandigarh", contact: "0172-6667788", specialty: "All Crops", rating: 4.4 },
  { id: 8, name: "Tropical Exports", location: "Chennai", contact: "044-3334455", specialty: "Coconut, Fruits", rating: 4.3 },
];

export default function BuyerDirectory() {
  const columns = [
    { key: "name", label: "Buyer Name", sortable: true, render: (val) => <strong>{val}</strong> },
    { key: "location", label: "Location", sortable: true },
    { key: "specialty", label: "Specialty", render: (val) => val.split(", ").map((s, i) => <Badge bg="info" className="me-1 text-dark" key={i} style={{backgroundColor: '#e0f2fe'}}>{s}</Badge>) },
    { key: "rating", label: "Rating", sortable: true, render: (val) => <span className="text-warning">★ {val}</span> },
    { key: "contact", label: "Contact Info" },
    { key: "action", label: "Action", render: () => <Button variant="outline-success" size="sm">Contact</Button> },
  ];

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title"><FaBuilding className="me-2" />Buyer Directory</h1>
        <p className="page-subtitle">Find and connect with verified traders and companies</p>
      </div>

      <DataTable columns={columns} data={buyers} searchKeys={["name", "location", "specialty"]} />
    </div>
  );
}
