import React from 'react';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {itemDeleteAction, itemEditAction} from '../actions/ItemAction';

const Li = ({item, itemDeleteAction, itemEditAction}) => {
    const handleDelete = (e) => {
        e.preventDefault();
        itemDeleteAction(item.id);
    };
    return (
        <li className="list-group-item">
            <div className="list-group-item-data">
                <div style={{flex: 1}} href="#">{item.id}</div>
                <div style={{flex: 4}}>{item.username}</div>
                <div style={{flex: 8}}>{item.email}</div>
                <div style={{flex: 1}}>{item.admin}</div>
            </div>
            <div className="list-group-item-buttons">
                <div style={{flex: 1}}>
                    <button onClick={() => itemEditAction(item)} className="button-small">Edit</button>
                </div>
                <div style={{flex: 1}}>
                    <button onClick={(e) => handleDelete(e)} className="button-small">Delete</button>
                </div>
            </div>
        </li>
    );
};

class ListItems extends React.Component {

    constructor(props) {
        super(props);
        this.itemEditAction = this.itemEditAction.bind(this);
    }

    itemEditAction(item) {
        console.log('Item edit: ', item);
        this.props.itemEditAction(item);
    }

    render() {
        const {items, itemDeleteAction} = this.props;
        if (! items || items.length === 0) return <div>Loading...</div>;
        console.log('ITems:', items);

        return (
            <ul className="list-group u-margin-top-big">
                {
                    items.map((item, i) => <Li itemDeleteAction={itemDeleteAction} itemEditAction={this.itemEditAction} key={i} item={item}></Li>)
                }
            </ul>
        )
    }
}

/**
 * Get data from store
 * @param state
 */
const mapStateToProps = state => ({
    items: state.items,
});

/**
 * Import action from dir action above - but must be passed to connect method in order to trigger reducer in store
 * @type {{UserUpdate: UserUpdateAction}}
 */
const mapActionsToProps = {
    itemDeleteAction,
    itemEditAction
};

export default withRouter(connect(mapStateToProps, mapActionsToProps)(ListItems));
