import { ThemeProvider } from '@/app/providers/ThemeProvider';
import '@/shared/index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { appRouter } from './appRouter';
import { store } from './appStore';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<ThemeProvider>
			<Provider store={store}>
				<RouterProvider router={appRouter} />
			</Provider>
		</ThemeProvider>
	</React.StrictMode>
);
