import matplotlib as mpl
import matplotlib.pyplot as plt
import networkx as nx

import random

mpl.use('agg')

averageSongLength = 3 # in mins

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
        G.add_node(song["id"], name=song["name"], tags=[], skipped=[], artist=song["artist"], cover=song["image"]["url"], uri=song["uri"])


    # G.add_nodes_from(songs)
    saveGraphImage(G)

    return storeGraphJSON(G)


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
    
    print(fromMood, fromNodes)
    print(toMood, toNodes)

    # We now have both start and end nodes, need to select a start song from the start nodes list
    startSong = random.choice(fromNodes)

    numberOfSongs = (duration // averageSongLength) - 2
    generatedQueue = nodeCrawl(G, startSong, numberOfSongs)

    return generatedQueue

def nodeCrawl(G, currentNode, times, queue=None):

    if queue is None:
        queue = []
        queue.append(currentNode)
    
    if times == 0:
        return queue
    else:
        # This is where the node crawling logic should go
        print("Just putting something here")
        

    return queue

def addNewEdgeBetween(G, fromNode, toNode):
    return G.add_edge(fromNode, toNode, skipped=32, played=10, weight=float(10/32))

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
            G.add_node(song["id"], name=song["title"], tags=tag, skipped=[], artist=song["artist"], cover=song["cover"], uri=song["uri"])
        else:
            newTags = currentTags[song["id"]]
            newTags.append(tag)
            G.add_node(song["id"], name=song["title"], tags=newTags, skipped=[], artist=song["artist"], cover=song["cover"], uri=song["uri"])
            
    connected = nx.complete_graph(nodes, nx.DiGraph())
    connected.edges(data = True)
    nx.set_edge_attributes(connected, 32, "skipped")
    nx.set_edge_attributes(connected, 10, "played")
    nx.set_edge_attributes(connected, float(10/32), "weight")

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

    
    plt.figure(figsize=(10,10), dpi=200)
    plt.axis("off")
    pos = nx.spring_layout(G, k=0.5)
    nx.draw(G,with_labels = True, labels=labels, pos=pos, font_weight='normal',node_size=60,font_size=8)
    # plt.show(block=False)
    # plt.tight_layout()
    plt.savefig("Graph.png", format="PNG")

def storeGraphJSON(graph):
    return nx.node_link_data(graph)

def getGraphJSON(json):
    return nx.node_link_graph(json)

def newSong(graph, song):
    if not graph.has_node(song):
        graph.add_node(song, tags=[])