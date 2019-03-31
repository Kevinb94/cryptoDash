import React from 'react';

const cc = require('cryptocompare');

export const AppContext = React.createContext();

export class AppProvider extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            page: 'dashboard',
            setPage: this.setPage,
            ...this.savedSettings(),
            confirmFavorites: this.confirmFavorites
        }
    }

    setPage = page => this.setState({page})

    savedSettings(){
        let cryptoDashData = JSON.parse(localStorage.getItem('cryptoDash'));
        if(!cryptoDashData){
            return {page: 'settings', firstVisit: true}
        }
        return {}
    }

    componentDidMount = () => {
        this.fetchCoins();
    }

    fetchCoins = async () => {
        let coinList = (await cc.coinList()).Data;
        this.setState({coinList});
        console.log(coinList);
    }

    confirmFavorites = () =>{
        this.setState({
            firstVisit: false,
            page: 'dashboard'
        });
        localStorage.setItem('cryptoDash', JSON.stringify({
            test: 'hello'
        }))
    }
    

    render(){
        return (
            <AppContext.Provider value={this.state}>
                {this.props.children}
            </AppContext.Provider>
        )
    }
}