import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {
    followTC,
    getUsersTC,
    setCurrentPageAC,
    toggleIsFollowingProgressAC, unfollowTC,
    UserType
} from "../../redux/users-reducer";
import React from "react";
import {Users} from "./Users";
import {Preloader} from "../../common/preloader/Preloader";
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount,
    getUsers
} from "../../redux/users-selector";

type UsersPropsType = {
    users: UserType[]
    pageSize: number
    followTC: (id: number) => void
    unfollowTC: (id: number) => void
    totalUsersCount: number
    currentPage: number
    setCurrentPage: (el: number) => void
    isFetching: boolean
    followingInProgress: number[]
    toggleIsFollowingProgress: (isFetching: boolean, userId: number) => void
    getUsers: (currentPage: number, pageSize: number) => void
}

export class UsersAPIContainer extends React.Component<UsersPropsType> {


    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize)
    }

    onPageChanged = (pageNumber: number) => {
        this.props.getUsers(pageNumber, this.props.pageSize)
    }


    render() {

        return (
            <div>
                {this.props.isFetching ? <Preloader/> :
                    <Users
                        onPageChanged={this.onPageChanged}
                        users={this.props.users}
                        totalUsersCount={this.props.totalUsersCount}
                        pageSize={this.props.pageSize}
                        currentPage={this.props.currentPage}
                        followTC={this.props.followTC}
                        unfollowTC={this.props.unfollowTC}
                        toggleIsFollowingProgress={this.props.toggleIsFollowingProgress}
                        followingInProgress={this.props.followingInProgress}
                    />
                }
            </div>

        )
    }
}

export const mapStateToProps = (state: AppStateType) => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
    }
}


export const UsersContainer = connect(mapStateToProps, {
    followTC: followTC,
    unfollowTC: unfollowTC,
    setCurrentPage: setCurrentPageAC,
    toggleIsFollowingProgress: toggleIsFollowingProgressAC,
    getUsers: getUsersTC,

})(UsersAPIContainer)