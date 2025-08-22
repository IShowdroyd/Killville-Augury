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
    console.log('🚀 Testando URLs diretas...')
    
    const chapters: Chapter[] = []
    
    // 🧪 TESTE: Vamos tentar URLs diretas e ver se as imagens existem
    for (let chapterNum = 1; chapterNum <= 5; chapterNum++) {
      console.log(`📖 Testando capítulo ${chapterNum}...`)
      
      const chapterPages: ComicPage[] = []
      
      // Tenta até 20 páginas por capítulo
      for (let pageNum = 1; pageNum <= 50; pageNum++) {
        const { data: urlData } = supabase.storage
          .from('comic')
          .getPublicUrl(`chapters/${chapterNum}/p${pageNum}.jpg`)
        
        // 🔍 Testa se a URL da imagem realmente existe
        try {
          const response = await fetch(urlData.publicUrl, { method: 'HEAD' })
          if (response.ok) {
            console.log(`✅ Encontrada: chapters/${chapterNum}/p${pageNum}.jpg`)
            chapterPages.push({
              pageNumber: pageNum,
              imageUrl: urlData.publicUrl,
              chapterNumber: chapterNum
            })
          } else {
            console.log(`❌ Não encontrada: chapters/${chapterNum}/p${pageNum}.jpg`)
            break // Para de procurar páginas neste capítulo
          }
        } catch (error) {
          console.log(`❌ Erro ao testar: chapters/${chapterNum}/p${pageNum}.jpg`)
          break
        }
      }
      
      if (chapterPages.length > 0) {
        chapters.push({
          chapterNumber: chapterNum,
          title: `Chapter ${chapterNum}`,
          pages: chapterPages
        })
        console.log(`📚 Capítulo ${chapterNum} adicionado com ${chapterPages.length} páginas`)
      }
    }
    
    console.log('✅ Capítulos encontrados:', chapters)
    return chapters
    
  } catch (error) {
    console.error('💥 Erro:', error)
    return []
  }
}