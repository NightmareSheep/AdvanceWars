namespace Graph {
    export class ReachableNodesAndPaths<T extends INode> {

        constructor(public reachableNodes: T[], private pathInfo: Map<string,string>) {}

        GetPath(destination: T) {
            let idPath = this.GetIdPath(destination);
            let path = [];
            for (let i = 0; i < idPath.length; i++) {
                let tileId = idPath[i];
                let tile = this.reachableNodes.find(t => t.Id == tileId);
                path.push(tile);
            }
            return path;
        }

        GetIdPath(destination: T) : string[] {
            if (!this.reachableNodes || this.reachableNodes.indexOf(destination) === -1)
                throw new Error("Path not found");


            let path: string[] = [destination.Id];
            let currentTile = destination.Id;
            while (this.pathInfo.get(currentTile)) {
                path.push(this.pathInfo.get(currentTile));
                currentTile = this.pathInfo.get(currentTile);
            }
            path.reverse();
            return path;
        }
    }
}