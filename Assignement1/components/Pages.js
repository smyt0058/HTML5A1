let MainPage = React.createClass({
    propTypes: {
        "id": React.PropTypes.number,
        "name": React.PropTypes.string,
        "email": React.PropTypes.string,
    },
    render: function () {
        return (
            React.createElement("div", {},
                React.createElement(NavMenu, {}),
                React.createElement(showList, state, {}),
               
            )
            
        )
    }
});

let AddNewContactPage = React.createClass({
    
    render: function() {
        return (
            React.createElement("div", {},
                React.createElement(NavMenu, {}),
                React.createElement("h2", {className:"contactName"}, "Add A Contact"),
                React.createElement(FormView, Object.assign({}, state, {
                    onNewContactChange: updateNewContact,
                    onSubmitNewContact: addNewContact
                })),                
            )
        )
    }
});

let ContactPage = React.createClass({
   
    render: function() {
        return (
            React.createElement("div", {},
                React.createElement(NavMenu,{}),
                React.createElement("h2", {className:"contactName"},this.props.name),
                React.createElement("h4", {className:"contactEmail"}, this.props.email),
            )
        )
    }
});