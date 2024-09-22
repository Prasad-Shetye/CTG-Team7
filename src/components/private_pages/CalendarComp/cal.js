import React, { useEffect } from 'react';

function Cal() {
    useEffect(() => {
        // Dynamically load the styled calendar wrapper script
        const script = document.createElement('script');
        script.src = "https://embed.styledcalendar.com/assets/parent-window.js";
        script.async = true;
        script.type = "module";
        document.body.appendChild(script);

        return () => {
            // Clean up script on component unmount
            document.body.removeChild(script);
        };
    }, []);

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
            <iframe 
                src="https://embed.styledcalendar.com/#RNkmzR9xP4AF9eUQloqH" 
                title="Styled Calendar" 
                className="styled-calendar-container" 
                style={{ width: "80%", height: "80vh", border: "none" }} 
                data-cy="calendar-embed-iframe">
            </iframe>
        </div>
    );
}

export default Cal;
