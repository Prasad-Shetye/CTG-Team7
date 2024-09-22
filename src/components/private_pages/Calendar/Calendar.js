function CalendarComponent() {

    return <>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
                <iframe 
                    src="https://embed.styledcalendar.com/#N9R2Q4n8EZIqwlnSenB4" 
                    title="Styled Calendar" 
                    className="styled-calendar-container" 
                    style={{ margin: '20px', width: "90%", height: "100vh", border: "none" }} 
                    data-cy="calendar-embed-iframe">
                </iframe>
                <script async type="module" src="https://embed.styledcalendar.com/assets/parent-window.js"></script>
            </div>
        );

    </>
}

export default CalendarComponent;