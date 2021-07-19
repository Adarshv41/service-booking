import axios from 'axios';
import React,{Component} from 'react';


export default class Signup extends Component{
    constructor(props){
        super(props);

        this.onChangeName=this.onChangeName.bind(this);
        this.onChangeEmail=this.onChangeEmail.bind(this);
        this.onChangePassword=this.onChangePassword.bind(this);
        //this.onChangePasswordverify=this.onChangePasswordverify.bind(this);
        this.onSubmit=this.onSubmit.bind(this);

        this.state={
            name:'',
            email:'',
            password:''
            //passwordVerify:''
        }
    }

    onChangeName(e){
        this.setState({
            name:e.target.value
        })
    }

    onChangeEmail(e){
        this.setState({
            email:e.target.value
        })
    }

    onChangePassword(e){
        this.setState({
            password:e.target.value
        })
    }

    // onChangePasswordverify(e){
    //     this.setState({
    //         passwordVerify:e.target.value
    //     })
    // }

    onSubmit(e){
        e.preventDefault();

        const signup={
            name:this.state.name,
            email:this.state.email,
            password:this.state.password
            //passwordVerify:this.state.passwordVerify
        }

        console.log(signup);
        axios.post('http://localhost:5000/user/',signup)
        .then(res=>console.log(res.data));
        window.location='/signup';
    }

    
    render(){
        return(
            <div>
                <h3>Create an account</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Name: </label>
                        <input type="text"
                        required
                        className="form-control"
                        value={this.state.name}
                        onChange={this.onChangeName}/>
                    </div>
                    <div className="form-group">
                        <label>Email: </label>
                        <input type="email"
                        required
                        className="form-control"
                        value={this.state.email}
                        onChange={this.onChangeEmail}/>
                    </div>
                    <div className="form-group">
                        <label>Password: </label>
                        <input type="password"
                        required
                        className="form-control"
                        value={this.state.password}
                        onChange={this.onChangePassword}/>
                    </div>
                    {/* <div className="form-group">
                        <label>Verify Password: </label>
                        <input type="password"
                        required
                        className="form-control"
                        value={this.state.passwordVerify}
                        onchange={this.onChangePasswordverify}/>
                    </div> */}
                    <div className="form-group">
                        <input type="Submit"
                        value="Create New User"
                        className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}