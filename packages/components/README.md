# @pedalboard/components

A set of well-crafted React components.

## Installation

### pnpm
```bash
pnpm add @pedalboard/components
```

### npm
```bash
npm install @pedalboard/components
```

## Peer Dependencies

This package requires the following peer dependencies:
- `react` ^18.3.1
- `react-dom` ^18.3.1
- `prop-types` ^15.8.0

## Components

### Pagination

A pagination component that provides navigation controls for paginated content.

#### Props

| Prop | Type | Description |
|------|------|-------------|
| `totalPages` | `number` | Total number of pages |
| `initialCursor` | `number` | Initial page index (0-based) |
| `pagesBuffer` | `number` | Number of page indicators to display |
| `onChange` | `() => void` | Callback fired when page changes |

#### Usage

```jsx
import {Pagination} from '@pedalboard/components';

function MyComponent() {
    const handlePageChange = () => {
        console.log('Page changed');
    };

    return (
        <Pagination
            totalPages={10}
            initialCursor={0}
            pagesBuffer={5}
            onChange={handlePageChange}
        />
    );
}
```

## Storybook

This package includes a Storybook for component documentation and visual testing. To run it locally:

```bash
cd packages/components
pnpm run storybook
```

## Creating a New Component

New components are scaffolded using the `create-react-component` Claude Code skill. Run `/create-react-component` in Claude Code to generate a new component with consistent structure including tests, stories, and styles.

## License

MIT
