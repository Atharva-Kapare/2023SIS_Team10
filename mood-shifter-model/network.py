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

def createNewNetwork(songs):
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

    G = nx.DiGraph()
    G.add_nodes_from(songs)
    
    nx.draw(G,with_labels = True)
    plt.show(block=False)
    plt.savefig("Graph.png", format="PNG")

    return storeGraphJSON(G)

def storeGraphJSON(graph):
    return nx.node_link_data(graph)

def getGraphJSON(json):
    return nx.node_link_graph(json)

def newSong(graph, song):
    if not graph.has_node(song):
        graph.add_node(song, tags=[])