import { IResolvers } from "graphql-tools"
import  search  from "../../parser"

interface SearchResult {
    title: string,
    url: string,
    description: string
}



const searchResult:SearchResult = {
    title: "Niggers",
    url: "niggers.com/niggers",
    description: "I'm a Nigger"
}

const searchResultResolvers:IResolvers = {
    Query: {
        getResult: async (searchString:string)  => {
            try {
                console.log(searchString)
                const searchParams = searchString
                const results = await search()
                return [searchResult]
            }
            catch (e) {
                console.log(e)
                return [searchResult]
            }
        }
    }
}

export default searchResultResolvers
