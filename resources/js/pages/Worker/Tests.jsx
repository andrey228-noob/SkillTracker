import { Head } from '@inertiajs/react';
import { useState } from 'react';
import { FileText, CheckCircle, Clock } from 'lucide-react';

import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

const breadcrumbs = [
  {
    title: 'Dashboard',
    href: '/dashboard',
  },
  {
    title: 'My Tests',
    href: '/worker/tests',
  },
];

export default function Tests({ tests, results }) {
  const [currentTest, setCurrentTest] = useState(null);
  const [isTestOpen, setIsTestOpen] = useState(false);
  const [answers, setAnswers] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const openTest = (test) => {
    setCurrentTest(test);
    setAnswers({});
    setIsTestOpen(true);
  };

  const handleAnswerChange = (questionId, value) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const submitTest = () => {
    setIsSubmitting(true);
    // Здесь будет отправка ответов на сервер
    setTimeout(() => {
      setIsSubmitting(false);
      setIsTestOpen(false);
    }, 1000);
  };

  const getTestStatus = (testId) => {
    const result = results.find(r => r.test_id === testId);
    if (result.score === null) return 'not_started';
    return 'completed';
  };

  const getTestScore = (testId) => {
    const result = results.find(r => r.test_id === testId);
    return result ? result.score : null;
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="My Tests" />
      <div className="tests-page space-y-6">
        <h1 className="text-2xl font-bold">My Tests</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tests.map((test) => {
            const status = getTestStatus(test.id);
            const score = getTestScore(test.id);

            return (
              <Card key={test.id} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    {test.title}
                  </CardTitle>
                  <CardDescription>{test.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {status === 'completed' ? (
                        <>
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <Badge variant="outline" className="bg-green-50 text-green-700">Completed</Badge>
                        </>
                      ) : (
                        <>
                          <Clock className="h-4 w-4 text-yellow-500" />
                          <Badge variant="outline" className="bg-yellow-50 text-yellow-700">Not Started</Badge>
                        </>
                      )}
                    </div>
                    {status === 'completed' && (
                      <div className="text-sm font-medium">
                        Score: <span className="text-green-600">{score}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    onClick={() => openTest(test)}
                    variant={status === 'completed' ? 'outline' : 'default'}
                    className="w-full"
                  >
                    {status === 'completed' ? 'Review Test' : 'Start Test'}
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>

        {tests.length === 0 && (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-10">
              <p className="text-muted-foreground text-center">No tests available at the moment.</p>
            </CardContent>
          </Card>
        )}

        {/* Test Dialog */}
        {currentTest && (
          <Dialog open={isTestOpen} onOpenChange={setIsTestOpen}>
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle>{currentTest.title}</DialogTitle>
                <DialogDescription>{currentTest.description}</DialogDescription>
              </DialogHeader>
              <div className="space-y-6 py-4">
                <div className="space-y-3">
                  <h3 className="font-medium">{currentTest.options.question}</h3>
                  <RadioGroup
                    value={answers.selected}
                    onValueChange={(value) => handleAnswerChange('selected', value)}
                  >
                    {currentTest.options.answers.map((answer, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <RadioGroupItem
                          value={answer.value}
                          id={`answer-${index}`}
                        />
                        <Label htmlFor={`answer-${index}`}>
                          {answer.text}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsTestOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={submitTest} disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting...' : 'Submit Test'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </AppLayout>
  );
}
