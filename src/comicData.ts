// src/comicData.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://dokhoacjskbtvbgssfft.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRva2hvYWNqc2tidHZiZ3NzZmZ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA2NDA4MDksImV4cCI6MjA2NjIxNjgwOX0.x6oiUSboVW_e6tI4BjOADnj2Ywk6ejfagca0wdZ-PBI'

const supabase = createClient(supabaseUrl, supabaseKey)

export interface ComicPage {
  pageNumber: number
  imageUrl: string
  chapterNumber: number
}

export interface Chapter {
  chapterNumber: number
  title: string
  pages: ComicPage[]
}

export async function getAllChapters(): Promise<Chapter[]> {
  try {
    console.log('🚀 Carregando capítulos usando chapters.json...')

    // Busca o arquivo chapters.json
    const { data: urlData } = supabase.storage
      .from('comic')
      .getPublicUrl('chapters.json')

    const response = await fetch(urlData.publicUrl)
    const chaptersData: Record<string, number> = await response.json()

    console.log('📖 Dados do chapters.json:', chaptersData)

    const chapters: Chapter[] = []

    // Para cada capítulo no JSON
    for (const [chapterNumStr, pageCount] of Object.entries(chaptersData)) {
      const chapterNum = parseInt(chapterNumStr)
      console.log(`📖 Carregando capítulo ${chapterNum} (${pageCount} páginas)...`)

      const pages: ComicPage[] = []

      // Cria as páginas baseado no número informado no JSON
      for (let pageNum = 1; pageNum <= pageCount; pageNum++) {
        const { data: pageUrlData } = supabase.storage
          .from('comic')
          .getPublicUrl(`chapters/${chapterNum}/p${pageNum}.jpg`)

        pages.push({
          pageNumber: pageNum,
          imageUrl: pageUrlData.publicUrl,
          chapterNumber: chapterNum
        })
      }

      chapters.push({
        chapterNumber: chapterNum,
        title: `Chapter ${chapterNum}`,
        pages: pages
      })

      console.log(`✅ Capítulo ${chapterNum}: ${pages.length} páginas`)
    }

    // Ordena capítulos por número
    chapters.sort((a, b) => a.chapterNumber - b.chapterNumber)

    console.log(`🎉 Total: ${chapters.length} capítulos carregados!`)
    return chapters

  } catch (error) {
    console.error('💥 Erro ao carregar chapters.json:', error)
    return []
  }
}
