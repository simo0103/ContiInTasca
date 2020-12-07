import React, {Component} from "react";
import { Container, TextField, Button, Box, Typography } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import firebase from '../../firebase';


class Registration extends Component {
    handleChange(e) {
        this.setState({
        [e.target.name]: e.target.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        const listaUtenti = firebase.database().ref('listaUtenti');
        const users = {
            users: this.state.users,
        }

        listaUtenti.push(users);
       
        listaUtenti.on('value', u => {
            console.log(u.val())
        })
        this.setState({
            open: true
        })
        setTimeout(()=>{ this.setState({
            open: false,            
            users: ''
        });
            this.props.changePage('page')
        }, 4000)
        
    }
    constructor() {
        super();
        this.state = {
            users: '',
            open: false
        }
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const usersInList = firebase.database().ref('listaUtenti');
        usersInList.on('value', (snapshot) => {
            let users = snapshot.val();
            let newState = [];
            for (let user in users) {
                newState.push({
                    id: user,
                    users: users[user].users
                });
            }
        })
    }
  
    render() {
        return (
            <Container maxWidth="sm" align="center" className="Registration">
                <Box my={8}>
                    <Typography variant="h2" color="secondary">
                        BENVENUTO!
                    </Typography>
                </Box>
                <Box my={8}>
                    <Typography variant="h3">
                       Come ti chiami?
                    </Typography>
                </Box>
                <section className="addusers">
                    <form autoComplete="off" onSubmit={(e)=> this.handleSubmit(e)}>
                        <Box my={4}>
                            <TextField type="text" name="users" id="outlined-basic" variant="outlined" fullWidth color="secondary" onChange={this.handleChange} value={this.state.users}  />
                        </Box>
                        <Button type="submit" size="large" fullWidth color="secondary" disabled={!this.state.users} variant="contained">Conferma</Button>
                    </form>
                 
                </section>
                <Box my={8}>
                {
                    this.state.open &&
                    <Alert severity="success">
                        <AlertTitle>Ciao {this.state.users}! </AlertTitle>
                    </Alert>
                } 
                </Box>
            </Container>
        )
    }
}
export default Registration;