import { IResolvers } from "graphql-tools"
import fs from "fs";

const sites_str: any = fs.readFileSync("./config/sites.json");

const fetchSitesResolvers:IResolvers = {
    Query: {
        fetchSites: (_)  => {
            const sites = JSON.parse(sites_str)
 
            return sites
            }
    }
}

export default fetchSitesResolvers
