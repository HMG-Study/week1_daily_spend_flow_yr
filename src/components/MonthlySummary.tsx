import { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useExpenses } from '@/hooks/useExpenses';

export const MonthlySummary = () => {
  const { expenses } = useExpenses();

  const monthlyData = useMemo(() => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const currentMonthExpenses = expenses.filter(expense => {
      const expenseDate = new Date(expense.expense_date);
      return expenseDate.getMonth() === currentMonth && 
             expenseDate.getFullYear() === currentYear;
    });

    const totalAmount = currentMonthExpenses.reduce((sum, expense) => sum + expense.amount, 0);

    const categoryTotals = currentMonthExpenses.reduce((acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
      return acc;
    }, {} as Record<string, number>);

    return {
      totalAmount,
      categoryTotals,
      expenseCount: currentMonthExpenses.length,
      monthName: `${currentYear}년 ${currentMonth + 1}월`,
    };
  }, [expenses]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{monthlyData.monthName} 요약</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">
              {monthlyData.totalAmount.toLocaleString()}원
            </div>
            <div className="text-sm text-muted-foreground">
              총 {monthlyData.expenseCount}건의 지출
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-semibold">카테고리별 지출</h4>
            {Object.entries(monthlyData.categoryTotals).map(([category, amount]) => (
              <div key={category} className="flex justify-between items-center">
                <span className="text-sm">{category}</span>
                <span className="font-medium">{amount.toLocaleString()}원</span>
              </div>
            ))}
          </div>

          {monthlyData.expenseCount === 0 && (
            <div className="text-center text-muted-foreground py-4">
              이번 달 지출이 없습니다.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};