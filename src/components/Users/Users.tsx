import {UsersPropsType} from "./UsersContainer";


export const Users = (props: UsersPropsType) => {
    if (props.users.length === 0) {
        props.setUsers([
            {
                id: 1,
                photoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9aUT1ZCEcuME13723bYJ9xnzn-XQ5zWGcUCnsLdjo2m4MEgOHl5BP1uXbklcmIZfpTx0&usqp=CAU',
                followed: true,
                fullName: 'Max',
                status: 'I am a student',
                location: {city: 'Kostroma', country: 'Russia'}
            },
            {
                id: 2,
                photoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeQW7jGROV6Xf1_fDam4b7IYTZliTN6X8Rzw&usqp=CAU',
                followed: true,
                fullName: 'Bogdan',
                status: 'I am a Boss for Maxim',
                location: {city: 'Vinnitsa', country: 'Ukraine'}
            },
            {
                id: 3,
                photoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeQW7jGROV6Xf1_fDam4b7IYTZliTN6X8Rzw&usqp=CAU',
                followed: false,
                fullName: 'Dimich',
                status: 'I am a teacher for Bogdan and Max',
                location: {city: 'Minsk', country: 'Belarus'}
            },

        ])
    }

    return <div>
        {props.users.map(u => <div key={u.id}>
            <span>
                <div>
                    <img src={u.photoUrl}/>
                </div>
                <div>
                    {
                        u.followed
                            ? <button onClick={() => props.unfollow(u.id)}>Unfollow</button>
                            : <button onClick={() => props.follow(u.id)}>Follow</button>
                    }

                </div>
            </span>
            <span>
                <span>
                    <div>{u.fullName}</div>
                    <div>{u.status}</div>
                </span>
                <span>
                    <div>{u.location.country}</div>
                    <div>{u.location.city}</div>
                </span>
            </span>
        </div>)}

    </div>

}