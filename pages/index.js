import React from 'react'
import Link from '@/components/Link'
import { PageSEO } from '@/components/SEO'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { getAllFilesFrontMatter } from '@/lib/mdx'
import formatDate from '@/lib/utils/formatDate'
import NewsletterForm from '@/components/NewsletterForm'

const MAX_DISPLAY = 5

export async function getStaticProps() {
  const posts = await getAllFilesFrontMatter('blog')

  return { props: { posts } }
}

const Home = ({ posts }) => {
  return (
    <>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <h1 className="mb-4 text-4xl font-bold text-indigo-700 dark:text-indigo-400">
            Bienvenue à Kreol Factory ✨🏢
          </h1>
          <p className="mb-8 text-2xl text-gray-700 dark:text-gray-300">
            Réussir votre transformation numérique 🚀💡
          </p>
          <p className="mb-8 text-xl text-gray-700 dark:text-gray-300">
            Inscrivez-vous à notre newsletter pour rester à jour ! 📩📰
          </p>
          <NewsletterForm />
        </div>
      </div>
      <div className="container mx-auto px-4 py-12">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-indigo-700 dark:text-indigo-400">
            Derniers Articles ✨📚
          </h2>
          <p className="text-xl text-gray-700 dark:text-gray-300">
            {siteMetadata.description} 💡💬
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8">
          {posts.slice(0, MAX_DISPLAY).map((frontMatter) => {
            const { slug, date, title, summary, tags } = frontMatter
            return (
              <div key={slug} className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
                <div className="mb-4">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {formatDate(date)} 📅
                  </span>
                </div>
                <h3 className="mb-2 text-xl font-bold">
                  <Link href={`/blog/${slug}`} className="text-blue-500 dark:text-blue-400">
                    {title} ✨🔗
                  </Link>
                </h3>
                <div className="mb-4">
                  {tags.map((tag) => (
                    <Tag key={tag} text={tag} />
                  ))}
                </div>
                <p className="text-gray-700 dark:text-gray-300">{summary}</p>
                <div className="mt-4 text-right">
                  <Link
                    href={`/blog/${slug}`}
                    className="text-blue-500 dark:text-blue-400"
                    aria-label={`Lire "${title}"`}
                  >
                    Lire plus &rarr; 📖➡️
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      {posts.length > MAX_DISPLAY && (
        <div className="container mx-auto px-4 py-6 text-right">
          <Link href="/blog" className="text-blue-500 dark:text-blue-400" aria-label="all posts">
            Tous les articles &rarr; 📚🌟
          </Link>
        </div>
      )}
    </>
  )
}

export default Home
