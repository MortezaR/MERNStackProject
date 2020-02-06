import React from 'react';
import { Link } from 'react-router-dom'



class MapLink extends React.Component {
    constructor(props) {
        super(props);
        this.state = {months: {'01': 'January',
        '02': 'February',
        '03': 'March',
        '04': 'April',
        '05': 'May',
        '06': 'June',
        '07': 'July',
        '08': 'August',
        '09': 'September',
        '10': 'October',
        '11': 'November',
        '12': 'December'
            }
        }
    }

    render() {
        let numArr = this.props.map.date.split('-');
        let yr = numArr[0];
        let niceMonth = this.state.months[numArr[1]];
        let day = numArr[2].slice(0,2);
        let date = `${niceMonth} ${day}, ${yr}`
        return (
            <div className={this.props.className}>
                <Link className="alink" to={`/map/${this.props.map._id}`}>{this.props.map.title}</Link>
                <div>{date}</div>
                <div className="delete-button" onClick={this.props.deleteMap(this.props.map._id)}>Delete</div>
            </div>
        )
    }
}

export default MapLink;