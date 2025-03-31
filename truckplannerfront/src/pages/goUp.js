import React, { useState } from "react";

function GoUp(){
    const [isVisible, setIsVisble] = useState(false);

    //methods to scroll the page to the top
    function scrollToTop(){
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    //method to handle scroll
    const handleScroll = () =>{
        const threshold = 200;
        if(window.scrollY > threshold){
            setIsVisble(true);
        } else{
            setIsVisble(false);
        }
    }

    //event listener for scroll 
    React.useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll)
        };
    }, []);

    return(
        <div 
            onClick={scrollToTop}
            style={{
                display: isVisible ? 'block' : 'none',
                position: 'fixed',
                bottom: '10px',
                right: '25px',
                zIndex: '99',
                cursor: 'pointer', 
                fontSize: '5rem',
                color: '#2a95e7'
            }}
        >
            <i className='bx bx-chevron-up-circle'></i>
        </div>
    )
}
export default GoUp