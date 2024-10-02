// import { useNavigate } from 'react-router-dom'
// import { useEffect, useState } from "react"
// import { IRequest } from '../../../helpers/types'
// import { handleAccept, handleDecline, handleGetAccount } from '../../../helpers/api'

// export const Requests = ({ user }: { user: IRequest | null }) => {
//     const [requests, setRequests] = useState<IRequest[]>([])
//     const navigate = useNavigate()

//     useEffect(() => {
//         if (user && user.id) {
//             handleGetAccount(user.id)
//                 .then((response) => {
//                     if (!response.payload) {
//                         navigate('/profile')
//                     } else {
//                         setRequests(response.payload as IRequest[])
//                     }
//                 })
//         }
//     }, [user, navigate])

//     const handleAcceptRequest = (id: number) => {
//         handleAccept(id).then(() => {
//             setRequests((prev) => prev.filter((req) => req.id == id))
//         })
//     }

//     const handleDeclineRequest = (id: number) => {
//         handleDecline(id).then(() => {
//             setRequests((prev) => prev.filter((req) => req.id != id))
//         })
//     }

//     return (
//         <div>
//             <h1>Requests</h1>
//             {requests.length > 0 ? (
//                 <div>
//                     {requests.map((request) => (
//                         <div 
//                         key={request.id}>
//                             <span>{request.sender} has sent you a request.</span>
//                             <button onClick={() => handleAcceptRequest(request.id)}>Accept</button>
//                             <button onClick={() => handleDeclineRequest(request.id)}>Decline</button>
//                         </div>
//                     ))}
//                 </div>
//             ) : (
//                 <p>{user ? 'No requests' : 'Login to see requests'}</p>
//             )}
//         </div>

//     )
// }


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
                    setRequests(response.payload as IRequest[]);
                }
            });
    }, []);
    const handleAcceptRequest = (id: number | undefined) => {
        handleAccept(id as number)
            .then(response => {
                setRequests([...requests.filter(request => request.id != id)])
            })
    }
    const handleDeclineRequest = (id: number | undefined) => {
        handleDecline(id as number)
            .then(response => {
                setRequests([...requests.filter(request => request.id != id)])
            })
    }
    return <>
        {requests.map(request =>
            <div key={request.id}>
                <div>
                    <img
                        src={request.picture ? BASE + request.picture : DEF}
                        style={{ width: 100, height: 100 }}
                        />
                        <p>{request.name} {request.surname}</p>
                </div>
                <div>
                    <button onClick={() => handleAcceptRequest(request.id)}>Accept</button>
                    <button onClick={() => handleDeclineRequest(request.id)} >Decline</button>
                </div>
            </div>
        )}
    </>
}