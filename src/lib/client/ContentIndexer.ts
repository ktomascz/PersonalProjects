import { SearchContent } from "@/interfaces/Markdown";
import * as JsSearch from "js-search";
import { getLocalSearchIndex } from "./utils";

// JS Singleton implementation !!! 
class ContentIndexer {
    private static instance: ContentIndexer;

        // ! - definite assigment assertion 
    private searchEngine!: JsSearch.Search;

    public static get Instance() {
        return this.instance || (this.instance = new this());
    }

    constructor() {
        this.buildIndex();
    }

    public search(query: string): SearchContent[] {
        const results = this.searchEngine.search(query);
        return results as SearchContent[]
    }

    private buildIndex() {
    // intialize search engine
    this.searchEngine = new JsSearch.Search("slug")

    // build index
    this.searchEngine.addIndex("title");
    this.searchEngine.addIndex("description")

    // add documents to engine
    this.searchEngine.addDocuments(getLocalSearchIndex())
    }
}

export default ContentIndexer.Instance;