import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {
    followAC,
    setCurrentPageAC,
    setUsersAC,
    setUsersTotalCountAC,
    toggleIsFetchingAC,
    toggleIsFollowingProgressAC,
    unfollowAC,
    UserType
} from "../../redux/users-reducer";
import React from "react";
import {Users} from "./Users";
import {Preloader} from "../../preloader/Preloader";
import {usersAPI} from "../../api/api";

type UsersPropsType = {
    users: UserType[]
    pageSize: number
    setUsers: (Users: UserType[]) => void
    follow: (id: number) => void
    unfollow: (id: number) => void
    totalUsersCount: number
    currentPage: number
    setCurrentPage: (el: number) => void
    setTotalCount: (totalCount: number) => void
    isFetching: boolean
    followingInProgress: number[]
    toggleIsFetching: (isFetching: boolean) => void
    toggleIsFollowingProgress: (isFetching: boolean, userId: number) => void
}

export class UsersAPIContainer extends React.Component<UsersPropsType> {


    componentDidMount() {

        this.props.toggleIsFetching(true)
        usersAPI.getUsers(this.props.currentPage, this.props.pageSize).then(data => {
            this.props.toggleIsFetching(false)
            this.props.setUsers(data.items)
            this.props.setTotalCount(data.totalCount)
        })
    }

    onPageChanged = (pageNumber: number) => {
        this.props.setCurrentPage(pageNumber)
        usersAPI.getUsers(pageNumber, this.props.pageSize).then(data => {
            this.props.setUsers(data.items)
        })
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
                        follow={this.props.follow}
                        unfollow={this.props.unfollow}
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
    follow: followAC,
    unfollow: unfollowAC,
    setUsers: setUsersAC,
    setCurrentPage: setCurrentPageAC,
    setTotalCount: setUsersTotalCountAC,
    toggleIsFetching: toggleIsFetchingAC,
    toggleIsFollowingProgress: toggleIsFollowingProgressAC,

})(UsersAPIContainer)