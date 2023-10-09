import React from "react";
import "./FaceRecognition.css";

const FaceRecognition = ({ imageUrl, box }) => {
  
  return (
    <div className="center ma" >
      <div className="absolute mt2">
        <img
          src={imageUrl}
          alt=""
          width="500px"
          height="auto"
          id="inputimage"
        />
        {box.map((item) => (
          <div
            key={item.leftCol}
            className="bounding-box"
            style={{
              top: item.topRow,
              right: item.rightCol,
              bottom: item.bottomRow,
              left: item.leftCol,
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default FaceRecognition;

