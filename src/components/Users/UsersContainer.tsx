import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {
    followAC,
    getUsersTC,
    setCurrentPageAC,
    toggleIsFollowingProgressAC,
    unfollowAC,
    UserType
} from "../../redux/users-reducer";
import React from "react";
import {Users} from "./Users";
import {Preloader} from "../../common/preloader/Preloader";

type UsersPropsType = {
    users: UserType[]
    pageSize: number
    followAC: (id: number) => void
    unfollowAC: (id: number) => void
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
                        followAC={this.props.followAC}
                        unfollowAC={this.props.unfollowAC}
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
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress
    }
}


export const UsersContainer = connect(mapStateToProps, {
    followAC: followAC,
    unfollowAC: unfollowAC,
    setCurrentPage: setCurrentPageAC,
    toggleIsFollowingProgress: toggleIsFollowingProgressAC,
    getUsers: getUsersTC,

})(UsersAPIContainer)