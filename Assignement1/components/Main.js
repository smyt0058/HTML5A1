var ListItem = React.createClass({
    propTypes: {
        "id": React.PropTypes.number,
        "name": React.PropTypes.string,
        "email": React.PropTypes.string
    },

    render: function(){
        return (
            React.createElement("a", {className:"list-group-item", href: "#item/" + this.props.id},
            //React.createElement("li", {}),
            React.createElement("h2", {className:"contact-name"},this.props.name),
            )
        )
    }
}); 

var showList = React.createClass({
    propTypes: {
        "contacts": React.PropTypes.array,
    },

    render: function(){
        var theContactList = this.props.contacts.map(function(item){
            return React.createElement(ListItem, item);
        });
        return (
            React.createElement("ul", {className: "list-group"},
                theContactList
        )
    );
    }
});

let NavMenu = React.createClass({
    render: function() {
        return (
            React.createElement("nav", {className: "navbar navbar-expand-lg navbar-dark bg-dark"},
                React.createElement("div", {className: "navbar-collapse", id: "navbarNav"},
                React.createElement("ul", {className: "navbar-nav"},
                React.createElement("li", {className: "nav-item"},
                    React.createElement("a", {className: "nav-link", href: "#"}, "Contact List")
                ),
                React.createElement("li", {className: "nav-item"},
                    React.createElement("a", {className: "nav-link", href: "#newitem"}, "Add new contact")
                )
            )
        )
    ))}
});

var state = {
    location: ""
};

function setState(changes) {
    let component;
    let componentProperties = {};

    Object.assign(state, changes);

    let splittedUrl = state.location.replace(/^#\/?|\/$/g, "").split("/");

    switch(splittedUrl[0]) {
        case "newitem":
            component = AddNewContactPage;
            break;
        case "item":
            component = ContactPage;
            componentProperties = contacts.find(i => i.key == splittedUrl[1]);
            break;
        default:
            component = MainPage;
    }

    ReactDOM.render(React.createElement(component, componentProperties), document.getElementById("react-app"));
}

window.addEventListener('hashchange', ()=>setState({location: location.hash}));

setState({location: location.hash, 
    contact:{
        name: "",
        email: ""
    },
    contacts: contacts 
         });