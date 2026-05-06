import { Row, Col, Card } from "react-bootstrap";
import { FaFileAlt } from "react-icons/fa";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, AreaChart, Area } from "recharts";

const dailyProfit = [
  { day: "Mon", revenue: 185000, cost: 142000, profit: 43000 },
  { day: "Tue", revenue: 220000, cost: 168000, profit: 52000 },
  { day: "Wed", revenue: 195000, cost: 155000, profit: 40000 },
  { day: "Thu", revenue: 310000, cost: 210000, profit: 100000 },
  { day: "Fri", revenue: 275000, cost: 198000, profit: 77000 },
  { day: "Sat", revenue: 340000, cost: 225000, profit: 115000 },
  { day: "Sun", revenue: 120000, cost: 95000, profit: 25000 },
];

const monthlyProfit = [
  { month: "Jan", revenue: 1800000, cost: 1520000, profit: 280000 },
  { month: "Feb", revenue: 2100000, cost: 1750000, profit: 350000 },
  { month: "Mar", revenue: 2450000, cost: 1980000, profit: 470000 },
  { month: "Apr", revenue: 1950000, cost: 1680000, profit: 270000 },
  { month: "May", revenue: 2800000, cost: 2100000, profit: 700000 },
  { month: "Jun", revenue: 3200000, cost: 2350000, profit: 850000 },
  { month: "Jul", revenue: 2600000, cost: 2050000, profit: 550000 },
  { month: "Aug", revenue: 2900000, cost: 2200000, profit: 700000 },
  { month: "Sep", revenue: 3500000, cost: 2500000, profit: 1000000 },
  { month: "Oct", revenue: 3800000, cost: 2700000, profit: 1100000 },
  { month: "Nov", revenue: 4200000, cost: 2900000, profit: 1300000 },
  { month: "Dec", revenue: 5020000, cost: 3590000, profit: 1430000 },
];

const topCrops = [
  { crop: "Coffee", profit: 380000 },
  { crop: "Cotton", profit: 320000 },
  { crop: "Turmeric", profit: 280000 },
  { crop: "Rice", profit: 210000 },
  { crop: "Coconut", profit: 195000 },
  { crop: "Soybean", profit: 170000 },
];

export default function Reports() {
  const totalMonthlyProfit = monthlyProfit.reduce((sum, m) => sum + m.profit, 0);
  const avgDailyProfit = dailyProfit.reduce((sum, d) => sum + d.profit, 0) / dailyProfit.length;

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title"><FaFileAlt className="me-2" />Reports</h1>
        <p className="page-subtitle">Financial performance analytics</p>
      </div>

      <Row className="g-3 mb-4">
        <Col xs={12} sm={6} lg={3}>
          <Card className="report-stat-card">
            <Card.Body className="text-center">
              <p className="stat-label">Yearly Revenue</p>
              <h3 className="stat-value text-primary">₹{(monthlyProfit.reduce((s, m) => s + m.revenue, 0) / 100000).toFixed(1)}L</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} sm={6} lg={3}>
          <Card className="report-stat-card">
            <Card.Body className="text-center">
              <p className="stat-label">Yearly Cost</p>
              <h3 className="stat-value text-danger">₹{(monthlyProfit.reduce((s, m) => s + m.cost, 0) / 100000).toFixed(1)}L</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} sm={6} lg={3}>
          <Card className="report-stat-card">
            <Card.Body className="text-center">
              <p className="stat-label">Yearly Profit</p>
              <h3 className="stat-value text-success">₹{(totalMonthlyProfit / 100000).toFixed(1)}L</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} sm={6} lg={3}>
          <Card className="report-stat-card">
            <Card.Body className="text-center">
              <p className="stat-label">Avg Daily Profit</p>
              <h3 className="stat-value" style={{ color: "#2d6a4f" }}>₹{Math.round(avgDailyProfit).toLocaleString("en-IN")}</h3>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="g-3 mb-4">
        <Col xs={12} lg={6}>
          <Card className="chart-card">
            <Card.Body>
              <h5 className="chart-title">Daily Profit (This Week)</h5>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={dailyProfit}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                  <XAxis dataKey="day" stroke="#6c757d" />
                  <YAxis tickFormatter={(v) => `₹${v / 1000}K`} stroke="#6c757d" />
                  <Tooltip formatter={(v) => `₹${v.toLocaleString("en-IN")}`} />
                  <Legend />
                  <Bar dataKey="revenue" fill="#2196f3" radius={[4, 4, 0, 0]} name="Revenue" />
                  <Bar dataKey="cost" fill="#e76f51" radius={[4, 4, 0, 0]} name="Cost" />
                  <Bar dataKey="profit" fill="#2d6a4f" radius={[4, 4, 0, 0]} name="Profit" />
                </BarChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} lg={6}>
          <Card className="chart-card">
            <Card.Body>
              <h5 className="chart-title">Top Profitable Crops</h5>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={topCrops} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                  <XAxis type="number" tickFormatter={(v) => `₹${v / 1000}K`} stroke="#6c757d" />
                  <YAxis type="category" dataKey="crop" stroke="#6c757d" width={70} />
                  <Tooltip formatter={(v) => `₹${v.toLocaleString("en-IN")}`} />
                  <Bar dataKey="profit" fill="#40916c" radius={[0, 4, 4, 0]} name="Profit" />
                </BarChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="g-3">
        <Col xs={12}>
          <Card className="chart-card">
            <Card.Body>
              <h5 className="chart-title">Monthly Profit Trend</h5>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={monthlyProfit}>
                  <defs>
                    <linearGradient id="profitGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2d6a4f" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#2d6a4f" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                  <XAxis dataKey="month" stroke="#6c757d" />
                  <YAxis tickFormatter={(v) => `₹${v / 100000}L`} stroke="#6c757d" />
                  <Tooltip formatter={(v) => `₹${v.toLocaleString("en-IN")}`} />
                  <Legend />
                  <Area type="monotone" dataKey="profit" stroke="#2d6a4f" strokeWidth={3} fill="url(#profitGrad)" name="Profit" />
                </AreaChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
