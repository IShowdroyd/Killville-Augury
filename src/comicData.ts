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

async function checkPagesInBatch(chapterNum: number, startPage: number, batchSize: number): Promise<ComicPage[]> {
  const promises = Array.from({ length: batchSize }, async (_, i) => {
    const pageNum = startPage + i
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

  const results = await Promise.all(promises)
  return results.filter(page => page !== null) as ComicPage[]
}

export async function getAllChapters(): Promise<Chapter[]> {
  try {
    console.log('🚀 Carregando capítulos em lotes...')

    const chapters: Chapter[] = []

    for (let chapterNum = 1; chapterNum <= 10; chapterNum++) {
      console.log(`📖 Testando capítulo ${chapterNum}...`)

      const allPages: ComicPage[] = []
      let currentPage = 1
      const batchSize = 10 // Testa 10 páginas por vez

      // Carrega em lotes de 10 até não encontrar mais páginas
      while (currentPage <= 50) {
        const batch = await checkPagesInBatch(chapterNum, currentPage, batchSize)

        if (batch.length === 0) {
          break // Não encontrou mais páginas
        }

        allPages.push(...batch)
        currentPage += batchSize

        // Se encontrou menos que o lote completo, provavelmente acabaram as páginas
        if (batch.length < batchSize) {
          break
        }
      }

      if (allPages.length > 0) {
        allPages.sort((a, b) => a.pageNumber - b.pageNumber)
        chapters.push({
          chapterNumber: chapterNum,
          title: `Chapter ${chapterNum}`,
          pages: allPages
        })
        console.log(`✅ Capítulo ${chapterNum}: ${allPages.length} páginas`)
      } else {
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
