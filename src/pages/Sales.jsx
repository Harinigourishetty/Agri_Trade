import { useState } from "react";
import { Button, Badge } from "react-bootstrap";
import { FaPlus, FaChartLine } from "react-icons/fa";
import DataTable from "../components/DataTable";
import AddSaleModal from "../components/AddSaleModal";
import { useAppContext } from "../context/AppContext";
import { toast } from "react-toastify";

export default function Sales() {
  const { sales, addSale } = useAppContext();
  const [showModal, setShowModal] = useState(false);

  const handleAdd = (sale) => {
    addSale(sale);
    toast.success("Sale recorded successfully!");
  };

  const columns = [
    { key: "id", label: "#", sortable: true },
    { key: "buyerName", label: "Buyer", sortable: true },
    { key: "crop", label: "Crop", sortable: true },
    { key: "quantity", label: "Quantity", sortable: true, render: (val, item) => `${val} ${item.unit}` },
    { key: "sellingPrice", label: "Price/Unit (₹)", sortable: true, render: (val) => `₹${val.toLocaleString("en-IN")}` },
    { key: "totalRevenue", label: "Total Revenue (₹)", sortable: true, render: (val) => `₹${val.toLocaleString("en-IN")}` },
    { key: "date", label: "Date", sortable: true },
    { key: "status", label: "Status", render: (val) => <Badge bg={val === "Completed" ? "success" : "warning"}>{val}</Badge> },
  ];

  return (
    <div>
      <div className="page-header d-flex justify-content-between align-items-center">
        <div>
          <h1 className="page-title"><FaChartLine className="me-2" />Sales</h1>
          <p className="page-subtitle">Track all sales transactions</p>
        </div>
        <Button variant="success" onClick={() => setShowModal(true)}>
          <FaPlus className="me-1" /> New Sale
        </Button>
      </div>
      <DataTable columns={columns} data={sales} searchKeys={["buyerName", "crop"]} />
      <AddSaleModal show={showModal} onHide={() => setShowModal(false)} onAdd={handleAdd} />
    </div>
  );
}
