package combalg.second;

import java.util.HashMap;
import java.util.Map;

public class Vertex<T> {

    private final T data;

    private boolean visited;

    private Map<Vertex<T>, Integer> neighbors = new HashMap<>();

    public Vertex(T data){
        this.data=data;
    }

    public boolean isVisited() {
        return visited;
    }

    public Map<Vertex<T>, Integer> getNeighbors() {
        return neighbors;
    }

    public void setNeighbors(Map<Vertex<T>, Integer> neighbors) {
        this.neighbors = neighbors;
    }

    public void setVisited(boolean visited) {
        this.visited = visited;
    }

    public T getData(){
        return data;
    }
}