import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, usePage } from '@inertiajs/react';
import { UserCircle, CheckSquare, ListTodo, Users, CheckCircle, XCircle, Clock, PieChart } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const breadcrumbs = [
  {
    title: 'Панель управления',
    href: '/dashboard',
  },
];

export default function Dashboard({ stats, tasks }) {
  const { auth } = usePage().props;
  const isAdmin = auth.user.role === 'admin';
  const isManager = auth.user.role === 'manager';
  const isWorker = auth.user.role === 'worker';

  // Функция для отображения статуса задачи
  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700">В ожидании</Badge>;
      case 'in_progress':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700">В процессе</Badge>;
      case 'completed':
        return <Badge variant="outline" className="bg-green-50 text-green-700">Завершено</Badge>;
      case 'rejected':
        return <Badge variant="outline" className="bg-red-50 text-red-700">Отклонено</Badge>;
      default:
        return <Badge variant="outline">Неизвестно</Badge>;
    }
  };

  // Функция для отображения иконки статуса
  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'in_progress':
        return <Clock className="h-4 w-4 text-blue-500" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'rejected':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Панель управления" />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
        <h1 className="text-2xl font-bold mb-6">Добро пожаловать, {auth.user.name}</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 auto-rows-min">
          {isAdmin && (
            // Карточки для администратора
            <>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Всего работников</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats?.workers_count || 0}</div>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="ghost" className="p-0 h-auto">
                    <Link href="/users" className="text-sm text-muted-foreground flex items-center">
                      <Users className="mr-1 h-4 w-4" />
                      Просмотреть всех работников
                    </Link>
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Всего менеджеров</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats?.managers_count || 0}</div>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="ghost" className="p-0 h-auto">
                    <Link href="/users" className="text-sm text-muted-foreground flex items-center">
                      <UserCircle className="mr-1 h-4 w-4" />
                      Управление пользователями
                    </Link>
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Всего задач</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats?.tasks_count || 0}</div>
                </CardContent>
                <CardFooter>
                  <p className="text-sm text-muted-foreground flex items-center">
                    <CheckCircle className="mr-1 h-4 w-4 text-green-500" />
                    Выполнено: {stats?.completed_tasks_count || 0} ({stats?.completion_rate || 0}%)
                  </p>
                </CardFooter>
              </Card>
            </>
          )}

          {isManager && (
            // Карточки для менеджера
            <>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Всего работников</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats?.workers_count || 0}</div>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="ghost" className="p-0 h-auto">
                    <Link href="/users" className="text-sm text-muted-foreground flex items-center">
                      <Users className="mr-1 h-4 w-4" />
                      Просмотреть всех работников
                    </Link>
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Назначенные задачи</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats?.tasks_count || 0}</div>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="ghost" className="p-0 h-auto">
                    <Link href="/worker/tasks" className="text-sm text-muted-foreground flex items-center">
                      <ListTodo className="mr-1 h-4 w-4" />
                      Управление задачами
                    </Link>
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Эффективность</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats?.completion_rate || 0}%</div>
                </CardContent>
                <CardFooter>
                  <p className="text-sm text-muted-foreground flex items-center">
                    <PieChart className="mr-1 h-4 w-4" />
                    Выполнено {stats?.completed_tasks_count || 0} из {stats?.tasks_count || 0} задач
                  </p>
                </CardFooter>
              </Card>
            </>
          )}

          {isWorker && (
            // Карточки для работника
            <>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Мои задачи</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats?.tasks_count || 0}</div>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="ghost" className="p-0 h-auto">
                    <Link href="/worker/tasks" className="text-sm text-muted-foreground flex items-center">
                      <ListTodo className="mr-1 h-4 w-4" />
                      Просмотреть мои задачи
                    </Link>
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Доступные тесты</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{(stats?.tests_count - stats?.completed_tests_count) || 0}</div>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="ghost" className="p-0 h-auto">
                    <Link href="/worker/tests" className="text-sm text-muted-foreground flex items-center">
                      <CheckSquare className="mr-1 h-4 w-4" />
                      Пройти тесты
                    </Link>
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Эффективность</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats?.completion_rate || 0}%</div>
                </CardContent>
                <CardFooter>
                  <p className="text-sm text-muted-foreground flex items-center">
                    <CheckCircle className="mr-1 h-4 w-4 text-green-500" />
                    Выполнено {stats?.completed_tasks_count || 0} из {stats?.tasks_count || 0} задач
                  </p>
                </CardFooter>
              </Card>
            </>
          )}
        </div>

        {/* Статистика по статусам задач */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">В ожидании</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.pending_tasks_count || 0}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">В процессе</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.in_progress_tasks_count || 0}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Завершено</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.completed_tasks_count || 0}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Отклонено</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.rejected_tasks_count || 0}</div>
            </CardContent>
          </Card>
        </div>

        {/* История задач */}
        <div className="relative min-h-[400px] flex-1 overflow-hidden rounded-xl md:min-h-min">
          <Card>
            <CardHeader>
              <CardTitle>
                {isAdmin && 'История всех задач'}
                {isManager && 'История назначенных задач'}
                {isWorker && 'История моих задач'}
              </CardTitle>
              <CardDescription>
                {isAdmin && 'Последние задачи всех пользователей'}
                {isManager && 'Последние задачи, назначенные вами'}
                {isWorker && 'Ваши последние задачи'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {tasks && tasks.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Название</TableHead>
                      <TableHead>Статус</TableHead>
                      {(isAdmin || isManager) && <TableHead>Исполнитель</TableHead>}
                      {(isAdmin || isWorker) && <TableHead>Назначил</TableHead>}
                      <TableHead>Срок</TableHead>
                      <TableHead>Создано</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {tasks.map((task) => (
                      <TableRow key={task.id}>
                        <TableCell className="font-medium">{task.title}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getStatusIcon(task.status)}
                            {getStatusBadge(task.status)}
                          </div>
                        </TableCell>
                        {(isAdmin || isManager) && (
                          <TableCell>{task.user?.name || 'Не назначен'}</TableCell>
                        )}
                        {(isAdmin || isWorker) && (
                          <TableCell>{task.manager?.name || 'Неизвестно'}</TableCell>
                        )}
                        <TableCell>
                          {task.due_date ? new Date(task.due_date).toLocaleDateString() : 'Нет срока'}
                        </TableCell>
                        <TableCell>
                          {new Date(task.created_at).toLocaleDateString()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="flex items-center justify-center h-64">
                  <p className="text-muted-foreground">Нет доступных задач</p>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline">
                <Link href="/worker/tasks">
                  Просмотреть все задачи
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}