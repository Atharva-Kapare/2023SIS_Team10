import matplotlib as mpl
import matplotlib.pyplot as plt
import networkx as nx
from networkx.drawing.nx_agraph import graphviz_layout, to_agraph

import random
import io
import base64

mpl.use('agg')

averageSongLength = 3 # in mins
CRITICAL_WEIGHT = 0.3
SPLITTING_VAL = 0.95

# seed = 13648  # Seed random number generators for reproducibility
# G = nx.random_k_out_graph(10, 3, 0.5, seed=seed)
# pos = nx.spring_layout(G, seed=seed)

# node_sizes = [3 + 10 * i for i in range(len(G))]
# M = G.number_of_edges()
# edge_colors = range(2, M + 2)
# edge_alphas = [(5 + i) / (M + 4) for i in range(M)]
# cmap = plt.cm.plasma

# nodes = nx.draw_networkx_nodes(G, pos, node_size=node_sizes, node_color="indigo")
# edges = nx.draw_networkx_edges(
#     G,
#     pos,
#     node_size=node_sizes,
#     arrowstyle="->",
#     arrowsize=10,
#     edge_color=edge_colors,
#     edge_cmap=cmap,
#     width=2,
# )
# # set alpha value for each edge
# for i in range(M):
#     edges[i].set_alpha(edge_alphas[i])

# pc = mpl.collections.PatchCollection(edges, cmap=cmap)
# pc.set_array(edge_colors)

# ax = plt.gca()
# ax.set_axis_off()
# plt.colorbar(pc, ax=ax)
# plt.show()

def createNewNetwork(likedSongs):
    # G = nx.complete_graph(songs, nx.DiGraph())
    # data = {
    #     "skipped": 32,
    #     "played": 10,
    #     "weight": float(10/32)
    # }
    # G.edges(data = True)
    # nx.set_edge_attributes(G, 32, "skipped")
    # nx.set_edge_attributes(G, 10, "played")
    # nx.set_edge_attributes(G, float(10/32), "weight")
    G = None
    G = nx.DiGraph()

    for song in likedSongs:
        # print(song["id"])
        G.add_node(song["id"], name=song["name"], tags=[], skipped=[], artist=song["artist"], cover=song["image"]["url"], uri=song["uri"], songID=song["id"])


    # G.add_nodes_from(songs)
    imageB64 = saveGraphImage(G)
    return {"model": storeGraphJSON(G), "graphImage": imageB64}

def skippedSong(graph, fromMood, toMood):
    G = None
    G = getGraphJSON(graph)

    print(fromMood, toMood)
    fromNode = G.nodes[fromMood]
    toNode = G.nodes[toMood]

    # Need to check if the edge between the two nodes exists:
    if G.has_edge(fromMood, toMood):
        updateEdgeAttributes(G, fromNode, toNode, True)
    else:
        # There is no edge in between the two nodes, we need to have a look at the skipped list to see if fromNode is allowed to connect to the toNode
        # print("edge data:", G[fromNode["songID"]][toNode["songID"]])

        # Get that skipped list first
        skippedList = G.nodes[fromMood]["skipped"] # is an array
        # Check if the toMood id exists in that list
        if toNode["songID"] in skippedList:
            # In this scenario we don't care that the song was skipped since its on the skipped list.
            # We could potentially, in the future, make a chance so that the edge comes back. Would be cool to see
            print("Song is in the skipped list, will ignore")
            imageB64 = saveGraphImage(G)
            return {"model": storeGraphJSON(G), "graphImage": imageB64}
        else:
            print("We can make a connection between the two")
            addNewEdgeBetween(G, fromNode["songID"], toNode["songID"])
            updateEdgeAttributes(G, fromNode, toNode, True)

    imageB64 = saveGraphImage(G)
    return {"model": storeGraphJSON(G), "graphImage": imageB64}

def playedSong(graph, fromMood, toMood):
    G = None
    G = getGraphJSON(graph)

    fromNode = G.nodes[fromMood]
    toNode = G.nodes[toMood]

    if G.has_edge(fromMood, toMood):
        updateEdgeAttributes(G, fromNode, toNode, False)
    else:
        skippedList = G.nodes[fromNode["songID"]]["skipped"] # is an array
        if toNode["songID"] in skippedList:
            # Removed the song from the skipped list
            G.nodes[fromNode["songID"]]["skipped"].remove(toNode["songID"])
            # Create the edge and update attribute
            addNewEdgeBetween(G, fromNode["songID"], toNode["songID"])
            updateEdgeAttributes(G, fromNode, toNode, False)

            imageB64 = saveGraphImage(G)
            return {"model": storeGraphJSON(G), "graphImage": imageB64}
        else:
            addNewEdgeBetween(G, fromNode["songID"], toNode["songID"])
            updateEdgeAttributes(G, fromNode, toNode, False)

            imageB64 = saveGraphImage(G)
            return {"model": storeGraphJSON(G), "graphImage": imageB64}
        
    imageB64 = saveGraphImage(G)
    return {"model": storeGraphJSON(G), "graphImage": imageB64}

def updateEdgeAttributes(G, fromNode, toNode, isSkip):
    # Will update the edge attributes depending on if a skip event happened and will evaluate the edge health
    # We are assuming that there is an edge between the two nodes
    if isSkip:
        print("edge from skip with edge:", G[fromNode["songID"]][toNode["songID"]])
        edgeData = G[fromNode["songID"]][toNode["songID"]]
        # Update the data now:
        newWeight = float(edgeData["played"] / (edgeData["skipped"]+1))
        if newWeight < CRITICAL_WEIGHT:
            # Delete the edge
            print("edge will have to get deleted")
            G.remove_edge(fromNode["songID"], toNode["songID"])
            # Add the toNode to the skipped list on the fromNode
            G.nodes[fromNode["songID"]]["skipped"].append(toNode["songID"])
            return
        else:
            G[fromNode["songID"]][toNode["songID"]].update(skipped=edgeData["skipped"]+1)
            G[fromNode["songID"]][toNode["songID"]].update(weight=newWeight)
    else:
        # This is when a song has been played through completely
        # We are also assuming that the edge exists here
        edgeData = G[fromNode["songID"]][toNode["songID"]]
        # Update the data now:
        newWeight = float((edgeData["played"]+1) / (edgeData["skipped"]))
        G[fromNode["songID"]][toNode["songID"]].update(played=edgeData["played"]+1)
        G[fromNode["songID"]][toNode["songID"]].update(weight=newWeight)
        return
    return

def mood2mood(graph, fromMood, toMood, duration):
    G = None
    G = getGraphJSON(graph)

    # fromNodes = [x for x,y in G.nodes(data=True) if y['tags'].counts(fromMood)==1]
    attributes = nx.get_node_attributes(G, "tags")
    fromNodes = []
    toNodes = []
    for key,value in attributes.items():
        # Loop over each value (array), to see if the string matches either the fromMood or toMood and then add it to the subsequent nodes array
        for mood in value:
            if mood == fromMood:
                fromNodes.append(G.nodes[key])
            
            if mood == toMood:
                toNodes.append(G.nodes[key])
        # print(key, value)
    
    # print(fromMood, fromNodes)
    # print(toMood, toNodes)

    # We now have both start and end nodes, need to select a start song from the start nodes list
    startSong = random.choice(fromNodes)

    numberOfSongs = (int(duration) // averageSongLength) - 2
    generatedQueue = nodeCrawl(G, startSong, numberOfSongs, toNodes)
    addNewEdgeBetween(G, generatedQueue[-1]["songID"], toNodes[0]["songID"])
    print("from:", generatedQueue[-1]["songID"], "to:", toNodes[0]["songID"])
    generatedQueue += toNodes
    imageB64 = saveGraphImage(G)
    # print(generatedQueue)
    # print(len(generatedQueue))

    return {"queue": generatedQueue, "model": storeGraphJSON(G), "graphImage": imageB64}

def nodeCrawl(G, currentNode, times, toNodes, queue=None):

    if queue is None:
        queue = []
    if times == 0:
        queue.append(currentNode)
    else:
        queue.append(currentNode)
        # This is where the node crawling logic should go
        # print("Just putting something here")
        neighbours = list(G.neighbors(currentNode["songID"]))

        if len(neighbours) > 0:
            randNum = random.random()
            # print(randNum)
            if randNum < SPLITTING_VAL:
                # We want to go explore one of the connected neighbours in this case, so grab a random one
                # Get the list of all ids already existing in queue
                queueIDs = [x["songID"] for x in queue]
                # print("current ids: ", currentNode["songID"], end='\n')
                # print("queue ids: ", queueIDs, end='\n')
                # print("neighbour ids: ", neighbours, end='\n')
                
                # Only have a look at the neighbours that don't appear in the queue
                # unvisited = list(set(queueIDs).symmetric_difference(neighbours))
                unvisited = list(set(neighbours).difference(queueIDs))
                # print("unvisited: ", unvisited, end='\n')

                if len(unvisited) == 0:
                    # Explore new node here
                    nextNode = selectNewRandom(G, queue, currentNode, toNodes)
                    nodeCrawl(G, nextNode, times-1, toNodes, queue)
                    # return # This would have to get removed when we get the new random node.
                else:
                    nextNodeID = random.choice(unvisited)
                    nextNode = G.nodes[nextNodeID]
                    # print(nextNode, end='\n')
                    # Now send this back to the recursive function
                    nodeCrawl(G, nextNode, times-1, toNodes, queue)
            else:
                # This is when you would try to form a new connection with a new node
                nextNode = selectNewRandom(G, queue, currentNode, toNodes)
                nodeCrawl(G, nextNode, times-1, toNodes, queue)
        else:
            # We have no neighbours and must explore a completely new node
            nextNode = selectNewRandom(G, queue, currentNode, toNodes)
            nodeCrawl(G, nextNode, times-1, toNodes, queue)

        # print(neighbours)
    
    # print("finished queue: ", queue)

    return queue

def selectNewRandom(G, queue, currentNode, toNodes):
    # We need to take the graph, and return a node that isn't already in the queue. Then create an edge between the current node and the new one.

    # Create a blacklist so it doesn't pull any songs from there, the blacklist should contain:
    # the current queue, the toNodes array, as well as the nodes from the currentNodes skipped list
    blacklist = []

    allNodes = list(G.nodes)
    queueIDs = [x["songID"] for x in queue]
    toIDs = [x["songID"] for x in toNodes]

    blacklist += queueIDs
    blacklist += toIDs
    blacklist += currentNode["skipped"] # could potentially only set these from a percent chance? 

    print(blacklist, end='\n')
    print(len(blacklist), end='\n')

    nonVisited = list(set(allNodes).difference(blacklist))
    # print("all non-visited: ", nonVisited)

    randomNode = random.choice(nonVisited)
    
    addNewEdgeBetween(G, currentNode["songID"], randomNode)
    # saveGraphImage(G)
    return G.nodes[randomNode]

def addNewEdgeBetween(G, fromNode, toNode):
    if not G.has_edge(fromNode, toNode):
        G.add_edge(fromNode, toNode)
        G[fromNode][toNode].update(skipped=2)
        G[fromNode][toNode].update(played=1)
        G[fromNode][toNode].update(weight=float(1/2))
    return

def tagSongs(graph, songs, tag):
    G = None
    G = getGraphJSON(graph)

    # We want to make a connected graph with all of the songs passed in the songs (array of objects)
    nodes = []
    currentTags = nx.get_node_attributes(G, "tags")
    # print(currentTags)
    for song in songs:
        nodes.append(song["id"])

        if currentTags[song["id"]] is None:
            G.add_node(song["id"], name=song["title"], tags=tag, skipped=[], artist=song["artist"], cover=song["cover"], uri=song["uri"], songID=song["id"])
        else:
            newTags = currentTags[song["id"]]
            newTags.append(tag)
            G.add_node(song["id"], name=song["title"], tags=newTags, skipped=[], artist=song["artist"], cover=song["cover"], uri=song["uri"], songID=song["id"])
            
    connected = nx.complete_graph(nodes, nx.DiGraph())
    connected.edges(data = True)
    nx.set_edge_attributes(connected, 2, "skipped")
    nx.set_edge_attributes(connected, 1, "played")
    nx.set_edge_attributes(connected, float(1/2), "weight")

    G.edges(data=True)

    # Need to do a for loop to add both the nodes as well as the associated edges
    for node_from, node_to, edge_data in list(connected.edges(data=True)):  # networkx 2.4 doesn not have key parameter
        G.add_edge(node_from, node_to, **edge_data)
    # G.add_edges_from(connected.edges)

    saveGraphImage(G)
    return storeGraphJSON(G)

def saveGraphImage(G):
    labels = nx.get_node_attributes(G,'name')

    options = {"node_size": 150}

    plt.figure(figsize=(10,10), dpi=100)
    plt.axis("off")
    pos = nx.kamada_kawai_layout(G, )
    nx.draw(G,with_labels = True, labels=labels, pos=pos, font_weight='normal',node_size=60,font_size=5)
    # plt.show(block=False)
    # plt.tight_layout()
    plt.savefig("Graph.png", format="PNG")
    my_stringIObytes = io.BytesIO()
    plt.savefig(my_stringIObytes, format='jpg')
    my_stringIObytes.seek(0)
    my_base64_jpgData = base64.b64encode(my_stringIObytes.read()).decode()
    return my_base64_jpgData

def storeGraphJSON(graph):
    return nx.node_link_data(graph)

def getGraphJSON(json):
    return nx.node_link_graph(json)

def newSong(graph, song):
    if not graph.has_node(song):
        graph.add_node(song, tags=[])