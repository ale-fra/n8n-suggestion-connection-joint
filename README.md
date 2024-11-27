# Visual Workflow Editor

A modern, interactive workflow editor built with React and TypeScript that allows users to create and manipulate visual workflows with different types of blocks and connections.

🚀 [Live Demo](https://resilient-kringle-2f4085.netlify.app/) | [Edit in StackBlitz ⚡️](https://stackblitz.com/~/github.com/ale-fra/n8n-suggestion-connection-joint)

## Features

### Block Management
- **Interactive Block Types**:
  - Trigger blocks to start workflows
  - Command blocks for execution steps
  - Conditional (IF) blocks with true/false branches
  
- **Flexible Block Manipulation**:
  - Intuitive drag-and-drop interface
  - Real-time position updates
  - Visual feedback during interactions
  
- **Smart Connection System**:
  - Dynamic connection points with drag-and-drop functionality
  - Intelligent path routing to avoid overlaps
  - Perpendicular block connections
  - Automatic path recalculation
  - True/false labels for conditional paths

### Technical Highlights
- **Modern React Implementation**:
  - Custom hooks for joint management
  - Component composition
  - TypeScript for enhanced type safety
  
- **Advanced Graphics**:
  - SVG-based rendering
  - Bezier curves for smooth connections
  - Dynamic path calculation
  - Fluid animations
  
- **Responsive Design**:
  - Mobile-friendly interface
  - Tailwind CSS for modern styling
  - Cross-browser compatibility
  - Smooth animations

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/visual-workflow-editor.git
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## Project Architecture

```plaintext
src/
├── components/
│   ├── Canvas.tsx           # Main canvas component
│   ├── WorkflowBlock.tsx    # Block component
│   ├── Connector.tsx        # Connection line component
│   ├── Joint.tsx           # Connection point component
│   └── icons/              # SVG icons
├── hooks/
│   ├── useJointDrag.ts     # Joint dragging logic
│   └── useJointPositions.ts # Joint positioning system
├── utils/
│   ├── blockUtils.ts       # Block-related utilities
│   ├── pathFinding.ts      # Connection path calculation
│   └── constants.ts        # Shared constants
└── types/
    └── workflow.ts         # TypeScript interfaces
```

## Usage Guide

### Working with Blocks

The editor supports three primary block types:
1. **Trigger Blocks**: Workflow entry points
2. **Command Blocks**: Execution steps
3. **IF Blocks**: Conditional branching with true/false paths

### Creating Connections

1. Click and drag from any connection point to create links
2. Joints automatically snap to optimal positions on block perimeters
3. Connections maintain clean, perpendicular angles
4. Smart pathfinding avoids obstacles and other blocks

### Block Manipulation

- Drag blocks freely to reposition them
- Connections update in real-time
- Joint positions maintain their relative alignment
- Visual feedback during drag operations

## Contributing

We welcome contributions! Please follow these steps:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to your branch
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

Built with:
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)