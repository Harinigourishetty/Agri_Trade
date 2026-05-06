import { Badge } from "react-bootstrap";
import { FaSeedling } from "react-icons/fa";
import DataTable from "../components/DataTable";
import { useAppContext } from "../context/AppContext";

export default function Crops() {
  const { crops } = useAppContext();

  const columns = [
    { key: "id", label: "#", sortable: true },
    { key: "cropName", label: "Crop Name", sortable: true },
    { key: "farmerName", label: "Farmer", sortable: true },
    { key: "quantity", label: "Quantity", sortable: true, render: (val, item) => `${val} ${item.unit}` },
    { key: "expectedPrice", label: "Expected Price (₹)", sortable: true, render: (val) => `₹${val.toLocaleString("en-IN")}` },
    { key: "location", label: "Location", sortable: true },
    { key: "status", label: "Status", render: (val) => <Badge bg={val === "Available" ? "success" : "secondary"}>{val}</Badge> },
  ];

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title"><FaSeedling className="me-2" />Crop Listings</h1>
        <p className="page-subtitle">Crops listed by registered farmers</p>
      </div>
      <DataTable columns={columns} data={crops} searchKeys={["cropName", "farmerName", "location"]} />
    </div>
  );
}
