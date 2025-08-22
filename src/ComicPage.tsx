import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllChapters } from "./comicData";
import "./blockland-matrix.css";

const ComicPage = () => {
  const navigate = useNavigate();
  const [chapters, setChapters] = useState<any[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [hoveredChapter, setHoveredChapter] = useState<number | null>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const loadChapters = async () => {
      const chapterData = await getAllChapters();
      setChapters(chapterData);
    };
    loadChapters();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToChapter = (chapterIndex: number) => {
    const element = document.getElementById(`chapter-${chapterIndex}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setShowDropdown(false);
    setHoveredChapter(null);
  };

  const goToPage = (chapterIndex: number, pageIndex: number) => {
    const element = document.getElementById(`page-${chapterIndex}-${pageIndex}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    setShowDropdown(false);
    setHoveredChapter(null);
  };

  const goToAugury = () => {
    navigate('/');
  };

  return (
    <div className="comic-page">
      {/* BARRA SUPERIOR */}
      <header className="comic-header">
        <button className="comic-augury-btn" onClick={goToAugury}>
          AUGURY
        </button>
        <h1 className="comic-title">This is the COMIC</h1>
        <div className="comic-header-spacer"></div>
      </header>

      <div className="comic-container">
        {/* MENU DE CAPÍTULOS - CENTRALIZADO */}
        <div className="comic-chapters-static">
          <div className="comic-chapters-wrapper">
            <button 
              className="comic-chapters-button-static"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              CHAPTERS {showDropdown ? '▲' : '▼'}
            </button>
            
            {showDropdown && (
              <div className="comic-chapters-dropdown-static">
                {chapters.map((chapter, chapterIndex) => (
                  <div 
                    key={chapterIndex}
                    className="comic-chapter-item"
                    onMouseEnter={() => setHoveredChapter(chapterIndex)}
                    onMouseLeave={() => setHoveredChapter(null)}
                  >
                    <button
                      className="comic-chapter-title"
                      onClick={() => scrollToChapter(chapterIndex)}
                    >
                      Chapter {chapterIndex + 1}
                    </button>
                    
                    {hoveredChapter === chapterIndex && (
                      <div className="comic-pages-submenu">
                        {chapter.pages.map((_: any, pageIndex: number) => (
                          <button
                            key={pageIndex}
                            className="comic-page-button"
                            onClick={() => goToPage(chapterIndex, pageIndex)}
                          >
                            {pageIndex + 1}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* CONTEÚDO DOS CAPÍTULOS OU MENSAGEM CENTRALIZADA */}
        <div className="comic-content">
          {chapters.length === 0 ? (
            <div className="comic-no-chapters">
              <h2>Chapters loading...</h2>
            </div>
          ) : (
            <div className="comic-pages-container">
              {chapters.map((chapter, chapterIndex) => (
                <div key={chapterIndex}>
                  <div id={`chapter-${chapterIndex}`} className="comic-chapter-anchor" />
                  
                  {/* Título do capítulo */}
                  <h2 className="chapter-title">
                    Chapter {chapterIndex + 1}
                  </h2>
                  
                  {chapter.pages.map((page: any, pageIndex: number) => (
                    <div key={pageIndex} className="comic-page-wrapper">
                      <div id={`page-${chapterIndex}-${pageIndex}`} className="comic-page-anchor" />
                      <img
                        src={page.imageUrl}
                        alt={`Chapter ${chapterIndex + 1}, Page ${pageIndex + 1}`}
                        className="comic-page-image"
                        loading="lazy"
                      />
                    </div>
                  ))}
                  
                  <div className="comic-chapter-separator">
                    <div className="comic-end-text">END OF CHAPTER {chapterIndex + 1}</div>
                    <div className="comic-separator-line">◆ ◆ ◆</div>
                    {/* Só mostra "in the making" se for o último capítulo */}
                    {chapterIndex === chapters.length - 1 && (
                      <div className="comic-next-text">Chapter {chapterIndex + 2} in the making...</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* BOTÃO VOLTAR AO TOPO */}
      {showBackToTop && (
        <button className="comic-back-to-top" onClick={scrollToTop}>
          ↑
        </button>
      )}
    </div>
  );
};

export default ComicPage;
