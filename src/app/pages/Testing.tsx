import { useState } from 'react';
import { Play, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '../components/Button';
import { StatusChip } from '../components/StatusChip';
import { cn } from '../utils/cn';

interface TestCase {
  id: string;
  title: string;
  description: string;
  command: string;
  expectedStatus: number;
  interpretation: string;
  status?: 'passed' | 'failed' | 'pending';
  result?: string;
}

export function Testing() {
  const [runningTests, setRunningTests] = useState<Set<string>>(new Set());
  const [testCases, setTestCases] = useState<TestCase[]>([
    {
      id: '1',
      title: 'Valid Active Client Request',
      description: 'Test a valid request with an active client ID',
      command: `curl -X POST https://api.example.com/graphql \\
  -H "Content-Type: application/json" \\
  -H "x-client-id: client-app-prod" \\
  -d '{"query": "{ users { id username } }"}'`,
      expectedStatus: 200,
      interpretation: 'Request should succeed and return data according to the client\'s policies',
      status: 'passed',
      result: '{"data": {"users": [{"id": "1", "username": "john"}]}}',
    },
    {
      id: '2',
      title: 'Missing x-client-id Header',
      description: 'Test a request without the required header',
      command: `curl -X POST https://api.example.com/graphql \\
  -H "Content-Type: application/json" \\
  -d '{"query": "{ users { id username } }"}'`,
      expectedStatus: 401,
      interpretation: 'Request should be rejected with authentication error',
      status: 'passed',
      result: '{"error": "Missing x-client-id header"}',
    },
    {
      id: '3',
      title: 'Unknown Client ID',
      description: 'Test a request with a client ID that doesn\'t exist',
      command: `curl -X POST https://api.example.com/graphql \\
  -H "Content-Type: application/json" \\
  -H "x-client-id: unknown-client" \\
  -d '{"query": "{ users { id username } }"}'`,
      expectedStatus: 403,
      interpretation: 'Request should be rejected with forbidden error',
      status: 'failed',
      result: '{"error": "Unknown client ID"}',
    },
    {
      id: '4',
      title: 'Inactive Client ID',
      description: 'Test a request with a deactivated client ID',
      command: `curl -X POST https://api.example.com/graphql \\
  -H "Content-Type: application/json" \\
  -H "x-client-id: legacy-client-v1" \\
  -d '{"query": "{ users { id username } }"}'`,
      expectedStatus: 403,
      interpretation: 'Request should be rejected as the client is inactive',
      status: 'pending',
    },
    {
      id: '5',
      title: 'CLS Policy Enforcement',
      description: 'Verify that only allowed fields are returned',
      command: `curl -X POST https://api.example.com/graphql \\
  -H "Content-Type: application/json" \\
  -H "x-client-id: mobile-app-v2" \\
  -d '{"query": "{ users { id email username } }"}'`,
      expectedStatus: 200,
      interpretation: 'Response should only include fields allowed by CLS policy',
      status: 'pending',
    },
  ]);

  const handleRunTest = async (testId: string) => {
    setRunningTests(new Set(runningTests).add(testId));

    // Simulate test execution
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const randomResult = Math.random() > 0.3 ? 'passed' : 'failed';
    setTestCases(
      testCases.map((test) =>
        test.id === testId
          ? {
              ...test,
              status: randomResult as 'passed' | 'failed',
              result: randomResult === 'passed'
                ? '{"data": {"users": [{"id": "1"}]}}'
                : '{"error": "Test failed"}',
            }
          : test
      )
    );

    const newRunning = new Set(runningTests);
    newRunning.delete(testId);
    setRunningTests(newRunning);
  };

  const handleRunAllTests = async () => {
    for (const test of testCases) {
      await handleRunTest(test.id);
    }
  };

  const passedCount = testCases.filter((t) => t.status === 'passed').length;
  const failedCount = testCases.filter((t) => t.status === 'failed').length;
  const pendingCount = testCases.filter((t) => t.status === 'pending' || !t.status).length;

  return (
    <div className="p-4 lg:p-6 space-y-4 lg:space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
        <div>
          <h2 className="text-lg lg:text-xl font-semibold text-[#000000]">
            x-client-id Testing Runbook
          </h2>
          <p className="text-sm text-[#5E6072] mt-1">
            Verify GraphQL access control behavior
          </p>
        </div>
        <Button onClick={handleRunAllTests} className="w-full sm:w-auto">
          <Play className="w-5 h-5" />
          Run All Tests
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[#E8F5E9] border border-[#4CAF50] rounded-lg p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-[#2E7D32]">Passed</span>
            <CheckCircle className="w-5 h-5 text-[#4CAF50]" />
          </div>
          <p className="text-2xl font-bold text-[#2E7D32] mt-2">{passedCount}</p>
        </div>

        <div className="bg-[#FAD6D7] border border-[#DE3638] rounded-lg p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-[#611617]">Failed</span>
            <XCircle className="w-5 h-5 text-[#DE3638]" />
          </div>
          <p className="text-2xl font-bold text-[#611617] mt-2">
            {failedCount}
          </p>
        </div>

        <div className="bg-[#F7F7F8] border border-[#DFDFE3] rounded-lg p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-[#5E6072]">Pending</span>
          </div>
          <p className="text-2xl font-bold text-[#000000] mt-2">{pendingCount}</p>
        </div>
      </div>

      <div className="space-y-4">
        {testCases.map((test) => {
          const isRunning = runningTests.has(test.id);

          return (
            <div
              key={test.id}
              className="bg-white border border-[#DFDFE3] rounded-lg overflow-hidden"
            >
              <div className="p-4 lg:p-6">
                <div className="flex flex-col sm:flex-row items-start justify-between gap-3 mb-4">
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                      <h3 className="text-base lg:text-lg font-semibold text-[#000000]">
                        {test.title}
                      </h3>
                      {test.status && (
                        <StatusChip
                          variant={
                            test.status === 'passed'
                              ? 'active'
                              : test.status === 'failed'
                              ? 'error'
                              : 'inactive'
                          }
                          label={test.status.charAt(0).toUpperCase() + test.status.slice(1)}
                        />
                      )}
                    </div>
                    <p className="text-sm text-[#5E6072]">
                      {test.description}
                    </p>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => handleRunTest(test.id)}
                    disabled={isRunning}
                    className="w-full sm:w-auto"
                  >
                    {isRunning ? (
                      'Running...'
                    ) : (
                      <>
                        <Play className="w-4 h-4" />
                        Run Test
                      </>
                    )}
                  </Button>
                </div>

                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-[#000000] mb-2">
                      Command:
                    </p>
                    <pre className="p-2.5 lg:p-3 bg-[#F7F7F8] rounded-lg text-xs font-mono text-[#000000] overflow-x-auto whitespace-pre-wrap break-words">
                      {test.command}
                    </pre>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <p className="text-sm font-medium text-[#000000] mb-1">
                        Expected Status:
                      </p>
                      <p className="text-sm text-[#5E6072]">
                        {test.expectedStatus}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[#000000] mb-1">
                        Interpretation:
                      </p>
                      <p className="text-sm text-[#5E6072]">
                        {test.interpretation}
                      </p>
                    </div>
                  </div>

                  {test.result && (
                    <div>
                      <p className="text-sm font-medium text-[#000000] mb-2">
                        Result:
                      </p>
                      <pre
                        className={cn(
                          'p-2.5 lg:p-3 rounded-lg text-xs font-mono overflow-x-auto whitespace-pre-wrap break-words',
                          test.status === 'passed'
                            ? 'bg-[#E8F5E9] text-[#2E7D32]'
                            : 'bg-[#FAD6D7] text-[#611617]'
                        )}
                      >
                        {test.result}
                      </pre>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
