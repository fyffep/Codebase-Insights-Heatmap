export class ContributorObject {
    id: number;
    username: string;
    email: string;
    knowledgeScore: number;
    weightsMap: Map<number, number>;

    constructor(id: number, username: string,  email: string, knowledgeScore: number, weightsMap: Map<number, number>
        ){
            this.id = id;
            this.username = username;
            this.email = email;
            this.knowledgeScore = knowledgeScore;
            this.weightsMap = weightsMap;
        }
}

export function mockKnowledgeGraphGETRequest(contributors: number) {
    let returnObject: ContributorObject[] = [];
    for (let i = 0; i < contributors; i++)
    {
        returnObject.push(new ContributorObject(i, i.toString(), i.toString().concat("@gmail.com"), i+5, new Map()));
    }
    return returnObject;
}