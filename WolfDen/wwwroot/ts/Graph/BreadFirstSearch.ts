namespace Graph {
    export function BreadFirstSearch(root: INode, depth: number = 999): INode[] {
        let q = new Queue<NodeDistance>();
        let visitedIds: any = {};
        let visited: INode[] = [];
        q.push(new NodeDistance(root, 0));
        while (q._store.length > 0) {
            let nodeInfo = q.pop();
            if (nodeInfo.distance < depth)
                nodeInfo.node.Neighbours.forEach(function (neighbour) {
                    if (!visitedIds[neighbour.Id]) {
                        visitedIds[neighbour.Id] = true;
                        q.push(new NodeDistance(neighbour, nodeInfo.distance + 1));
                        visited.push(neighbour);
                    }
                })
        }

        return visited;
    }

    export function GetReachableNodesAndPaths<T extends INode>(root: T, getDistance: (a: INode, b: INode) => number, maxDistance: number = Infinity) {
        let previous = new Map<string, string>();
        let visitedNodes = [root];
        let visitedIds = {};
        visitedIds[root.Id] = true;
        let q = new PriorityQueue<NodeDistance>({ comparator: function (a: NodeDistance, b: NodeDistance) { return -(b.value() - a.value()); } });

        q.queue(new NodeDistance(root, 0));
        while (q.length > 0) {
            let nodeDistance = q.dequeue();           
            let node = nodeDistance.node;
            if (node.Neighbours)
                node.Neighbours.forEach(function (neighbour) {
                    var distance = nodeDistance.distance + getDistance(node, neighbour);
                    if (!visitedIds[neighbour.Id] && distance <= maxDistance) {
                        visitedIds[neighbour.Id] = true;
                        visitedNodes.push(neighbour as T);
                        previous.set(neighbour.Id, node.Id);
                        q.queue(new NodeDistance(neighbour, distance));
                    }
                });
        }
        return new ReachableNodesAndPaths(visitedNodes, previous);
    }

    class NodeDistance {
        value() { return this.distance; };
        constructor(public node: INode, public distance: number) {}
    }

    export interface INode {
        Neighbours: INode[];
        Id: string;
    }

    export class Queue<T> {
        _store: T[] = [];
        push(val: T) {
            this._store.push(val);
        }
        pop(): T | undefined {
            return this._store.shift();
        }
    }
}