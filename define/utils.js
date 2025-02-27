function createElement(tag, props, ...children) {
    const element = document.createElement(tag);

    if (props) {
        Object.keys(props).forEach(key => {
            if (key.startsWith("on")) {
                element.addEventListener(key.substring(2).toLowerCase(), props[key]);
            } else {
                element.setAttribute(key, props[key]);
            }
        });
    }

    children.forEach(child => {
        if (typeof child === "string") {
            element.appendChild(document.createTextNode(child));
        } else {
            element.appendChild(child);
        }
    });

    return element;
}

window.createElement = createElement;
