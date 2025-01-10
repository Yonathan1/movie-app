import React, { Component, Fragment } from 'react';
import './AppClass.css';
import Input from './Input';

export default class AppClass extends Component {
    constructor(props) {
        super(props);

        this.firstnameRef = React.createRef();
        this.lastnameRef = React.createRef(null);
        this.dobRef = React.createRef(null);

        this.state = {
            isTrue: false,
            crowd: [],
        };
    }

    setFirstname(newFirstname) {
        this.setState({firstname: newFirstname});
    }

    handleSubmit = (event) => {
        event.preventDefault();

        if (this.state.firstname !== "") {
            this.addPerson(this.state.firstname, this.state.lastname, this.state.dob);
        }
    }

    addPerson(newFirstname, newLastname, newDob) {
        let newPerson = {
            id: this.state.crowd.length + 1,
            firstname: newFirstname,
            lastname: newLastname,
            dob: newDob,
        }

        const newList = this.state.crowd.concat(newPerson);

        const sorted = newList.sort((a, b) => {
            if (a.lastname < b.lastname) {
                return -1;
            } else if (a.lastname > b.lastname) {
                return 1;
            }
            return 0;
        })

        this.setState({crowd: sorted, firstname: "", lastname: "", dob: ""});

        this.firstnameRef.current.value = "";
        this.lastnameRef.current.value = "";
        this.dobRef.current.value = "";
    }

    componentDidMount() {
        this.setState({
            firstname: "",
            lastname: "",
            dob: "",
            crowd: [
                {
                    id:1,
                    firstname: "Mary",
                    lastname: "Jones",
                    dob: "1997-05-02",
                },
                {
                    id:2,
                    firstname: "Jack",
                    lastname: "Smith",
                    dob: "1999-07-05",
                }
            ]
        })
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

                <hr />

                <form autoComplete='off' onSubmit={this.handleSubmit}>
                    <div className='mb-3'>
                        <label className='form-label' htmlFor='first-name'>First Name</label>
                        <input
                            type='text'
                            name='first-name'
                            id='first-name'
                            autoComplete='first-name-new'
                            ref={this.firstnameRef}
                            className='form-control'
                            onChange={(event) => this.setFirstname(event.target.value)}
                        ></input>
                    </div>

                    <Input
                        title='Last Name'
                        name='last-name'
                        type='text'
                        ref={this.lastnameRef}
                        autoComplete='last-name-new'
                        className='form-control'
                        onChange={(event) => this.setState({lastname: event.target.value})}
                    ></Input>

                    <Input
                        title='DOB'
                        name='dob'
                        autoComplete='dob-new'
                        type='date'
                        ref={this.dobRef}
                        className='form-control'
                        onChange={(event) => this.setState({dob: event.target.value})}
                    />

                    <input type='submit' value='Submit' className='btn btn-primary' />
                </form>

                <div>
                    Firstname: {this.state.firstname} <br />
                    Lastname: {this.state.lastname} <br />
                    Dob: {this.state.dob} <br />
                </div>
 
                <h3>People</h3>
                <ul className='list-group'>
                    {this.state.crowd.map((m) => (
                        <li key={m.id} className='list-group-item'>{m.firstname} {m.lastname}</li>
                    ))}
                </ul>
            </>
        );
    }
}