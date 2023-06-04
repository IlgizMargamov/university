package combalg.first;

import combalg.common.Algorythm;
import combalg.common.Pair;

import java.util.Iterator;
import java.util.List;
import java.util.Map;

public class Prim implements Algorythm {

    private final List<VertexImpl> graph;

    public Prim(List<VertexImpl> graph){
        this.graph = graph;
    }

    public void run(){
        if (graph.size() > 0){
            graph.get(0).setVisited(true);
        }
        while (isDisconnected()){
            Edge nextMinimum = new Edge(Integer.MAX_VALUE);
            VertexImpl nextVertex = graph.get(0);
            for (VertexImpl vertex : graph){
                if (vertex.isVisited()){
                    Pair<VertexImpl, Edge> candidate = vertex.nextMinimum();
                    if (candidate.getValue().getWeight() < nextMinimum.getWeight()){
                        nextMinimum = candidate.getValue();
                        nextVertex = candidate.getKey();
                    }
                }
            }
            nextMinimum.setIncluded(true);
            nextVertex.setVisited(true);
        }
    }

    private boolean isDisconnected(){
        for (VertexImpl vertex : graph){
            if (!vertex.isVisited()){
                return true;
            }
        }
        return false;
    }

    public String originalGraphToString(){
        StringBuilder sb = new StringBuilder();
        for (VertexImpl vertex : graph){
            sb.append(vertex.originalToString());
        }
        return sb.toString();
    }

    public void resetPrintHistory(){
        for (VertexImpl vertex : graph){
            for (Map.Entry<VertexImpl, Edge> pair : vertex.getEdges().entrySet()) {
                pair.getValue().setPrinted(false);
            }
        }
    }

    public String minimumSpanningTreeToString(){
        StringBuilder sb = new StringBuilder();
        for (VertexImpl vertex : graph){
            sb.append(vertex.includedToString());
        }
        return sb.toString();
    }
    public String minimumSpanningTreeToStringInFormat(){
        var sb = new StringBuilder();
        var weight = 0;
        for (VertexImpl vertex : graph){
            var pair = vertex.includedToStringInFormat();
            sb.append(pair.getKey());
            weight+=pair.getValue();
            // if (vertex)
        }
        sb.append(weight);
        return sb.toString();
    }
}