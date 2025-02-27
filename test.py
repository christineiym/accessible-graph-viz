import networkx as nx


def main():
    # Example usage
    graphml_file = "sitterson-brooks.graphml"  # Replace with your actual file
    start_node = "1"  # Replace with the actual starting node ID
    G = nx.read_graphml(graphml_file)
    
    if start_node not in G:
        print(f"Error: Node '{start_node}' not found in the graph.")
        return
    
    # Perform BFS traversal
    bfs_order = list(nx.bfs_tree(G, start_node))
    
    # Print BFS traversal order
    print("BFS Traversal Order:")
    print(" -> ".join(bfs_order))


if __name__ == "__main__":
    main()