var menuItems = [
    { text: 'About Me', href: 'https://abourque72.github.io/aboutme.html' },
    { text: 'Research Interests', href: 'https://abourque72.github.io/researchinterests.html' },
    { text: 'Resources', href: 'https://abourque72.github.io/resources.html' },
    { text: 'Blog', href: 'https://abourque72.github.io/blog' },
    { text: 'Miscellaneous', href: 'https://abourque72.github.io/misc.html' }
];

var menuContainer = document.getElementById('menu');
for (var i = 0; i < menuItems.length; i++) {
    var menuLink = document.createElement('a');
    menuLink.textContent = menuItems[i].text;
    menuLink.href = menuItems[i].href;
    menuContainer.appendChild(menuLink);

    if (i !== menuItems.length - 1) {
	var separator = document.createTextNode(' | ');
	menuContainer.appendChild(separator);
    }
}
