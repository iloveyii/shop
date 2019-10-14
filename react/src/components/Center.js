import React from 'react';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {itemAddAction, itemUpdateAction} from "../actions/ItemAction";
import ListItems from './ListItems';

class Center extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: null,
            username: '',
            password: '',
            admin: 0,
            showAdminList: false,
        };

        this.adminList = [
            {
                value: '1',
                label: 'Yes'
            },
            {
                value: '0',
                label: 'No'
            },
        ];

        this.showAdminList = this.showAdminList.bind(this);
        this.handleCenterClick = this.handleCenterClick.bind(this);
        this.makeAdmin = this.makeAdmin.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    showAdminList(e) {
        e.stopPropagation();
        this.setState({showAdminList: !this.state.showAdminList});
    }

    handleCenterClick() {
        this.setState({showAdminList: false});
    }

    makeAdmin(item) {
        this.setState({admin: item});
    }

    handleChange(e) {
        this.setState({[e.target.id]: e.target.value});
    }

    componentWillReceiveProps(nextProps, nextContext) {
        console.log('componentWillReceiveProps', nextProps);

        if(nextProps.edit && nextProps.edit.item) {
            const {id, username, password, admin} = nextProps.edit.item;
            this.setState({id: id ? id : null, username, password, admin});
        }

        if(nextProps.add && nextProps.add.status === true) {
            this.setState({id: null, username: '', password: '', admin: 0 });
        }
    }

    handleFormSubmit(e) {
        e.preventDefault();
        const {id, username, password, admin} = this.state;
        const {itemAddAction, itemUpdateAction} = this.props;

        const item = {
            id: id,
            username: username,
            password: password,
            admin : admin
        };

        console.log('Form data: ', id, username, password, admin);

        if(id === null) {
            itemAddAction(item);
        } else {
            itemUpdateAction(item);
            this.setState({id: null, username: '', password: '', admin: 0});
        }
    }

    render() {
        return (
            <div className="dashboard--center" onClick={this.handleCenterClick}>
                <h1 className="h1">Users</h1>

                <form action="">

                    <div className="row">
                        <div className="col-1-of-2">
                            <input type="text" id="username" placeholder="Type username" value={this.state.username}
                                   onChange={e => this.handleChange(e)}/>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-1-of-3">
                            <input type="text" id="password" placeholder="Type password" value={this.state.password}
                                   onChange={e => this.handleChange(e)}/>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-1-of-2">
                            <div className="dd-wrapper">
                                <div className="dd-header dd-header-open" id="select-city"
                                     onClick={(e) => this.showAdminList(e)}>
                                    <div className="dd-header-title"
                                         id="dd-header-title"> {this.state.admin == 1 ? 'Yes' : 'No'} </div>
                                    <div className="dd-icon"><i className="fas fa-angle-down"></i></div>
                                </div>
                                <ul className="dd-list" id="dd-list"
                                    style={{display: this.state.showAdminList ? 'block' : 'none'}}>
                                    {
                                        this.adminList.map(item => <li
                                            key={item.username}
                                            onClick={() => this.makeAdmin(item.value)} id={item.value}
                                            className="dd-list-item">{item.label}</li>)
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-1-of-3">
                            <div className="dashboard--container">

                                <button style={{width: '80px'}} type="submit" onClick={e => this.handleFormSubmit(e)}><i
                                    className="fas fa-save"></i> Save
                                </button>

                            </div>
                        </div>
                    </div>

                </form>

                <ListItems />

            </div>

        )
    }
}


/**
 * Get data from store
 * @param state
 */
const mapStateToProps = state => ({
    posts: state.posts,
    edit: state.item.edit,
    add: state.item.add,
});

/**
 * Import action from dir action above - but must be passed to connect method in order to trigger reducer in store
 * @type {{UserUpdate: UserUpdateAction}}
 */
const mapActionsToProps = {
    itemAddAction,
    itemUpdateAction
};

export default withRouter(connect(mapStateToProps, mapActionsToProps)(Center));
