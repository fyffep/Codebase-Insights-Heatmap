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

//function generateFile(): FileObject {
    //return new FileObject()
//}

export function randomFileName(length: number, extension: string): string {
    let name = "";
    let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    for (let i = 0; i < length; i++) {
        name += characters.charAt(Math.random() * characters.length);
    }
    name += extension;
    return name;
}