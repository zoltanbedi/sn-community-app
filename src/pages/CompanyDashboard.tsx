import * as React from 'react'
import { connect } from 'react-redux'
import { SNCommunityAppReducers } from '../Reducers'
import { ByReputationChange } from '../components/Lists/ByReputationChange'
import { ByPullRequests } from '../components/Lists/ByPullRequests'
// import { BySNAnswers } from '../components/Lists/BySNAnswers'
import Summary from '../components/Summary'
import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';
// import { AllTime } from '../components/Lists/AllTime'
import * as moment from 'moment'

const styles = theme => ({
    root: {
        flexGrow: 1,
        marginTop: 30,
        width: '1000px',
        margin: '0 auto'
    },
    container: {
        marginTop: 40
    }
});

interface CompanyDashboardProps {
    users: any[],
    toplistByReputationChange: any[],
    toplistByPullRequests: any[],
    toplistBySNAnswers: any[],
    classes: any,
    prcount: number
}

class CompanyDashboard extends React.Component<CompanyDashboardProps, {}> {
    allRepChange() {
        let count = 0
        if (this.props.users.length > 0) {
            this.props.users.map(user => {
                count += user.reputation_change_quarter
            })
        }
        return count
    }
    allRepChangePerYear() {
        let count = 0
        if (this.props.users.length > 0) {
            this.props.users.map(user => {
                count += user.reputation_change_year
            })
        }
        return count
    }
    render() {
        const { toplistByReputationChange, toplistByPullRequests, classes, prcount } = this.props
        const quarter = moment().quarter()
        return (
            <div className={classes.root}>
                {
                    // sensenet tag válaszok
                    // legtöbb sn tag válasz
                }
                <Summary allReputation={this.allRepChange()} classes={classes} allPrs={prcount} allReputationPerYear={this.allRepChangePerYear()} />
                <Grid container={true} spacing={40} className={classes.container}>
                    <Grid item={true} xs={12} sm={6}>
                        <h2>Q{quarter} reputation</h2>
                        <ByReputationChange users={toplistByReputationChange} />
                    </Grid>
                    <Grid item={true} xs={12} sm={6}>
                        <h2>Q{quarter} pull requests</h2>
                        <ByPullRequests users={toplistByPullRequests} />
                    </Grid>
                    {/* <Grid item={true} xs={12} sm={4}>
                        <h2>All-time top 10 answerers in sensenet tag</h2>
                        <BySNAnswers users={toplistBySNAnswers} />
                    </Grid> */}
                </Grid>
            </div>
        )
    }
}

const mapStateToProps = (state, match) => {
    return {
        toplistByReputationChange: SNCommunityAppReducers.getUsersOrderedByReputationChanges(state.SNCommunityApp.stackoverflow),
        toplistByPullRequests: SNCommunityAppReducers.getUsersOrderedByNumberOfPullRequests(state.SNCommunityApp.github),
        toplistBySNAnswers: SNCommunityAppReducers.getUsersOrderedBySNAnswers(state.SNCommunityApp.stackoverflow),
        users: SNCommunityAppReducers.getUsersByReputation(state.SNCommunityApp.stackoverflow),
        prcount: SNCommunityAppReducers.getAllPrCount(state.SNCommunityApp.github),
    }
}

export default withStyles(styles)(connect(mapStateToProps, {})(CompanyDashboard))