import React, { useState } from "react";
import { useLocation } from "react-router";
import Carousel from 'react-bootstrap/Carousel';


const CustomerServiceInfo=()=>{
    const {state}=useLocation()
    
     const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

    return (
        <div>
           <Carousel activeIndex={index} onSelect={handleSelect}>
      {state.images.map((image, idx) => (
  <Carousel.Item key={idx}>
  <div>  <img src={image.data} alt={`img-${idx}`} /></div>
    <Carousel.Caption>
      {/* <h3>First slide label</h3>
      <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
    </Carousel.Caption>
  </Carousel.Item>
))}

    </Carousel>   
        <h1>{state.service_name}</h1>
        <p>{state.service_type}</p>
        <p>{state.sub_category}</p>
        <div>{state.description}</div></div>
    )

}
export default CustomerServiceInfo;