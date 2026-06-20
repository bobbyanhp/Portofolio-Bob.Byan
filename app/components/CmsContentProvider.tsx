"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { defaultCmsContent, type CmsContent } from "@/data/cmsContent";

type SaveResult =
  | { ok: true }
  | {
      ok: false;
      message: string;
    };

type CmsContentContextValue = {
  content: CmsContent;
  isReady: boolean;
  setContent: (nextContent: CmsContent) => SaveResult;
  resetContent: () => SaveResult;
};

const CmsContentContext = createContext<CmsContentContextValue | null>(null);

export function CmsContentProvider({ children, initialContent }: { children: ReactNode; initialContent: CmsContent }) {
  const [content, setContentState] = useState<CmsContent>(initialContent);

  const setContent = useCallback((nextContent: CmsContent): SaveResult => {
    setContentState(nextContent);
    return { ok: true };
  }, []);

  const resetContent = useCallback((): SaveResult => {
    setContentState(defaultCmsContent);
    return { ok: true };
  }, []);

  const value = useMemo(
    () => ({ content, isReady: true, setContent, resetContent }),
    [content, resetContent, setContent],
  );

  return <CmsContentContext.Provider value={value}>{children}</CmsContentContext.Provider>;
}

export function useCmsContentContext() {
  const context = useContext(CmsContentContext);

  if (!context) {
    throw new Error("useCmsContent must be used inside CmsContentProvider");
  }

  return context;
}
