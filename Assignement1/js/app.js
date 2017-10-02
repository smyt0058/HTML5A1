var state = {
    location: ""
};

window.addEventListener('hashchange', ()=>setState({location: location.hash}));

setState({location: location.hash, 
    contact:{
        name: "",
        email: ""
    },
    contacts: contacts 
         });