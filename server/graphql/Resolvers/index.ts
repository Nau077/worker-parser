import { IResolvers } from "graphql-tools"
import searchResultResolvers from "./SearchResult"
import fetchSitesResolvers from "./FetchSites"


const resolvers: IResolvers[] = [searchResultResolvers, fetchSitesResolvers]

export default resolvers