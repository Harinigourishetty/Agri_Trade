import { FaWarehouse } from "react-icons/fa";
import { Badge } from "react-bootstrap";
import DataTable from "../components/DataTable";
import { useAppContext } from "../context/AppContext";

export default function Inventory() {
  const { inventory } = useAppContext();

  const getStockLevel = (qty) => {
    if (qty > 300) return <Badge bg="success">High</Badge>;
    if (qty > 100) return <Badge bg="warning" text="dark">Medium</Badge>;
    return <Badge bg="danger">Low</Badge>;
  };

  const columns = [
    { key: "id", label: "#", sortable: true },
    { key: "cropName", label: "Crop", sortable: true },
    { key: "quantityAvailable", label: "Qty Available", sortable: true, render: (val, item) => `${val} ${item.unit}` },
    { key: "avgPurchasePrice", label: "Avg Price (₹)", sortable: true, render: (val) => `₹${val.toLocaleString("en-IN")}` },
    { key: "totalValue", label: "Total Value (₹)", sortable: true, render: (val) => `₹${val.toLocaleString("en-IN")}` },
    { key: "warehouse", label: "Warehouse", sortable: true },
    { key: "quantityAvailable", label: "Stock Level", render: (val) => getStockLevel(val) },
  ];

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title"><FaWarehouse className="me-2" />Inventory</h1>
        <p className="page-subtitle">Current stock levels across all warehouses</p>
      </div>
      <DataTable columns={columns} data={inventory} searchKeys={["cropName", "warehouse"]} />
    </div>
  );
}
