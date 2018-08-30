((root, doc) => {
    const removeChildren = (node) => {
        while (node.firstChild) {
            node.removeChild(node.firstChild);
        }
    };

    const createElement = (elementType, title, docu) => {
        const e = docu.createElement(elementType);
        const textNode = docu.createTextNode(title);
        e.title = title;
        e.appendChild(textNode);
        return e;
    }

    const createLink = (title, url, docu) => {
        const link = createElement('a', title, docu);
        link.href = url;
        return link;
    }

    fetch('/api/profiles', {
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'X-Requested-With': 'XMLHttpRequest',
        },
    })
    .then(res => {
        removeChildren(root);
        if (res.status === 200) {
            const profile = res.json();
            return profile;
        } else if (res.status === 401) {
            const loginElement = createLink('Login', '/accounts/login', doc);
            root.appendChild(loginElement);
        } else {
            const errorElement = createElement('span', 'Something went wrong', doc);
            root.appendChild(welcomeElement);
            console.log(res); 
        }
    })
    .then (profile => {
        const message = `Welcome, ${profile.name} | `;
        const welcomeElement = createElement('span', message, doc);
        root.appendChild(welcomeElement);
        const logoutElement = createLink('Logout', '/accounts/logout', doc);
        root.appendChild(logoutElement);
    })
    .catch(err => {
        const errorElement = createElement('span', 'Something went wrong', doc);
        root.appendChild(welcomeElement);
        console.log(err); 
    });
})(document.body, document);
