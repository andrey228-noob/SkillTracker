import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';
import { CheckCircle, XCircle, Clock, Eye } from 'lucide-react';

import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const breadcrumbs = [
  {
    title: 'Dashboard',
    href: '/dashboard',
  },
  {
    title: 'My Tasks',
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
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700">Pending</Badge>;
      case 'in_progress':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700">In Progress</Badge>;
      case 'completed':
        return <Badge variant="outline" className="bg-green-50 text-green-700">Completed</Badge>;
      case 'rejected':
        return <Badge variant="outline" className="bg-red-50 text-red-700">Rejected</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
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
      <Head title="My Tasks" />
      <div className="tasks-page space-y-6">
        <h1 className="text-2xl font-bold">My Tasks</h1>
        
        <Card>
          <CardHeader>
            <CardTitle>Assigned Tasks</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {/* <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Assigned By</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
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
                    <TableCell>{task.due_date ? new Date(task.due_date).toLocaleDateString() : 'No deadline'}</TableCell>
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
                          Update Status
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {tasks.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                      No tasks assigned yet
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table> */}
          </CardContent>
        </Card>

        {/* View Task Dialog */}
        <Dialog open={isViewTaskOpen} onOpenChange={setIsViewTaskOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{currentTask?.title}</DialogTitle>
              <DialogDescription>
                Task details and information
              </DialogDescription>
            </DialogHeader>
            {currentTask && (
              <div className="grid gap-4 py-4">
                <div>
                  <h3 className="text-sm font-medium">Description</h3>
                  <p className="mt-1">{currentTask.description}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium">Status</h3>
                    <div className="mt-1 flex items-center gap-2">
                      {getStatusIcon(currentTask.status)}
                      {getStatusBadge(currentTask.status)}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">Due Date</h3>
                    <p className="mt-1">{currentTask.due_date ? new Date(currentTask.due_date).toLocaleDateString() : 'No deadline'}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">Assigned By</h3>
                    <p className="mt-1">{currentTask.manager.name}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">Created</h3>
                    <p className="mt-1">{new Date(currentTask.created_at).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button onClick={() => setIsViewTaskOpen(false)}>
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Update Status Dialog */}
        <Dialog open={isUpdateStatusOpen} onOpenChange={setIsUpdateStatusOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Update Task Status</DialogTitle>
              <DialogDescription>
                Change the status of your task
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={updateTaskStatus}>
              <div className="grid gap-4 py-4">
                <div>
                  <h3 className="text-sm font-medium mb-2">Current Status</h3>
                  <div className="flex items-center gap-2">
                    {currentTask && getStatusIcon(currentTask.status)}
                    {currentTask && getStatusBadge(currentTask.status)}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-2">New Status</h3>
                  <Select 
                    value={data.status} 
                    onValueChange={(value) => setData('status', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="in_progress">In Progress</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsUpdateStatusOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={processing}>
                  Update
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </AppLayout>
  );
}