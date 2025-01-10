import React, { Fragment, useEffect, useState } from 'react';
import './App.css'
import Input from './Input';

function HelloWorld(props) {
    const [isTrue, setIsTrue] = useState(true);
    const [crowd, setCrowd] = useState([]);
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [dob, setDob] = useState("");

    const toggleTrue = () => {
        if (isTrue) {
            setIsTrue(false);
            return;
        }
        setIsTrue(true);
    }

    useEffect(() => {
        console.log("use effect");
        let people = [
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
        setCrowd(people);
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(firstname, lastname, dob)

        if (lastname !== "") {
            addPerson(firstname, lastname, dob);
        }
    }

    const addPerson = (newFirstname, newLastname, newDOB) => {
        let newPerson = {
            id: crowd.length + 1,
            firstname: newFirstname,
            lastname: newLastname,
            dob: newDOB,
        }

        const newList = crowd.concat(newPerson);

        const sorted = newList.sort((a, b) => {
            if (a.lastname < b.lastname) {
                return -1;
            } else if (a.lastname > b.lastname) {
                return 1;
            }
            return 0;
        })

        setCrowd(sorted);
        setFirstname("");
        setLastname("");
        setDob("");
    }

    return (
        <Fragment>
            <h1 className='h1-green'>{props.msg}</h1>
            { isTrue &&
                <Fragment>
                    <hr />
                    <p>The current value of isTrue is True</p>
                </Fragment>
            }
            <hr />
            {isTrue
                ? <p>is True</p>
                : <p>is False</p>
            }
            <hr />
            <a href='#!' className='btn btn-outline-secondary' onClick={toggleTrue}>Toggle isTrue</a>
            <hr />

            <form autoComplete='off' onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <label className='form-label' htmlFor='first-name'>First Name</label>
                    <input
                        type='text'
                        name='first-name'
                        id='first-name'
                        autoComplete='first-name-new'
                        className='form-control'
                        onChange={(event) => setFirstname(event.target.value)}
                    ></input>
                </div>

                <Input
                    title='Last Name'
                    name='last-name'
                    type='text'
                    autoComplete='last-name-new'
                    className='form-control'
                    onChange={(event) => setLastname(event.target.value)}
                ></Input>

                <Input
                    title='DOB'
                    name='dob'
                    autoComplete='dob-new'
                    type='date'
                    className='form-control'
                    onChange={(event) => setDob(event.target.value)}
                />

                <input type='submit' value='Submit' className='btn btn-primary' />
            </form>

            <div>
                Firstname: {firstname} <br />
                Lastname: {lastname} <br />
                Dob: {dob} <br />
            </div>

            <h3>People</h3>
            <ul className='list-group'>
                {crowd.map((m) => (
                    <li key={m.id} className='list-group-item'>{m.firstname} {m.lastname}</li>
                ))}
            </ul>
        </Fragment>
    )
}

export default HelloWorld;