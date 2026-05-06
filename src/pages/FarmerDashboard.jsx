import { Row, Col, Card, Button } from "react-bootstrap";
import { FaSeedling, FaShoppingCart, FaRupeeSign, FaPlus } from "react-icons/fa";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import StatCard from "../components/StatCard";
import { useAppContext } from "../context/AppContext";
import { Link } from "react-router-dom";

export default function FarmerDashboard() {
  const { currentFarmer, crops, purchases } = useAppContext();
  
  // Filter data for current farmer
  const myCrops = crops.filter(c => c.farmerName === currentFarmer?.name);
  const mySales = purchases.filter(p => p.farmerName === currentFarmer?.name);
  
  const totalRevenue = mySales.reduce((sum, s) => sum + s.totalCost, 0);
  const activeListings = myCrops.filter(c => c.status === 'Available').length;
  const totalSold = myCrops.filter(c => c.status === 'Sold').length;

  const salesTrend = [
    { month: "Aug", sales: 15000 },
    { month: "Sep", sales: 25000 },
    { month: "Oct", sales: 45000 },
    { month: "Nov", sales: 120000 },
    { month: "Dec", sales: totalRevenue > 0 ? totalRevenue : 0 },
  ];

  return (
    <div className="farmer-dashboard">
      <div className="page-header d-flex justify-content-between align-items-end">
        <div>
          <h1 className="page-title">Farmer Dashboard</h1>
          <p className="page-subtitle">Welcome back, {currentFarmer?.name || 'Farmer'}</p>
        </div>
        <Link to="/my-listings">
          <Button variant="success">
            <FaPlus className="me-2" /> New Listing
          </Button>
        </Link>
      </div>

      <Row className="g-3 mb-4">
        <Col xs={12} sm={6} lg={4}>
          <StatCard 
            title="My Revenue" 
            value={`₹${totalRevenue.toLocaleString("en-IN")}`} 
            icon={<FaRupeeSign size={24} />} 
            color="#2d6a4f" 
            subtitle={`${mySales.length} successful sales`} 
          />
        </Col>
        <Col xs={12} sm={6} lg={4}>
          <StatCard 
            title="Active Listings" 
            value={activeListings} 
            icon={<FaSeedling size={24} />} 
            color="#40916c" 
            subtitle="Crops in marketplace" 
          />
        </Col>
        <Col xs={12} sm={6} lg={4}>
          <StatCard 
            title="Items Sold" 
            value={totalSold} 
            icon={<FaShoppingCart size={24} />} 
            color="#e76f51" 
            subtitle="Total units moved" 
          />
        </Col>
      </Row>

      <Row className="g-3">
        <Col xs={12}>
          <Card className="chart-card">
            <Card.Body>
              <h5 className="chart-title">My Sales Performance</h5>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={salesTrend}>
                  <defs>
                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2d6a4f" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#2d6a4f" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} tickFormatter={(v) => `₹${v/1000}K`} />
                  <Tooltip formatter={(v) => `₹${v.toLocaleString("en-IN")}`} />
                  <Area type="monotone" dataKey="sales" stroke="#2d6a4f" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" name="Sales Revenue" />
                </AreaChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
