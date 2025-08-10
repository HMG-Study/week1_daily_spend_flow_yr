-- Create expenses table for personal expense tracking
CREATE TABLE public.expenses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID,
  amount DECIMAL(10,2) NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('식비', '교통비', '쇼핑', '기타')),
  memo TEXT,
  expense_date DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.expenses ENABLE ROW LEVEL SECURITY;

-- Create policies for expenses (public access for now since no auth is implemented)
CREATE POLICY "Anyone can view expenses" 
ON public.expenses 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can create expenses" 
ON public.expenses 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can update expenses" 
ON public.expenses 
FOR UPDATE 
USING (true);

CREATE POLICY "Anyone can delete expenses" 
ON public.expenses 
FOR DELETE 
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_expenses_updated_at
BEFORE UPDATE ON public.expenses
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create index for better performance on date queries
CREATE INDEX idx_expenses_date ON public.expenses(expense_date);
CREATE INDEX idx_expenses_category ON public.expenses(category);