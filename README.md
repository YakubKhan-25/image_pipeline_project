# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


Title : Image Inpainting Widget

This project is an image inpainting tool that allows users to upload an image, draw on it, and save the updated version. It uses a canvas where users can paint over the image with different brush sizes and colors. You can undo your actions, clear the canvas, and download the edited image as a PNG file.


Features : 

Upload Image: Choose an image from your device to upload.

Draw on Image: Use different brush sizes and colors to draw on the image.

Undo and Clear: Undo the last action or clear the canvas completely.

Save and Export: Save your changes and export the edited image as a PNG file.


steps to run this program :

step-1 : First go to any editor (e.g., vs code) open the terminal then create a react app by using this command : npm create vite@latest image_pipeline

step-2 : select react --> javascript --> then run this commands : i) cd image_pipeline ii) npm i 

step-3 : Now you have to install extra packages i) npm i react-canvas-draw (or) npm i fabric then step-4

step-4 : Now you go into the image_pipeline finally run this command : npm run dev

step-5 : Now go to chrome then write http://localhost:5173/



How It Works : 

Upload an Image: Click the "Upload Image" button to select an image file from your computer.

Use the Canvas: After uploading, the image will appear in the canvas area. You can start drawing on it with different brush sizes and colors.

Save or Export: When you're happy with your drawing, you can save it to the canvas it shows updated versions under the updated image block which is left side or export it as a PNG file.


Technologies Used : 

React: For building the user interface.

Canvas API: For drawing on the image.

CSS: For styling the application.


