def read_graph(name):
    with open(name) as f:
        n = int(f.readline())
        arr = []
        for line in f:
            line = line.strip()
            if line:
                arr.append([int(x) for x in line.split()])
        return n, arr

def write_neighbours_list(arr):
    print("Lista sąsiedztwa:")
    for line in arr:
        node = line[0]
        neighbors = line[1:]
        print(f"Sąsiadami wierzchołka {node} są:", ", ".join(map(str, neighbors)))

def list_to_matrix(arr, n):
    matrix = [[0] * n for _ in range(n)]
    for line in arr:
        node = line[0]
        for neighbor in line[1:]:
            if 0 <= neighbor < n:
                matrix[node][neighbor] = 1
                matrix[neighbor][node] = 1
    return matrix

def write_matrix(matrix):
    print("Macierz sąsiedztwa:")
    for row in matrix:
        print(" ".join(map(str, row)))

def main():
    n, arr = read_graph("graph.txt")
    print("Liczba wierzchołków:", n)
    write_neighbours_list(arr)
    matrix = list_to_matrix(arr, n)
    write_matrix(matrix)

if __name__ == "__main__":
    main()
