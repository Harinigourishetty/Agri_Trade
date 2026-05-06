import { Card } from "react-bootstrap";

export default function StatCard({ title, value, icon, color, subtitle }) {
  return (
    <Card className="stat-card" style={{ borderLeft: `4px solid ${color}` }}>
      <Card.Body className="d-flex align-items-center justify-content-between">
        <div>
          <p className="stat-label">{title}</p>
          <h3 className="stat-value">{value}</h3>
          {subtitle && <small className="stat-subtitle">{subtitle}</small>}
        </div>
        <div className="stat-icon" style={{ color: color, backgroundColor: `${color}15` }}>
          {icon}
        </div>
      </Card.Body>
    </Card>
  );
}
