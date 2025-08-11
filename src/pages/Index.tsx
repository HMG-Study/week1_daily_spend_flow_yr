import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ExpenseForm } from '@/components/ExpenseForm';
import { ExpenseList } from '@/components/ExpenseList';
import { MonthlySummary } from '@/components/MonthlySummary';
import { ExpenseChart } from '@/components/ExpenseChart';
import { useAuth } from '@/hooks/useAuth';

const Index = () => {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">로딩 중...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <header className="flex justify-between items-center mb-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-2">개인 비용 관리</h1>
            <p className="text-muted-foreground">지출을 기록하고 관리하세요</p>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-muted-foreground">{user.email}</span>
            <Button variant="outline" onClick={handleSignOut}>
              로그아웃
            </Button>
          </div>
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
