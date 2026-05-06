import { useState } from "react";
import { Button, Badge } from "react-bootstrap";
import { FaPlus, FaUsers } from "react-icons/fa";
import DataTable from "../components/DataTable";
import AddFarmerModal from "../components/AddFarmerModal";
import { useAppContext } from "../context/AppContext";
import { toast } from "react-toastify";

export default function Farmers() {
  const { farmers, addFarmer } = useAppContext();
  const [showModal, setShowModal] = useState(false);

  const handleAdd = (farmer) => {
    addFarmer(farmer);
    toast.success(`${farmer.name} added successfully!`);
  };

  const columns = [
    { key: "id", label: "#", sortable: true },
    { key: "name", label: "Farmer Name", sortable: true },
    { key: "location", label: "Location", sortable: true },
    { key: "contact", label: "Contact" },
    { key: "crops", label: "Crops", render: (val) => val ? val.split(", ").map((c, i) => <Badge bg="success" className="me-1" key={i}>{c}</Badge>) : "—" },
    { key: "joinDate", label: "Joined", sortable: true },
  ];

  return (
    <div>
      <div className="page-header d-flex justify-content-between align-items-center">
        <div>
          <h1 className="page-title"><FaUsers className="me-2" />Farmers</h1>
          <p className="page-subtitle">Manage your farmer partners</p>
        </div>
        <Button variant="success" onClick={() => setShowModal(true)}>
          <FaPlus className="me-1" /> Add Farmer
        </Button>
      </div>
      <DataTable columns={columns} data={farmers} searchKeys={["name", "location", "crops"]} />
      <AddFarmerModal show={showModal} onHide={() => setShowModal(false)} onAdd={handleAdd} />
    </div>
  );
}
