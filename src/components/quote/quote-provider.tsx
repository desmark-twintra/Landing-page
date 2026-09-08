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
   * The enquiry list — client-only, product slugs. Kept separate from the
   * single-product drawer flow above so the direct "Request Quote" buttons
   * stay exactly as they were.
   */
  enquiryList: string[];
  toggleEnquiryItem: (slug: string) => void;
  isInEnquiryList: (slug: string) => boolean;
  clearEnquiryList: () => void;
  listOpen: boolean;
  openList: () => void;
  closeList: () => void;
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
  const [enquiryList, setEnquiryList] = useState<string[]>([]);
  const [listOpen, setListOpen] = useState(false);

  const open = useCallback((next?: string) => {
    setProduct(next);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => setIsOpen(false), []);

  const toggleEnquiryItem = useCallback((slug: string) => {
    setEnquiryList((current) =>
      current.includes(slug)
        ? current.filter((s) => s !== slug)
        : [...current, slug],
    );
  }, []);

  const isInEnquiryList = useCallback((slug: string) => enquiryList.includes(slug), [enquiryList]);
  const clearEnquiryList = useCallback(() => setEnquiryList([]), []);

  const openList = useCallback(() => setListOpen(true), []);
  const closeList = useCallback(() => setListOpen(false), []);

  const value = useMemo(
    () => ({
      open,
      close,
      enquiryList,
      toggleEnquiryItem,
      isInEnquiryList,
      clearEnquiryList,
      listOpen,
      openList,
      closeList,
    }),
    [
      open,
      close,
      enquiryList,
      toggleEnquiryItem,
      isInEnquiryList,
      clearEnquiryList,
      listOpen,
      openList,
      closeList,
    ],
  );

  return (
    <QuoteContext.Provider value={value}>
      {children}
      <QuoteDrawer open={isOpen} product={product} onClose={close} />
      <QuoteListSheet
        open={listOpen}
        enquiryList={enquiryList}
        onRemove={toggleEnquiryItem}
        onClose={closeList}
      />
    </QuoteContext.Provider>
  );
}
