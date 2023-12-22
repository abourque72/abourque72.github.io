var menuItems = [
    { text: 'About Me', href: 'aboutme.html' },
    { text: 'Research Interests', href: 'researchinterests.html' },
    { text: 'Resources', href: 'resources.html' },
    { text: 'Blog', href: 'blog' },
    { text: 'Miscellaneous', href: 'misc.html' }
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
