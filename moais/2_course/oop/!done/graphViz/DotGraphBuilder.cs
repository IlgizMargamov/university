using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using NUnit.Framework;

namespace FluentApi.Graph
{
    public class DotGraphBuilder
    {
        public static DirectedGraph DirectedGraph(string graphName)
        {
            return new DirectedGraph(new Graph(graphName, true, false));
        }

        public static UndirectedGraph UndirectedGraph(string graphName)
        {
            return new UndirectedGraph(new Graph(graphName, false, false));
        }
    }

    public abstract class GraphBuilder
    {
        private Graph Graph { get; }

        public GraphBuilder()
        {
        }

        public GraphBuilder(Graph graph)
        {
            Graph = graph;
        }

        public string Build()
        {
            return Graph.ToDotFormat();
        }

        public GraphEdgeBuilder AddEdge(string sourceNode, string destinationNode)
        {
            return new GraphEdgeBuilder(Graph, Graph.AddEdge(sourceNode, destinationNode).Attributes);
        }

        public GraphNodeBuilder AddNode(string name)
        {
            return new GraphNodeBuilder(Graph, Graph.AddNode(name).Attributes);
        }

        public static GraphBuilder CreateGraphBuilder(Graph graph)
        {
            return graph.Directed ? (GraphBuilder) new DirectedGraph(graph) : new UndirectedGraph(graph);
        }
    }

    public abstract class GraphElementBuilder
    {
        protected Graph graph { get; }

        protected Dictionary<string, string> Attributes { get; }

        protected GraphElementBuilder(Graph graph, Dictionary<string, string> attributes)
        {
            this.graph = graph;
            Attributes = attributes;
        }

        public GraphEdgeBuilder AddEdge(string sourceNode, string destinationNode)
        {
            return new GraphEdgeBuilder(graph, graph.AddEdge(sourceNode, destinationNode).Attributes);
        }

        public GraphNodeBuilder AddNode(string name)
        {
            return new GraphNodeBuilder(graph, graph.AddNode(name).Attributes);
        }

        public string Build() => graph.ToDotFormat();
    }

    public class GraphNodeBuilder : GraphElementBuilder
    {
        private GraphNodeAttributesBuilder attributesBuilder;

        public GraphNodeBuilder(Graph graph, Dictionary<string, string> attributes) : base(graph, attributes)
        {
            attributesBuilder = new GraphNodeAttributesBuilder(attributes);
        }

        public GraphBuilder With(Action<GraphNodeAttributesBuilder> func)
        {
            func(attributesBuilder);
            return GraphBuilder.CreateGraphBuilder(graph);
        }
    }

    public class GraphEdgeBuilder : GraphElementBuilder
    {
        private GraphEdgeAttributesBuilder attributesBuilder;

        public GraphEdgeBuilder(Graph graph, Dictionary<string, string> attributes) : base(graph, attributes)
        {
            attributesBuilder = new GraphEdgeAttributesBuilder(attributes);
        }

        public GraphBuilder With(Action<GraphEdgeAttributesBuilder> func)
        {
            func(attributesBuilder);
            return GraphBuilder.CreateGraphBuilder(graph);
        }
    }

    public abstract class GraphAttributesBuilder<T>
    {
        protected Dictionary<string, string> attrs;

        public GraphAttributesBuilder(Dictionary<string, string> attributes)
        {
            attrs = attributes;
        }

        protected void AddAttribute(string attributeName, object value)
        {
            attrs.Add(attributeName.ToLower(), value.ToString().ToLower());
        }

        public T Label(string label)
        {
            AddAttribute(nameof(label), label);
            return GetThis();
        }

        public T FontSize(int fontSize)
        {
            AddAttribute(nameof(fontSize), fontSize);
            return GetThis();
        }

        public T Color(string color)
        {
            AddAttribute(nameof(color), color);
            return GetThis();
        }

        protected abstract T GetThis();
    }

    public class GraphEdgeAttributesBuilder : GraphAttributesBuilder<GraphEdgeAttributesBuilder>
    {
        public GraphEdgeAttributesBuilder(Dictionary<string, string> attributes) : base(attributes)
        {
        }

        public GraphEdgeAttributesBuilder Weight(double weight)
        {
            attrs.Add(nameof(weight), weight.ToString(CultureInfo.InvariantCulture));
            return this;
        }

        protected override GraphEdgeAttributesBuilder GetThis()
        {
            return this;
        }
    }

    public class GraphNodeAttributesBuilder : GraphAttributesBuilder<GraphNodeAttributesBuilder>
    {
        public GraphNodeAttributesBuilder(Dictionary<string, string> attributes) : base(attributes)
        {
        }

        public GraphNodeAttributesBuilder Shape(NodeShape shape)
        {
            AddAttribute(nameof(shape), shape);
            return this;
        }

        protected override GraphNodeAttributesBuilder GetThis()
        {
            return this;
        }
    }

    public class DirectedGraph : GraphBuilder
    {
        public DirectedGraph(Graph graph) : base(graph)
        {
        }
    }

    public class UndirectedGraph : GraphBuilder
    {
        public UndirectedGraph(Graph graph) : base(graph)
        {
        }
    }

    public enum NodeShape
    {
        Box,
        Ellipse
    }
}