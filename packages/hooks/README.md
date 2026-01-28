# @pedalboard/hooks

A set of well-crafted React hooks.

## Installation

### yarn
```bash
yarn add @pedalboard/hooks
```

### npm
```bash
npm install @pedalboard/hooks
```

## Peer Dependencies

This package requires the following peer dependencies:
- `react` ^17.0.2
- `react-dom` ^17.0.2

## Hooks

### usePagination

A hook for managing pagination state with navigation controls.

#### Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `totalPages` | `number` | Yes | - | Total number of pages |
| `initialCursor` | `number` | No | `0` | Initial page index (0-based) |
| `onChange` | `(value: number) => void` | No | - | Callback fired when cursor changes |

#### Returns

| Property | Type | Description |
|----------|------|-------------|
| `cursor` | `number` | Current page index |
| `totalPages` | `number` | Total number of pages |
| `goNext` | `() => void` | Navigate to next page |
| `goPrev` | `() => void` | Navigate to previous page |
| `setCursor` | `(cursor: number) => void` | Set cursor to specific page |

#### Usage

```tsx
import {usePagination} from '@pedalboard/hooks';

function MyPaginatedList() {
    const {cursor, totalPages, goNext, goPrev, setCursor} = usePagination({
        totalPages: 10,
        initialCursor: 0,
        onChange: (page) => {
            console.log(`Navigated to page ${page}`);
        },
    });

    return (
        <div>
            <p>Page {cursor + 1} of {totalPages}</p>
            <button onClick={goPrev} disabled={cursor === 0}>
                Previous
            </button>
            <button onClick={goNext} disabled={cursor === totalPages - 1}>
                Next
            </button>
            <button onClick={() => setCursor(0)}>
                Go to first page
            </button>
        </div>
    );
}
```

#### Error Handling

The hook will throw an error if `totalPages` is not provided:

```tsx
// This will throw: "The UsePagination hook must receive a totalPages argument for it to work"
const pagination = usePagination({});
```

## Resources

- [Converting Your React Hook To TypeScript](https://dev.to/mbarzeev/converting-your-react-hook-to-typescript-2439)
- [Mocking Data-Fetching React Hooks](https://dev.to/mbarzeev/mocking-data-fetching-react-hooks-2h1c)

## License

MIT
