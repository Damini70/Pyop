import React from "react";
import "./HeroMainCard.css";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const HeroMainCard = ({ data }) => {
  const { Title, Desc, Image } = data || {};
  return (
    <div>
      <Card className="rounded rounded-0  border-black hero-main-card-style">
        <div className="image-container">
          <Card.Img
            variant="top"
            className="main-card-image rounded rounded-0"
            src={Image}
          />
        </div>
        <Card.Body className="bg-black">
          <Card.Title className="text-20px text-white text-center">
            {Title}
          </Card.Title>
          {/* <Card.Text className="text-14px text-hero-main-style">
            {Desc}
          </Card.Text> */}
        </Card.Body>
      </Card>
    </div>
  );
};

export default HeroMainCard;
