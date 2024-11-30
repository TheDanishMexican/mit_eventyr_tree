let layer = 1;

start();



async function fetchScenes() {
    const response = await fetch("story.json");
    const data = await response.json();
    return data;
}


function showScene(node) {
    console.log("Now entering layer number: " + layer++);
    console.log("this is the parentNode of this layer: ", node);
    const scene = node.value;
    const sceneContainer = document.querySelector("#scene");
    sceneContainer.innerHTML = "";

    const sceneTitle = document.createElement("h1");
    sceneTitle.innerHTML = scene.title;
    sceneContainer.appendChild(sceneTitle);

    const sceneText = document.createElement("p");
    sceneText.className = "sceneText";
    sceneText.innerHTML = scene.text;
    sceneContainer.appendChild(sceneText);

    const buttonContainer = document.createElement("div");
    buttonContainer.id = "buttons";

    node.childNodes.forEach((childNode, index) => {
        const button = document.createElement("button");
        button.className = "choice-button";
        button.innerHTML = scene.choices[index].btnText;
        buttonContainer.appendChild(button);
        button.addEventListener("click", () => {
            showScene(childNode);
        });
    });

    sceneContainer.appendChild(buttonContainer);
}




async function start() {
    const scenes = await fetchScenes();
    const scenesTree = chainNodes(scenes);

    showScene(scenesTree);
}

function choiceButtonClicked(event) {
    console.log(event.target.dataset.sceneId);
}

function chainNodes(scenes) {
    const rootNode = new Node(scenes[0]);
    const choice1 = new Node(scenes[1]);
    const choice2 = new Node(scenes[2]);
    const choice3 = new Node(scenes[3]);
    const choice1A = new Node(scenes[4]);
    const choice1B = new Node(scenes[5]);
    const choice1C = new Node(scenes[6]);
    const choice2A = new Node(scenes[7]);
    const choice2B = new Node(scenes[8]);
    const choice2C = new Node(scenes[9]);
    const choice3A = new Node(scenes[10]);
    const choice3B = new Node(scenes[11]);
    const choice3C = new Node(scenes[12]);

    rootNode.appendChild(choice1);
    rootNode.appendChild(choice2);
    rootNode.appendChild(choice3);
    choice1.appendChild(choice1A);
    choice1.appendChild(choice1B);
    choice1.appendChild(choice1C);
    choice2.appendChild(choice2A);
    choice2.appendChild(choice2B);
    choice2.appendChild(choice2C);
    choice3.appendChild(choice3A);
    choice3.appendChild(choice3B);
    choice3.appendChild(choice3C);



    return rootNode;
}


// #region node/tree

class Tree {
    constructor(root) {
        this.root = root;
    }

    dump() {
        console.log(this);
    }

};

class Node {
    constructor(value) {
        this.value = value;
        this.parent = null;
        this.childNodes = [];
    }

    dump() {
        console.log(this);
    }

    children() {
        if (this.hasChildNodes()) {
            return this.childNodes;
        }

        return null;
    }

    firstChild() {
        if (this.hasChildNodes()) {
            return this.childNodes[0];
        }

        return null;
    }

    numberOfChildren() {
        if (this.hasChildNodes) {
            return this.childNodes.length;
        }

        return null;
    }

    lastChild() {
        if (this.hasChildNodes()) {
            return this.childNodes[this.childNodes.length - 1];
        }

        return null;
    }

    hasChildNodes() {
        if (this.childNodes.length) {
            return true;
        }

        return false;
    }

    appendChild(child) {
        this.childNodes.push(child);
        child.parent = this;
    }

    removeChild(child) {
        const index = this.childNodes.indexOf(child);
        if (index !== -1) {
            child.parent = null;
            return this.childNodes.splice(index, 1)[0];
        }

        return null;
    }

    replaceChild(newChild, oldChild) {
        const oldChildIndex = this.childNodes.indexOf(oldChild);
        if (oldChildIndex !== -1) {
            this.childNodes.splice(oldChildIndex, 1, newChild);
            newChild.parent = this;
            oldChild.parent = null;
            return oldChild;
        }

        return null;
    }
}

// #endregion