import React, { Component } from 'react'

class Adder extends Component {
    constructor(props) {
        super(props)

        this.state = {
            image: '',
            name: '', 
            house: 'Gryffindor'
        }

        this.handleChange = this.handleChange.bind(this)
        this.addAndClear = this.addAndClear.bind(this)
    }

    handleChange(e) {
        let {value, name} = e.target
        this.setState({
            [name]: value
        })
    }

    addAndClear() {
        this.props.add(this.state)
        this.setState({
            image: '',
            name: '', 
            house: 'Gryffindor'
        })
    }

    render() {
        return (
            <div>
                <input 
                    type='text' 
                    placeholder='name' 
                    onChange={this.handleChange}
                    name='name'
                    value={this.state.name}/>
                <input 
                    type='text' 
                    placeholder='imageURL' 
                    onChange={this.handleChange}
                    name='image'
                    value={this.state.image}/>
                <select 
                    placeholder='house'
                    onChange={this.handleChange}
                    name='house'
                    value={this.state.name}>
                    <option>Gryffindor</option>
                    <option>Slytherin</option>
                    <option>Hufflepuff</option>
                    <option>Ravenclaw</option>
                </select>
                <button onClick={this.addAndClear}>add</button>
            </div>
        )
    }
}

export default Adder