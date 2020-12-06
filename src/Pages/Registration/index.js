import React, {Component} from "react";
import { Container, TextField, Button, Box, spacing } from '@material-ui/core';
import firebase from '../../firebase';


class Registration extends Component {
    handleChange(e) {
        this.setState({
            [this.userName]: e.target.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        const speseUtente = firebase.database().ref('speseUtente');
        const userName = {
            userName: this.state.userName,
        }

        speseUtente.push(userName);
        this.setState({
            userName: '',
        })
        speseUtente.on('value', u => {
            console.log(u.val())
        })
    }
    constructor() {
        super();
        this.state = {
            userName: '',
            speseUtente: []
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const usersInList = firebase.database().ref('speseUtente');
        usersInList.on('value', (snapshot) => {
            let users = snapshot.val();
            let newState = [];
            for (let user in users) {
                newState.push({
                    id: user,
                    userName: users[user].userName
                });
            }
            this.setState({
                speseUtente: newState
            })
        })
    }
    

    render() {
        return (
        
            <Container className="registration" maxWidth="sm" align="center">
                <p>Come ti chiami?</p>
                <form noValidate autoComplete="off" onSubmit={this.handleSubmit} >
                    <Box my={4}>
                        <TextField id="outlined-basic" label="Name" variant="outlined" fullWidth color="secondary" onChange={this.handleChange}  />
                    </Box>
                    <Button variant="contained" type="submit" color="secondary">Submit</Button>
                </form>
            </Container>
        )
    }
}

export default Registration;