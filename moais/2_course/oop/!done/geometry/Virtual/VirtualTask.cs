using System;
using System.Collections.Generic;
using System.Linq;

namespace Inheritance.Geometry.Virtual
{
    public abstract class Body
    {
        public Vector3 Position { get; }

        protected Body(Vector3 position)
        {
            Position = position;
        }

        public abstract bool ContainsPoint(Vector3 point);

        public abstract RectangularCuboid GetBoundingBox();
    }

    public class Ball : Body
    {
        public double Radius { get; }

        public Ball(Vector3 position, double radius) : base(position)
        {
            Radius = radius;
        }

        public override bool ContainsPoint(Vector3 point)
        {
            var vector = point - Position;
            var length2 = vector.GetLength2();
            return length2 <= Radius * Radius;
        }

        public override RectangularCuboid GetBoundingBox()
        {
            var diameter = Radius * 2;
            return new RectangularCuboid(Position, diameter, diameter, diameter);
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

        public override bool ContainsPoint(Vector3 point)
        {
            var minPoint = new Vector3(
                Position.X - SizeX / 2,
                Position.Y - SizeY / 2,
                Position.Z - SizeZ / 2);
            var maxPoint = new Vector3(
                Position.X + SizeX / 2,
                Position.Y + SizeY / 2,
                Position.Z + SizeZ / 2);

            return point >= minPoint && point <= maxPoint;
        }

        public override RectangularCuboid GetBoundingBox()
        {
            return new RectangularCuboid(Position, SizeX, SizeY, SizeZ);
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

        public override bool ContainsPoint(Vector3 point)
        {
            var vectorX = point.X - Position.X;
            var vectorY = point.Y - Position.Y;
            var length2 = vectorX * vectorX + vectorY * vectorY;
            var minZ = Position.Z - SizeZ / 2;
            var maxZ = minZ + SizeZ;

            return length2 <= Radius * Radius && point.Z >= minZ && point.Z <= maxZ;
        }

        public override RectangularCuboid GetBoundingBox()
        {
            var diameter = Radius * 2;
            return new RectangularCuboid(Position, diameter, diameter, SizeZ);
        }
    }

    public class CompoundBody : Body
    {
        public IReadOnlyList<Body> Parts { get; }

        private readonly Func<double, double, double> getSize = (max, min) => max - min;
        private readonly Func<double, double, double> getMean = (max, min) => (max + min) / 2;

        public CompoundBody(IReadOnlyList<Body> parts) : base(parts[0].Position)
        {
            Parts = parts;
        }

        public override bool ContainsPoint(Vector3 point)
        {
            return Parts.Any(body => body.ContainsPoint(point));
        }

        public override RectangularCuboid GetBoundingBox()
        {
            var rectangularCuboids = Parts
                .Select(x => x.GetBoundingBox())
                .ToList();

            var maxX = rectangularCuboids.Max(x => x.Position.X + x.SizeX / 2);
            var minX = rectangularCuboids.Min(x => x.Position.X - x.SizeX / 2);
            var maxY = rectangularCuboids.Max(x => x.Position.Y + x.SizeY / 2);
            var minY = rectangularCuboids.Min(x => x.Position.Y - x.SizeY / 2);
            var maxZ = rectangularCuboids.Max(x => x.Position.Z + x.SizeZ / 2);
            var minZ = rectangularCuboids.Min(x => x.Position.Z - x.SizeZ / 2);

            var position = new Vector3(getMean(maxX, minX), getMean(maxY, minY), getMean(maxZ, minZ));
            return new RectangularCuboid(position, getSize(maxX, minX), getSize(maxY, minY), getSize(maxZ, minZ));
        }
    }
}