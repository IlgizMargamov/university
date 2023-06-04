package combalg.second;

import combalg.common.Pair;

public class FordFulkerson {

    public static Pair<Integer, int[][]> maxFlow(int[][] cap, int s, int t) {
        for (int flow = 0; ; ) {
            int df = findPath(cap, new boolean[cap.length], s, t, Integer.MAX_VALUE);
            if (df == 0)
                return new Pair<Integer, int[][]>(flow, cap);
            flow += df;
        }
    }

    static int findPath(int[][] cap, boolean[] vis, int u, int t, int f) {
        if (u == t)
            return f;
        vis[u] = true;
        for (int v = 0; v < vis.length; v++)
            if (!vis[v] && cap[u][v] > 0) {
                int df = findPath(cap, vis, v, t, Math.min(f, cap[u][v]));
                if (df > 0) {
                    cap[u][v] -= df;
                    cap[v][u] += df;
                    return df;
                }
            }
        return 0;
    }
}