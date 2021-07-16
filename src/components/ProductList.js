import React from 'react'
import {useFilterContext} from '../context/filter_context'
import GridView from './GridView'
import ListView from './ListView'
import Loading from "./Loading"

const ProductList = () => {
	const {loading, filtered_products: products, grid_view} = useFilterContext();

	if (loading) {
		return <Loading />
	}
	if (products.length < 1) {
		return <h5 style={{textTransform: "non"}}>Sorry, no products matched your search...</h5>
	}

	if (grid_view === false) {
		return <ListView products={products} />
	}

	return (
		<GridView products={products}>product list</GridView>
	);
}

export default ProductList
