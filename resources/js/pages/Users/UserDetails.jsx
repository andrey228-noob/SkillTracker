import { Head, useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { Plus, Edit, Trash, CheckCircle, XCircle, Clock } from 'lucide-react';

import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const breadcrumbs = [
  {
    title: 'Главная',
    href: '/dashboard',
  },
  {
    title: 'Пользователи',
    href: '/users',
  },
  {
    title: 'Детали пользователя',
    href: '/#',
  },
];

export default function UserDetails({ user, tests, tasks, results }) {
  const { auth } = usePage().props;
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [isEditTaskOpen, setIsEditTaskOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [isAccessDeniedOpen, setIsAccessDeniedOpen] = useState(false);
  const [accessDeniedMessage, setAccessDeniedMessage] = useState('');

  const { data, setData, post, processing, errors, reset } = useForm({
    title: '',
    description: '',
    due_date: '',
    user_id: user.id,
  });

  const { data: editData, setData: setEditData, put, processing: editProcessing, errors: editErrors, reset: resetEdit } = useForm({
    id: '',
    title: '',
    description: '',
    due_date: '',
    status: '',
  });

  const { delete: destroy } = useForm();

  const submitTask = (e) => {
    e.preventDefault();
    post(route('tasks.store'), {
      onSuccess: () => {
        reset();
        setIsAddTaskOpen(false);
      },
    });
  };

  const submitEditTask = (e) => {
    e.preventDefault();
    put(route('tasks.update', editData.id), {
      onSuccess: () => {
        resetEdit();
        setIsEditTaskOpen(false);
      },
    });
  };

  const openEditTask = (task) => {
    if (task.manager_id !== auth.user.id) {
      setAccessDeniedMessage('Не вы создали эту задачу, не вам её и изменять!');
      setIsAccessDeniedOpen(true);
      return;
    }

    setCurrentTask(task);
    setEditData({
      id: task.id,
      title: task.title,
      description: task.description,
      due_date: task.due_date,
      status: task.status,
    });
    setIsEditTaskOpen(true);
  };

  const deleteTask = (task) => {
    if (task.manager_id !== auth.user.id) {
      setAccessDeniedMessage('Не вы создали эту задачу, не вам её и удалять!');
      setIsAccessDeniedOpen(true);
      return;
    }

    setTaskToDelete(task);
    setIsDeleteConfirmOpen(true);
  };

  const confirmDelete = () => {
    destroy(route('tasks.destroy', taskToDelete.id), {
      onSuccess: () => {
        setIsDeleteConfirmOpen(false);
        setTaskToDelete(null);
      },
    });
  };

  // Переименовано для задач
  const getTaskStatusBadge = (status) => {
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

  // Функции для обработки тестов
  const getTestStatus = (userResult) => {
    if (!userResult) return 'Не начат';
    if (userResult.score === null) return 'В процессе';
    if (userResult.score === 0) return 'Неверно';
    if (userResult.score === 1) return 'Верно';
    return 'Неизвестно';
  };

  const getTestStatusBadge = (status) => {
    switch (status) {
      case 'Не начат':
        return <Badge variant="outline">Не начат</Badge>;
      case 'В процессе':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700">В процессе</Badge>;
      case 'Верно':
        return <Badge className="bg-green-500 hover:bg-green-600">Верно</Badge>;
      case 'Неверно':
        return <Badge variant="destructive">Неверно</Badge>;
      default:
        return <Badge variant="outline">Неизвестно</Badge>;
    }
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title={`Пользователь: ${user.name}`} />
      <div className="user-details space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>{user.name}</CardTitle>
            <CardDescription>{user.email}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium">Роль</h3>
                <p>{user.role === 'manager' ? 'Менеджер' : 'Работник'}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium">Телефон</h3>
                <p>{user.phone || 'Не указан'}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium">Пол</h3>
                <p>{user.gender || 'Не указан'}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium">Дата регистрации</h3>
                <p>{new Date(user.created_at).toLocaleDateString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="tasks">
          <TabsList>
            <TabsTrigger value="tasks">Задачи</TabsTrigger>
            <TabsTrigger value="tests">Тесты</TabsTrigger>
          </TabsList>

          <TabsContent value="tasks" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Задачи</h2>
              <Dialog open={isAddTaskOpen} onOpenChange={setIsAddTaskOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Добавить задачу
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Добавить новую задачу</DialogTitle>
                    <DialogDescription>
                      Создайте новую задачу для {user.name}.
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={submitTask}>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="title">Название</Label>
                        <Input
                          id="title"
                          value={data.title}
                          onChange={(e) => setData('title', e.target.value)}
                          placeholder="Название задачи"
                        />
                        {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="description">Описание</Label>
                        <Textarea
                          id="description"
                          value={data.description}
                          onChange={(e) => setData('description', e.target.value)}
                          placeholder="Описание задачи"
                        />
                        {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="due_date">Срок выполнения</Label>
                        <Input
                          id="due_date"
                          type="date"
                          value={data.due_date}
                          onChange={(e) => setData('due_date', e.target.value)}
                        />
                        {errors.due_date && <p className="text-red-500 text-sm">{errors.due_date}</p>}
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="button" variant="outline" onClick={() => setIsAddTaskOpen(false)}>
                        Отмена
                      </Button>
                      <Button type="submit" disabled={processing}>
                        Сохранить
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
              {/* Диалог подтверждения удаления */}
              <Dialog open={isDeleteConfirmOpen} onOpenChange={setIsDeleteConfirmOpen}>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Подтверждение удаления</DialogTitle>
                    <DialogDescription>
                      Вы уверены, что хотите удалить задачу "{taskToDelete?.title}"?
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => setIsDeleteConfirmOpen(false)}
                    >
                      Отмена
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={confirmDelete}
                    >
                      Удалить
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              {/* Диалог ошибки доступа */}
              <Dialog open={isAccessDeniedOpen} onOpenChange={setIsAccessDeniedOpen}>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Ошибка доступа</DialogTitle>
                    <DialogDescription>
                      {accessDeniedMessage}
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => setIsAccessDeniedOpen(false)}
                    >
                      Понятно
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Название</TableHead>
                      <TableHead>Назначена</TableHead>
                      <TableHead>Статус</TableHead>
                      <TableHead>Срок</TableHead>
                      <TableHead>Создана</TableHead>
                      <TableHead className="text-right">Действия</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {tasks.map((task) => (
                      <TableRow key={task.id}>
                        <TableCell className="font-medium">{task.title}</TableCell>
                        <TableCell>
                          {task.manager ? task.manager.name : 'Неизвестный менеджер'}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getStatusIcon(task.status)}
                            {getTaskStatusBadge(task.status)} {/* Исправлено имя функции */}
                          </div>
                        </TableCell>
                        <TableCell>{task.due_date ? new Date(task.due_date).toLocaleDateString() : 'Без срока'}</TableCell>
                        <TableCell>{new Date(task.created_at).toLocaleDateString()}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              className={task.manager_id === auth.user.id ? "" : "text-gray-400 cursor-not-allowed"}
                              onClick={() => openEditTask(task)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className={task.manager_id === auth.user.id ? "text-red-500 hover:text-red-600" : "text-gray-400 cursor-not-allowed"}
                              onClick={() => deleteTask(task)}
                            >
                              <Trash className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                    {tasks.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                          Задачи еще не назначены
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Диалог редактирования задачи */}
            <Dialog open={isEditTaskOpen} onOpenChange={setIsEditTaskOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Редактировать задачу</DialogTitle>
                  <DialogDescription>
                    Обновите детали задачи для {user.name}.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={submitEditTask}>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="edit-title">Название</Label>
                      <Input
                        id="edit-title"
                        value={editData.title}
                        onChange={(e) => setEditData('title', e.target.value)}
                        placeholder="Название задачи"
                      />
                      {editErrors.title && <p className="text-red-500 text-sm">{editErrors.title}</p>}
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="edit-description">Описание</Label>
                      <Textarea
                        id="edit-description"
                        value={editData.description}
                        onChange={(e) => setEditData('description', e.target.value)}
                        placeholder="Описание задачи"
                      />
                      {editErrors.description && <p className="text-red-500 text-sm">{editErrors.description}</p>}
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="edit-due_date">Срок выполнения</Label>
                      <Input
                        id="edit-due_date"
                        type="date"
                        value={editData.due_date}
                        onChange={(e) => setEditData('due_date', e.target.value)}
                      />
                      {editErrors.due_date && <p className="text-red-500 text-sm">{editErrors.due_date}</p>}
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="edit-status">Статус</Label>
                      <Select
                        value={editData.status}
                        onValueChange={(value) => setEditData('status', value)}
                      >
                        <SelectTrigger id="edit-status">
                          <SelectValue placeholder="Выберите статус" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">В ожидании</SelectItem>
                          <SelectItem value="in_progress">В процессе</SelectItem>
                          <SelectItem value="completed">Завершено</SelectItem>
                          <SelectItem value="rejected">Отклонено</SelectItem>
                        </SelectContent>
                      </Select>
                      {editErrors.status && <p className="text-red-500 text-sm">{editErrors.status}</p>}
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setIsEditTaskOpen(false)}>
                      Отмена
                    </Button>
                    <Button type="submit" disabled={editProcessing}>
                      Обновить
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </TabsContent>

          <TabsContent value="tests" className="space-y-4">
            <h2 className="text-xl font-semibold">Результаты тестов</h2>
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Тест</TableHead>
                      <TableHead>Описание</TableHead>
                      <TableHead>Статус</TableHead>
                      <TableHead>Результат</TableHead>
                      <TableHead>Ответы</TableHead>
                      <TableHead>Дата прохождения</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {tests.map((test) => {
                      // Безопасный поиск результатов
                      const userResult = results.find(
                        result => result.test_id === test.id && result.user_id === user.id
                      ) || null;

                      // Определение статуса теста
                      const testStatus = getTestStatus(userResult);

                      return (
                        <TableRow key={test.id}>
                          <TableCell className="font-medium">{test.title}</TableCell>
                          <TableCell>{test.description}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {getTestStatusBadge(testStatus)}
                            </div>
                          </TableCell>
                          <TableCell>
                            {userResult?.score !== null && userResult?.score !== undefined ? (
                              <span>{userResult.score === 1 ? '100%' : '0%'}</span>
                            ) : (
                              '-'
                            )}
                          </TableCell>
                          <TableCell>
                            {userResult?.answer ? (
                              <div className="max-w-xs truncate" title={userResult.answer}>
                                {userResult.answer}
                              </div>
                            ) : (
                              'Нет данных'
                            )}
                          </TableCell>
                          <TableCell>
                            {userResult?.created_at ? (
                              new Date(userResult.created_at).toLocaleDateString()
                            ) : (
                              '-'
                            )}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                    {tests.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                          Тесты еще не назначены
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}