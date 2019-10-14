import React from 'react';
import {Link} from 'react-router-dom';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {itemAddAction, itemUpdateAction} from "../actions/ItemAction";
import ListItems from './ListItems';

class Center extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: null,
            name: '',
            quantity: '',
            foodCategorySelected: {
                name: '0',
                label: 'No'
            },
            showFoodCategoryList: false,
        };

        this.foodCategories = [
            {
                name: '1',
                label: 'Yes'
            },
            {
                name: '0',
                label: 'No'
            },
        ];

        this.handleShowFoodCategoryList = this.handleShowFoodCategoryList.bind(this);
        this.handleCenterClick = this.handleCenterClick.bind(this);
        this.selectFoodCategory = this.selectFoodCategory.bind(this);
        this.handleName = this.handleName.bind(this);
        this.handleQuantity = this.handleQuantity.bind(this);
    }

    handleShowFoodCategoryList(e) {
        e.stopPropagation();
        this.setState({showFoodCategoryList: !this.state.showFoodCategoryList});
    }

    handleCenterClick() {
        this.setState({showFoodCategoryList: false});
    }

    selectFoodCategory(item) {
        this.setState({foodCategorySelected: item});
    }

    handleName(e) {
        this.setState({name: e.target.value});
    }

    handleQuantity(e) {
        this.setState({quantity: e.target.value});
    }

    componentWillReceiveProps(nextProps, nextContext) {
        console.log('componentWillReceiveProps', nextProps);

        if(nextProps.edit && nextProps.edit.item) {
            const {id, name, quantity, category} = nextProps.edit.item;
            const foodCategorySelected = {
                name: category ? category.toLowerCase() : '',
                label: category
            };
            console.log('foodCategorySelected', foodCategorySelected);
            this.setState({id: id ? id : null, name: name, quantity: quantity, category, foodCategorySelected});
        }

        if(nextProps.add && nextProps.add.status === true) {
            this.setState({id: null, name: '', quantity: '', category: ''});
        }
    }

    handleFormSubmit(e) {
        e.preventDefault();
        const {id, name, quantity, foodCategorySelected} = this.state;
        const {itemAddAction, itemUpdateAction} = this.props;

        const item = {
            username: name,
            password: quantity,
            admin : foodCategorySelected.name
        };

        console.log('Form data: ', id, name, quantity, foodCategorySelected);
        if(id === null) {
            itemAddAction(item);
        } else {
            itemUpdateAction(item);
            this.setState({id: null, name: '', quantity: '', category: ''});
        }
    }

    render() {
        return (
            <div className="dashboard--center" onClick={this.handleCenterClick}>
                <h1 className="h1">Users</h1>

                <form action="">

                    <div className="row">
                        <div className="col-1-of-2">
                            <input type="text" placeholder="Type username" value={this.state.name}
                                   onChange={e => this.handleName(e)}/>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-1-of-3">
                            <input type="text" placeholder="Type password" value={this.state.quantity}
                                   onChange={e => this.handleQuantity(e)}/>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-1-of-2">
                            <div className="dd-wrapper">
                                <div className="dd-header dd-header-open" id="select-city"
                                     onClick={(e) => this.handleShowFoodCategoryList(e)}>
                                    <div className="dd-header-title"
                                         id="dd-header-title"> {this.state.foodCategorySelected.label} </div>
                                    <div className="dd-icon"><i className="fas fa-angle-down"></i></div>
                                </div>
                                <ul className="dd-list" id="dd-list"
                                    style={{display: this.state.showFoodCategoryList ? 'block' : 'none'}}>
                                    {
                                        this.foodCategories.map(item => <li
                                            key={item.name}
                                            onClick={() => this.selectFoodCategory(item)} id={item.name}
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
