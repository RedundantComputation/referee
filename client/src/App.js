import React, { Component } from "react";
import PlayersForm from './components/Form'
import FlashMessage from 'react-flash-message'
import { Button, Alert } from 'react-bootstrap'
import Header from './components/Header'
import CustomButtonGroup from './components/CustomButtonGroup'
import "./App.css";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playerName: "",
            playerName2: "",
            playersEntered: 0,
            count: { player1: 0, player2: 0 },
            showFlash: false,
            flashmessage: "",
            playerNames: { player1: "", player2: "" },
            gameOn: true,
            winner: ''
        };
        this.setPlayerName = this.setPlayerName.bind(this);
        this.increment = this.increment.bind(this)
        this.replay = this.replay.bind(this)
    }

    async increment(value, player) {
        let points = 0;
        if (value === 'fifteen') {
            points = 1
        } else if (value === 'thirty') {
            points = 2
        } else if (value === 'fourty') {
            points = 3
        }
        let count = { ...this.state.count, [player]: (this.state.count[player] + points) }
        let { player1, player2 } = count
        let player1Name = this.state.playerNames.player1
        let player2Name = this.state.playerNames.player2

        if (Math.abs(player1 - player2) >= 2 && (player1 >= 4 || player2 >= 4)) {
            let winner = player1 > player2 ? player1Name : player2Name
            let data = {
                playerOneName: player1Name,
                playerTwoName: player2Name,
                playerOneScore: player1,
                playerTwoScore: player2
            }
            this.setState({
                gameOn: false,
                winner
            })
            let response = await fetch('http://localhost:9000/games', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            let json = await response.json()
            console.log("JSON DATA ", response, json)
            return
        } else {
            let leadingScore = player1 > player2 ? player1 : player2
            let showFlash = ((player1 - player2 === 0 || Math.abs(player1 - player2) >= 3) && leadingScore >= 3)
            let advantagePlayer = player1 > player2 ? player1Name : player2Name
            let flashMessage = player1 - player2 === 0 ? "Deuce" : `Advantage ${advantagePlayer}!`

            console.log("Show flash", showFlash, player1, player2)

            this.setState({
                count: count,
                showFlash,
                flashMessage
            });
        }
    };

    replay() {
        this.setState({
            playerNames: { player1: '', player2: '' },
            count: { player1: 0, player2: 0 },
            showFlash: false,
            flashMessage: '',
            gameOn: true
        })
    }

    setPlayerName(name, player) {
        this.setState({
            playerNames: { ...this.state.playerNames, [player]: name }
        })
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <Header />
                </header>
                {
                    this.state.gameOn ? (
                        <table className="center">
                            <tbody>
                                <tr>
                                    <td>
                                        {
                                            this.state.playerNames.player1.length === 0 &&
                                            <PlayersForm
                                                setPlayerName={this.setPlayerName}
                                                player={'player1'}
                                                playersEntered={this.state.playersEntered}
                                            />
                                        }
                                    </td>
                                    <td>
                                        {
                                            this.state.playerNames.player2.length === 0 &&
                                            <PlayersForm
                                                setPlayerName={this.setPlayerName}
                                                player={'player2'}
                                                playersEntered={this.state.playersEntered}
                                            />
                                        }
                                    </td>
                                </tr>
                            </tbody>
                            <tr>
                                <th><h1>Player 1</h1></th>
                                <th><h1>Player 2</h1></th>
                            </tr>
                            <tr>
                                <td>{this.state.playerNames.player1}</td>
                                <td>{this.state.playerNames.player2}</td>
                            </tr>
                            <td>
                                <h3>Score {this.state.count.player1}</h3>
                                {this.state.playerNames.player1.length > 0 && this.state.playerNames.player2.length > 0 &&
                                    <CustomButtonGroup player={"player1"} increment={this.increment} />
                                }

                            </td>
                            <td>
                                <h3>Score {this.state.count.player2}</h3>
                                {this.state.playerNames.player2.length > 0 && this.state.playerNames.player1.length > 0 &&
                                    <CustomButtonGroup player={"player2"} increment={this.increment} />
                                }
                            </td>
                        </table>
                    ) : (
                            <div>
                                <Alert variant="success">
                                    <Alert.Heading>
                                <p>{this.state.winner} has won!</p>
                                    </Alert.Heading>
                                </Alert>
                                <Button onClick={this.replay}>Replay</Button>
                            </div>
                        )
                }
                {
                    this.state.showFlash && <FlashMessage duration={5000} persistOnHover={true}>
                        <p className="flash-message">{this.state.flashMessage}</p>
                    </FlashMessage>
                }

            </div>
        );
    }
}

export default App;

