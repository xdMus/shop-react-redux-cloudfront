import { useEffect, useState } from 'react';
import { Product } from '../../../models/Product';
import API_PATHS from '../../../constants/apiPaths';
import axios from 'axios';

export const useProducts = () => {
	const [products, setProducts] = useState<Product[]>([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			try {
				setIsLoading(true);

				const result = await axios.get(API_PATHS.products);

				setIsLoading(false);
				setProducts(result.data);
			} catch (e) {
				setIsLoading(false);
				console.error(e);
			}
		};

		fetchData();
	}, []);

	return { isLoading, products };
};
