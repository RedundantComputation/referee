import React, { Component } from 'react'
import TennisLogo from './referee-racket-img.png'

export default class Header extends Component {
    render() {
        console.log(TennisLogo)
        return (
            <div>
                <h3>Welcome to Referee!</h3>
                <p>Add player names to begin!</p>
                <img src={TennisLogo} width="80" height="80" alt="Logo" />
            </div>
        )
    }
}