export class ContributorObject {
    id: number;
    name: string;
    email: string;
    knowledgeScore: number;

    constructor(id: number, name: string,  email: string, knowledgeScore: number
        ){
            this.id = id;
            this.name = name;
            this.email = email;
            this.knowledgeScore = knowledgeScore;
        }
}

export class Link {
    source: number;
    target: number;
    constructor(source: number, target: number)
    {
        this.source = source;
        this.target = target;
    }
}

export async function mockKnowledgeGraphGETRequest(contributors: number){
    let contributorList: ContributorObject[] = [];
    for (let i = 0; i < contributors; i++)
    {
        contributorList.push(new ContributorObject(i, "Bob", i.toString().concat("@gmail.com"), i+5));
    }
    let links: Link[] = [];
    for (let i = 0; i < contributors; i++)
    {
        if (i % 2 === 0 && i > 1)
        {
            links.push(new Link(i, i-1));
        }
    }
    let returnObject = {nodes: contributorList, links: links};
    return returnObject;
}