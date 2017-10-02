let AddNewForm = React.createClass({
    propTypes: {
        contact: React.PropTypes.object.isRequired,
        onChange: React.PropTypes.func.isRequired,
        onSubmit: React.PropTypes.func.isRequired
    },
    onNameChange: function(e) {
        this.props.onChange(Object.assign({}, this.props.contact, {name: e.target.value}));
    },
    onEmailChange: function(e) {
        this.props.onChange(Object.assign({}, this.props.contact, {email: e.target.value}));
    },
    onSubmit: function(e) {
        this.props.onSubmit(this.props.contact);
    },
    render: function() {
        return (
            React.createElement("form", {},
                React.createElement("input", {
                    type: "text",
                    placeholder: "Name",
                    className:"name",
                    value: this.props.contact.name,
                    onChange: this.onNameChange
                }),
                React.createElement("input", {
                    type: "text",
                    placeholder: "Email",
                    className:"Email",
                    value: this.props.contact.email,
                    onChange: this.onEmailChange
                }),
                React.createElement("a", {href: "#"},
                React.createElement("button", {className:"submitBtn", type: "button", onClick: this.onSubmit}, "Submit"))
            )
        )
    }
});

let FormView = React.createClass({
    propTypes: {
        contact: React.PropTypes.object.isRequired,
        contacts: React.PropTypes.array.isRequired,
        onNewContactChange: React.PropTypes.func.isRequired,
        onSubmitNewContact: React.PropTypes.func.isRequired
    },
    render: function() {
        return (
            React.createElement("div", {},
                React.createElement("div", {}),
                React.createElement(AddNewForm, {contact: this.props.contact, onChange: this.props.onNewContactChange, onSubmit: this.props.onSubmitNewContact}),
            )
        )
    }
});

function updateNewContact(contact) {
    setState({contact: contact});
}
function addNewContact(contact) {
    let contactList = state.contacts;
    contactList.push(Object.assign({}, {key: contactList.length + 1, id: contactList.length + 1}, contact));
    setState({contacts: contactList});
    console.log("New Item List: ", state.contacts);
}