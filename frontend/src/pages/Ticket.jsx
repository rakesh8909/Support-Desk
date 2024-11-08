import {useEffect} from "react";
import {useSelector,useDispatch} from "react-redux";

import {getTicket,reset,closeTicket} from "../features/tickets/ticketSlice";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import {useNavigate, useParams} from "react-router-dom";
import {toast} from "react-toastify";


function Ticket(){
    const {ticket,isLoading,isSuccess,isError,message} = useSelector(state=>state.tickets)

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { ticketId } = useParams();
    //console.log(ticketId);
    useEffect(()=>{
        if(isError){
            toast.error(message)
        }
        dispatch(getTicket(ticketId))
        //eslint-disable-next-line
    },[isError,message,ticketId])

    const onTicketClose = (e)=>{
        dispatch(closeTicket(ticketId))
        toast.success('ticket closed successfully')
        navigate('/tickets')
    }

    if(isLoading){
        return <Spinner/>
    }

    if(isError){
        return (
            <h3>Something went wrong</h3>
        )
    }


    return (
        <>
        <div className="ticket-page">
            <header className="ticket-header">
                <BackButton url="/tickets"/>
                <h2>
                    Ticket Id: {ticket._id}
                    <span className={`status status-${ticket.status}`}>{ticket.status}</span>
                </h2>
                <h3>Date Submitted: {new Date(ticket.createdAt).toLocaleDateString('en-US')}</h3>
                <h3>Product : {ticket.product}</h3>
                <hr/>
                <div className="ticket-desc">
                    <h3>Description of Issue</h3>
                    <p>{ticket.description}</p>
                </div>
            </header>
            {ticket.status !== 'closed' && (<button onClick={onTicketClose} className="btn btn-block btn-danger">Close Ticket</button>)}
        </div>
        </>
    )
}
export  default Ticket;