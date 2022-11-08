using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.ML;
using Microsoft.ML.Data;

namespace godot_net_server
{
    public class OnnxModelScorer
    {
        private readonly string modelLocation;
        private readonly MLContext mlContext;

        public OnnxModelScorer(string modelLocation, MLContext mlContext)
        {
            this.modelLocation = modelLocation;
            this.mlContext = mlContext;
        }

        public IEnumerable<float> Score(IDataView data)
        {
            var model = LoadModel(data);

            var prediction = PredictDataUsingModel(data, model);

            return prediction;
        }
        
        private ITransformer LoadModel(IDataView dataView)
        {
            Console.WriteLine("Read model");
            Console.WriteLine($"Model location: {modelLocation}");


            // Define scoring pipeline
            var pipeline = mlContext.Transforms.ApplyOnnxModel(modelFile: modelLocation,
                outputColumnNames: new[] {"activation_3"}, inputColumnNames: new[] {"conv2d_1_input"});

            // Fit scoring pipeline
            var model = pipeline.Fit(dataView);

            return model;
        }

        private IEnumerable<float>? PredictDataUsingModel(IDataView testData, ITransformer model)
        {
            IDataView scoredData = model.Transform(testData);

            IEnumerable<float[]> probabilities = scoredData.GetColumn<float[]>("activation_3");

            return probabilities.FirstOrDefault();
        }
    }
}