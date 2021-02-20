import { IResolvers } from "graphql-tools"
import  search  from "../../parser"

interface SearchResult {
    title?: string,
    url?: string,
    description?: string
}



const searchResult:SearchResult = {
    title: "Niggers",
    url: "niggers.com/niggers",
    description: "I'm a Nigger"
}

const searchResultResolvers:IResolvers = {
    Query: {
        getResult: async (_, {searchString, site})  => {
            try {
                console.log(searchString)
                const results = await search(searchString, site)
                return results
            }
            catch (e) {
                console.log(e)
                return [searchResult]
            }
        }
    }
}

export default searchResultResolvers
