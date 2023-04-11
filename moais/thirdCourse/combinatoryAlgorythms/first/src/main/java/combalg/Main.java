package prim;

import prim.Edge;
import prim.Prim;
import prim.VertexImpl;

import java.io.FileWriter;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

public class Main {
    public static void main(String[] args) {
        try {
            var arg=args[0];
        }
        catch (ArrayIndexOutOfBoundsException e){
            throw new IllegalArgumentException("No argument for input file or output file given");
        }

        var path = Paths.get(args[0]);//("src/main/java/input.txt");
        List<String> read = null;
        try {
            read = Files.readAllLines(path);
        } catch (IOException e) {
            e.printStackTrace();
        }
        assert read != null;
        var limit=Integer.parseInt(read.get(0));
        var list = new ArrayList<VertexImpl>();
        for (int i=1;i<limit+1;i++){
            list.add(new VertexImpl(String.valueOf(i)));
        }

        for (int i = 1; i < limit+1; i++) {
            var line = read.get(i).split(" ");
            String label = String.valueOf(i);
            for (int j = 0; j < line.length; j++) {
                var number =Integer.parseInt(line[j]);
                var labelToAdd = String.valueOf(j+1);
                if (number == 32767) continue;
                getVertexByLabel(list, label)
                    .addEdge(getVertexByLabel(list, labelToAdd),new Edge(number));
            }
        }
        var prim = new Prim(list);
        prim.run();
        prim.resetPrintHistory();
        var output=prim.minimumSpanningTreeToStringInFormat();
        try {
            writeResultToFile(args[1], output);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private static void writeResultToFile(String outputFileName, String result) throws IOException {
        try (FileWriter writer = new FileWriter(outputFileName)) {
            writer.write(result);
        }
    }
    private static VertexImpl getVertexByLabel(List<VertexImpl> list, String labelToAdd) {
        return list
                .stream()
                .filter(x -> Objects.equals(x.getLabel(), labelToAdd))
                .findAny()
                .get();
    }
}
