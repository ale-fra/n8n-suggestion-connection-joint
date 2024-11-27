# Visual Workflow Editor

A modern, interactive workflow editor built with React and TypeScript that allows users to create and manipulate visual workflows with different types of blocks and connections.

## Features

- **Interactive Block Types**:
  - Trigger blocks to start workflows
  - Command blocks for execution steps
  - Conditional (IF) blocks with true/false branches
  
- **Dynamic Connections**:
  - Drag-and-drop connection points
  - Smart path routing to avoid block overlaps
  - Perpendicular connections to blocks
  - Automatic path recalculation
  
- **Flexible Block Management**:
  - Drag blocks to reposition
  - Maintain connection integrity during movement
  - Visual feedback during interactions
  
- **Smart Joint System**:
  - Joints snap to block perimeters
  - Relative positioning preserved during block movement
  - True/false labels for conditional paths

## Technical Features

- **Modern React Patterns**:
  - Custom hooks for joint management
  - Component composition
  - TypeScript for type safety
  
- **Advanced SVG Graphics**:
  - Bezier curves for connections
  - Dynamic path calculation
  - Smooth animations
  
- **Responsive Design**:
  - Tailwind CSS for styling
  - Fluid animations
  - Cross-browser compatibility

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

## Project Structure

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

## Usage

### Creating Blocks

The editor supports three types of blocks:

1. **Trigger Blocks**: Entry points for workflows
2. **Command Blocks**: Execution steps
3. **IF Blocks**: Conditional branching with true/false outputs

### Connecting Blocks

1. Click and drag connection points to create links
2. Joints automatically snap to block perimeters
3. Connections maintain perpendicular angles for clean layouts
4. Paths automatically route around other blocks

### Moving Blocks

- Click and drag blocks to reposition
- Connections update automatically
- Joint positions are preserved relative to their blocks

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with [React](https://reactjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons from [Lucide React](https://lucide.dev/)

[Edit in StackBlitz next generation editor ⚡️](https://stackblitz.com/~/github.com/ale-fra/n8n-suggestion-connection-joint)