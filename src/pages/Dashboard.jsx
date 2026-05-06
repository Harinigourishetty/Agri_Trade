import { Row, Col, Card } from "react-bootstrap";
import { FaUsers, FaShoppingCart, FaChartLine, FaWarehouse, FaRupeeSign } from "react-icons/fa";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Legend } from "recharts";
import StatCard from "../components/StatCard";
import { useAppContext } from "../context/AppContext";

const COLORS = ["#2d6a4f", "#40916c", "#52b788", "#74c69d", "#95d5b2", "#b7e4c7", "#d8f3dc", "#1b4332", "#081c15", "#a7c957", "#6a994e", "#386641"];

export default function Dashboard() {
  const { farmers, purchases, sales, inventory, totalPurchaseCost, totalSalesRevenue, totalStock, netProfit } = useAppContext();

  const formatCurrency = (val) => `₹${(val / 100000).toFixed(1)}L`;

  const monthlySalesData = [
    { month: "Jul", purchases: 320000, sales: 180000 },
    { month: "Aug", purchases: 480000, sales: 350000 },
    { month: "Sep", purchases: 650000, sales: 520000 },
    { month: "Oct", purchases: 890000, sales: 780000 },
    { month: "Nov", purchases: 2100000, sales: 1250000 },
    { month: "Dec", purchases: 1340000, sales: 2770000 },
  ];

  const cropDistribution = [
    { name: "Wheat", value: 320 },
    { name: "Rice", value: 280 },
    { name: "Cotton", value: 150 },
    { name: "Soybean", value: 130 },
    { name: "Maize", value: 200 },
    { name: "Others", value: 780 },
  ];

  const profitTrend = [
    { month: "Jul", profit: -140000 },
    { month: "Aug", profit: -130000 },
    { month: "Sep", profit: -130000 },
    { month: "Oct", profit: -110000 },
    { month: "Nov", profit: -850000 },
    { month: "Dec", profit: 1430000 },
  ];

  return (
    <div className="dashboard-page">
      <div className="page-header">
        <h1 className="page-title">Dashboard</h1>
        <p className="page-subtitle">Overview of your trading operations</p>
      </div>

      <Row className="g-3 mb-4">
        <Col xs={12} sm={6} lg={3}>
          <StatCard title="Total Farmers" value={farmers.length} icon={<FaUsers size={24} />} color="#2d6a4f" subtitle="Active partners" />
        </Col>
        <Col xs={12} sm={6} lg={3}>
          <StatCard title="Total Purchases" value={`₹${(totalPurchaseCost / 100000).toFixed(1)}L`} icon={<FaShoppingCart size={24} />} color="#e76f51" subtitle={`${purchases.length} transactions`} />
        </Col>
        <Col xs={12} sm={6} lg={3}>
          <StatCard title="Total Sales" value={`₹${(totalSalesRevenue / 100000).toFixed(1)}L`} icon={<FaChartLine size={24} />} color="#2196f3" subtitle={`${sales.length} transactions`} />
        </Col>
        <Col xs={12} sm={6} lg={3}>
          <StatCard title="Net Profit" value={`₹${(netProfit / 100000).toFixed(1)}L`} icon={<FaRupeeSign size={24} />} color={netProfit >= 0 ? "#2d6a4f" : "#e76f51"} subtitle={`${totalStock} Qtl in stock`} />
        </Col>
      </Row>

      <Row className="g-3 mb-4">
        <Col xs={12} lg={8}>
          <Card className="chart-card">
            <Card.Body>
              <h5 className="chart-title">Purchases vs Sales</h5>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlySalesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                  <XAxis dataKey="month" stroke="#6c757d" />
                  <YAxis tickFormatter={(v) => `₹${v / 1000}K`} stroke="#6c757d" />
                  <Tooltip formatter={(v) => `₹${v.toLocaleString("en-IN")}`} />
                  <Legend />
                  <Bar dataKey="purchases" fill="#e76f51" radius={[4, 4, 0, 0]} name="Purchases" />
                  <Bar dataKey="sales" fill="#2d6a4f" radius={[4, 4, 0, 0]} name="Sales" />
                </BarChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} lg={4}>
          <Card className="chart-card">
            <Card.Body>
              <h5 className="chart-title">Stock Distribution</h5>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={cropDistribution} cx="50%" cy="50%" outerRadius={100} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                    {cropDistribution.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="g-3">
        <Col xs={12}>
          <Card className="chart-card">
            <Card.Body>
              <h5 className="chart-title">Profit Trend</h5>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={profitTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                  <XAxis dataKey="month" stroke="#6c757d" />
                  <YAxis tickFormatter={(v) => `₹${v / 1000}K`} stroke="#6c757d" />
                  <Tooltip formatter={(v) => `₹${v.toLocaleString("en-IN")}`} />
                  <Line type="monotone" dataKey="profit" stroke="#2d6a4f" strokeWidth={3} dot={{ r: 5, fill: "#2d6a4f" }} name="Profit" />
                </LineChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
