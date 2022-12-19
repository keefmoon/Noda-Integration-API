
var statusElement;
var statusMessageElement;

const highlightColor = "4CAF50";
var rollbackProps = {};
rollbackProps.nodes = [];
rollbackProps.links = [];

document.addEventListener('DOMContentLoaded', function () {
    statusElement = document.getElementById('status');
    statusMessageElement = document.getElementById('statusMessage');
    eventsMessageElement = document.getElementById('eventsMessage');

    window.noda.onNodeCreated = function (node) { eventMessage("Node created with uuid: " + node.uuid); }
    window.noda.onNodeUpdated = function (node) {
        eventMessage("Node updated with uuid: " + node.uuid);
        if (node.selected) {
            showNodeProps(node);
        }
    }
    window.noda.onNodeDeleted = function (node) { eventMessage("Node deleted with uuid: " + node.uuid); }

    window.noda.onLinkCreated = function (link) { eventMessage("Link created with uuid: " + link.uuid); }
    window.noda.onLinkUpdated = function (link) {
        eventMessage("Link updated with uuid: " + link.uuid);
        if (link.selected) {
            showLinkProps(link);
        }
    }
    window.noda.onLinkDeleted = function (link) { eventMessage("Link deleted with uuid: " + link.uuid); }

    window.noda.onInitialized = function () {
        if (!window.noda.isInstalled())
            statusError("Noda VR context not found, please try from within VR app.");
        else
            populateUser();
    }

}, false);

async function populateUser() {
    try {
        console.log("Calling getUser");
        const user = await window.noda.getUser();
        console.log("Returned from getUser with value: " + user.userId);
        document.getElementById('userId').textContent = user.userId;
    } catch (error) {
        statusError("Get User error: " + error);
    }

}

function statusSuccess(message) {
    statusMessageElement.textContent = message;
    statusElement.classList.remove('error');
    statusElement.classList.add('success');
}

function statusError(message) {
    statusMessageElement.textContent = message;
    statusElement.classList.add('error');
    statusElement.classList.remove('success');
}

function eventMessage(message) {
    eventsMessageElement.innerHTML = message + "<br/>" + eventsMessageElement.innerHTML;
}

function clearEvents() {
    eventsMessageElement.innerHTML = "";
}

async function createNode() {
    try {
        var nodeProps = obtainNodeProps();

        const node = await window.noda.createNode(nodeProps);

        //You can supply a Uuid or one will be assigned at creation time
        document.getElementById('nodeUuid').value = node.uuid;

        statusSuccess("Node created with uuid: " + node.uuid);

    } catch (error) {
        statusError("Node create error: " + error);
    }
}

async function updateNode() {
    try {
        var nodeProps = obtainNodeProps();

        const node = await window.noda.updateNode(nodeProps);

        statusSuccess("Node updated with uuid: " + node.uuid);

    } catch (error) {
        statusError("Node update error: " + error);
    }
}

async function deleteNode() {
    try {
        var nodeProps = {};

        nodeProps.uuid = document.getElementById('nodeUuid').value;

        const node = await window.noda.deleteNode(nodeProps);

        statusSuccess("Node deleted with uuid: " + node.uuid);

    } catch (error) {
        statusError("Node delete error: " + error);
    }
}

async function listNodes() {
    try {
        var nodeProps = obtainNodeProps();

        const result = await window.noda.listNodes(nodeProps);

        let count = 0;

        if (result != null && result.nodes != null)
            count = result.nodes.length;

        statusSuccess("List Nodes returned " + count + " nodes");

    } catch (error) {
        statusError("List Nodes error: " + error);
    }
}

function obtainNodeProps() {
    var nodeProps = {};

    nodeProps.uuid = document.getElementById('nodeUuid').value;
    nodeProps.title = document.getElementById('nodeTitle').value;
    nodeProps.color = document.getElementById('nodeColor').value;
    nodeProps.opacity = parseFloat(document.getElementById('nodeOpacity').value);
    nodeProps.shape = document.getElementById('nodeShape').value;
    nodeProps.imageUrl = document.getElementById('nodeImageUrl').value;
    nodeProps.notes = document.getElementById('nodeNotes').value;
    nodeProps.pageUrl = document.getElementById('nodePageUrl').value;
    nodeProps.size = parseFloat(document.getElementById('nodeSize').value);

    nodeProps.location = {};

    nodeProps.location.x = parseFloat(document.getElementById('nodeX').value);
    nodeProps.location.y = parseFloat(document.getElementById('nodeY').value);
    nodeProps.location.z = parseFloat(document.getElementById('nodeZ').value);
    nodeProps.location.x = nodeProps.location.x != NaN ? nodeProps.location.x : 0;
    nodeProps.location.y = nodeProps.location.y != NaN ? nodeProps.location.y : 0;
    nodeProps.location.z = nodeProps.location.z != NaN ? nodeProps.location.z : 0;

    nodeProps.location.relativeTo = document.getElementById('nodeRelativeTo').value;

    nodeProps.selected = document.getElementById('nodeSelected').checked;
    nodeProps.collapsed = document.getElementById('nodeCollapsed').checked;

    return nodeProps;
}

function showNodeProps(nodeProps) {

    document.getElementById('nodeUuid').value = nodeProps.uuid;
    document.getElementById('nodeTitle').value = nodeProps.title;
    document.getElementById('nodeColor').value = nodeProps.color;
    document.getElementById('nodeOpacity').value = nodeProps.opacity;
    document.getElementById('nodeShape').value = nodeProps.shape;
    document.getElementById('nodeImageUrl').value = nodeProps.imageUrl;
    document.getElementById('nodeNotes').value = nodeProps.notes;
    document.getElementById('nodePageUrl').value = nodeProps.pageUrl;
    document.getElementById('nodeSize').value = nodeProps.size;

    document.getElementById('nodeX').value = nodeProps.location.x;
    document.getElementById('nodeY').value = nodeProps.location.y;
    document.getElementById('nodeZ').value = nodeProps.location.z;

    document.getElementById('nodeRelativeTo').value = nodeProps.location.relativeTo;

    document.getElementById('nodeSelected').checked = nodeProps.selected;
    document.getElementById('nodeCollapsed').checked = nodeProps.collapsed;

    return nodeProps;
}

async function createLink() {
    try {
        var linkProps = obtainLinkProps();

        const link = await window.noda.createLink(linkProps);

        //You can supply a Uuid or one will be assigned at creation time
        document.getElementById('linkUuid').value = link.uuid;

        statusSuccess("Link created with uuid: " + link.uuid);

    } catch (error) {
        statusError("Link create error: " + error);
    }
}

async function updateLink() {
    try {
        var linkProps = obtainLinkProps();

        const link = await window.noda.updateLink(linkProps);

        statusSuccess("Link updated with uuid: " + link.uuid);

    } catch (error) {
        statusError("Link update error: " + error);
    }
}

async function deleteLink() {
    try {
        var linkProps = {};

        linkProps.uuid = document.getElementById('linkUuid').value;

        const link = await window.noda.deleteLink(linkProps);

        statusSuccess("Link deleted with uuid: " + link.uuid);

    } catch (error) {
        statusError("Link delete error: " + error);
    }
}

async function listLinks() {
    try {
        var linkProps = obtainLinkProps();

        const result = await window.noda.listLinks(linkProps);

        let count = 0;

        if (result != null && result.links != null)
            count = result.links.length;

        statusSuccess("List Links returned " + count + " links");

    } catch (error) {
        statusError("List Links error: " + error);
    }
}

function obtainLinkProps() {
    var linkProps = {};

    linkProps.uuid = document.getElementById('linkUuid').value;
    linkProps.fromUuid = document.getElementById('linkFromUuid').value;
    linkProps.toUuid = document.getElementById('linkToUuid').value;

    linkProps.title = document.getElementById('linkTitle').value;
    linkProps.color = document.getElementById('linkColor').value;
    linkProps.shape = document.getElementById('linkShape').value;
    linkProps.size = parseFloat(document.getElementById('linkSize').value);

    linkProps.selected = document.getElementById('linkSelected').checked;

    return linkProps;
}

function showLinkProps(linkProps) {

    document.getElementById('linkUuid').value = linkProps.uuid;
    document.getElementById('linkFromUuid').value = linkProps.fromUuid;
    document.getElementById('linkToUuid').value = linkProps.toUuid;
    document.getElementById('linkTitle').value = linkProps.title;
    document.getElementById('linkColor').value = linkProps.color;
    document.getElementById('linkShape').value = linkProps.shape;
    document.getElementById('linkSize').value = linkProps.size;
    document.getElementById('linkSelected').selected = linkProps.checked;

    return linkProps;
}

async function createNodeGrid() {

    await createGridNode(1, 1);
    await createGridNode(1, 2);
    await createGridNode(2, 1);
    await createGridNode(2, 2);
}

async function createGridNode(column, row) {

    try {
        var props = gridNodeProps(column, row);
        const node = await window.noda.createNode(props);
        statusSuccess("Created Node Grid: " + node.uuid);

    } catch (error) {
        statusError("Node create error: " + error);
    }
}

function gridNodeProps(column, row) {
    var nodeProps = {};

    nodeProps.uuid = "node_grid_c" + column + "_r" + row;
    nodeProps.title = "Column " + column + " | Row " + row;
    nodeProps.color = "4CAF50";
    nodeProps.opacity = 1.0;
    nodeProps.shape = "Ball";
    // nodeProps.imageUrl = document.getElementById('nodeImageUrl').value;
    // nodeProps.notes = document.getElementById('nodeNotes').value;
    // nodeProps.pageUrl = document.getElementById('nodePageUrl').value;
    nodeProps.size = 5.0;

    nodeProps.location = {};

    nodeProps.location.x = column * 0.1;
    nodeProps.location.y = row * -0.1;
    nodeProps.location.z = 0.0;

    nodeProps.location.relativeTo = "Window";
    nodeProps.selected = false;
    nodeProps.collapsed = false;

    return nodeProps;
}

async function createGridLinks() {

    try {
        var props = gridLinkProps();
        const link = await window.noda.createLink(props);
        statusSuccess("Created Grid Link: " + link.uuid);

    } catch (error) {
        statusError("Node create error: " + error);
    }
}

function gridLinkProps() {
    var linkProps = {};

    linkProps.uuid = "test_link";
    linkProps.fromUuid = "node_grid_c1_r1";
    linkProps.toUuid = "node_grid_c2_r2";

    // linkProps.title = document.getElementById('linkTitle').value;
    linkProps.color = "4CAF50";
    linkProps.shape = "Solid";
    linkProps.size = 9.0;

    // linkProps.selected = document.getElementById('linkSelected').checked;

    return linkProps;
}

async function getNodeFromUuid(uuid) {
    try {
        var props = {};
        props.uuid = uuid;
        const result = await window.noda.listNodes(props);
        return result.nodes[0];

    } catch (error) {
        statusError("Getting node error: " + error);
    }
}

async function getLinkFromUuid(uuid) {
    try {
        var props = {};
        props.uuid = uuid;
        const result = await window.noda.listLinks(props);
        return result.links[0];

    } catch (error) {
        statusError("Getting link error: " + error);
    }
}

async function highlightDependancyChain() {
    const selectedNodes = await listSelectedNodes();

    for (var i = 0; i < selectedNodes.length; i++) {
        await highlightDependancies(selectedNodes[i]);
    }
}

async function highlightNode(node) {
    try {
        var rollback = {};
        rollback.uuid = node.uuid;
        rollback.color = node.color;
        rollbackProps.nodes.push(rollback);
        node.color = highlightColor;
        const updatedNode = await window.noda.updateNode(node);
        statusSuccess("Node Highlighted: " + updatedNode.uuid);

    } catch (error) {
        statusError("Node highlight error: " + error);
    }
}

async function highlightLink(link) {
    try {
        var rollback = {};
        rollback.uuid = link.uuid;
        rollback.color = link.color;
        rollbackProps.links.push(rollback);
        link.color = highlightColor;
        const updatedLink = await window.noda.updateLink(link);
        statusSuccess("Link Highlighted: " + updatedLink.uuid);

    } catch (error) {
        statusError("Link highlight error: " + error);
    }
}

async function listLinksWithProps(props) {
    try {
        const linksResult = await window.noda.listLinks(props);
        return linksResult.links;

    } catch (error) {
        statusError("List links error: " + error);
    }
}

async function listNodesWithProps(props) {
    try {
        const nodesResult = await window.noda.listNodes(props);
        return nodesResult.nodes;

    } catch (error) {
        statusError("List nodes error: " + error);
    }
}

async function listSelectedNodes() {
    try {
        var selectedNodeProps = {};
        selectedNodeProps.selected = true;
        const nodesResult = await window.noda.listNodes(selectedNodeProps);
        return nodesResult.nodes;

    } catch (error) {
        statusError("List nodes error: " + error);
    }
}

async function highlightDependancies(node) {
    var linkProps = {};
    linkProps.fromUuid = node.uuid;
    await highlightNode(node);
    const outwardLinks = await listLinksWithProps(linkProps);

    for (var j = 0; j < outwardLinks.length; j++) {
        var linkProps = outwardLinks[j];
        await highlightLink(linkProps);
        const toNode = await getNodeFromUuid(linkProps.toUuid);
        await highlightDependancies(toNode);
    }
}

async function updateNodeWithProps(props) {
    try {
        const result = await window.noda.updateNode(props);
    } catch (error) {
        statusError("Update node error: " + error);
    }
}

async function updateLinkWithProps(props) {
    try {
        const result = await window.noda.updateLink(props);
    } catch (error) {
        statusError("Update link error: " + error);
    }
}

async function rollback() {
    for (i = 0; i < rollbackProps.nodes.length; i++) {
        const nodeProps = rollbackProps.nodes[i];
        await updateNodeWithProps(nodeProps);
    }

    for (j = 0; j < rollbackProps.links.length; j++) {
        const linkProps = rollbackProps.links[i];
        await updateLinkWithProps(linkProps);
    }

    rollbackProps.nodes = [];
    rollbackProps.links = [];
}

// AST Traversing

var depth = 0;
var index = 0;
var fromNode;

async function traverse(node, key) {

    const nodaNode = await createNodeFromJSONNode(node, depth, index);

    if (fromNode != null) {
        // createLink fromNode.uuid
        const link = await createJSONLink(fromNode, nodaNode, key);
    }

    for (var key in node) {
        const subNode = node[key];

        if (subNode != null && typeof(subNode) == "object") {
            depth++;
            index = 0;
            fromNode = nodaNode;
            traverse(subNode, key);
        } else {
            index++;
        }
    }
}

function loadAST() {
    fetch('./ast.json')
    .then((response) => response.json())
    .then((json) => {
        traverse(json, null);
        // console.log(json);
        depth = 0;
        index = 0;
        fromNode = null;
    });
}

function nodePropsFromJSONNode(jsonNode, depth, index) {

    if (jsonNode == null) {
        return nodePropsFromNull(jsonNode, depth, index);
    } else if (typeof(jsonNode) == "object") {
        return nodePropsFromObject(jsonNode, depth, index);
    } else if (typeof(jsonNode) == "string") {
        return nodePropsFromString(jsonNode, depth, index);
    } else if (typeof(jsonNode) == "number") {
        return nodePropsFromNumber(jsonNode, depth, index);
    } else if (typeof(jsonNode) == "boolean") {
        return nodePropsFromBool(jsonNode, depth, index);
    }
}

function nodePropsFromObject(jsonNode, depth, index) {
    var nodeProps = defaultJSONNodeProps();
    nodeProps.title = "Object";
    nodeProps.location = locationFor(depth, index);
    return nodeProps;
}

function nodePropsFromString(jsonNode, depth, index) {
    var nodeProps = defaultJSONNodeProps();
    nodeProps.title = jsonNode;
    nodeProps.location = locationFor(depth, index);
    return nodeProps;
}

function nodePropsFromNumber(jsonNode, depth, index) {
    var nodeProps = defaultJSONNodeProps();
    nodeProps.title = jsonNode;
    nodeProps.location = locationFor(depth, index);
    return nodeProps;
}

function nodePropsFromBool(jsonNode, depth, index) {
    var nodeProps = defaultJSONNodeProps();
    nodeProps.title = jsonNode;
    nodeProps.location = locationFor(depth, index);
    return nodeProps;
}

function nodePropsFromNull(jsonNode, depth, index) {
    var nodeProps = defaultJSONNodeProps();
    nodeProps.title = "NULL";
    nodeProps.location = locationFor(depth, index);
    return nodeProps;
}

function defaultJSONNodeProps() {
    var nodeProps = {};
    nodeProps.color = "4CAF50";
    nodeProps.opacity = 1.0;
    nodeProps.shape = "Ball";
    nodeProps.size = 5.0;
    nodeProps.selected = false;
    nodeProps.collapsed = true;
    return nodeProps;
}

function locationFor(depth, index) {
    var location = {};
    location.x = index * 0.1;
    location.y = depth * -0.1;
    location.z = 0.0;
    location.relativeTo = "Window";
    return location;
}

async function createJSONLink(fromNode, toNode, index) {

    try {
        var props = jsonNodeLinkProps(fromNode, toNode, index);
        const link = await window.noda.createLink(props);
        // statusSuccess("Created Grid Link: " + link.uuid);
        return link;

    } catch (error) {
        statusError("Node create error: " + error);
    }
}

function jsonNodeLinkProps(fromNode, toNode, index) {
    var linkProps = {};
    linkProps.title = index;
    linkProps.fromUuid = fromNode.uuid;
    linkProps.toUuid = toNode.uuid;
    linkProps.color = "4CAF50";
    linkProps.shape = "Solid";
    linkProps.size = 1.0;
    return linkProps;
}

async function createNodeFromJSONNode(jsonNode, depth, index) {
    try {
        var props = nodePropsFromJSONNode(jsonNode, depth, index);
        const node = await window.noda.createNode(props);
        // statusSuccess("Created Node Grid: " + node.uuid);
        return node;

    } catch (error) {
        statusError("Node create error: " + error);
    }
}