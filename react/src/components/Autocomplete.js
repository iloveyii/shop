import React from 'react';

class Autocomplete extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items : [
                { label: 'Label 1', value: 'Value 1'},
                { label: 'Label 2', value: 'Value 2'},
                { label: 'Label 3', value: 'Value 3'},
            ]
        };
    }

    expand() {
        this.setState({expanded: !this.state.expanded});
    }

    render() {
        const {items} = this.props;

        return (
            <div className="darkula" style={{display: this.props.display}}>
                <ul className="list-group" style={{position: 'absolute'}}>
                    {
                        items.map( item =><li key={item.show} className="list-group-item"><a onClick={() => this.props.onClick(item.show)} href="#">{item.show}</a></li>)
                    }
                </ul>
            </div>
        );
    }
}

export default Autocomplete;
