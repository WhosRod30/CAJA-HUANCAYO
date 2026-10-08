import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

export interface ServiceItem {
  id: string;
  name: string;
  category: string;
  icon?: string;
  requiresAmount?: boolean;
}

export interface PaymentDraft {
  service: ServiceItem | null;
  supplyNumber: string;
  amount: number;
}

export interface PaymentContextValue {
  draft: PaymentDraft;
  status: 'idle' | 'pending' | 'success' | 'error';
  updateDraft: (changes: Partial<PaymentDraft>) => void;
  startPayment: (service: ServiceItem) => void;
  submitPayment: () => Promise<string>;
  resetPayment: () => void;
  receiptId: string | null;
}

const PaymentContext = createContext<PaymentContextValue | null>(null);

export function PaymentProvider({ children }: { children: ReactNode }) {
  const [draft, setDraft] = useState<PaymentDraft>({
    service: null,
    supplyNumber: '',
    amount: 0,
  });
  const [status, setStatus] = useState<PaymentContextValue['status']>('idle');
  const [receiptId, setReceiptId] = useState<string | null>(null);

  const updateDraft = (changes: Partial<PaymentDraft>) => {
    setDraft((prev) => ({ ...prev, ...changes }));
  };

  const startPayment = (service: ServiceItem) => {
    setDraft({ service, supplyNumber: '', amount: 0 });
    setStatus('idle');
    setReceiptId(null);
  };

  const submitPayment = async () => {
    setStatus('pending');
    return new Promise<string>((resolve) => {
      setTimeout(() => {
        setStatus('success');
        const id = 'PAG-' + Math.floor(Math.random() * 1000000);
        setReceiptId(id);
        resolve(id);
      }, 2000);
    });
  };

  const resetPayment = () => {
    setDraft({ service: null, supplyNumber: '', amount: 0 });
    setStatus('idle');
    setReceiptId(null);
  };

  return (
    <PaymentContext.Provider
      value={{ draft, status, receiptId, updateDraft, startPayment, submitPayment, resetPayment }}
    >
      {children}
    </PaymentContext.Provider>
  );
}

export function usePayment() {
  const ctx = useContext(PaymentContext);
  if (!ctx) throw new Error('usePayment must be used within PaymentProvider');
  return ctx;
}
