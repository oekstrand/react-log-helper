import React from 'react';
import './css/styles.scss';


class EventDetails extends React.Component {
    render() {
        return (
            <div className="gp-fixed-right-pane">
                <span className="gp-h3">Event Details</span>
                <textarea type="text" id="event-details" readonly className="gp-event-details"></textarea>
            </div>
        );
    }
}

class ChildRow extends React.Component {
    render() {
        return (
            <tr>
                <td>Information</td>
                <td>2016-12-12</td>
                <td>Notifications</td>
                <td>Jobs deleted</td>
            </tr>
        );
    }
}

class ChildLogTable extends React.Component {
    render() {
        var childRows = [];
        childRows.push(<ChildRow key="23" />);
        return (
            <tr colSpan="4">
                <td>
                    <table>
                        <tbody>
                            {childRows}
                        </tbody>
                    </table>
                </td>

            </tr>
        );
    }
}

class LogGroupRow extends React.Component {
    render() {
        var logGroup = this.props.logGroup;
        return (
            <tr className="parent">
                <td>{logGroup.CorrelationId}</td>
                <td>
                    <span className="gp-fixed-width">{logGroup.Error}</span>
                    <i className='material-icons gp-red md-18'>error_outline</i>
                    <span className="gp-fixed-width">{logGroup.Information}</span>
                    <i className='material-icons gp-light-blue md-18'>info_outline</i>
                    <span className="gp-fixed-width">{logGroup.Warning}</span>
                    <i className='material-icons gp-orange md-18'>warning</i>
                </td>
                <td>{this.formatDate(logGroup.LastEntry)}</td>
            </tr>
        );
    }

    formatDate(value) {
        if (!value) {
            return null;
        }
        var regEx = /\/Date\(([0-9]*)\)\//;

        var match = value.match(regEx);
        if (match) {
            return (new Date(parseInt(match[1]))).toLocaleString();
        }
        return null;
    }
}

class LogTable extends React.Component {
    render() {
        var rows = [];

        this.props.logGroups.forEach(logGroup => {
            rows.push(<LogGroupRow logGroup={logGroup} key={logGroup.CorrelationId} />)
        });

        // var rows = [
        //     <LogGroupRow key="23" />,
        //     <ChildLogTable key="child-23" />
        // ];

        return (
            <table className="gp-table" cellSpacing="0" cellPadding="0">
                <thead>
                    <tr>
                        <th>CorrelationId</th>
                        <th>Summary</th>
                        <th>Last Entry</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        );
    }
}

class LogView extends React.Component {
    render() {
        return (
            <div className="gp-stretch-flex gp-table-wrapper">
                <LogTable logGroups={this.props.logGroups} />
            </div>
        );
    }
}

class SideBar extends React.Component {
    render() {
        return (
            <div className="gp-sidebar">
                <a id="nav-main-window" className="gp-nav">
                    <i className="material-icons">storage</i>
                </a>
                <a id="nav-settings-window" className="gp-nav">
                    <i className="material-icons">settings</i>
                </a>
            </div>
        );
    }
}

class MainWindow extends React.Component {
    render() {
        return (
            <div className="gp-main-window-container">
                <LogView logGroups={this.props.logGroups} />
                <EventDetails />
            </div>
        );
    }
}


class SettingsWindow extends React.Component {
    render() {
        return (
            <div>

            </div>
        );
    }
}



export default class App extends React.Component {
    render() {
        return (
            <div className="gp-content">
                <SideBar />
                <div className="gp-stretch-flex gp-main-window">
                    <MainWindow logGroups={LogGroups} />
                </div>
            </div>
        );
    }
}


const LogGroups = [
    {
        "CorrelationId": "ad03458f-13c6-4012-a3a2-9592cd80db9e",
        "Logs": [
            {
                "Message": "Ended checking pending jobs, checked jobs: correlationId='ad03458f-13c6-4012-a3a2-9592cd80db9e', jobCount='0'",
                "TimeCreated": "/Date(1518511207298)/",
                "Level": "Information", "LogName": "Jobs",
                "RecordId": 289825, "Task": "JobMonitoringCheckedPendingJobs"
            },
            {
                "Message": "Start checking pending jobs, counting pending jobs: correlationId='ad03458f-13c6-4012-a3a2-9592cd80db9e', jobCount='0'",
                "TimeCreated": "/Date(1518511207298)/", "Level": "Information", "LogName": "Jobs", "RecordId": 289824, "Task": "JobMonitoringCheckingPendingJobs"
            }
        ],
        "Error": 0,
        "Warning": 0,
        "Information": 2,
        "LastEntry": "/Date(1518511207298)/"
    },
    {
        "CorrelationId": "63f33339-e33d-490f-896b-d62bac241fe4",
        "Logs":
            [
                {
                    "Message": "Ended checking pending jobs, checked jobs: correlationId='63f33339-e33d-490f-896b-d62bac241fe4', jobCount='0'",
                    "TimeCreated": "/Date(1518511177322)/",
                    "Level": "Information",
                    "LogName": "Jobs",
                    "RecordId": 289823,
                    "Task": "JobMonitoringCheckedPendingJobs"
                },
                {
                    "Message": "Start checking pending jobs, counting pending jobs: correlationId='63f33339-e33d-490f-896b-d62bac241fe4', jobCount='0'",
                    "TimeCreated": "/Date(1518511177321)/",
                    "Level": "Information",
                    "LogName": "Jobs",
                    "RecordId": 289822,
                    "Task": "JobMonitoringCheckingPendingJobs"
                }],
        "Error": 0,
        "Warning": 0,
        "Information": 2,
        "LastEntry": "/Date(1518511207298)/"
    }];