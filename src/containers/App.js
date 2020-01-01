import React, {Component} from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import './App.css';

class App extends Component 
{
    constructor(){
        super();
        this.state = {
            robotsList: [],
            searchField: ''
        }
    }
    //called after the first render
    componentDidMount(){
        //json api
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response  => response.json())
        .then(users     => this.setState({robotsList: users}));
    }

    onSearchChange = (event) => {
        this.setState({searchField: event.target.value});
        // console.log(filteredRobots);
    }

    render(){
        const {robotsList, searchField} = this.state;
        const filteredRobots = robotsList.filter(robot => {
            return robot.name.toLowerCase().includes(searchField.toLowerCase());
        })
        if(robotsList.length === 0){
            return(<h1>Loading...</h1>)
        } else {
            return(
                <div className='tc'>
                    <h1 className='f1'>Robofriends</h1>
                    <SearchBox searchChange = {this.onSearchChange} />
                    <Scroll>
                        <CardList robots={filteredRobots}/>
                    </Scroll>
                    
                </div>  
            );
        }
    }
    

}

export default App;
