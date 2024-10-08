import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import store from "./app/store";
import { AppThemeProvider } from "./themes/AppThemeProvider";
import "./main.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<Provider store={store}>
			<AppThemeProvider>
				<App />
			</AppThemeProvider>
		</Provider>
	</React.StrictMode>,
);
