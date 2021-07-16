import React, {useEffect, useContext, useReducer} from 'react'
import reducer from '../reducers/filter_reducer'
import {
	LOAD_PRODUCTS,
	LOAD_PRODUCTS_BEGIN,
	SET_GRIDVIEW,
	SET_LISTVIEW,
	UPDATE_SORT,
	SORT_PRODUCTS,
	UPDATE_FILTERS,
	FILTER_PRODUCTS,
	CLEAR_FILTERS,
} from '../actions'
import {useProductsContext} from './products_context'

const initialState = {
	filtered_products: [],
	all_products: [],
	grid_view: true,
	loading: true,
	sort: "price-lowest",
	filters: {
		text: "",
		company: "all",
		category: "all",
		color: "all",
		min_price: 0,
		max_price: 0,
		price: 0,
		shipping: false,
	},
}

const FilterContext = React.createContext()

export const FilterProvider = ({children}) => {
	const {products} = useProductsContext();
	const [state, dispatch] = useReducer(reducer, initialState);

	useEffect(() => {
		dispatch({type: LOAD_PRODUCTS_BEGIN});
	}, []);

	useEffect(() => {
		dispatch({type: LOAD_PRODUCTS, payload: products});
	}, [products]);

	useEffect(() => {
		dispatch({type: FILTER_PRODUCTS});
		dispatch({type: SORT_PRODUCTS});
	}, [products, state.sort, state.filters]);


	function setGridView() {
		dispatch({type: SET_GRIDVIEW});
	}

	function setListView() {
		dispatch({type: SET_LISTVIEW});
	}

	function updateSort(e) {
		// same name of the element as in the state is extremely important
		const name = e.target.name;
		const value = e.target.value;
		dispatch({type: UPDATE_SORT, payload: value});
	}

	function updateFilters(e) {
		const name = e.target.name;
		let value = e.target.value;
		// in case if you click on a button then e.target.value does not exist.
		// It is only for input fields.
		// for that you need to access e.target.textContent
		if (name === "category") {
			value = e.target.textContent;
		}

		if (name === "color") {
			value = e.target.dataset.color;
		}

		if (name === "price") {
			value = Number(value);
		}
		if (name === "shipping") {
			value = e.target.checked;
		}
		dispatch({type: UPDATE_FILTERS, payload: {name, value}});
	}

	function clearFilters() {
		dispatch({type: CLEAR_FILTERS});
	}

	return (
		<FilterContext.Provider value={{...state, setGridView, setListView, updateSort, updateFilters, clearFilters}}>
			{children}
		</FilterContext.Provider>
	)
}
// make sure use
export const useFilterContext = () => {
	return useContext(FilterContext)
}
