import { useState } from 'react';
import { ChevronDown, ChevronRight, Search, Plus, Trash2, GripVertical } from 'lucide-react';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { cn } from '../utils/cn';

interface CLSResource {
  name: string;
  fields: string[];
  selectedFields: Set<string>;
}

interface RLSRule {
  id: string;
  resource: string;
  dimension: string;
  value: string;
  effect: 'allow' | 'deny';
}

export interface PolicyStudioProps {
  hasUnsavedChanges: boolean;
  onUnsavedChangesChange: (hasChanges: boolean) => void;
}

export function PolicyStudio({ hasUnsavedChanges, onUnsavedChangesChange }: PolicyStudioProps) {
  const [selectedClient, setSelectedClient] = useState('client-app-prod');
  const [clsSearch, setClsSearch] = useState('');
  const [expandedResources, setExpandedResources] = useState<Set<string>>(new Set(['User', 'Post']));

  const [clsResources, setClsResources] = useState<CLSResource[]>([
    {
      name: 'User',
      fields: ['id', 'email', 'username', 'firstName', 'lastName', 'createdAt', 'updatedAt'],
      selectedFields: new Set(['id', 'username', 'firstName', 'lastName']),
    },
    {
      name: 'Post',
      fields: ['id', 'title', 'content', 'authorId', 'createdAt', 'updatedAt', 'published'],
      selectedFields: new Set(['id', 'title', 'authorId', 'createdAt', 'published']),
    },
    {
      name: 'Comment',
      fields: ['id', 'content', 'postId', 'authorId', 'createdAt'],
      selectedFields: new Set(['id', 'content', 'postId', 'createdAt']),
    },
  ]);

  const [rlsRules, setRlsRules] = useState<RLSRule[]>([
    { id: '1', resource: 'Post', dimension: 'status', value: 'published', effect: 'allow' },
    { id: '2', resource: 'User', dimension: 'role', value: 'admin', effect: 'deny' },
  ]);

  const clients = [
    'client-app-prod',
    'mobile-app-v2',
    'web-dashboard',
    'legacy-client-v1',
  ];

  const handleToggleResource = (resourceName: string) => {
    const newExpanded = new Set(expandedResources);
    if (newExpanded.has(resourceName)) {
      newExpanded.delete(resourceName);
    } else {
      newExpanded.add(resourceName);
    }
    setExpandedResources(newExpanded);
  };

  const handleToggleField = (resourceName: string, field: string) => {
    setClsResources(
      clsResources.map((resource) => {
        if (resource.name === resourceName) {
          const newSelected = new Set(resource.selectedFields);
          if (newSelected.has(field)) {
            newSelected.delete(field);
          } else {
            newSelected.add(field);
          }
          return { ...resource, selectedFields: newSelected };
        }
        return resource;
      })
    );
    onUnsavedChangesChange(true);
  };

  const handleSelectAll = (resourceName: string) => {
    setClsResources(
      clsResources.map((resource) => {
        if (resource.name === resourceName) {
          return { ...resource, selectedFields: new Set(resource.fields) };
        }
        return resource;
      })
    );
    onUnsavedChangesChange(true);
  };

  const handleClearAll = (resourceName: string) => {
    setClsResources(
      clsResources.map((resource) => {
        if (resource.name === resourceName) {
          return { ...resource, selectedFields: new Set() };
        }
        return resource;
      })
    );
    onUnsavedChangesChange(true);
  };

  const handleAddRLSRule = () => {
    const newRule: RLSRule = {
      id: Date.now().toString(),
      resource: 'Post',
      dimension: '',
      value: '',
      effect: 'allow',
    };
    setRlsRules([...rlsRules, newRule]);
    onUnsavedChangesChange(true);
  };

  const handleRemoveRLSRule = (id: string) => {
    setRlsRules(rlsRules.filter((rule) => rule.id !== id));
    onUnsavedChangesChange(true);
  };

  const handleUpdateRLSRule = (id: string, field: keyof RLSRule, value: string) => {
    setRlsRules(
      rlsRules.map((rule) => (rule.id === id ? { ...rule, [field]: value } : rule))
    );
    onUnsavedChangesChange(true);
  };

  const filteredResources = clsResources.filter((resource) =>
    resource.name.toLowerCase().includes(clsSearch.toLowerCase())
  );

  return (
    <div className="p-4 lg:p-6 space-y-4 lg:space-y-6">
      <div className="bg-white rounded-lg border border-[#DFDFE3] p-3 lg:p-4">
        <div className="flex items-center gap-4">
          <label className="text-sm font-medium text-[#000000]">
            Select Client:
          </label>
          <select
            value={selectedClient}
            onChange={(e) => setSelectedClient(e.target.value)}
            className="px-4 py-2 rounded-lg border border-[#DFDFE3] bg-white text-[#000000]"
          >
            {clients.map((client) => (
              <option key={client} value={client}>
                {client}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-[#DFDFE3]">
        <div className="p-4 lg:p-6 border-b border-[#DFDFE3]">
          <h2 className="text-base lg:text-lg font-semibold text-[#000000]">
            Column-Level Security (CLS)
          </h2>
          <p className="text-sm text-[#5E6072] mt-1">
            Select which fields are visible to this client
          </p>
        </div>

        <div className="p-4 lg:p-6">
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#5E6072]" />
              <Input
                type="text"
                placeholder="Search resources..."
                value={clsSearch}
                onChange={(e) => setClsSearch(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            {filteredResources.map((resource) => {
              const isExpanded = expandedResources.has(resource.name);
              const selectedCount = resource.selectedFields.size;
              const totalCount = resource.fields.length;

              return (
                <div
                  key={resource.name}
                  className="border border-[#DFDFE3] rounded-lg overflow-hidden"
                >
                  <div className="flex items-center gap-3 p-4 bg-[#F7F7F8]">
                    <button
                      onClick={() => handleToggleResource(resource.name)}
                      className="text-[#000000]"
                    >
                      {isExpanded ? (
                        <ChevronDown className="w-5 h-5" />
                      ) : (
                        <ChevronRight className="w-5 h-5" />
                      )}
                    </button>
                    <span className="flex-1 font-medium text-[#000000]">
                      {resource.name}
                    </span>
                    <span className="text-sm text-[#5E6072]">
                      {selectedCount} / {totalCount} fields
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSelectAll(resource.name)}
                    >
                      Select All
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleClearAll(resource.name)}
                    >
                      Clear All
                    </Button>
                  </div>

                  {isExpanded && (
                    <div className="p-3 lg:p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-3">
                      {resource.fields.map((field) => {
                        const isSelected = resource.selectedFields.has(field);
                        return (
                          <label
                            key={field}
                            className="flex items-center gap-3 p-3 rounded-lg border border-[#DFDFE3] hover:bg-[#F7F7F8] cursor-pointer"
                          >
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => handleToggleField(resource.name, field)}
                              className="w-4 h-4 rounded accent-[#FF8A5C]"
                            />
                            <span className="text-sm font-mono text-[#000000]">
                              {field}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-[#DFDFE3]">
        <div className="p-4 lg:p-6 border-b border-[#DFDFE3]">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
            <div>
              <h2 className="text-base lg:text-lg font-semibold text-[#000000]">
                Row-Level Security (RLS)
              </h2>
              <p className="text-sm text-[#5E6072] mt-1">
                Define rules to filter data rows
              </p>
            </div>
            <Button onClick={handleAddRLSRule} className="w-full sm:w-auto">
              <Plus className="w-5 h-5" />
              Add Rule
            </Button>
          </div>
        </div>

        <div className="p-4 lg:p-6 space-y-4">
          {rlsRules.length === 0 ? (
            <div className="text-center py-12 text-[#5E6072]">
              No RLS rules defined. Click "Add Rule" to create one.
            </div>
          ) : (
            rlsRules.map((rule, index) => (
              <div
                key={rule.id}
                className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 p-3 lg:p-4 border border-[#DFDFE3] rounded-lg"
              >
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  <div>
                    <label className="block text-xs text-[#5E6072] mb-1">
                      Resource
                    </label>
                    <select
                      value={rule.resource}
                      onChange={(e) => handleUpdateRLSRule(rule.id, 'resource', e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-[#DFDFE3] bg-white text-sm"
                    >
                      {clsResources.map((resource) => (
                        <option key={resource.name} value={resource.name}>
                          {resource.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs text-[#5E6072] mb-1">
                      Dimension
                    </label>
                    <Input
                      type="text"
                      value={rule.dimension}
                      onChange={(e) => handleUpdateRLSRule(rule.id, 'dimension', e.target.value)}
                      placeholder="e.g., status"
                      className="text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-[#5E6072] mb-1">
                      Value
                    </label>
                    <Input
                      type="text"
                      value={rule.value}
                      onChange={(e) => handleUpdateRLSRule(rule.id, 'value', e.target.value)}
                      placeholder="e.g., published"
                      className="text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-[#5E6072] mb-1">
                      Effect
                    </label>
                    <select
                      value={rule.effect}
                      onChange={(e) =>
                        handleUpdateRLSRule(rule.id, 'effect', e.target.value as 'allow' | 'deny')
                      }
                      className="w-full px-3 py-2 rounded-lg border border-[#DFDFE3] bg-white text-sm"
                    >
                      <option value="allow">Allow</option>
                      <option value="deny">Deny</option>
                    </select>
                  </div>
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemoveRLSRule(rule.id)}
                  className="text-[#DE3638]"
                >
                  <Trash2 className="w-5 h-5" />
                </Button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
