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
    console.log('🚀 Carregando capítulos...')

    const chapters: Chapter[] = []

    // Para cada capítulo (1 a 10)
    for (let chapterNum = 1; chapterNum <= 10; chapterNum++) {
      console.log(`📖 Testando capítulo ${chapterNum}...`)

      // Cria array de promessas para testar 50 páginas AO MESMO TEMPO
      const pagePromises = Array.from({ length: 50 }, async (_, i) => {
        const pageNum = i + 1
        const { data: urlData } = supabase.storage
          .from('comic')
          .getPublicUrl(`chapters/${chapterNum}/p${pageNum}.jpg`)

        try {
          const response = await fetch(urlData.publicUrl, { method: 'HEAD' })
          if (response.ok) {
            return {
              pageNumber: pageNum,
              imageUrl: urlData.publicUrl,
              chapterNumber: chapterNum
            }
          }
        } catch {
          return null
        }
        return null
      })

      // Aguarda TODAS as 50 requisições ao mesmo tempo
      const results = await Promise.all(pagePromises)

      // Filtra só as páginas que existem
      const chapterPages = results
        .filter(page => page !== null)
        .sort((a, b) => a!.pageNumber - b!.pageNumber) as ComicPage[]

      if (chapterPages.length > 0) {
        chapters.push({
          chapterNumber: chapterNum,
          title: `Chapter ${chapterNum}`,
          pages: chapterPages
        })
        console.log(`✅ Capítulo ${chapterNum}: ${chapterPages.length} páginas`)
      } else {
        // Se não encontrou nenhuma página, para de procurar capítulos
        console.log(`❌ Capítulo ${chapterNum} não encontrado, parando busca`)
        break
      }
    }

    console.log(`🎉 Total: ${chapters.length} capítulos carregados!`)
    return chapters

  } catch (error) {
    console.error('💥 Erro:', error)
    return []
  }
}
