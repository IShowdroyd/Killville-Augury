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
    console.log('⚡ Carregando capítulos (modo rápido)...')

    // Carrega o arquivo de metadados
    const response = await fetch('/chapters.json')
    const chaptersData: Record<string, number> = await response.json()

    const chapters: Chapter[] = []

    for (const [chapterNum, pageCount] of Object.entries(chaptersData)) {
      const chNum = parseInt(chapterNum)
      const pages: ComicPage[] = []

      for (let pageNum = 1; pageNum <= pageCount; pageNum++) {
        const { data: urlData } = supabase.storage
          .from('comic')
          .getPublicUrl(`chapters/${chNum}/p${pageNum}.jpg`)

        pages.push({
          pageNumber: pageNum,
          imageUrl: urlData.publicUrl,
          chapterNumber: chNum
        })
      }

      chapters.push({
        chapterNumber: chNum,
        title: `Chapter ${chNum}`,
        pages
      })
    }

    chapters.sort((a, b) => a.chapterNumber - b.chapterNumber)
    console.log(`✅ ${chapters.length} capítulos carregados instantaneamente!`)
    return chapters

  } catch (error) {
    console.error('💥 Erro:', error)
    return []
  }
}
