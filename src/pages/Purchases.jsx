import { useState } from "react";
import { Button, Badge } from "react-bootstrap";
import { FaPlus, FaShoppingCart } from "react-icons/fa";
import DataTable from "../components/DataTable";
import AddPurchaseModal from "../components/AddPurchaseModal";
import { useAppContext } from "../context/AppContext";
import { toast } from "react-toastify";

export default function Purchases() {
  const { purchases, addPurchase } = useAppContext();
  const [showModal, setShowModal] = useState(false);

  const handleAdd = (purchase) => {
    addPurchase(purchase);
    toast.success("Purchase recorded successfully!");
  };

  const columns = [
    { key: "id", label: "#", sortable: true },
    { key: "farmerName", label: "Farmer", sortable: true },
    { key: "crop", label: "Crop", sortable: true },
    { key: "quantity", label: "Quantity", sortable: true, render: (val, item) => `${val} ${item.unit}` },
    { key: "pricePerUnit", label: "Price/Unit (₹)", sortable: true, render: (val) => `₹${val.toLocaleString("en-IN")}` },
    { key: "totalCost", label: "Total Cost (₹)", sortable: true, render: (val) => `₹${val.toLocaleString("en-IN")}` },
    { key: "date", label: "Date", sortable: true },
    { key: "status", label: "Status", render: (val) => <Badge bg={val === "Completed" ? "success" : "warning"}>{val}</Badge> },
  ];

  return (
    <div>
      <div className="page-header d-flex justify-content-between align-items-center">
        <div>
          <h1 className="page-title"><FaShoppingCart className="me-2" />Purchases</h1>
          <p className="page-subtitle">Track all procurement transactions</p>
        </div>
        <Button variant="success" onClick={() => setShowModal(true)}>
          <FaPlus className="me-1" /> New Purchase
        </Button>
      </div>
      <DataTable columns={columns} data={purchases} searchKeys={["farmerName", "crop"]} />
      <AddPurchaseModal show={showModal} onHide={() => setShowModal(false)} onAdd={handleAdd} />
    </div>
  );
}
