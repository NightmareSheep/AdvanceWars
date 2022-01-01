//declare var gameResources: any;
//declare var filters: any;
//declare var terrainWidth: number;
//declare var terrainHeight: number;
//declare var imageResources: any;
//declare var hotkeyEvents: any;
//declare var viewport: any;
//declare var mainContainer: PIXI.Container;


interface GameHubProxy {
    client: GameClient;
    server: GameServer;
    invoke(...args: any[]): any;
}
interface GameClient {
}
interface GameServer {
    executeMove(data: any): boolean;
    getRandom(id: string): any;
    getGuid(id: string): any;
}

interface IValue {
    value: () => number;
}

declare class PriorityQueue<T extends IValue> {
    constructor(comparator: IComparator<T>)
    length: number;
    queue(insertObj: T): void;
    peek(): T;
    dequeue(): T;
    clear(): void;
}

declare interface IComparator<T> {
    comparator: (a: T, b: T) => number;
}