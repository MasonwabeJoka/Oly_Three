"use client";

import { useRouter, usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

type Step<T> = {
  path: string;
  fields?: (keyof T)[];
};

type NavigationProps<T> = {
  steps: Step<T>[];
  basePath: string;
  onSubmit: (data: T) => Promise<void>;
  trigger: (fields?: (keyof T)[]) => Promise<boolean>;
  getValues: () => T;
  setError: (name: "root", error: { message: string }) => void;
  reset: () => void;
};

export function useUrlMultiStepForm<T extends Record<string, any>>({
  steps,
  basePath,
  onSubmit,
  trigger,
  getValues,
  setError,
  reset,
}: NavigationProps<T>) {
  const router = useRouter();
  const pathname = usePathname();
  const [currentIndex, setcurrentIndex] = useState<number | null>(null);
  const [isClient, setIsClient] = useState(false);

  const stepPaths = steps.map((s) => s.path);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const resolveStepFromUrl = useCallback(() => {
    const segment = pathname.split("/").pop() ?? "";
    const idx = stepPaths.indexOf(segment);
    if (idx === -1) {
      router.replace(`${basePath}/${steps[0].path}`);
    } else {
      setcurrentIndex(idx);
    }
  }, [pathname, router, basePath, stepPaths]);

  useEffect(() => {
    if (isClient && currentIndex === null) {
      resolveStepFromUrl();
    }
  }, [isClient, currentIndex, resolveStepFromUrl]);

  const goTo = (idx: number) => {
    setcurrentIndex(idx);
    router.push(`${basePath}/${steps[idx].path}`);
  };

  const handleNext = async () => {
    if (currentIndex === null) return;

    const fields = steps[currentIndex].fields ?? [];
    const isValid = fields.length ? await trigger(fields) : true;

    if (!isValid) return;

    if (currentIndex < steps.length - 1) {
      goTo(currentIndex + 1);
    } else {
      try {
        await onSubmit(getValues());
        router.push("/dashboard");
      } catch (err) {
        console.error("Submit failed:", err);
        setError("root", { message: "Submission failed. Please try again." });
      }
    }
  };

  const handleBack = () => {
    if (currentIndex === null) return;

    if (currentIndex > 0) {
      goTo(currentIndex - 1);
    } else {
      reset();
      router.push(basePath);
    }
  };

  

  return {
    currentIndex,
    isClient,
    goTo,
    handleNext,
    handleBack,
    isLastStep: currentIndex !== null && currentIndex === steps.length - 1,
  };
}


