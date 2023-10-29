import matplotlib as mpl
import matplotlib.pyplot as plt
import networkx as nx

mpl.use('agg')

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
        print(song["id"])
        G.add_node(song["id"], name=song["name"], tags=[], skipped=[])


    # G.add_nodes_from(songs)
    saveGraphImage(G)

    return storeGraphJSON(G)


def mood2mood(graph, fromMood, toMood, duration):
    G = None
    G = getGraphJSON(graph)

    fromNodes = [x for x,y in G.nodes(data=True) if y['tags'].counts(fromMood)==1]
    print(fromMood)

    return False

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
            G.add_node(song["id"], name=song["name"], tags=[tag])
        else:
            newTags = currentTags[song["id"]]
            newTags.append(tag)
            G.add_node(song["id"], name=song["name"], tags=[newTags])
            
    connected = nx.complete_graph(nodes, nx.DiGraph())
    G.add_edges_from(connected.edges)

    saveGraphImage(G)
    return storeGraphJSON(G)

def saveGraphImage(G):
    labels = nx.get_node_attributes(G,'name')

    options = {"node_size": 150}

    
    plt.figure(figsize=(10,10), dpi=60)
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