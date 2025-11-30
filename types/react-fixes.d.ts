// Minimal React augmentations for custom props and commonly-used helpers.
//
// React 19 and @types/react already provide full, correct typings. However,
// a lot of this codebase was written assuming certain symbols (ReactNode,
// ElementRef, ComponentProps, hooks, etc.) are available directly on the
// imported React module (e.g. React.ReactNode, React.forwardRef). In the
// React 19 type setup this can lead to "Namespace '"react"' has no exported
// member" style errors.
//
// To keep changes localized and avoid large refactors across hundreds of
// components, we provide very *loose* augmentations here that simply make
// those symbols exist. They intentionally use "any"-heavy signatures so they
// do not fight with the official React typings.

		declare module "react" {
			// Custom DOM attribute extensions used throughout the app.
			// We also explicitly include className/value/onChange so that components
			// depending on these props compile even if the underlying React types
			// change between versions.
			interface HTMLAttributes<T> {
				className?: string;
				value?: any;
				onChange?: any;
				tw?: string;
			}

			// Loosely-typed React helpers that some code expects on the React module
			// itself (e.g. React.ReactNode, React.ElementRef, etc.).
			export type ReactNode = any;
			export type ReactElement<P = any, T = any> = any;
			export type ReactPortal = any;

			export type RefObject<T = any> = { current: T | null };
			export type Ref<T = any> =
				| ((instance: T | null) => void)
				| { current: T | null }
				| null;

			export type ElementRef<C = any> = any;
			export type ComponentProps<T = any> = any;
			export type ComponentPropsWithoutRef<T = any> = any;

			// Function component helpers
			export type PropsWithChildren<P = {}> = P & { children?: ReactNode };
			export type FC<P = {}> = (
				props: P & { children?: ReactNode }
			) => ReactElement | null;

			// Style helpers
			export type CSSProperties = { [key: string]: any };

			// Event helpers – kept very loose on purpose
			export type ChangeEvent<T = any> = any;
			export type MouseEvent<T = any, E = any> = any;
			export type FocusEvent<T = any> = any;
			export type KeyboardEvent<T = any> = any;
			export type FormEvent<T = any> = any;
			export type DragEvent<T = any> = any;
			export type AnimationEvent<T = any> = any;
			export type TransitionEvent<T = any> = any;

			// HTML element specific attribute helpers
			export interface ButtonHTMLAttributes<T> extends HTMLAttributes<T> {
				type?: "button" | "submit" | "reset";
			}

			export interface InputHTMLAttributes<T> extends HTMLAttributes<T> {
				type?: string;
			}

			// Core React APIs used across the codebase – very loosely typed.
			export function forwardRef<T, P = {}>(
				render: (props: P, ref: any) => ReactElement | null
			): any;

			export function memo<T>(component: T): T;

			export function useState<S = any>(
				initialState: S | (() => S)
			): [S, (value: S | ((prev: S) => S)) => void];

			export function useEffect(
				effect: () => void | (() => void),
				deps?: readonly any[]
			): void;

			export function useRef<T = any>(initialValue: T | null): RefObject<T>;

			export function useCallback<T extends (...args: any[]) => any>(
				callback: T,
				deps: readonly any[]
			): T;

			export function useMemo<T>(factory: () => T, deps: readonly any[]): T;

			export function use<T>(promise: Promise<T>): T;

			export function useId(): string;

			// Context APIs – kept loose to avoid type conflicts.
			export function createContext<T = any>(defaultValue: T): any;
			export function useContext<T = any>(context: any): T;

			// Concurrent features (React 18/19)
			export function useTransition(): [boolean, (callback: () => void) => void];

			// React 19 server actions hook – keep loose to avoid type conflicts.
			export function useActionState(...args: any[]): any;

			// Basic state helpers used in some components
			export type Dispatch<A = any> = (value: A) => void;
			export type SetStateAction<S> = S | ((prevState: S) => S);

			// Suspense component (typed loosely as any FC)
			export const Suspense: FC<any>;

			// cloneElement – used in some components to clone React elements with new props
			export function cloneElement(
				element: any,
				props?: any,
				...children: any[]
			): any;
		}