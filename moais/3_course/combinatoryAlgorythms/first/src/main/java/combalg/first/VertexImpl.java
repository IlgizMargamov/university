package combalg.first;

import combalg.common.Pair;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.Map;

public class VertexImpl implements Vertex {

    private String label = null;
    private Map<VertexImpl, Edge> edges = new HashMap<>();
    private boolean isVisited = false;

    public VertexImpl(String label) {
        this.label = label;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public Map<VertexImpl, Edge> getEdges() {
        return edges;
    }

    public void addEdge(VertexImpl vertex, Edge edge) {
        if (this.edges.containsKey(vertex)) {
            if (edge.getWeight() < this.edges.get(vertex).getWeight()) {
                this.edges.replace(vertex, edge);
            }
        } else {
            this.edges.put(vertex, edge);
        }
    }

    public boolean isVisited() {
        return isVisited;
    }

    public void setVisited(boolean visited) {
        isVisited = visited;
    }

    public Pair<VertexImpl, Edge> nextMinimum() {
        Edge nextMinimum = new Edge(Integer.MAX_VALUE);
        VertexImpl nextVertex = this;
        for (Map.Entry<VertexImpl, Edge> pair : edges.entrySet()) {
            if (!pair.getKey().isVisited()) {
                if (!pair.getValue().isIncluded()) {
                    if (pair.getValue().getWeight() < nextMinimum.getWeight()) {
                        nextMinimum = pair.getValue();
                        nextVertex = pair.getKey();
                    }
                }
            }
        }
        return new Pair<>(nextVertex, nextMinimum);
    }

    public String originalToString() {
        StringBuilder sb = new StringBuilder();
        for (Map.Entry<VertexImpl, Edge> pair : edges.entrySet()) {
            printIfNotPrintedYet(sb, pair);
        }
        return sb.toString();
    }

    public String includedToString() {
        StringBuilder sb = new StringBuilder();
        if (isVisited()) {
            for (Map.Entry<VertexImpl, Edge> pair : edges.entrySet()) {
                if (pair.getValue().isIncluded()) {
                    printIfNotPrintedYet(sb, pair);
                }
            }
        }
        return sb.toString();
    }

    public Pair<String, Integer> includedToStringInFormat() {
        StringBuilder sb = new StringBuilder();
        var weight = 0;
        var labels = new ArrayList<String>();
        if (isVisited()) {
            for (Map.Entry<VertexImpl, Edge> pair : edges.entrySet()) {
                labels.add(pair.getKey().getLabel());
                if (pair.getValue().isIncluded()) {
                    weight += printIfNotPrintedYetInFormat(sb, pair);
                }
            }

        }
        labels.sort(Comparator.naturalOrder());
        for (var l : labels) {
            sb.append(l);
            sb.append(" ");
        }
        sb.append(0);
        sb.append("\n");
        return new Pair<>(sb.toString(), weight);
    }

    private void printIfNotPrintedYet(StringBuilder sb, Map.Entry<VertexImpl, Edge> pair) {
        if (!pair.getValue().isPrinted()) {
            sb.append(getLabel());
            sb.append(" --- ");
            sb.append(pair.getValue().getWeight());
            sb.append(" --- ");
            sb.append(pair.getKey().getLabel());
            sb.append("\n");
            pair.getValue().setPrinted(true);
        }
    }

    private int printIfNotPrintedYetInFormat(StringBuilder sb, Map.Entry<VertexImpl, Edge> pair) {
        if (!pair.getValue().isPrinted()) {
            return pair.getValue().getWeight();
        }
        return 0;
    }
}