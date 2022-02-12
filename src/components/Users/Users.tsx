import usersIcons from './../../assets/images/users.png'
import React from "react";
import axios from "axios";
import {setCurrentPageAC, UserType} from "../../redux/users-reducer";
import s from './users.module.css'


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
}

export class Users extends React.Component<UsersPropsType> {


    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`).then(response => {
            this.props.setUsers(response.data.items)
            this.props.setTotalCount(response.data.totalCount)
        })
    }

    onPageChanged = (pageNumber: number) => {
        this.props.setCurrentPage(pageNumber)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`).then(response => {
            this.props.setUsers(response.data.items)
        })
    }


    render() {
        let pagesCount = Math.ceil(this.props.totalUsersCount / this.props.pageSize)
        let pages = []
        for (let i = 1; i <= pagesCount; i++) {
            pages.push(i)
        }
        console.log(pagesCount)
        return (
            <div>

                <div>
                    {pages.map(el => {
                        return <span
                            style={{cursor: 'pointer'}}
                            onClick={() => this.onPageChanged(el)}
                            className={this.props.currentPage === el ? s.active : ''}>{el}</span>
                    })
                    }
                </div>


                {this.props.users.map(u => <div key={u.id}>
                    <span>
                    <div>
                    <img style={{width: '70px', objectFit: 'cover'}}
                         src={u.photos.small !== null ? u.photos.small : usersIcons}/>
                    </div>
                    <div>
                {
                    u.followed
                        ? <button onClick={() => this.props.unfollow(u.id)}>Unfollow</button>
                        : <button onClick={() => this.props.follow(u.id)}>Follow</button>
                }

                    </div>
                    </span>
                    <span>
                    <span>
                    <div>{u.name}</div>
                    <div>{u.status}</div>
                    </span>
                    <span>
                    <div>{"u.location.country"}</div>
                    <div>{"u.location.city"}</div>
                    </span>
                    </span>
                </div>)}

            </div>
        )
    }
}