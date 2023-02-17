import fs from "fs";
import { join } from "path";
import { ContentItemName, MarkdownContent, MarkdownItem, SearchContent } from "@/interfaces/Markdown";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import remarkGfm from "remark-gfm";
import { Blog } from "@/interfaces/Blog";


const getDir = (path: string) => join(process.cwd(), path);

const getFileNames = (dir: string) => {
    return fs.readdirSync(dir);
}

const getItemInPath = (filePath: string): MarkdownItem => {
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(fileContent);
    return { ...data, content } as MarkdownItem;
}

const getAllItems = (fileNames: string[], get: (name: string) => MarkdownItem) => {
    const items = fileNames
        .map((name) => get(name))
        .sort((item1, item2) => (item1.date > item2.date ? -1 : 1) );

    return items;
}

const markdownToHtml = async (markdown: string) => {
    const result = await remark()
        .use(html)
        .use(remarkGfm)
        .process(markdown)

    return result.toString();
}

const saveSearchData = (content: MarkdownContent) => {
    const searchIndexFile = getDir("/content/search/index.json")
    const searchItemList: SearchContent[] = [];

    Object.keys(content).forEach(dataSource => {
        const contentName = dataSource as ContentItemName

        content[contentName].forEach(contentPiece => {
            const searchItem: SearchContent = {
                slug: contentPiece.slug,
                title: contentPiece.title,
                description: contentPiece.description,
                category: contentName
            };
    
            searchItemList.push(searchItem)
        })
    })

    fs.writeFileSync(searchIndexFile, JSON.stringify(searchItemList, null, 2))
}

export {
    getDir,
    getFileNames,
    getItemInPath,
    getAllItems,
    markdownToHtml,
    saveSearchData
}



