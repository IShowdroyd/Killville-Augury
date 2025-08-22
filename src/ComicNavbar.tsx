import React from "react";
import { useNavigate } from "react-router-dom";

export default function ComicNavbar() {
  const navigate = useNavigate();

  return (
    <nav className="comic-navbar"
      style={{
        width: "100vw",
        height: 68,
        background: "#181818",
        display: "flex",
        alignItems: "center",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 100,
        borderBottom: "none",
        boxShadow: "0 2px 10px #000a",
        padding: 0,
      }}
    >
      {/* Esquerda - Botão AUGURY */}
      <div style={{
        flex: 1,
        minWidth: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingLeft: 32,
      }}>
        <button
          className="navbar-augury"
          style={{
            fontFamily: "'Bodoni Moda', serif",
            color: "#ececec",
            fontSize: "1.25rem",
            cursor: "pointer",
            background: "none",
            border: "none",
            letterSpacing: 1,
            fontWeight: 700,
            textTransform: "uppercase",
            padding: "4px 7px",
            transition: "color 0.18s",
          }}
          onClick={() => navigate("/")}
        >AUGURY</button>
      </div>
      {/* Centro - Título Comic */}
      <div style={{
        flex: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        margin: "auto",
        lineHeight: 1.05,
      }}>
        <span style={{
          fontFamily: "'Bodoni Moda', serif",
          color: "#fff",
          fontSize: "1rem",
          fontWeight: 400,
          letterSpacing: 0.7,
          marginBottom: -2,
        }}>This is the</span>
        <span style={{
          fontFamily: "'Bodoni Moda', serif",
          color: "#ececec",
          fontSize: "1.6rem",
          fontWeight: 700,
          letterSpacing: 1.2,
          lineHeight: 1,
        }}>COMIC</span>
      </div>
      {/* Direita - vazio */}
      <div style={{
        flex: 1,
        minWidth: 0,
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        paddingRight: 48,
      }}>
        {/* vazio */}
      </div>
    </nav>
  )
}