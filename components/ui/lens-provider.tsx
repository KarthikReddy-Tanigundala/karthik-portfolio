"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { MotionConfig } from "framer-motion";
import { isRoleId, type RoleId } from "@/lib/roles";
import { PROJECT_BY_ID, type Project } from "@/lib/projects";
import { ProjectModal } from "@/components/ui/project-modal";

type LensContextValue = {
  role: RoleId | null;
  setRole: (role: RoleId | null) => void;
  openProject: (id: string) => void;
};

const LensContext = createContext<LensContextValue | null>(null);

/**
 * Holds the selected hiring role and the open case study. Both are mirrored
 * to the URL (?role=ds&project=gridcast) so a link can be shared pre-filtered.
 */
export function LensProvider({ children }: { children: React.ReactNode }) {
  const [role, setRoleState] = useState<RoleId | null>(null);
  const [active, setActive] = useState<Project | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const r = params.get("role");
    if (isRoleId(r)) setRoleState(r);
    const p = params.get("project");
    if (p && PROJECT_BY_ID[p]) setActive(PROJECT_BY_ID[p]);
  }, []);

  const syncUrl = useCallback((key: string, value: string | null) => {
    const url = new URL(window.location.href);
    if (value) url.searchParams.set(key, value);
    else url.searchParams.delete(key);
    window.history.replaceState(null, "", url);
  }, []);

  const setRole = useCallback(
    (next: RoleId | null) => {
      setRoleState(next);
      syncUrl("role", next);
    },
    [syncUrl]
  );

  const openProject = useCallback(
    (id: string) => {
      const p = PROJECT_BY_ID[id];
      if (!p) return;
      setActive(p);
      syncUrl("project", id);
    },
    [syncUrl]
  );

  const close = useCallback(() => {
    setActive(null);
    syncUrl("project", null);
  }, [syncUrl]);

  const value = useMemo(
    () => ({ role, setRole, openProject }),
    [role, setRole, openProject]
  );

  return (
    <MotionConfig reducedMotion="user">
      <LensContext.Provider value={value}>
        {children}
        <ProjectModal project={active} onClose={close} onOpen={openProject} />
      </LensContext.Provider>
    </MotionConfig>
  );
}

export function useLens(): LensContextValue {
  const ctx = useContext(LensContext);
  if (!ctx) throw new Error("useLens must be used inside <LensProvider>");
  return ctx;
}
