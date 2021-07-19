import React,{Component} from 'react';
import axios from 'axios';
//import { Link } from 'react-router-dom';
import EditUser from './edituser.component';

const Booking=props=>(
    <tr>
        <td>{props.booking.name}</td>
        <td>{props.booking.vehiclemodel}</td>
        <td>{props.booking.mobile}</td>
        <td>{props.booking.servicetype}</td>
        <td>{props.booking.date.substring(0,10)}</td>
        <td>
           <a href="#" onClick={()=>{props.deleteBooking(props.booking._id)}}>delete</a>
        </td>
    </tr>
)



export default class Admin extends Component{
    constructor(props){
        super(props);

        this.deleteBooking=this.deleteBooking.bind(this)
        this.state={bookings: []};
    }
    componentDidMount(){
        axios.get('http://localhost:5000/booking/')
        .then(res=>{
            this.setState({bookings:res.data});
        })
        .catch(err=>{console.log(err)});
    }

    
    
    deleteBooking(id){
        axios.delete('http://localhost:5000/booking/'+id)
        .then(res=>{console.log(res.data)});
        this.setState({
            bookings:this.state.bookings.filter(el=>el._id !== id)
        })
    }
    bookingList(){
        return this.state.bookings.map(currentbooking =>{
            return<Booking booking={currentbooking} deleteBooking={this.deleteBooking} key={currentbooking._id}/>
        })
    }

  

   
    render(){
        return(
            <div>
                <h3>Booking Log</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Name</th>
                            <th>Vehicle Model</th>
                            <th>Mobile</th>
                            <th>Service Type</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.bookingList()}
                    </tbody>
                </table>
                
                <EditUser/>
               
            </div>
            
        )
    }
}