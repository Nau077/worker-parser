import { IResolvers } from "graphql-tools"
import searchResultResolvers from "./SearchResult"



const resolvers: IResolvers[] = [searchResultResolvers]

export default resolvers