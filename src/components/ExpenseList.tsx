import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trash2 } from 'lucide-react';
import { useExpenses } from '@/hooks/useExpenses';

const categoryColors = {
  식비: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  교통비: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  쇼핑: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
  기타: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200',
};

export const ExpenseList = () => {
  const { expenses, isLoading, deleteExpense } = useExpenses();

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>지출 내역</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center py-8">
            <div className="text-muted-foreground">로딩 중...</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (expenses.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>지출 내역</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            아직 등록된 지출이 없습니다.
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>지출 내역</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {expenses.map((expense) => (
            <div
              key={expense.id}
              className="flex items-center justify-between p-4 border rounded-lg"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Badge className={categoryColors[expense.category]}>
                    {expense.category}
                  </Badge>
                  <span className="font-semibold text-lg">
                    {expense.amount.toLocaleString()}원
                  </span>
                </div>
                <div className="text-sm text-muted-foreground">
                  {new Date(expense.expense_date).toLocaleDateString('ko-KR')}
                </div>
                {expense.memo && (
                  <div className="text-sm mt-1">{expense.memo}</div>
                )}
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => deleteExpense(expense.id)}
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};