import { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { useExpenses } from '@/hooks/useExpenses';

const COLORS = {
  식비: '#3b82f6',
  교통비: '#10b981',
  쇼핑: '#8b5cf6',
  기타: '#6b7280',
};

export const ExpenseChart = () => {
  const { expenses } = useExpenses();

  const chartData = useMemo(() => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const currentMonthExpenses = expenses.filter(expense => {
      const expenseDate = new Date(expense.expense_date);
      return expenseDate.getMonth() === currentMonth && 
             expenseDate.getFullYear() === currentYear;
    });

    const categoryTotals = currentMonthExpenses.reduce((acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(categoryTotals).map(([category, amount]) => ({
      category,
      amount,
      fill: COLORS[category as keyof typeof COLORS],
    }));
  }, [expenses]);

  const totalAmount = chartData.reduce((sum, item) => sum + item.amount, 0);

  if (chartData.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>카테고리별 차트</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            이번 달 지출 데이터가 없습니다.
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>카테고리별 차트</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            amount: {
              label: "금액",
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                paddingAngle={5}
                dataKey="amount"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    formatter={(value, name, props) => [
                      `${Number(value).toLocaleString()}원`,
                      props.payload.category,
                    ]}
                  />
                }
              />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>

        <div className="mt-4 space-y-2">
          {chartData.map((item) => (
            <div key={item.category} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.fill }}
                />
                <span className="text-sm">{item.category}</span>
              </div>
              <div className="text-sm font-medium">
                {item.amount.toLocaleString()}원 ({((item.amount / totalAmount) * 100).toFixed(1)}%)
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};