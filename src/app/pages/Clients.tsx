import { useState } from 'react';
import { Search, Plus } from 'lucide-react';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Table, TableColumn } from '../components/Table';
import { StatusChip } from '../components/StatusChip';
import { Modal, ConfirmModal } from '../components/Modal';

interface Client {
  id: string;
  clientId: string;
  name: string;
  status: 'active' | 'inactive';
  createdAt: string;
  lastModified: string;
}

export function Clients() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive'>('all');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDeactivateModalOpen, setIsDeactivateModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [newClientId, setNewClientId] = useState('');
  const [newClientName, setNewClientName] = useState('');
  const [validationError, setValidationError] = useState('');

  const [clients, setClients] = useState<Client[]>([
    {
      id: '1',
      clientId: 'client-app-prod',
      name: 'Production Client App',
      status: 'active',
      createdAt: '2024-01-15',
      lastModified: '2024-05-20',
    },
    {
      id: '2',
      clientId: 'mobile-app-v2',
      name: 'Mobile Application v2',
      status: 'active',
      createdAt: '2024-03-10',
      lastModified: '2024-05-25',
    },
    {
      id: '3',
      clientId: 'legacy-client-v1',
      name: 'Legacy Client v1',
      status: 'inactive',
      createdAt: '2023-06-01',
      lastModified: '2024-04-15',
    },
    {
      id: '4',
      clientId: 'web-dashboard',
      name: 'Web Dashboard',
      status: 'active',
      createdAt: '2024-02-20',
      lastModified: '2024-05-24',
    },
  ]);

  const validateClientId = (value: string) => {
    if (value.length < 3 || value.length > 120) {
      return 'Client ID must be between 3 and 120 characters';
    }
    if (!/^[a-zA-Z0-9-_]+$/.test(value)) {
      return 'Client ID can only contain letters, numbers, hyphens, and underscores';
    }
    if (clients.some((c) => c.clientId === value)) {
      return 'Client ID already exists';
    }
    return '';
  };

  const handleClientIdChange = (value: string) => {
    setNewClientId(value);
    setValidationError(validateClientId(value));
  };

  const handleCreateClient = () => {
    const error = validateClientId(newClientId);
    if (error) {
      setValidationError(error);
      return;
    }

    const newClient: Client = {
      id: Date.now().toString(),
      clientId: newClientId,
      name: newClientName || newClientId,
      status: 'active',
      createdAt: new Date().toISOString().split('T')[0],
      lastModified: new Date().toISOString().split('T')[0],
    };

    setClients([...clients, newClient]);
    setIsCreateModalOpen(false);
    setNewClientId('');
    setNewClientName('');
    setValidationError('');
  };

  const handleDeactivateClient = () => {
    if (selectedClient) {
      setClients(
        clients.map((c) =>
          c.id === selectedClient.id ? { ...c, status: 'inactive' as const } : c
        )
      );
      setSelectedClient(null);
    }
  };

  const handleActivateClient = (client: Client) => {
    setClients(
      clients.map((c) => (c.id === client.id ? { ...c, status: 'active' as const } : c))
    );
  };

  const filteredClients = clients.filter((client) => {
    const matchesSearch =
      client.clientId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      filterStatus === 'all' || client.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const columns: TableColumn<Client>[] = [
    {
      key: 'clientId',
      header: 'Client ID',
      render: (client) => (
        <span className="font-mono text-[#000000]">{client.clientId}</span>
      ),
    },
    {
      key: 'name',
      header: 'Name',
      render: (client) => client.name,
    },
    {
      key: 'status',
      header: 'Status',
      render: (client) => (
        <StatusChip
          variant={client.status === 'active' ? 'active' : 'inactive'}
          label={client.status.charAt(0).toUpperCase() + client.status.slice(1)}
        />
      ),
      width: 'w-32',
    },
    {
      key: 'createdAt',
      header: 'Created',
      render: (client) => client.createdAt,
      width: 'w-32',
    },
    {
      key: 'lastModified',
      header: 'Last Modified',
      render: (client) => client.lastModified,
      width: 'w-32',
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (client) => (
        <div className="flex items-center gap-2">
          {client.status === 'active' ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSelectedClient(client);
                setIsDeactivateModalOpen(true);
              }}
            >
              Deactivate
            </Button>
          ) : (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleActivateClient(client)}
            >
              Activate
            </Button>
          )}
        </div>
      ),
      width: 'w-32',
    },
  ];

  return (
    <div className="p-4 lg:p-6">
      <div className="bg-white rounded-lg border border-[#DFDFE3]">
        <div className="p-4 lg:p-6 border-b border-[#DFDFE3]">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#7E7F8E]" />
              <Input
                type="text"
                placeholder="Search clients..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button onClick={() => setIsCreateModalOpen(true)} className="w-full sm:w-auto">
              <Plus className="w-5 h-5" />
              New Client
            </Button>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm text-[#5E6072]">Filter:</span>
            {['all', 'active', 'inactive'].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status as any)}
                className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                  filterStatus === status
                    ? 'bg-[#FFE8DE] text-[#000000] font-medium'
                    : 'text-[#5E6072] hover:bg-[#F7F7F8]'
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <Table columns={columns} data={filteredClients} emptyMessage="No clients found" />
      </div>

      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => {
          setIsCreateModalOpen(false);
          setNewClientId('');
          setNewClientName('');
          setValidationError('');
        }}
        title="Create New Client"
        footer={
          <>
            <Button
              variant="ghost"
              onClick={() => {
                setIsCreateModalOpen(false);
                setNewClientId('');
                setNewClientName('');
                setValidationError('');
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleCreateClient}
              disabled={!newClientId || !!validationError}
            >
              Create Client
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#000000] mb-2">
              Client ID *
            </label>
            <Input
              type="text"
              value={newClientId}
              onChange={(e) => handleClientIdChange(e.target.value)}
              placeholder="e.g., my-client-app"
              error={!!validationError}
              helperText={validationError || '3-120 characters, letters, numbers, hyphens, underscores'}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#000000] mb-2">
              Client Name (optional)
            </label>
            <Input
              type="text"
              value={newClientName}
              onChange={(e) => setNewClientName(e.target.value)}
              placeholder="Friendly name for the client"
            />
          </div>

          <div className="p-4 rounded-lg bg-[#E9EDF9] border border-[#1F4AC0]">
            <p className="text-sm text-[#09183F]">
              <strong>GraphQL Impact:</strong> This client will be able to make GraphQL requests using
              the x-client-id header set to{' '}
              <span className="font-mono">{newClientId || '[client-id]'}</span>. Default policies will
              be applied.
            </p>
          </div>
        </div>
      </Modal>

      <ConfirmModal
        isOpen={isDeactivateModalOpen}
        onClose={() => {
          setIsDeactivateModalOpen(false);
          setSelectedClient(null);
        }}
        onConfirm={handleDeactivateClient}
        title="Deactivate Client"
        message={`Are you sure you want to deactivate "${selectedClient?.name}" (${selectedClient?.clientId})? This will block all GraphQL requests from this client.`}
        confirmLabel="Deactivate"
        variant="destructive"
      />
    </div>
  );
}
