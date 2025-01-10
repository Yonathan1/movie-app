import React, { Component, Fragment } from 'react';
import './AppClass.css';

export default class AppClass extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isTrue: false,
        };
    }

    toggleTrue = () => {
        if (this.state.isTrue) {
            this.setState({
                isTrue: false,
            });
            return;
        }
        this.setState({
            isTrue: true,
        })
    }

    render() {
        return (
            <>
                <h1 className='h1-green'>{this.props.msg}</h1>
                { this.state.isTrue &&
                    <Fragment>
                        <hr />
                        <p>The current value of isTrue is True</p>
                    </Fragment>
                }
                <hr />
                {this.state.isTrue
                    ? <p>is True</p>
                    : <p>is False</p>
                }
                <hr />
                <a href='#!' className='btn btn-outline-secondary' onClick={this.toggleTrue}>Toggle isTrue</a>
            </>
        );
    }
}