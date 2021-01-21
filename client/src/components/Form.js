import React from "react"


class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: '' }

        this.handleChange = this.handleChange.bind(this);
        this.namePlayers = this.namePlayers.bind(this);

    }

    handleChange(event) {
        this.setState({ value: event.target.value })
    }

    namePlayers(){
        this.props.setPlayerName(this.state.value, this.props.player)
    }
    render() {
        return (
            <div>
                <br>
                </br>
            <input type="text" value={this.state.value} onChange={this.handleChange} placeholder="Player name" />
                <button type="button" onClick={this.namePlayers}>Add</button>
            </div>
        );
    }
}
export default Form