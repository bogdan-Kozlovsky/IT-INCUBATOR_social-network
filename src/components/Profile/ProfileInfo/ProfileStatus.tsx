import React, {ChangeEvent} from "react";

type PropsType = {
    status: string
    updateStatusTC: (status: string) => void
}

export class ProfileStatus extends React.Component<PropsType> {
    state = {
        editMode: false,
        status: this.props.status,
    }
    activeEditMode = () => {
        this.setState({
            editMode: true
        })
    }
    deactivateEditMode = () => {
        this.setState({
            editMode: false
        })
        this.props.updateStatusTC(this.state.status)

    }
    onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            status: e.currentTarget.value
        })
    }

    componentDidUpdate(prevProps: Readonly<PropsType>, prevState: Readonly<{}>, snapshot?: any) {
        if (prevProps.status !== this.props.status) {
            this.setState({
                status: this.props.status
            })
        }
    }


    render() {
        return (
            <div>
                {this.state.editMode
                    ? <input
                        onChange={this.onStatusChange}
                        onBlur={this.deactivateEditMode}
                        autoFocus type="text"
                        placeholder={'description'}
                        value={this.state.status}
                    />
                    : <span onDoubleClick={this.activeEditMode}>{this.props.status || '-----'}</span>
                }
            </div>
        )
    }
}