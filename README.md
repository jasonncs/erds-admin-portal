# ERDS Admin Portal

GraphQL Access Control Management System

## Features

- **Dashboard**: View client statistics, schema information, and recent activity
- **Client Management**: Create, activate, and deactivate GraphQL clients
- **Policy Studio**: Configure Column-Level Security (CLS) and Row-Level Security (RLS)
- **Testing & Verification**: Test x-client-id behavior with comprehensive runbook
- **Settings**: Environment and authentication configuration
- **Audit & Activity**: Track all policy changes and client operations (coming soon)

## Authentication

Built-in support for Microsoft Entra ID (Azure AD) authentication with role-based access control:
- **Admin**: Full access to all features
- **Operator**: Limited settings access
- **ReadOnly**: View-only access

## Tech Stack

- React 18
- TypeScript
- Tailwind CSS v4
- Vite
- NUS IT-Draft Design System

## Getting Started

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev
```

## Mobile Responsive

Fully responsive design with collapsible sidebar for mobile devices.

## License

MIT