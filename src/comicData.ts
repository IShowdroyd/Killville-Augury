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
    console.log('🚀 Carregando capítulos usando API do Supabase...')

    const chapters: Chapter[] = []

    // Lista todas as pastas dentro de 'chapters/'
    const { data: chapterFolders, error: foldersError } = await supabase.storage
      .from('comic')
      .list('chapters', {
        limit: 100,
        offset: 0,
      })

    if (foldersError) {
      console.error('❌ Erro ao listar pastas:', foldersError)
      return []
    }

    console.log('📁 Pastas encontradas:', chapterFolders)

    // Para cada pasta de capítulo
    for (const folder of chapterFolders) {
      // Ignora se não for uma pasta (ex: arquivos soltos)
      if (!folder.id) continue

      const chapterNum = parseInt(folder.name)
      if (isNaN(chapterNum)) continue

      console.log(`📖 Carregando capítulo ${chapterNum}...`)

      // Lista TODOS os arquivos deste capítulo de uma vez
      const { data: files, error: filesError } = await supabase.storage
        .from('comic')
        .list(`chapters/${chapterNum}`, {
          limit: 1000,
          offset: 0,
        })

      if (filesError) {
        console.error(`❌ Erro ao listar arquivos do capítulo ${chapterNum}:`, filesError)
        continue
      }

      // Filtra apenas .jpg e ordena por número
      const pages = files
        .filter(f => f.name.toLowerCase().endsWith('.jpg'))
        .map(f => {
          const match = f.name.match(/p(\d+)\.jpg/i)
          const pageNum = match ? parseInt(match[1]) : 0

          const { data: urlData } = supabase.storage
            .from('comic')
            .getPublicUrl(`chapters/${chapterNum}/${f.name}`)

          return {
            pageNumber: pageNum,
            imageUrl: urlData.publicUrl,
            chapterNumber: chapterNum
          }
        })
        .sort((a, b) => a.pageNumber - b.pageNumber)

      if (pages.length > 0) {
        chapters.push({
          chapterNumber: chapterNum,
          title: `Chapter ${chapterNum}`,
          pages: pages
        })
        console.log(`✅ Capítulo ${chapterNum}: ${pages.length} páginas`)
      }
    }

    // Ordena capítulos por número
    chapters.sort((a, b) => a.chapterNumber - b.chapterNumber)

    console.log(`🎉 Total: ${chapters.length} capítulos carregados!`)
    return chapters

  } catch (error) {
    console.error('💥 Erro:', error)
    return []
  }
}
