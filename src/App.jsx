import React, { useRef, useState } from "react";
import CanvasDraw from "react-canvas-draw";
import "./App.css";

function App() {
  const [image, setImage] = useState(null);
  const [finalImage, setFinalImage] = useState(null);
  const canvasRef = useRef(null);

  const [originalWidth, setOriginalWidth] = useState(0);
  const [originalHeight, setOriginalHeight] = useState(0);
  const [scaledWidth, setScaledWidth] = useState(0);
  const [scaledHeight, setScaledHeight] = useState(0);
  const [scaleFactor, setScaleFactor] = useState(1);

  const [brushSize, setBrushSize] = useState(5);
  const [brushColor, setBrushColor] = useState("black");

  const maxCanvasWidth = 800; // Max width for the canvas
  const maxCanvasHeight = 600; // Max height for the canvas

  // Handle image upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const img = new Image();
        img.src = reader.result;
        img.onload = () => {
          // Scale the image to fit the canvas within max dimensions
          let scale = Math.min(
            maxCanvasWidth / img.width,
            maxCanvasHeight / img.height
          );

          setOriginalWidth(img.width);
          setOriginalHeight(img.height);

          setScaledWidth(img.width * scale);
          setScaledHeight(img.height * scale);
          setScaleFactor(scale);

          setImage(reader.result);
          setFinalImage(null);
        };
      };
      reader.readAsDataURL(file);
    }
  };

  // Save the image (combining mask and image)
  const saveUpdatedImage = () => {
    const drawingCanvas = canvasRef.current.canvas.drawing;

    // Create a new canvas with the original image dimensions
    const combinedCanvas = document.createElement("canvas");
    combinedCanvas.width = originalWidth;
    combinedCanvas.height = originalHeight;

    const ctx = combinedCanvas.getContext("2d");

    // Draw the original image at its full size
    const originalImage = new Image();
    originalImage.src = image;
    originalImage.onload = () => {
      ctx.drawImage(originalImage, 0, 0, originalWidth, originalHeight);

      // Draw the scaled drawing canvas back to the original size
      ctx.drawImage(drawingCanvas, 0, 0, originalWidth, originalHeight);

      // Update the preview image
      setFinalImage(combinedCanvas.toDataURL("image/png"));
    };
  };

  // Export the updated image as PNG
  const exportUpdatedImage = () => {
    if (finalImage) {
      const downloadLink = document.createElement("a");
      downloadLink.href = finalImage;
      downloadLink.download = "updated_image.png";
      downloadLink.click();
    } else {
      alert("Please save the image first.");
    }
  };

  // Clear the canvas
  const clearCanvas = () => {
    canvasRef.current.clear();
  };

  // Undo the last stroke
  const undobutton = () => {
    canvasRef.current.undo();
  };

  return (
    <div className="main">
      <div className="image-display">
        <h2>Images</h2>
        <div className="uploadimage">
          <p>Uploaded Image</p>
          {image && (
            <img src={image} alt="Original" className="originalimage" />
          )}
        </div>
        <div className="updatedimage">
          <p>Updated Image</p>
          {finalImage && (
            <img
              src={finalImage}
              alt="Updated with Drawn Mask"
              className="mask-image"
            />
          )}
        </div>
      </div>
      <div className="app-container">
        <h1>Image Inpainting Widget</h1>
        {image && (
          <div className="canvas-container">
            <CanvasDraw
              ref={canvasRef}
              brushColor={brushColor}
              brushRadius={Number(brushSize)}
              canvasWidth={scaledWidth} // Scaled width
              canvasHeight={scaledHeight} // Scaled height
              style={{ border: "1px solid black" }}
              imgSrc={image}
              lazyRadius={1}
            />
          </div>
        )}
      </div>

      <div className="buttons">
        <div className="logo_tools">
          <img src="https://www.imagepipeline.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fimagepipeline-logo.bfc40668.png&w=640&q=75" alt="err" />
          <h2>Tools</h2>
        </div>

        <div className="inp">
          <label id="input" className="label" htmlFor="file-input">
            Upload Image
          <i class="fa-solid fa-cloud-arrow-up"></i>
          </label>
          <input
            type="file"
            id="file-input"
            accept="image/*"
            onChange={handleImageUpload}
          />
        </div>

        <div className="brushes">
          <div className="first">
            <label>Brush Size: </label>
            <input
              type="range"
              min="1"
              max="20"
              value={brushSize}
              onChange={(e) => setBrushSize(e.target.value)}
            />
          </div>
          <div className="second">
            <label>Brush Color: </label>
            <input
              type="color"
              value={brushColor}
              onChange={(e) => setBrushColor(e.target.value)}
            />
          </div>
        </div>
        <div className="btns">
          <button onClick={undobutton} className="updatebtn"><span>Undo</span>  <i class="fa-solid fa-rotate-left"></i></button>
          <button onClick={clearCanvas} className="updatebtn"><span>Clear Canvas</span> <i class="fa-solid fa-broom"></i></button>
          <button onClick={saveUpdatedImage}>Save Updated Image</button>
          <button onClick={exportUpdatedImage} className="updatebtn"><span>Export Image (.png)</span>  <i class="fa-solid fa-cloud-arrow-down"></i></button>
        </div>
      </div>
    </div>
  );
}

export default App;
