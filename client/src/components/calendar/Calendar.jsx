import React, { Component } from 'react'
import '../../css/calendar/calendar.css'
import '../../css/calendar/fullcalendar.css'
import '../../css/calendar/fullcalendar.print.css'
import '../../css/calendar/fullcalendar.min.css'
import FullCalendar from 'fullcalendar-reactwrapper';
import Games from './Games'
//import API from '../../utils/API'

class Calendar extends Component {

    state = {
        scheduledGames: []
    }

    componentDidMount() {
        this.getSchedule()
    }

    getSchedule = () => {
        console.log('Getting schedule...')
    }

    render() {
        return (
            <div id='calendar'>
              <FullCalendar
                id = "calendar"
                header = {{
                    left: 'prev,next today myCustomButton',
                    center: 'title',
                    right: 'month,basicWeek,basicDay'
                }}
                navLinks= {true} // can click day/week names to navigate views
                editable= {true}
                eventLimit= {true} // allow "more" link when too many events
              />
              <Games />
            </div>
        )
    }
}

export default Calendar

