using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Runtime.Remoting.Metadata.W3cXsd2001;
using System.Text;
using NUnit.Framework.Internal;

namespace FluentApi.Graph
{
    public class DotGraphBuilder1
    {
        private Graph graph;

        public DotGraphBuilder1(Graph graph)
        {
            this.graph = graph;
        }

        public static DotGraphBuilder1 DirectedGraph(string graphName) =>
            new DotGraphBuilder1(new Graph(graphName, true, true));

        public static DotGraphBuilder1 UndirectedGraph(string graphName) =>
            new DotGraphBuilder1(new Graph(graphName, false, true));

        public LastNode AddNode(string node) => new LastNode(graph).AddNode(node);

        public LastEdge AddEdge(string s, string s1) => new LastEdge(graph).AddEdge(s,s1);

        public string Build()
        {
            var str = new StringBuilder();
            var w = new DotFormatWriter(new StringWriter(str));
            w.Write(graph);
            return str.ToString();
        }
    }


    public class LastNode
    {
        private Graph graph;
        private GraphNode node;

        public LastNode(Graph graph)
        {
            this.graph = graph;
        }

        public DotGraphBuilder1 With(Action<NodeBuilder> _) => new DotGraphBuilder1(graph);
        

        public DotGraphBuilder1 With(Func<NodeBuilder, NodeBuilder> func)
        {
            var builder = func(new NodeBuilder());
            foreach (var attribute in builder.Attributes.Keys)
            {
                node.Attributes.Add(attribute, builder.Attributes[attribute]);
            }
            return new DotGraphBuilder1(graph);
        }

        public LastNode AddNode(string node)
        {
            this.node = graph.AddNode(node);
            return this;
        }

        public LastEdge AddEdge(string s, string s1)
        {
            return new LastEdge(graph).AddEdge(s,s1);
        }

        public string Build()
        {
            var str = new StringBuilder();
            var w = new DotFormatWriter(new StringWriter(str));
            w.Write(graph);
            return str.ToString();
        }
    }

    public class LastEdge
    {
        private Graph graph;
        private GraphEdge edge;

        public LastEdge(Graph graph)
        {
            this.graph = graph;
        }

        public DotGraphBuilder1 With(Action<EdgeBuilder> _) => new DotGraphBuilder1(graph);

        public DotGraphBuilder1 With(Func<EdgeBuilder, EdgeBuilder> func)
        {
            var builder = func(new EdgeBuilder());
            foreach (var attribute in builder.Attributes.Keys)
            {
                edge.Attributes.Add(attribute, builder.Attributes[attribute]);
            }

            return new DotGraphBuilder1(graph);
        }

        public LastNode AddNode(string node)
        {
            return new LastNode(graph).AddNode(node);
        }

        public LastEdge AddEdge(string s, string s1)
        {
            edge = graph.AddEdge(s, s1);
            return this;
        }

        public string Build()
        {
            var str = new StringBuilder();
            var w = new DotFormatWriter(new StringWriter(str));
            w.Write(graph);
            return str.ToString();
        }
    }

    public abstract class AttributeBuilder<T>
    {
        public Dictionary<string, string> Attributes;

        protected AttributeBuilder()
        {
            Attributes = new Dictionary<string, string>();
        }

        public T Color(string color)
        {
            Attributes.Add("color", color);
            return ReturnThis();
        }

        public T FontSize(int size)
        {
            Attributes.Add("fontsize", size.ToString());
            return ReturnThis();
        }

        public T Label(string label)
        {
            Attributes.Add("label", label);
            return ReturnThis();
        }

        protected abstract T ReturnThis();
    }

    public class NodeBuilder : AttributeBuilder<NodeBuilder>
    {
        public NodeBuilder Shape(NodeShape1 shape)
        {
            Attributes.Add("shape", shape.Name);
            return this;
        }

        protected override NodeBuilder ReturnThis() => this;
    }

    public class EdgeBuilder : AttributeBuilder<EdgeBuilder>
    {
        public EdgeBuilder Weight(double weight)
        {
            Attributes.Add("weight", weight.ToString(CultureInfo.InvariantCulture));
            return this;
        }

        protected override EdgeBuilder ReturnThis() => this;
    }

    public class NodeShape1
    {
        public static NodeShape1 Box = new NodeShape1("box");
        public static NodeShape1 Ellipse = new NodeShape1("ellipse");
        public string Name;

        private NodeShape1(string name)
        {
            Name = name;
        }
    }
}