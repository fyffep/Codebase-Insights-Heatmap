import { randomInt } from "crypto";


export class FileObject {
    id: number;
    name: string;
    sloc: number;
    totalCommits: number;
    totalAuthors: number;
    overallHeatScore: number;
    goodToBadCommitRatio: number;
    coupledTo: number[];
    constructor(id: number, 
                name: string, 
                sloc: number, 
                totalCommits: number,
                totalAuthors: number,
                overallHeatScore: number,
                goodToBadCommmitRatio: number,
                coupledTo: number[]
                ){
        this.id = id;
        this.name = name;
        this.sloc = sloc;
        this.totalCommits = totalCommits;
        this.totalAuthors = totalAuthors;
        this.overallHeatScore = overallHeatScore;
        this.goodToBadCommitRatio = goodToBadCommmitRatio;
        this.coupledTo = coupledTo;
    }
}

export function mockCodeMapGETRequest(): object {
    return {};
}

export function generateFile(nameLength: number, extension: string, 
                id: number, coupledTo: number[]): FileObject {
    let file = new FileObject(
        id,
        randomFileName(nameLength, extension),
        Math.random() * 1000,
        Math.random() * 50,
        Math.random() * 25,
        Math.random() * 100,
        Math.random(),
        coupledTo
    );
    return file;
}

export function randomFileName(length: number, extension: string): string {
    let name = "";
    let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    for (let i = 0; i < length; i++) {
        name += characters.charAt(Math.random() * characters.length);
    }
    name += extension;
    return name;
}