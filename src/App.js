import React from 'react';
import { connect } from 'react-redux'
import './App.css';
import SortingVisualizer from './components/SortingVisualizer';
import Topbar from './components/Topbar';
import BottomBar from './components/BottomBar'

function App({ theme }) {

	return (
		<div className={theme ? "dark" : "light"}>
			<Topbar />
			<SortingVisualizer />
			<BottomBar />
		</div>
	);
}

const mapStateToProps = ({ theme }) => ({
	theme
})

const mapDispatchToProps = () => dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(App)
