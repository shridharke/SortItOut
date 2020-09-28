import React from 'react';
import { connect } from 'react-redux'
import './App.css';
import SortingVisualizer from './components/SortingVisualizer';
import Topbar from './components/Topbar';

function App() {
	return (
		<React.Fragment>
			<Topbar />
			<SortingVisualizer />
		</React.Fragment>
	);
}

const mapStateToProps = ({ }) => ({

})

const mapDispatchToProps = () => dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(App)
