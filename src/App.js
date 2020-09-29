import React from 'react';
import { connect } from 'react-redux'
import './App.css';
import SortingVisualizer from './components/SortingVisualizer';
import Topbar from './components/Topbar';
import BottomBar from './components/BottomBar'

function App() {
	return (
		<React.Fragment>
			<Topbar />
			<SortingVisualizer />
			<BottomBar />
		</React.Fragment>
	);
}

const mapStateToProps = ({ }) => ({

})

const mapDispatchToProps = () => dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(App)
