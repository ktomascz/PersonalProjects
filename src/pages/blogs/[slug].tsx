import { Blog } from '@/interfaces/Blog';
import { getBlogBySlugWithMarkdown, getBlogSlugs } from '@/lib/blogs';
import {  NextPage, GetStaticProps, GetStaticPaths } from 'next/types'
import { ParsedUrlQuery } from 'querystring';
import { PageLayout } from '../../components/layouts';
import { BlogHeader } from '@/components/blogs';

interface BlogDetailProps {
  blog: Blog
}

const BlogDetail: NextPage<BlogDetailProps> = ({blog}) => {
  return (
    <>
      <PageLayout pageTitle={blog.title}>
        <div className="w-2/3 m-auto">
        <BlogHeader blog={blog} />
          <article className="prose lg:prose-lg markdown-image-50 mx-auto">
            <div
              dangerouslySetInnerHTML={{__html: blog.content}}
            />
          </article>
        </div>
      </PageLayout>
    </>
  )
}

interface Params extends ParsedUrlQuery {
  slug: string;
}

export const getStaticProps: GetStaticProps<BlogDetailProps, Params> = async (context) => {
  const { slug } = context.params!; 
  const blog = await getBlogBySlugWithMarkdown(slug);

  return {
    props: { blog }
  }
}


export const getStaticPaths: GetStaticPaths = () => {
  const slugs = getBlogSlugs();
  const paths = slugs.map(slug => ({params: {slug}}))

  return {
    paths,
    fallback: false,
  }
}

export default BlogDetail;






