import React, {Children} from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import {Navbar, Sidebar, Footer} from './components'
import {Home, SingleProduct, Cart, Checkout, Error, About, Products, PrivateRoute} from "./pages"

function App() {
	return (
		<Router>
			<Navbar />
			<Sidebar />
			<Switch>
				<Route exact path="/" component={Home} />
				<Route exact path="/about" component={About} />
				<Route exact path="/cart" component={Cart} />
				<Route exact path="/products" component={Products} />
				<Route exact path="/products/:id" children={<SingleProduct />} />
				<PrivateRoute exact path="/checkout">
					<Checkout />
				</PrivateRoute>
				<Route exact path="*" component={Error} />
			</Switch>
			<Footer />
		</Router>
	);
}

export default App
