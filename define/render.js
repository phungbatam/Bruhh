function render(component, containerId) {
    document.getElementById(containerId).innerHTML = component();
}