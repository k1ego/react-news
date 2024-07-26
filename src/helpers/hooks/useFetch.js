import { useEffect, useState } from 'react';

export const useFetch = (fetchFunction, params) => {
	const [data, setData] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	// Пример: если params = { name: 'John', age: '30' }, то stringParams станет "name=John&age=30"
	const stringParams = params ? new URLSearchParams(params).toString() : '';

	useEffect(() => {
		(async () => {
			try {
				setIsLoading(true);
				const result = await fetchFunction(params);
				setData(result);
			} catch (error) {
				setError(error);
			} finally {
				setIsLoading(false);
			}
		})();
	}, [fetchFunction, stringParams]);

	return { data, isLoading, error };
};
