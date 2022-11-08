using System;
using System.Collections.Generic;
using System.Linq;

namespace Inheritance.Geometry.Visitor
{
    public abstract class Body
    {
        public Vector3 Position { get; }

        protected Body(Vector3 position)
        {
            Position = position;
        }

        public abstract Body Accept(IVisitor visitor);
    }

    public class Ball : Body
    {
        public double Radius { get; }

        public Ball(Vector3 position, double radius) : base(position)
        {
            Radius = radius;
        }

        public override Body Accept(IVisitor visitor)
        {
            return visitor.Visit(this);
        }
    }

    public class RectangularCuboid : Body
    {
        public double SizeX { get; }
        public double SizeY { get; }
        public double SizeZ { get; }

        public RectangularCuboid(Vector3 position, double sizeX, double sizeY, double sizeZ) : base(position)
        {
            SizeX = sizeX;
            SizeY = sizeY;
            SizeZ = sizeZ;
        }

        public override Body Accept(IVisitor visitor)
        {
            return visitor.Visit(this);
        }
    }

    public class Cylinder : Body
    {
        public double SizeZ { get; }

        public double Radius { get; }

        public Cylinder(Vector3 position, double sizeZ, double radius) : base(position)
        {
            SizeZ = sizeZ;
            Radius = radius;
        }

        public override Body Accept(IVisitor visitor)
        {
            return visitor.Visit(this);
        }
    }

    public class CompoundBody : Body
    {
        public IReadOnlyList<Body> Parts { get; }

        public CompoundBody(IReadOnlyList<Body> parts) : base(parts[0].Position)
        {
            Parts = parts;
        }

        public override Body Accept(IVisitor visitor)
        {
            return visitor.Visit(this);
        }
    }

    public class BoundingBoxVisitor : IVisitor
    {
        public Body Visit(Ball ball)
        {
            var diameter = ball.Radius * 2;
            return new RectangularCuboid(ball.Position, diameter, diameter, diameter);
        }

        public Body Visit(Cylinder cylinder)
        {
            var diameter = cylinder.Radius * 2;
            return new RectangularCuboid(cylinder.Position, diameter, diameter, cylinder.SizeZ);
        }

        public Body Visit(CompoundBody compoundBody)
        {
            var rectangularCuboids = compoundBody.Parts
                .Select(x => (RectangularCuboid) x.Accept(new BoundingBoxVisitor()))
                .ToList();

            var maxX = rectangularCuboids.Max(x => x.Position.X + x.SizeX / 2);
            var minX = rectangularCuboids.Min(x => x.Position.X - x.SizeX / 2);
            var maxY = rectangularCuboids.Max(x => x.Position.Y + x.SizeY / 2);
            var minY = rectangularCuboids.Min(x => x.Position.Y - x.SizeY / 2);
            var maxZ = rectangularCuboids.Max(x => x.Position.Z + x.SizeZ / 2);
            var minZ = rectangularCuboids.Min(x => x.Position.Z - x.SizeZ / 2);

            var position = new Vector3(GetMean(maxX, minX), GetMean(maxY, minY), GetMean(maxZ, minZ));

            return new RectangularCuboid(position, GetSize(maxX, minX), GetSize(maxY, minY), GetSize(maxZ, minZ));
        }

        public Body Visit(RectangularCuboid rectangularCuboid)
        {
            return rectangularCuboid;
        }

        private double GetSize(double max, double min)
        {
            return max - min;
        }

        private double GetMean(double max, double min)
        {
            return (max + min) / 2;
        }
    }

    public class BoxifyVisitor : IVisitor
    {
        public Body Visit(Ball ball)
        {
            var diameter = ball.Radius * 2;
            return new RectangularCuboid(ball.Position, diameter, diameter, diameter);
        }

        public Body Visit(Cylinder cylinder)
        {
            var diameter = cylinder.Radius * 2;
            return new RectangularCuboid(cylinder.Position, diameter, diameter, cylinder.SizeZ);
        }

        public Body Visit(CompoundBody compoundBody)
        {
            var parts = compoundBody.Parts.Select(x => x.Accept(this)).ToList();
            return new CompoundBody(parts);
        }

        public Body Visit(RectangularCuboid rectangularCuboid)
        {
            return rectangularCuboid;
        }
    }

    public interface IVisitor
    {
        Body Visit(Ball ball);
        Body Visit(Cylinder cylinder);
        Body Visit(CompoundBody compoundBody);
        Body Visit(RectangularCuboid rectangularCuboid);
    }
}