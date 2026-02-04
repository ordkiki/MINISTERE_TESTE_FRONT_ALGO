const data = [
    { "id": 1, "name": "Direction Générale", "parent_id": null }, 
    { "id": 2, "name": "Direction RH", "parent_id": 1 }, 
    { "id": 3, "name": "Département Recrutement", "parent_id": 2 }, 
    { "id": 4, "name": "Département Paie", "parent_id": 2 }, 
    { "id": 5, "name": "Direction Technique", "parent_id": 1 }, 
    { "id": 6, "name": "Pôle Développement", "parent_id": 5 }, 
    { "id": 7, "name": "Service Backend", "parent_id": 6 }, 
    { "id": 8, "name": "Service Frontend", "parent_id": 6 }, 
    { "id": 9, "name": "Service Accueil", "parent_id": 2 }, 
    { "id": 10, "name": "Service Communication", "parent_id": 5 }
]


function SearchRoot(data)
{
    var root = {};
    data.forEach(element => 
    {
        if (element.parent_id === null)     
            root = element;
    });
    console.log(root);
    return root;
}

function BuildTree(parent_id, data)
{
    const parent = data.find(element => element.id === parent_id);
    const Tree = 
    {
        id: parent_id, ...data[i],
        name: parent ? parent.name : "",
        children: []
    };

    data.forEach(element => {
        if (element.parent_id === parent_id) 
            Tree.children.push(BuildTree(element.id, data));
    });
    return Tree;
}

const root = SearchRoot(data);
var Tree = BuildTree(root.id, data);

function renderTree(node) {
    // Creation de la contenu de la liste des services dans une bloc ul
    const ul = document.createElement('ul');
    ul.className = 'tree-list';
    
    // Les contenus de la liste
    const li = document.createElement('li');
    li.className = 'font-semibold text-sm tree-item';
    
    // elemenst enfants de la liste
    const itemDiv = document.createElement('div');
    itemDiv.className = 'tree-node border p-4 my-4 bg-white flex items-center';
    
    if (node.children.length > 0) {
        // Bouton ouverture et fermeture des enfants
        const toggle = document.createElement('button');

        toggle.className = 'flex font-bold justify-center items-center toggle-btn p-1 size-[30px] border bg-gray-200 mr-2';
        toggle.innerHTML = '-';
        toggle.addEventListener('click', function(e) {
            e.stopPropagation();
            const childrenUl = itemDiv.nextElementSibling;
            // element de la meme niveau
            if (childrenUl) {
                childrenUl.classList.toggle('hidden');
                toggle.classList.toggle('collapsed');
                toggle.innerHTML = toggle.classList.contains('collapsed') ? '>' : '-';
            }
        });
        itemDiv.appendChild(toggle);
    } else {
        const spacer = document.createElement('span');
        spacer.className = 'toggle-spacer';
        itemDiv.appendChild(spacer);
    }
    
    const nameSpan = document.createElement('span');
    nameSpan.className = 'tree-name';
    nameSpan.textContent = node.name;
    itemDiv.appendChild(nameSpan);
    
    li.appendChild(itemDiv);
    ul.appendChild(li);
    
    if (node.children.length > 0) {
        const childrenUl = document.createElement('ul');
        childrenUl.className = 'tree-children ml-12 ';
        node.children.forEach(child => {
            const childLi = document.createElement('li');
            // Meme action pour tous les enfants
            const rendered = renderTree(child, childLi);
            childrenUl.appendChild(rendered.querySelector('li'));
        });
        li.appendChild(childrenUl);
    }    
    return ul;
}