import { Button, ButtonGroup } from 'react-bootstrap'
import React, {Component} from 'react'

export default class CustomButtonGroup extends Component {
    render() {
        const {increment, player} = this.props
        return (
            <ButtonGroup className="mr-2" aria-label="First group">
                            <Button className='inc' onClick={() => increment('fifteen', player)}>{player} scored</Button>
            </ButtonGroup>
        )
    }
}