import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';
import { CheckCircle, XCircle, Clock, Eye } from 'lucide-react';

import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const breadcrumbs = [
  {
    title: 'Панель управления',
    href: '/dashboard',
  },
  {
    title: 'Мои задачи',
    href: '/worker/tasks',
  },
];

export default function Tasks({ tasks }) {
  const [isViewTaskOpen, setIsViewTaskOpen] = useState(false);
  const [isUpdateStatusOpen, setIsUpdateStatusOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);

  const { data, setData, put, processing, reset } = useForm({
    status: '',
  });

  const openViewTask = (task) => {
    setCurrentTask(task);
    setIsViewTaskOpen(true);
  };

  const openUpdateStatus = (task) => {
    setCurrentTask(task);
    setData('status', task.status);
    setIsUpdateStatusOpen(true);
  };

  const updateTaskStatus = (e) => {
    e.preventDefault();
    put(route('worker.tasks.update-status', currentTask.id), {
      onSuccess: () => {
        reset();
        setIsUpdateStatusOpen(false);
      },
    });
  };

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
      <Head title="Мои задачи" />
      <div className="tasks-page space-y-6">
        <h1 className="text-2xl font-bold">Мои задачи</h1>

        <Card>
          <CardHeader>
            <CardTitle>Назначенные задачи</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Название</TableHead>
                  <TableHead>Статус</TableHead>
                  <TableHead>Срок выполнения</TableHead>
                  <TableHead>Назначил</TableHead>
                  <TableHead className="text-right">Действия</TableHead>
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
                    <TableCell>{task.due_date ? new Date(task.due_date).toLocaleDateString() : 'Нет срока'}</TableCell>
                    <TableCell>{task.manager.name}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" onClick={() => openViewTask(task)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openUpdateStatus(task)}
                          disabled={['completed', 'rejected'].includes(task.status)}
                        >
                          Обновить статус
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {tasks.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                      Задачи еще не назначены
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Диалог просмотра задачи */}
        <Dialog open={isViewTaskOpen} onOpenChange={setIsViewTaskOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{currentTask?.title}</DialogTitle>
              <DialogDescription>
                Детали и информация о задаче
              </DialogDescription>
            </DialogHeader>
            {currentTask && (
              <div className="grid gap-4 py-4">
                <div>
                  <h3 className="text-sm font-medium">Описание</h3>
                  <p className="mt-1">{currentTask.description}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium">Статус</h3>
                    <div className="mt-1 flex items-center gap-2">
                      {getStatusIcon(currentTask.status)}
                      {getStatusBadge(currentTask.status)}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">Срок выполнения</h3>
                    <p className="mt-1">{currentTask.due_date ? new Date(currentTask.due_date).toLocaleDateString() : 'Нет срока'}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">Назначил</h3>
                    <p className="mt-1">{currentTask.manager.name}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">Создано</h3>
                    <p className="mt-1">{new Date(currentTask.created_at).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button onClick={() => setIsViewTaskOpen(false)}>
                Закрыть
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Диалог обновления статуса */}
        <Dialog open={isUpdateStatusOpen} onOpenChange={setIsUpdateStatusOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Обновить статус задачи</DialogTitle>
              <DialogDescription>
                Измените статус вашей задачи
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={updateTaskStatus}>
              <div className="grid gap-4 py-4">
                <div>
                  <h3 className="text-sm font-medium mb-2">Текущий статус</h3>
                  <div className="flex items-center gap-2">
                    {currentTask && getStatusIcon(currentTask.status)}
                    {currentTask && getStatusBadge(currentTask.status)}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-2">Новый статус</h3>
                  <Select
                    value={data.status}
                    onValueChange={(value) => setData('status', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите статус" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">В ожидании</SelectItem>
                      <SelectItem value="in_progress">В процессе</SelectItem>
                      <SelectItem value="completed">Завершено</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsUpdateStatusOpen(false)}>
                  Отмена
                </Button>
                <Button type="submit" disabled={processing}>
                  Обновить
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </AppLayout>
  );
}