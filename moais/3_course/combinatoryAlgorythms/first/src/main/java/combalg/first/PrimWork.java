package combalg.first;

import combalg.common.Pair;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

public class PrimWork {
    public static Pair<String, String> prim(String[] args) {
        try {
            var arg= args[0];
        }
        catch (ArrayIndexOutOfBoundsException e){
            throw new IllegalArgumentException("No argument for input file or output file given");
        }

        var read = getInput(args);
        assert read != null;
        var limit=Integer.parseInt(read.get(0));
        var list = getPrimInput(read, limit);
        return new Pair<>(getPrimOutput(list), args[1]) ;
    }

    private static List<String> getInput(String[] args) {
        var path = Paths.get(args[0]);
        List<String> read = tryGetStrings(path);
        return read;
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

    private static ArrayList<VertexImpl> getPrimInput(List<String> read, int limit) {
        var list = new ArrayList<VertexImpl>();
        for (int i = 1; i< limit +1; i++){
            list.add(new VertexImpl(String.valueOf(i)));
        }

        for (int i = 1; i < limit +1; i++) {
            var line = read.get(i).split(" ");
            String label = String.valueOf(i);
            for (int j = 0; j < line.length; j++) {
                var number =Integer.parseInt(line[j]);
                var labelToAdd = String.valueOf(j+1);
                if (number == 32767) continue;
                getVertexByLabel(list, label).addEdge(getVertexByLabel(list, labelToAdd),new Edge(number));
            }
        }
        return list;
    }

    private static String getPrimOutput(List<VertexImpl> list) {
        var prim = new Prim(list);
        prim.run();
        prim.resetPrintHistory();
        return prim.minimumSpanningTreeToStringInFormat();
    }
    private static VertexImpl getVertexByLabel(List<VertexImpl> list, String labelToAdd) {
        return list
                .stream()
                .filter(x -> Objects.equals(x.getLabel(), labelToAdd))
                .findAny()
                .get();
    }
}
