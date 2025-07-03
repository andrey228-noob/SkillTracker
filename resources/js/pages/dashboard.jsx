import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, usePage } from '@inertiajs/react';
import { UserCircle, CheckSquare, ListTodo, Users } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const breadcrumbs = [
  {
    title: 'Dashboard',
    href: '/dashboard',
  },
];

export default function Dashboard({ stats }) {
  const { auth } = usePage().props;
  const isManager = auth.user.role === 'manager';

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Dashboard" />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
        <h1 className="text-2xl font-bold mb-6">Welcome, {auth.user.name}</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 auto-rows-min">
          {isManager ? (
            // Manager Dashboard Cards
            <>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Total Workers</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats?.workers_count || 0}</div>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="ghost" className="p-0 h-auto">
                    <Link href="/users" className="text-sm text-muted-foreground flex items-center">
                      <Users className="mr-1 h-4 w-4" />
                      View all workers
                    </Link>
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Assigned Tasks</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats?.tasks_count || 0}</div>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="ghost" className="p-0 h-auto">
                    <Link href="/users" className="text-sm text-muted-foreground flex items-center">
                      <ListTodo className="mr-1 h-4 w-4" />
                      Manage tasks
                    </Link>
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Completed Tests</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats?.completed_tests_count || 0}</div>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="ghost" className="p-0 h-auto">
                    <Link href="/users" className="text-sm text-muted-foreground flex items-center">
                      <CheckSquare className="mr-1 h-4 w-4" />
                      View test results
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </>
          ) : (
            // Worker Dashboard Cards
            <>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">My Tasks</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats?.tasks_count || 0}</div>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="ghost" className="p-0 h-auto">
                    <Link href="/worker/tasks" className="text-sm text-muted-foreground flex items-center">
                      <ListTodo className="mr-1 h-4 w-4" />
                      View my tasks
                    </Link>
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Available Tests</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats?.available_tests_count || 0}</div>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="ghost" className="p-0 h-auto">
                    <Link href="/worker/tests" className="text-sm text-muted-foreground flex items-center">
                      <CheckSquare className="mr-1 h-4 w-4" />
                      Take tests
                    </Link>
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">My Average Score</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats?.average_score || 'N/A'}</div>
                </CardContent>
                <CardFooter>
                  <p className="text-sm text-muted-foreground">
                    Based on {stats?.completed_tests_count || 0} completed tests
                  </p>
                </CardFooter>
              </Card>
            </>
          )}
        </div>

        <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
          <Card>
            <CardHeader>
              <CardTitle>{isManager ? 'Recent Activity' : 'My Progress'}</CardTitle>
              <CardDescription>
                {isManager ? 'Recent actions and updates from your team' : 'Your recent test results and task updates'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Здесь будет содержимое в зависимости от роли */}
              <PlaceholderPattern className="absolute inset-0 w-full [&>svg]:stroke-[rgba(26,26,0,0.2)] dark:[&>svg]:stroke-[rgba(255,255,255,0.2)] h-64" />
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
