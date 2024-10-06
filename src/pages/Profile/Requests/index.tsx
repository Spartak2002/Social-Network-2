import { useEffect, useState } from 'react'
import { IRequest } from '../../../helpers/types'
import { handleAccept, handleDecline, handleGetRequests } from '../../../helpers/api'
import { BASE, DEF } from '../../../helpers/default'
export const Requests = () => {
    const [requests, setRequests] = useState<IRequest[]>([])
    useEffect(() => {
        handleGetRequests()
            .then(response => {
                if (response.payload) {
                    console.log(response.payload);
                    setRequests(response.payload as IRequest[]);
                }
            });
    }, []);
    const handleAcceptRequest = (id: number | undefined) => {
        handleAccept(id as number)
            .then(() => {
                setRequests([...requests.filter(request => request.id != id)])
            })
    }
    const handleDeclineRequest = (id: number | undefined) => {
        handleDecline(id as number)
            .then(() => {
                setRequests([...requests.filter(request => request.id != id)])
            })
    }
    return <>
        {requests.map(request =>
            <div key={request.id}>
                <div>
                    <img
                        src={request.user.picture ? BASE + request.user.picture : DEF}
                        style={{ width: 100, height: 100 }}
                    />
                    <h3>{request.user.name} {request.user.surname}</h3>
                </div>
                <div>
                    <button onClick={() => handleAcceptRequest(request.id)}>Accept</button>
                    <button onClick={() => handleDeclineRequest(request.id)} >Decline</button>
                </div>
            </div>
        )}
    </>
}