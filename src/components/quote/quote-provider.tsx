"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { QuoteDrawer } from "./quote-drawer";
import { QuoteListSheet } from "./quote-list-sheet";

type QuoteContextValue = {
  open: (product?: string) => void;
  close: () => void;
  /**
   * Mobile "quote list" basket — client-only, product slugs. Kept separate
   * from the single-product drawer flow above so desktop's Request Quote
   * buttons stay exactly as they were.
   */
  basket: string[];
  toggleBasketItem: (slug: string) => void;
  isInBasket: (slug: string) => boolean;
  clearBasket: () => void;
  basketOpen: boolean;
  openBasket: () => void;
  closeBasket: () => void;
};

const QuoteContext = createContext<QuoteContextValue | null>(null);

export function useQuote() {
  const ctx = useContext(QuoteContext);
  if (!ctx) {
    throw new Error("useQuote must be used inside <QuoteProvider>");
  }
  return ctx;
}

export function QuoteProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [product, setProduct] = useState<string | undefined>(undefined);
  const [basket, setBasket] = useState<string[]>([]);
  const [basketOpen, setBasketOpen] = useState(false);

  const open = useCallback((next?: string) => {
    setProduct(next);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => setIsOpen(false), []);

  const toggleBasketItem = useCallback((slug: string) => {
    setBasket((current) =>
      current.includes(slug)
        ? current.filter((s) => s !== slug)
        : [...current, slug],
    );
  }, []);

  const isInBasket = useCallback((slug: string) => basket.includes(slug), [basket]);
  const clearBasket = useCallback(() => setBasket([]), []);

  const openBasket = useCallback(() => setBasketOpen(true), []);
  const closeBasket = useCallback(() => setBasketOpen(false), []);

  const value = useMemo(
    () => ({
      open,
      close,
      basket,
      toggleBasketItem,
      isInBasket,
      clearBasket,
      basketOpen,
      openBasket,
      closeBasket,
    }),
    [
      open,
      close,
      basket,
      toggleBasketItem,
      isInBasket,
      clearBasket,
      basketOpen,
      openBasket,
      closeBasket,
    ],
  );

  return (
    <QuoteContext.Provider value={value}>
      {children}
      <QuoteDrawer open={isOpen} product={product} onClose={close} />
      <QuoteListSheet
        open={basketOpen}
        basket={basket}
        onRemove={toggleBasketItem}
        onClose={closeBasket}
      />
    </QuoteContext.Provider>
  );
}
