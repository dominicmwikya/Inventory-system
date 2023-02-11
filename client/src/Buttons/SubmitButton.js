import React, {useState} from 'react';
function SubmitButton({className, type, value}) {
    const [isSubmitted, setIsSubmitted ]=useState(false);
    function submitHandler(){
        setIsSubmitted(true);
    }
    return ( 
        <>
        <button onClick={submitHandler}  type={type} value={value} className={className}>
            {isSubmitted ? 'Submitting...':value}
        </button>
        </>
     );
}

export default SubmitButton;