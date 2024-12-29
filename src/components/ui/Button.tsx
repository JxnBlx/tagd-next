// components/ui/Button.tsx
import { cva, type VariantProps } from "class-variance-authority";
import { Loading } from "@icon-park/react";

const buttonVariants = cva("px-6 py-2 text-sm rounded-md transition-colors", {
	variants: {
		variant: {
			primary: "text-sm bg-black text-white rounded-md hover:bg-gray-900 transition-colors",
			secondary: "text-sm border border-black rounded-md hover:bg-gray-50 transition-colors",
			outline: "text-sm border border-gray-200 rounded-md hover:bg-gray-50 transition-colors",
			ghost: "hover:bg-gray-50",
		},
		size: {
			default: "h-10",
			sm: "h-8 px-4",
			lg: "h-12 px-8",
		},
		isLoading: {
			true: "cursor-not-allowed",
			false: "",
		},
	},
	defaultVariants: {
		variant: "secondary",
		size: "default",
		isLoading: false,
	},
});

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
	children: React.ReactNode;
	isLoading?: boolean;
}

export function Button({ variant, size, children, className, isLoading = false, disabled = false, ...props }: ButtonProps) {
	return (
		<button
			className={`flex items-center justify-center ${buttonVariants({ variant, size, isLoading, className })}`}
			disabled={isLoading || disabled}
			{...props}
		>
			{isLoading && (
				<span className="absolute animate-spin">
					<Loading theme="outline" size="24" fill="#FFFFFF" />
				</span>
			)}
			<span className={isLoading ? "invisible" : ""}>{children}</span>
		</button>
	);
}
