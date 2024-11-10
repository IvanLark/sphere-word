import React, { ErrorInfo } from "react";
import ErrorPage from "./ErrorPage";

class ErrorBoundary extends React.Component<{ children: JSX.Element }, { error: Error | null, hasError: boolean }> {
	// !注意要在这里定义props和state后面才不会报错没有child……
	constructor(props: { children: JSX.Element }) {
		super(props);
		this.state = {
			error: null,
			hasError: false
		};
	}

	static getDerivedStateFromError(error: Error) {
		return { hasError: true, error: error };
	}

	componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		console.log(error, errorInfo);
	}

	render() {
		if (this.state.hasError) {
			return <ErrorPage />;
		}
		return this.props.children;
	}
}

export default ErrorBoundary;