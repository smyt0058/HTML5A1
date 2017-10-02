
var ListItem = React.createClass({
    propTypes: {
        'id': React.PropTypes.number,
        'name': React.PropTypes.string,
        'email': React.PropTypes.string
    },

    render: function(){
        return (
            React.createElement('a', {className:'list-group-item', href: '#item/' + this.props.id}, 
                React.createElement('h2', {className:'contact-name'},this.props.name)
            )
        );
    }
}); 

var showList = React.createClass({
    propTypes: {
        'contacts': React.PropTypes.array
    },

    render: function(){
        var theContactList = this.props.contacts.map(function(item){
            return ( 
                React.createElement(ListItem, item)
            );
        });
        return (
            React.createElement('ul', {className: 'list-group'}, 
                theContactList
            )
        );
    }
});

let MainPage = React.createClass({
    propTypes: {
        'id': React.PropTypes.number,
        'name': React.PropTypes.string,
        'email': React.PropTypes.string,
    },
    render: function () {
        return (
            React.createElement('div', {},
                React.createElement(NavMenu, {}),
                React.createElement(showList, state, {}))
        );
    }
});

let AddNewContactPage = React.createClass({
    
    render: function() {
        return (
            React.createElement('div', {},
                React.createElement(NavMenu, {}),
                React.createElement('h2', {className:'contactName'}, 'Add A Contact'),
                React.createElement(FormView, Object.assign({}, state, {
                    onNewContactChange: updateNewContact,
                    onSubmitNewContact: addNewContact
                }))                
            )
        );
    }
});

let ContactPage = React.createClass({
   
    render: function() {
        return (
            React.createElement('div', {},
                React.createElement(NavMenu,{}),
                React.createElement('h2', {className:'contactName'}, this.props.name),
                React.createElement('h4', {className:'contactEmail'}, this.props.email)
            )
        );
    }
});

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
    onSubmit: function() {
        this.props.onSubmit(this.props.contact);
    },
    render: function() {
        return (
            React.createElement('form', {},
                React.createElement('input', {
                    type: 'text',
                    placeholder: 'Name',
                    className:'name',
                    value: this.props.contact.name,
                    onChange: this.onNameChange
                }),
                React.createElement('input', {
                    type: 'text',
                    placeholder: 'Email',
                    className:'Email',
                    value: this.props.contact.email,
                    onChange: this.onEmailChange
                }),
                React.createElement('a', {href: '#'},
                    React.createElement('button', {className:'submitBtn', type: 'button', onClick: this.onSubmit}, 'Submit'))
            )
        );
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
            React.createElement('div', {},
                React.createElement('div', {}),
                React.createElement(AddNewForm, {contact: this.props.contact, onChange: this.props.onNewContactChange, onSubmit: this.props.onSubmitNewContact})
            )
        );
    }
});

function updateNewContact(contact) {
    setState({contact: contact});
}
function addNewContact(contact) {
    let contactList = state.contacts;
    contactList.push(Object.assign({}, {key: contactList.length + 1, id: contactList.length + 1}, contact));
    setState({contacts: contactList});
}

let NavMenu = React.createClass({
    render: function() {
        return (
            React.createElement('nav', {className: 'navbar navbar-expand-lg navbar-dark bg-dark'},
                React.createElement('div', {className: 'navbar-collapse', id: 'navbarNav'},
                    React.createElement('ul', {className: 'navbar-nav'},
                        React.createElement('li', {className: 'nav-item'},
                            React.createElement('a', {className: 'nav-link', href: '#'}, 'Contact List')
                        ),
                        React.createElement('li', {className: 'nav-item'},
                            React.createElement('a', {className: 'nav-link', href: '#newitem'}, 'Add new contact')
                        )
                    )
                )
            ));}
});

function setState(changes) {
    let component;
    let componentProperties = {};

    Object.assign(state, changes);

    let splittedUrl = state.location.replace(/^#\/?|\/$/g, '').split('/');

    switch(splittedUrl[0]) {
    case 'newitem':
        component = AddNewContactPage;
        break;
    case 'item':
        component = ContactPage;
        componentProperties = contacts.find(i => i.key == splittedUrl[1]);
        break;
    default:
        component = MainPage;
    }
    
    ReactDOM.render(React.createElement(component, componentProperties), document.getElementById('react-app'));
}

var state = {
    location: ''
};

window.addEventListener('hashchange', ()=>setState({location: location.hash}));

setState({location: location.hash, 
    contact:{
        name: '',
        email: ''
    },
    contacts: contacts 
});