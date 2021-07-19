import React,{Component} from 'react';
import axios from 'axios';

const User=props=>(
    <tr>
        <td>{props.user.name}</td>
        <td>{props.user.email}</td>
        <td>
        <a href="#" onClick={()=>{props.deleteUser(props.user._id)}}>delete</a>
        </td>
    </tr>
)


export default class EditUser extends Component{
    constructor(props){
        super(props);

        this.deleteUser=this.deleteUser.bind(this);
        this.state={users: []};
    }
    
    componentDidMount(){
        axios.get('http://localhost:5000/user/all')
        .then(res=>{
            this.setState({users:res.data})
        })
        .catch(err=>console.log(err))
    }

   
    

    userList(){
        return this.state.users.map(currentuser=>{
            return<User user={currentuser} deleteUser={this.deleteUser} key={currentuser._id}/>
        })
    }

    deleteUser(id){
        axios.delete('http://localhost:5000/'+id)
        .then(res=>{console.log(res.data)});
        this.setState({
            users:this.state.users.filter(el=>el._id !== id)
        })
    }
    render(){
        return(
            <div>
               <h3>User List</h3>
               <table className="table">
                   <thead className="thead-light">
                       <tr>
                           <th>Name</th>
                           <th>Email</th>
                           <th>Action</th>
                       </tr>
                   </thead>
                   <tbody>
                       {this.userList()}
                   </tbody>
               </table>
            </div>
        )
    }
}
