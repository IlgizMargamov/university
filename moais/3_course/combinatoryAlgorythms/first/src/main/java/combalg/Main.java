package combalg;

import combalg.first.PrimWork;
import combalg.second.FordFulkerson;
import combalg.second.Vertex;

import java.io.FileWriter;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;

public class Main {
    public static void main(String[] args) {
        var input = getInput(args).toArray();
        var number =Integer.parseInt((String) input[0]);
        var cap = new int[number][number];
        for (int i = 1; i < number+1; i++) {
            var line = input[i].toString().split(" ");
            for (int j = 0; j < line.length; j++) {
                cap[i-1][j]=Integer.parseInt(line[j]);
            }
        }

        var result = FordFulkerson.maxFlow(cap,
                Integer.parseInt(input[number+1].toString()),
                Integer.parseInt(input[number+2].toString()));
        var sb= new StringBuilder();
        for (int i = 0; i < result.getValue().length; i++) {
            for (int j = 0; j < result.getValue().length; j++) {
                sb.append(result.getValue()[i][j]+" ");
            }
            sb.append("\n");
        }
        sb.append(result.getKey());
        writeResultToFile(args[1], sb.toString());
        //prim(args);
    }

    private static Vertex<String> getVertex(ArrayList<Vertex<String>> list, int j) {
        return list.stream().filter(x -> Objects.equals(x.getData(), String.valueOf(j))).findFirst().get();
    }

    private static List<String> getInput(String[] args) {
        var path = Paths.get(args[0]);
        return tryGetStrings(path);
    }
    private static List<String> tryGetStrings(Path path) {
        List<String> read = null;
        try {
            read = Files.readAllLines(path);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return read;
    }
    private static void prim(String[] args) {
        var primResult = PrimWork.prim(args);
        writeResultToFile(primResult.getKey(), primResult.getValue());
    }

    private static void writeResultToFile(String outputFileName, String result){
        try (var writer = new FileWriter(outputFileName)) {
            writer.write(result);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
