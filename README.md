# Responsive Canvas with React and Konva

This project demonstrates a responsive canvas using React and Konva. The canvas scales and moves with the browser window, supporting zooming and panning functionalities. The example includes handling for both mouse and touch events to interact with the canvas.

## Features

- **Responsive Design**: The canvas adapts to the size of the window and maintains its aspect ratio.
- **Zoom and Pan**: Use mouse wheel or touch gestures to zoom and pan the canvas.
- **Dynamic Image Loading**: Loads and displays an image from base64 data.
- **Drag and Drop**: The canvas can be dragged around.

## Getting Started

To get started with this project, follow the instructions below to set up your development environment and run the application locally.

### Prerequisites

- [Node.js](https://nodejs.org/) (version 14 or later)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) (package managers)

### Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/shubham51919/responsive-canvas-demo.git
    ```

2. **Navigate into the project directory:**

    ```bash
    cd ResponsiveCanvas
    ```

3. **Install dependencies:**

    Using npm:

    ```bash
    npm install
    ```

    Or using yarn:

    ```bash
    yarn install
    ```

### Running the Application

1. **Start the development server:**

    Using npm:

    ```bash
    npm run dev
    ```

    Or using yarn:

    ```bash
    yarn start
    ```

2. **Open your browser and navigate to:**

    ```
    http://localhost:5173
    ```

    You should see the responsive canvas in action.

### Code Explanation

- **`ResponsiveCanvas` Component**: This is the main React component handling the canvas. It utilizes the Konva library to render and manage the canvas elements.
- **State Management**: The component maintains the state for scale, position, image, and other related properties.
- **Event Handlers**: Handles mouse wheel and touch events for zooming and panning.
- **Dynamic Image Handling**: Loads an image from base64 data and adjusts canvas settings accordingly.

### Contributing

We welcome contributions! If you have suggestions or improvements, please follow these steps:

1. **Fork the repository** and create a new branch.
2. **Make your changes** and test thoroughly.
3. **Submit a pull request** with a detailed description of your changes.

### Contact

If you have any questions or need further assistance, feel free to contact me at [shubhamsharma51919@gmail.com](mailto:shubhamsharma51919@gmail.com).

---

Happy coding!
