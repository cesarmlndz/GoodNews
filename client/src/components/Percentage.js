import React, { useEffect , useState} from 'react';
import axios from 'axios';

export default function Percentage(props) {
    const [percentage, setPercentage] = useState(0);

    useEffect(() => {
        axios.post("http://localhost:5001/getJobStatusNum", {
            listings: props.listings
       }).then((res) => {
            setPercentage(Math.trunc((res.data.numberOfPending / props.listings.length) * 100));
       }).catch((err) => console.log(err))
    }, [props.listings.length]);

    return (
        <div className='percentage-card-container'>
            {props.listings.length > 0 ? <h1>{`${percentage}`}%</h1> : <h1>0%</h1>}
            <p>of your job applications have a job status value of pending.</p>
        </div>
    )
}