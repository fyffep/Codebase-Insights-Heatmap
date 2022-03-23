import * as vscode from "vscode";
import * as mockKnowledgeGraph from "../../api/mockKnowledgeGraph";
import { ContributorObject, Link } from "../../api/mockKnowledgeGraph";
import { knowledgeGraphWebviewPanel } from "../webviewFactory";

export function knowledgeGraphHTML(args: Map<string, vscode.Uri>) {
  const cssUri = args.get("css");
  const d3Uri = args.get("d3");
  const knowledgeGraphScriptUri = args.get("knowledgeGraphScript");

  /*mockKnowledgeGraph.mockKnowledgeGraphGETRequest(46).then((responseData) => {
    console.log(responseData);
    if (knowledgeGraphWebviewPanel) {
      knowledgeGraphWebviewPanel.webview.postMessage(responseData);
    } else {
      console.error(
        "knowledgeGraphWebviewPanel was undefined when we tried to post the message to it"
      );
    }
  });*/

  if (knowledgeGraphWebviewPanel) {
    knowledgeGraphWebviewPanel.webview.postMessage(getKnowledgeGraph());
  } else {
    console.error(
      "knowledgeGraphWebviewPanel was undefined when we tried to post the message to it"
    );
  }

  return `
    <!DOCTYPE HTML>
    <HTML>
        <head>
            <meta charset="UTF-8" lang="en"/>
            <link rel="stylesheet" type="text/css" href="${cssUri}"/>
            <script src="${d3Uri}"></script>
        </head>
        <body>
            <div class="page">
                <h1> Knowledge Graph </h1>
                <svg id="graph" width="600" height="600">
                    <g class="links"/>
                    <g class="nodes"/>
                </svg>
            </div>
            <div id="controlPanel" class="sidepanel">
              <a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a>
              <button class="controlbtn" onclick="buttonExample()">I'm a button!</button>
            </div>
            <button class="openbtn" onclick="openNav()">&#9776; Toggle Control Panel</button>
        </body>
        <script src="${knowledgeGraphScriptUri}"/>
    </HTML>
    `;
}



export class KnowledgeResponse {
  pair: Map<string, KnowledgeObject>;

  constructor(pair: Map<string, KnowledgeObject>)
  {
    this.pair = pair;
  }
}

export class KnowledgeObject {
  first: number; //knowledge score / lines of code known
  second: string[];

  constructor(first: number, second: string[])
  {
    this.first = first;
    this.second = second;
  }
}

function getKnowledgeGraph()
{
  /*var response:any = mockKnowledgeGraph.knowledgeGraphResponse;
  console.log(response);
  for (const authorEmail in response)
  {
    var linesKnown = response[authorEmail].first;
    var fileArray: string[] = response[authorEmail].second;
    for (let i = 0; i < fileArray.length; i++)
    {
      console.log(fileArray[i]);
    }
  }
  console.log("Done");*/



  /*var response:any = mockKnowledgeGraph.knowledgeGraphResponse;
  //console.log(response);


  //Compute total lines in codebase
  var totalLinesInCodebase: number = 0;
  for (const authorEmail in response) {
    totalLinesInCodebase += response[authorEmail].first;
  }


  let contributorList: ContributorObject[] = [];
  let links: Link[] = [];

  var i: number = 0; //author ID
  for (const authorEmail in response)
  {
    //Add author to array
    var linesKnown = response[authorEmail].first;
    var knowledgeScore = (linesKnown / totalLinesInCodebase) * 100; //100 is an arbitrarily-chosen max size of a D3 circle
    var contributor: ContributorObject = new ContributorObject(i++, authorEmail, authorEmail, knowledgeScore);
    contributorList.push(contributor);

    
    /*var fileArray: string[] = response[authorEmail].second;
    for (let j = 0; j < fileArray.length; j++)
    {
      var filePath = fileArray[j];
    }*


  }*/


  //Create links between authors
  /*for (const authorEmail in response)
  {
    var fileArray: string[] = response[authorEmail].second;
    for (i = 0; i < fileArray.length; i++)
    {
      var filePath = fileArray[i];
      for (const otherAuthorEmail in response)
      {
        if (authorEmail !== otherAuthorEmail)
        {
          for (let j = 0; j < fileArray.length; j++)
          {
            var otherFilePath = fileArray[j];
            if (filePath === otherFilePath)
            {
              console.log(authorEmail + " and " +otherAuthorEmail+" are connected due to file "+otherFilePath);
              //links.push(new Link(i, j)); //author #i and #j are connected
  
              if (true || !links.find(link => link.source === j && link.target === i))
              {
                links.push(new Link(i, j));
                console.log("Connected "+i+", "+j);
              }
            }
          }
        }
      }
    }
  }

  return {nodes: contributorList, links: links};*/








  /*let contributorList: ContributorObject[] = [];
  let links: Link[] = [];

  var response:any = mockKnowledgeGraph.knowledgeGraphResponse;
  var contributorList: any[] = response.contributorList;
  for (const contributor:any in response.contributorList)
  {
    //var linesKnown = response[contributor].first;
    //var fileArray: string[] = response[contributor].second;
    console.log("contributor = "+contributor.id+", "+contributor["id"])
    /*for (let i = 0; i < fileArray.length; i++)
    {
      console.log(fileArray[i]);
    }*
  }*/






  var response:any = mockKnowledgeGraph.knowledgeGraphResponse;
  return response;
}