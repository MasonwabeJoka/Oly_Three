declare module './richTextEditorGlobalStyles.scss';
declare module '../settings/account-verification/components/VerificationFormWrapper';
declare module './store/usePaymentProcessingStore';
declare module './BidInput';
declare module '../../../components/Buttons';
declare module './richTextEditorGlobalStyles.scss';
declare module '@/components/richTextEditor/richTextEditorGlobalStyles.scss';
declare module './BidInput';
declare module '../../../components/Buttons';
declare module '@/app/[listing]/components/CartItem';
declare module './store/usePaymentProcessingStore';
declare module '@/app/(dashboard)/dashboard/create-listing/store/usePaymentModalStore';
declare module './Icon';
declare module './navButtonRight';
declare module './navButtonLeft';
declare module './SelectedDetail';
declare module './richTextEditorGlobalStyles.scss';
declare module 'froala-editor/css/froala_style.min.css';
declare module 'froala-editor/css/froala_editor.pkgd.min.css';
declare module 'froala-editor/js/plugins/paragraph_format.min.js';
declare module 'froala-editor/js/plugins/paragraph_style.min.js';
declare module 'froala-editor/js/plugins/lists.min.js';
declare module 'froala-editor/js/plugins/emoticons.min.js';
declare module 'froala-editor/js/plugins/char_counter.min.js';

declare const useMessageStore: any;
declare const trpc: any;
declare const client: any;

declare module '@/sanity/client' {
	const client: {
		fetch: <T>(query: string, params?: Record<string, any>) => Promise<T>;
		// Add other client methods as needed
	};
	export default client;
}

// Type for verification step components
declare module '@/app/(dashboard)/dashboard/settings/account-verification/types' {
	export interface VerificationStepProps {
		onNext: () => void | Promise<void>;
		[key: string]: any;
	}
}

// Type for verification components
declare module '@/app/(dashboard)/dashboard/settings/account-verification/components/business/RepSelfie' {
	import { FC } from 'react';
	const RepSelfie: FC<{ onNext: () => void | Promise<void> }>;
	export default RepSelfie;
}

declare module '@/app/(dashboard)/dashboard/settings/account-verification/components/business/EnterRepMobile' {
	import { FC } from 'react';
	const EnterRepMobile: FC<{ onNext: () => void | Promise<void> }>;
	export default EnterRepMobile;
}

// Import common types
/// <reference path="./common.d.ts" />
/// <reference path="./react-fixes.d.ts" />

// Global type augmentations
declare global {
	interface Window {
		trpc?: any;
	}
}

// Fix for missing exports
declare module '@/lib/validations/formValidations' {
	export const detailsFormSchema: any;
	export const searchFormSchema: any;
	export const feedbackFormSchema: any;
	export const multiStepFormSchema: any;
	export const passwordSchema: any;
	export const profileSchema: any;
	export const registerSchema: any;
}

declare module '@/lib/mongoose' {
	export const connectToDatabase: () => Promise<void>;
}

// Third-party components used in JSX but missing proper typings
declare module "react-masonry-css" {
	const Masonry: any;
	export default Masonry;
}

declare module "react-webcam" {
	const Webcam: any;
	export default Webcam;
}

declare module "react-custom-scrollbars-2" {
	import { ComponentType, CSSProperties, ReactNode } from 'react';

	interface ScrollbarsProps {
		style?: CSSProperties;
		children?: ReactNode;
		renderTrackVertical?: (props: { style: CSSProperties; [key: string]: any }) => ReactNode;
		renderThumbVertical?: (props: { style: CSSProperties; [key: string]: any }) => ReactNode;
		renderTrackHorizontal?: (props: { style: CSSProperties; [key: string]: any }) => ReactNode;
		renderThumbHorizontal?: (props: { style: CSSProperties; [key: string]: any }) => ReactNode;
		renderView?: (props: { style: CSSProperties; [key: string]: any }) => ReactNode;
		[key: string]: any;
	}

	export const Scrollbars: ComponentType<ScrollbarsProps>;
}

declare module "@react-google-maps/api" {
	export const GoogleMap: any;
	export const Marker: any;
	export const useJsApiLoader: any;
}

// Local component modules
declare module "./VerificationFormWrapper" {
	const VerificationFormWrapper: any;
	export default VerificationFormWrapper;
}

declare module "./Icon" {
	const Icon: any;
	export default Icon;
}

declare module "./navButtonRight" {
	const NavButtonRight: any;
	export default NavButtonRight;
}

declare module "./navButtonLeft" {
	const NavButtonLeft: any;
	export default NavButtonLeft;
}

declare module "./BidInput" {
	const BidInput: any;
	export default BidInput;
}

declare module "../../../components/Buttons" {
	export const Button: any;
}

declare module "./store/usePaymentProcessingStore" {
	export const usePaymentProcessingStore: any;
}

// Component prop fixes for React live in react-fixes.d.ts to keep all
// React-related augmentations in a single place.