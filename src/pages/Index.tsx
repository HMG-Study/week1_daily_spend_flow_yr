import { ExpenseForm } from '@/components/ExpenseForm';
import { ExpenseList } from '@/components/ExpenseList';
import { MonthlySummary } from '@/components/MonthlySummary';
import { ExpenseChart } from '@/components/ExpenseChart';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">개인 비용 관리</h1>
          <p className="text-muted-foreground">지출을 기록하고 관리하세요</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column - Form and Chart */}
          <div className="lg:col-span-2 space-y-6">
            <ExpenseForm />
            <ExpenseChart />
          </div>

          {/* Right column - Summary */}
          <div className="space-y-6">
            <MonthlySummary />
          </div>
        </div>

        {/* Full width - Expense List */}
        <div className="mt-6">
          <ExpenseList />
        </div>
      </div>
    </div>
  );
};

export default Index;
