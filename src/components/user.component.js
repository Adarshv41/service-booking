import axios from 'axios';
import React,{Component} from 'react';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
//import EditUser from './edituser.component';

export default class User extends Component{
    constructor(props){
        super(props);

        this.onChangename=this.onChangename.bind(this);
        this.onChangeVehiclemodel=this.onChangeVehiclemodel.bind(this);
        this.onChangeMobile=this.onChangeMobile.bind(this);
        this.onChangeServicetype=this.onChangeServicetype.bind(this);
        this.onChangeDate=this.onChangeDate.bind(this);
        this.onSubmit=this.onSubmit.bind(this);

        this.state={
            name:'',
            vehiclemodel:'',
            mobile:'',
            servicetype:'',
            date:new Date(),
            //user:[]
        }
    }

    // componentDidMount(){
    //     axios.get('http://localhost:5000/services/')
    //     .then(res=>{
    //         if(res.data.length>0){
    //             this.setState({
    //                 servicetype:res.data.map(service=>service.servicetype),
    //                 servicetypes:res.data[0].servicetype
    //             })
    //         }
    //     })
    // }

    onChangename(e){
        this.setState({
            name:e.target.value
        })
    }

    onChangeVehiclemodel(e){
        this.setState({
            vehiclemodel:e.target.value
        })
    }

    onChangeMobile(e){
        this.setState({
            mobile:e.target.value
        })
    }

    onChangeServicetype(e){
        this.setState({
            servicetype:e.target.value
        })
    }

    onChangeDate(date){
        this.setState({
            date:date
        })
    }

    onSubmit(e){
        e.preventDefault();

        const booking={
            name:this.state.name,
            vehiclemodel:this.state.vehiclemodel,
            mobile:this.state.mobile,
            servicetype:this.state.servicetype,
            date:this.state.date
        }
        console.log(booking);
        axios.post('http://localhost:5000/booking',booking)
        .then(res=>console.log(res.data));

        window.location="/user";
    }
    render(){
        return(
            <div>
                <h3>Book Your Services</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Name: </label>
                        <input type="text"
                        required
                        className="form-control"
                        value={this.state.name}
                        onChange={this.onChangename}/>
                            
                    </div>
                    <div className="form-group">
                        <label>Vehicle Model: </label>
                        <input type="text"
                        required
                        className="form-control"
                        value={this.state.vehiclemodel}
                        onChange={this.onChangeVehiclemodel}/>
                    </div>
                    <div className="form-group">
                        <label>Mobile</label>
                        <input type="tel"
                        required
                        className="form-control"
                        value={this.state.mobile}
                        onChange={this.onChangeMobile}/>
                    </div>
                    <div className="form-control">
                        <label>Service Type: </label>
                        <input type="text"
                        required
                        className="form-control"
                        value={this.state.servicetype}
                        onChange={this.onChangeServicetype}/>
                    </div>  
                  
                    <div className="form-group">
                        <label>Date: </label>
                        <div>
                            <DatePicker
                            selected={this.state.date}
                            onChange={this.onChangeDate}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <input type="Submit"
                        value="Book Now"
                        className="btn btn-primary"/>
                    </div>
                </form>
                {/* <EditUser/> */}
            </div>
        )
    }
}