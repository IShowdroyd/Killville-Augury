import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./blockland-matrix.css";
import ComicPage from "./ComicPage";
import AuguryNavbar from "./AuguryNavbar";

const ACCESS_KEY = "paoebao";

// HOME PAGE (AUGURY) - SEM NAVBAR AQUI
function HomePage() {
  const posters = [
    { type: "image", src: "https://dokhoacjskbtvbgssfft.supabase.co/storage/v1/object/sign/truth-posters/poster1.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mYTc5MjI0Mi1mNmVkLTRiZjMtYWE4OS1iNmZmNjY5MzhmMWMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ0cnV0aC1wb3N0ZXJzL3Bvc3RlcjEucG5nIiwiaWF0IjoxNzU1NzEwMjk1LCJleHAiOjE3ODcyNDYyOTV9.Km5_o4U1bresH_--pYKPvZbg6nc7dY382sp2PM_DCa0" },
    { type: "image", src: "https://dokhoacjskbtvbgssfft.supabase.co/storage/v1/object/sign/truth-posters/poster2.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mYTc5MjI0Mi1mNmVkLTRiZjMtYWE4OS1iNmZmNjY5MzhmMWMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ0cnV0aC1wb3N0ZXJzL3Bvc3RlcjIucG5nIiwiaWF0IjoxNzU1NzEwMzEwLCJleHAiOjE3ODcyNDYzMTB9.EWX_8z8Eg83zmwBiX-zNXNhclkpOplB93jfwB-eOKzI" },
    { type: "image", src: "https://dokhoacjskbtvbgssfft.supabase.co/storage/v1/object/sign/truth-posters/poster3.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mYTc5MjI0Mi1mNmVkLTRiZjMtYWE4OS1iNmZmNjY5MzhmMWMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ0cnV0aC1wb3N0ZXJzL3Bvc3RlcjMucG5nIiwiaWF0IjoxNzU1NzEwMzIzLCJleHAiOjE3ODcyNDYzMjN9.cGO-hQVRPO-h4_CwlmVxbXx-KxgvDq26HpzW0eRO8ww" },
    { type: "image", src: "https://dokhoacjskbtvbgssfft.supabase.co/storage/v1/object/sign/truth-posters/poster4.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mYTc5MjI0Mi1mNmVkLTRiZjMtYWE4OS1iNmZmNjY5MzhmMWMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ0cnV0aC1wb3N0ZXJzL3Bvc3RlcjQucG5nIiwiaWF0IjoxNzU1NzEwMzU0LCJleHAiOjE3ODcyNDYzNTR9.ghMzR-tn1w9yz-trTFPtZ8viC6KZjRvcUJ1E6ZUPRCU" },
    { type: "image", src: "https://dokhoacjskbtvbgssfft.supabase.co/storage/v1/object/sign/truth-posters/poster5.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mYTc5MjI0Mi1mNmVkLTRiZjMtYWE4OS1iNmZmNjY5MzhmMWMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ0cnV0aC1wb3N0ZXJzL3Bvc3RlcjUucG5nIiwiaWF0IjoxNzU1NzEwMzY1LCJleHAiOjE3ODcyNDYzNjV9.Ntp4QS_JuR4HFujOHf9q6KSoIfY468XV57ZUGKc3iME" },
    { type: "image", src: "https://dokhoacjskbtvbgssfft.supabase.co/storage/v1/object/sign/truth-posters/poster6.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mYTc5MjI0Mi1mNmVkLTRiZjMtYWE4OS1iNmZmNjY5MzhmMWMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ0cnV0aC1wb3N0ZXJzL3Bvc3RlcjYucG5nIiwiaWF0IjoxNzU1NzEwMzc5LCJleHAiOjE3ODcyNDYzNzl9.gGAuPPsgN7neN1Lb4X69DbkB2DgDZv1iX8G5hM-r9hM" },
    { type: "image", src: "https://dokhoacjskbtvbgssfft.supabase.co/storage/v1/object/sign/truth-posters/poster6.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9jZjdjZTdlOC1kMzQ5LTRmNDItYmFiZi0wNjY5ZmI5ODhjOGUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ0cnV0aC1wb3N0ZXJzL3Bvc3RlcjYucG5nIiwiaWF0IjoxNzUwNzM3MDU3LCJleHAiOjE5NzE0ODkwNTd9.u-lDDd8kDiSdFeyhARlZ_guR39WigSRyUUQ1uw0Ytcc" },
    { type: "image", src: "https://dokhoacjskbtvbgssfft.supabase.co/storage/v1/object/sign/truth-posters/poster7.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mYTc5MjI0Mi1mNmVkLTRiZjMtYWE4OS1iNmZmNjY5MzhmMWMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ0cnV0aC1wb3N0ZXJzL3Bvc3RlcjcucG5nIiwiaWF0IjoxNzU1NzEwMzg5LCJleHAiOjE3ODcyNDYzODl9.ahjjRE9avlTf9mAwBrShbe5i3NCyb_bqIV6Nps9uyMA" },
    { type: "image", src: "https://dokhoacjskbtvbgssfft.supabase.co/storage/v1/object/sign/truth-posters/poster8.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mYTc5MjI0Mi1mNmVkLTRiZjMtYWE4OS1iNmZmNjY5MzhmMWMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ0cnV0aC1wb3N0ZXJzL3Bvc3RlcjgucG5nIiwiaWF0IjoxNzU1NzEwNDAxLCJleHAiOjE3ODcyNDY0MDF9.DoEDE8itdhs_CAoirgTPJmBuPUlJQ-9dBUCPfr75qWA" },
    { type: "image", src: "https://dokhoacjskbtvbgssfft.supabase.co/storage/v1/object/sign/truth-posters/poster9.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mYTc5MjI0Mi1mNmVkLTRiZjMtYWE4OS1iNmZmNjY5MzhmMWMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ0cnV0aC1wb3N0ZXJzL3Bvc3RlcjkucG5nIiwiaWF0IjoxNzU1NzEwNDEwLCJleHAiOjE3ODcyNDY0MTB9.-1mcYiBsQNzuXOKEq73CbRBN_tbA2YtfGaq6MpKwrP4" },
    { type: "image", src: "https://dokhoacjskbtvbgssfft.supabase.co/storage/v1/object/sign/truth-posters/poster10.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mYTc5MjI0Mi1mNmVkLTRiZjMtYWE4OS1iNmZmNjY5MzhmMWMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ0cnV0aC1wb3N0ZXJzL3Bvc3RlcjEwLnBuZyIsImlhdCI6MTc1NTcxMDQyMSwiZXhwIjoxNzg3MjQ2NDIxfQ.lNBSacVI5_9olbdhp2XMgl2ikq5KyXwM6iKprXwqoIs" },
    { type: "youtube", id: "P9z29YzUGSU" },
  ];  

  const [lightbox, setLightbox] = useState<string | null>(null);

  useEffect(() => {
    if (lightbox) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [lightbox]);

  return (
    <div className="main-bg-matrix">
      <div className="posters-wall">
        {posters.map((poster, i) =>
  poster.type === "image" && poster.src ? (
    <img
      key={i}
      src={poster.src}
      className={`poster-img poster-img-${i}`}
      alt=""
      onClick={() => setLightbox(poster.src!)}
      draggable={false}
      style={{ zIndex: i + 2 }}
    />
  ) : poster.type === "youtube" ? (
    <iframe
      key={i}
      src={`https://www.youtube.com/embed/${poster.id}?autoplay=0&mute=0&controls=1&loop=0&modestbranding=1&rel=0`}
      className={`poster-img poster-youtube poster-img-${i}`}
      allow="autoplay; encrypted-media"
      allowFullScreen={false}
      style={{
        zIndex: i + 2,
        width: "444px",
        height: "522px",
        border: "none",
        background: "#000"
      }}
      tabIndex={-1}
      frameBorder="0"
      title="Vídeo Poster"
    />
  ) : null
)}

        {lightbox && (
          <div className="poster-lightbox" onClick={() => setLightbox(null)}>
            <img src={lightbox} alt="" className="poster-lightbox-img" />
          </div>
        )}
      </div>
    </div>
  );
}

// ✅ CORRETO - Função App com useState DENTRO
const App = () => {
  const [unlocked, setUnlocked] = useState<boolean>(
    sessionStorage.getItem("killville_key_ok") === "true"
  );
  const [input, setInput] = useState<string>("");

  function handleUnlock(e: React.FormEvent) {
    e.preventDefault();
    if (input === ACCESS_KEY) {
      setUnlocked(true);
      sessionStorage.setItem("killville_key_ok", "true");
    } else {
      alert("Wrong key!");
    }
  }

  if (!unlocked) {
    return (
      <div className="bl-bg-matrix">
        <div className="bl-login-window-matrix">
          <div className="bl-title-bar-matrix">
            <span>ACCESS REQUIRED</span>
          </div>
          <div className="bl-login-content-matrix">
            <label className="bl-label-matrix" htmlFor="access-key">
              Please, enter the access key:
            </label>
            <form className="bl-form-matrix" onSubmit={handleUnlock}>
              <input
                className="bl-input-matrix"
                id="access-key"
                type="password"
                value={input}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
                placeholder="Access Key"
                autoFocus
              />
              <button className="bl-btn-matrix" type="submit">
                OK
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <BrowserRouter basename="/Killville-Augury">
      <Routes>
        <Route path="/" element={
          <>
            <AuguryNavbar />
            <HomePage />
          </>
        } />
        <Route path="/comic" element={<ComicPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
